const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain,
  globalShortcut,
  nativeImage,
  Notification,
} = require("electron");
const path = require("path");
const fs = require("fs");

// ─── Persistent JSON Storage ────────────────────────────────────────────────

const dataPath = path.join(app.getPath("userData"), "pomodoro-data.json");

const defaults = {
  settings: {
    theme: "violet",
    foodEmoji: "avocado",
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartWork: false,
    tickSound: false,
    alarmSound: true,
    alarmStyle: "chime",
    alarmVolume: 0.7,
    desktopNotifications: true,
    alwaysOnTop: false,
    dailyGoal: 8,
  },
  tasks: [],
  stats: {
    daily: {},
    totalCompleted: 0,
    totalMinutesFocused: 0,
    streakDays: 0,
    lastActiveDate: null,
  },
};

function loadData() {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(raw);
    // Merge with defaults to handle new fields
    return {
      settings: { ...defaults.settings, ...data.settings },
      tasks: data.tasks || [],
      stats: { ...defaults.stats, ...data.stats },
    };
  } catch {
    return JSON.parse(JSON.stringify(defaults));
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to save data:", err);
  }
}

// ─── Window & Tray ─────────────────────────────────────────────────────────

let mainWindow = null;
let tray = null;
let isQuitting = false;

function createWindow() {
  const data = loadData();

  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    minWidth: 480,
    minHeight: 400,
    resizable: true,
    frame: false,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 14, y: 14 },
    vibrancy: "under-window",
    visualEffectState: "active",
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: true,
    alwaysOnTop: data.settings.alwaysOnTop || false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.send("init-data", loadData());
  });

  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ─── Tray ───────────────────────────────────────────────────────────────────

function createTray() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="8" fill="#E74C3C"/>
    <circle cx="9" cy="9" r="5" fill="none" stroke="white" stroke-width="1.5"/>
    <line x1="9" y1="5" x2="9" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="9" x2="12" y2="11" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  const icon = nativeImage.createFromDataURL(
    `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
  );

  tray = new Tray(icon.resize({ width: 18, height: 18 }));
  tray.setToolTip("Pomodoro");
  updateTrayMenu();

  tray.on("click", () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.focus() : mainWindow.show();
    }
  });
}

function updateTrayMenu(timerState) {
  if (!tray) return;

  const template = [
    {
      label: timerState?.display || "pomodoro",
      enabled: false,
    },
    { type: "separator" },
    {
      label: timerState?.isRunning ? "pause" : "start",
      click: () => mainWindow?.webContents.send("tray-action", "toggle"),
    },
    {
      label: "skip",
      click: () => mainWindow?.webContents.send("tray-action", "skip"),
    },
    {
      label: "reset",
      click: () => mainWindow?.webContents.send("tray-action", "reset"),
    },
    { type: "separator" },
    {
      label: "show window",
      click: () => {
        mainWindow?.show();
        mainWindow?.focus();
      },
    },
    { type: "separator" },
    {
      label: "quit",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ];

  tray.setContextMenu(Menu.buildFromTemplate(template));

  // Show timer in menu bar
  if (timerState?.display) {
    tray.setTitle(` ${timerState.display}`);
  } else {
    tray.setTitle("");
  }
}

// ─── IPC ────────────────────────────────────────────────────────────────────

function setupIPC() {
  ipcMain.handle("load-data", () => loadData());

  ipcMain.handle("save-data", (_, data) => {
    saveData(data);
    if (mainWindow && data.settings) {
      mainWindow.setAlwaysOnTop(data.settings.alwaysOnTop || false);
    }
    return true;
  });

  ipcMain.on("timer-update", (_, timerState) => {
    updateTrayMenu(timerState);
  });

  ipcMain.on("notify", (_, { title, body }) => {
    if (Notification.isSupported()) {
      const n = new Notification({ title, body, silent: false });
      n.show();
      n.on("click", () => {
        mainWindow?.show();
        mainWindow?.focus();
      });
    }
  });

  ipcMain.on("window-minimize", () => mainWindow?.minimize());
  ipcMain.on("window-close", () => mainWindow?.hide());
}

// ─── Global Shortcuts ───────────────────────────────────────────────────────

function registerShortcuts() {
  globalShortcut.register("CommandOrControl+Shift+P", () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.focus() : mainWindow.show();
    }
  });
}

// ─── App Lifecycle ──────────────────────────────────────────────────────────

app.whenReady().then(() => {
  createWindow();
  createTray();
  setupIPC();
  registerShortcuts();

  app.on("activate", () => {
    if (!mainWindow) createWindow();
    else mainWindow.show();
  });

  if (process.platform === "darwin") {
    app.dock.setMenu(
      Menu.buildFromTemplate([
        {
          label: "Show Timer",
          click: () => {
            mainWindow?.show();
            mainWindow?.focus();
          },
        },
      ])
    );
  }
});

app.on("before-quit", () => (isQuitting = true));
app.on("will-quit", () => globalShortcut.unregisterAll());
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
