const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loadData: () => ipcRenderer.invoke("load-data"),
  saveData: (data) => ipcRenderer.invoke("save-data", data),
  updateTimer: (state) => ipcRenderer.send("timer-update", state),
  notify: (data) => ipcRenderer.send("notify", data),
  minimize: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),

  onTrayAction: (cb) => ipcRenderer.on("tray-action", (_, action) => cb(action)),
  onInitData: (cb) => ipcRenderer.on("init-data", (_, data) => cb(data)),
});
