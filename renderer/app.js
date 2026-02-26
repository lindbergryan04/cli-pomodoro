// ═══════════════════════════════════════════════════════════════════════════
//  POMODORO — a terminal-style timer for programmers
// ═══════════════════════════════════════════════════════════════════════════

// ─── Constants ──────────────────────────────────────────────────────────────

const SCREEN = {
  MAIN_MENU: "main_menu",
  SPLIT_SELECT: "split_select",
  CUSTOM_SPLIT: "custom_split",
  TIMER: "timer",
  SESSION_DONE: "session_done",
  TASKS: "tasks",
  TASK_ADD: "task_add",
  STATS: "stats",
  SETTINGS: "settings",
  HELP: "help",
};

const PRESETS = [
  { label: "25/5", work: 25, brk: 5 },
  { label: "50/10", work: 50, brk: 10 },
  { label: "90/20", work: 90, brk: 20 },
];

// ─── Color Themes (calm pastels) ────────────────────────────────────────────

const THEMES = {
  violet: {
    "--bg": "#0c0c14", "--text": "#d4d4d4",
    "--purple": "#c792ea", "--pink": "#ff79c6",
    "--green": "#98c379", "--yellow": "#e5c07b",
    "--red": "#e06c75", "--cyan": "#56b6c2",
    "--orange": "#f78c6c", "--dim": "#5c6370",
  },
  ocean: {
    "--bg": "#0a0e14", "--text": "#d4d4d4",
    "--purple": "#82aaff", "--pink": "#89ddff",
    "--green": "#c3e88d", "--yellow": "#ffcb6b",
    "--red": "#f07178", "--cyan": "#89ddff",
    "--orange": "#f78c6c", "--dim": "#546e7a",
  },
  rose: {
    "--bg": "#140c10", "--text": "#d8d0d4",
    "--purple": "#e8a0bf", "--pink": "#f0c0d0",
    "--green": "#a8d4a0", "--yellow": "#e5d0a0",
    "--red": "#e89090", "--cyan": "#a0c8d0",
    "--orange": "#e8b090", "--dim": "#6b5a64",
  },
  ember: {
    "--bg": "#14100c", "--text": "#d8d4d0",
    "--purple": "#ffcb6b", "--pink": "#f78c6c",
    "--green": "#c3e88d", "--yellow": "#ffe0a0",
    "--red": "#f07178", "--cyan": "#80cbc4",
    "--orange": "#ffab70", "--dim": "#6b6050",
  },
  forest: {
    "--bg": "#0c120e", "--text": "#d0d8d4",
    "--purple": "#a8d8b0", "--pink": "#80cbc4",
    "--green": "#c3e88d", "--yellow": "#dce8a0",
    "--red": "#e89090", "--cyan": "#88c8d8",
    "--orange": "#c8b888", "--dim": "#546b5e",
  },
  frost: {
    "--bg": "#0c0e14", "--text": "#d0d4d8",
    "--purple": "#a9c1e8", "--pink": "#b8d0f0",
    "--green": "#b0d8b0", "--yellow": "#d8d0a8",
    "--red": "#d8a0a0", "--cyan": "#a0c8e0",
    "--orange": "#c8b8a0", "--dim": "#546070",
  },
  crimson: {
    "--bg": "#120a0a", "--text": "#d8d0d0",
    "--purple": "#e06c75", "--pink": "#d45d68",
    "--green": "#b8c8a0", "--yellow": "#d4a87c",
    "--red": "#f44747", "--cyan": "#c08080",
    "--orange": "#e88060", "--dim": "#6b4a4a",
  },
};

const THEME_NAMES = Object.keys(THEMES);

// ─── Background ASCII Art ────────────────────────────────────────────────────

const BG_ART = {
  none: "",
  "centipede": [
    "⢀⣀⠀⠀⠀⠀⠀⠀⢀⠔⠂⠉⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠂⠀⠈⠁⠒⣤⠖⠒⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⣳⠋⣉⣻⡄⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⡤⢸⡌⠄⠒⣷⡢⢥⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠉⢉⣳⣊⠤⢚⣷⡝⡲⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠧⠒⢳⣔⡡⠘⣻⣔⡩⢃⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⢰⡡⠛⢦⢊⠔⢨⠝⡷⣮⣎⡅⢠⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⢰⣈⠟⢦⣇⠎⡔⠡⠊⡝⡳⠮⣤⣊⠆⢀⡀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠧⠊⠹⢳⠧⣼⣰⠁⠎⡔⠙⡶⣧⠂⢀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠁⠀⣃⠍⡹⢲⣤⢊⠔⡩⠳⣥⠃⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠒⠁⣋⢿⣎⡔⡩⠼⣶⡸⠂⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠣⡺⢿⡔⡉⠭⣧⢐⡄",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢒⠩⢯⠔⢈⣹⣅⣀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡀⢽⡍⠄⠒⡗⠚",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠽⣗⠩⠭⣿⠩",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⢧⣀⣠⡇⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠶⡶⡙⡄",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠇⠐⠼",
  ].join("\n"),
  "evil centipede": [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠸⡄⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⢤⡀⠀⢤⣀⠀⠀⠘⢶⣄⠀⢹⡆⠀⢸⠰⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠀⢢⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠙⢶⣄⡈⢉⣻⡶⣴⠿⢷⠶⠿⢦⣼⣀⠹⣆⠀⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡌⠒⢦⣄⠀⠀⣇⠀⠘⣇⠀⡇⠀⠀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⣀⣀⣤⣤⣤⣶⣶⡒⣿⠛⢻⡀⠀⢧⡀⢸⡀⠀⡾⠉⣙⡷⢿⣆⠀⢷⠀⢸⠀⢰⠀⠸⡇⠘⣆⠀⠀⠙⢦⣄⣈⣷⣤⣷⣴⣤⣿⣀⡇⢀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠉⠉⠉⠉⠉⠉⣉⣩⡽⣻⣷⣴⠟⠒⣻⡿⢏⣻⣒⣿⣦⣿⡀⡶⠛⠻⣾⣄⣸⠀⢸⡀⠀⢻⡄⠘⢷⡀⣠⣴⣟⠉⢻⡀⢼⣏⠀⡿⢉⣿⣾⣇⠀⠀⣤⠞⠀⠀⠀⠀⠀⠀⠀",
    "⠀⣀⣠⣤⣴⡾⠿⠚⠋⢁⡼⠏⠈⠉⠁⠀⠀⠀⠀⠁⠀⠈⠛⣧⣄⣼⠃⠈⣿⠷⣾⣥⣄⣸⡧⢶⠞⠛⣏⠀⠹⣦⣨⣿⠞⠛⣛⣷⢾⣧⡶⢛⣷⠞⠁⠀⣀⡤⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠒⠚⠋⠉⠈⢛⣷⣾⣇⠀⢸⠁⠀⣏⠀⠘⣧⣀⣸⣷⣾⠿⠛⠁⠛⠛⠿⠥⣤⠿⢶⠋⣉⣳⣶⠟⠁⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠉⠉⠙⠲⠭⠿⠿⠳⠶⢻⠓⠚⣻⠉⠁⣸⠁⠀⠀⠀⠀⠀⠀⠀⢀⣠⠞⢳⣿⠉⢻⣧⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⣰⠏⠀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠐⠋⠁⠀⠈⠻⣿⠋⠋⠉⠉⠉⠉⠉⠉⠁",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠃⠀⠰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  ].join("\n"),
  butterflies: [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢔⣶⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠗⡿⣾⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠓⡞⢩⣯⡀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠰⡹⠁⢰⠃⣩⣿⡇⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣿⠿⣉⣩⠛⠲⢶⡠⢄⠐⣣⠃⣰⠗⠋⢀⣯⠁⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣯⣠⠬⠦⢤⣀⠈⠓⢽⣾⢔⣡⡴⠞⠻⠙⢳⡄",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣵⣳⠖⠉⠉⢉⣩⣵⣿⣿⣒⢤⣴⠤⠽⣬⡇",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢻⣟⠟⠋⢡⡎⢿⢿⠳⡕⢤⡉⡷⡽⠁",
    "⣧⢮⢭⠛⢲⣦⣀⠀⠀⠀⠠⡀⠀⠀⠀⡾⣥⣏⣖⡟⠸⢺⠀⠀⠈⠙⠋⠁⠀⠀",
    "⠈⠻⣶⡛⠲⣄⠀⠙⠢⣀⠀⢇⠀⠀⠀⠘⠿⣯⣮⢦⠶⠃⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⢻⣿⣥⡬⠽⠶⠤⣌⣣⣼⡔⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⢠⣿⣧⣤⡴⢤⡴⣶⣿⣟⢯⡙⠒⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠘⣗⣞⣢⡟⢋⢜⣿⠛⡿⡄⢻⡮⣄⠈⠳⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠈⠻⠮⠴⠵⢋⣇⡇⣷⢳⡀⢱⡈⢋⠛⣄⣹⣲⡀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣱⡇⣦⢾⣾⠿⠟⠿⠷⠷⣻⠧⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠽⠞⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  ].join("\n"),
  bee: [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⣀⣠⡤⣀⣀⡀⠀⠀⠀⠑⡀⠈⠂⡠⣠⠊⠀⢀⠜⠀⠀⠀⠀⣀⣀⠀⠀⠀",
    "⠈⢿⣭⡍⠩⠉⠄⢛⡲⠤⣀⠸⣄⣿⣿⣿⣷⣴⣡⠤⣒⠩⠝⢩⡙⠫⠝⠛⣶",
    "⠀⠀⠉⢖⠒⠒⠒⠀⠐⠚⠷⣺⣇⠀⠀⠀⠋⣿⠿⣗⣀⡉⠉⠩⣭⣤⣽⠿⠋",
    "⠀⠀⠀⠈⠓⠠⠤⠬⠷⠖⢋⡽⣿⣷⢄⣸⣼⣿⣍⠓⠥⢍⣶⣤⡍⠔⠂⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢩⣾⣿⣛⢟⠿⢿⣷⡌⠱⡄⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠂⠉⠰⡟⣯⣍⠙⠛⠛⢛⣿⣗⡄⠈⠀⠃⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠁⣯⣙⠛⠿⠟⢻⣿⠛⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠘⢿⡻⠿⠾⣻⠏⠀⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠜⠀⠀⠀⠉⠙⠋⠁⠀⠀⠘⠂⠀⠀⠀⠀⠀⠀⠀⠀",
  ].join("\n"),
  ladybug: [
    "⠀⠀⠀⠀⠀⢀⠀⠀⠀⡀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠘⢆⠀⡰⠃⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⢀⣠⣼⣿⣧⣄⡀⠀⠀⠀⠀",
    "⠀⠀⢀⡴⠋⠀⠀⢸⠀⠀⠙⢦⡀⠀⠀",
    "⠀⢠⠞⠀⣴⣶⠀⢸⠀⠀⠀⠀⠳⡄⠀",
    "⠀⡼⠀⠀⠀⠀⠀⢸⠀⣴⣶⠀⠀⢧⠀",
    "⢰⠇⠀⠀⠀⣴⣶⢸⠀⠀⠀⠀⠀⠸⡆",
    "⢸⠀⠀⣴⣶⠀⠀⢸⠀⠀⣴⣶⠀⠀⡇",
    "⠘⡆⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⢰⠃",
    "⠀⠹⡄⠀⠀⣴⣶⢸⠀⣴⣶⠀⢠⠏⠀",
    "⠀⠀⠙⢦⡀⠀⠀⢸⠀⠀⢀⡴⠋⠀⠀",
    "⠀⠀⠀⠀⠉⠓⠲⢼⡤⠖⠋⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀",
  ].join("\n"),
  "butterfly 2": [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⢀⣠⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠛⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠁⠉⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⡾⠀⠈⠳⣄⠀⠀⠀⠀⠀⢀⣴⠟⠁⠀⠘⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⡇⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⢠⠇⠀⠀⠀⠈⢧⡀⠀⣠⠴⠊⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⣴⠖⠲⢬⣳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⢀⡾⠀⠀⠀⠀⠀⢉⣷⠚⠁⠀⠀⠀⠀⠀⠀⢸⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⡇⠀⠀⢰⠃⠀⠀⠀⠈⠙⢿⡂⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⣰⠏⠀⠀⠀⠀⠀⠀⢼⠉⡇⠀⠀⠀⠀⠀⠀⢠⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⡾⠀⠀⠀⠀⠀⠀⣰⠟⠦⣀⠀⠀⠀⠀⠀",
    "⠀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠸⡄⢳⡀⠀⠀⠀⠀⢀⠞⠀⢀⣀⠀⠀⠀⠀⠀⠀⣶⡄⠀⠀⠀⠀⢸⠀⠀⡇⠀⠀⠀⠀⣠⠞⠁⠀⠀⠘⡇⠀⠀⠀⠀",
    "⠀⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⢳⣸⡇⠀⠀⠀⣴⣏⡴⠚⠉⠙⠃⠀⠀⠀⣀⡀⠙⠦⣄⠀⠀⠀⠘⡇⢠⡇⠀⠀⢠⠜⠁⠀⢀⣀⣠⣼⣃⣀⡀⠀⠀",
    "⠀⠀⠉⢙⣲⣤⣤⡤⠤⢤⡀⠀⢳⣧⠀⣠⢞⡷⢋⡴⠖⠙⣷⠀⠀⠀⠀⠻⢧⣀⡀⠈⠙⢦⡀⠀⣷⢸⠇⠀⡴⢃⣠⠖⣺⡭⠛⠁⠀⠀⠈⠉⠳⡄",
    "⢠⡶⠊⠉⠀⠀⠀⠈⠉⠙⠃⠀⠈⣿⣶⣱⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠲⢼⣦⣽⢿⢠⣾⢟⣫⠴⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⡗",
    "⠸⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣟⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣟⣏⣁⣀⣀⣀⡠⠤⠴⢒⣒⣷⠆⠀⢠⠇",
    "⠀⠈⠙⠲⠤⣀⠀⠀⠀⠀⠀⢀⣾⠳⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⢻⡛⢦⡛⠳⠭⣍⣉⠉⠉⠀⠀⢀⣠⠏⠀",
    "⠀⠀⠀⠀⠀⠈⠳⢤⣀⣀⡴⠋⣇⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡙⢦⠀⠀⠉⠉⠒⠒⠒⠋⠁⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⣬⡖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀",
    "⠀⠀⢰⠋⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠙⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⢠⢸⡄⠀⠀⠀⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠘⠦⣄⡀⠀⠀⢀⠤⠴⠲⠤⣤⡀⠀⠀⠀⠀",
    "⠀⢸⣸⡇⠀⠀⠀⠀⠈⢧⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠤⠦⣄⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠹⣤⠞⠉⠀⠀⠀⠀⣾⡇⠀⠀⠀⠀",
    "⠀⢸⡏⠀⠀⠀⠀⠀⠀⠘⡆⠀⢰⡏⣠⠖⠀⠀⣠⠶⠋⠁⠀⠀⣠⠟⠀⠀⠀⠀⠀⠀⠸⡇⠀⠀⠀⠀⠀⢀⣼⠋⠀⠀⠀⠀⠀⠀⢿⡀⠀⠀⠀⠀",
    "⠀⠈⢳⠀⠀⠀⠀⠀⠀⠀⢸⡄⢸⣻⠁⠀⣠⠞⠁⠀⠀⠀⢀⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⣠⣻⠏⠀⠀⠀⠀⠀⠀⠀⠊⢯⡀⠀⠀⠀",
    "⠀⠀⠈⠳⠤⣀⣀⠀⠀⠀⠀⣧⢸⡇⢀⠜⠁⠀⠀⠀⠀⣰⠋⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠘⣆⠀⠀⣰⣳⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀",
    "⠀⢀⣤⠒⠒⠚⠛⠻⠷⠶⣶⣾⣾⣷⠋⠀⠀⠀⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⢿⠉⠙⠲⣄⠀⠹⡄⣴⡽⠃⠀⠀⠀⠀⠀⠀⣀⣤⣤⣴⠾⣥⣀⠀⠀",
    "⠀⢿⡅⠀⠀⠀⠀⠀⠀⠀⣼⣿⠏⠓⢶⣦⣀⣀⣀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠈⣞⠉⠙⠲⢿⣶⣷⡿⠁⠀⠀⠀⣠⠔⠚⢉⠤⠞⠉⠀⠀⠀⢸⣧⠀",
    "⠀⠸⢯⠀⠀⠀⠀⠀⢀⡾⢻⣿⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠛⣿⢦⣄⡀⠘⠓⠉⠉⠀⠀⠀⠀⠀⠀⠀⣼⠟⠀",
    "⠀⠀⠘⢦⣀⣀⡤⠞⢹⣠⠏⡇⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⡙⠫⢟⡓⠦⠤⣄⣀⠀⠀⠀⢀⠞⠁⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠘⠻⠀⡇⠀⠀⣀⣤⠖⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠢⢤⣉⣦⠀⠀⠉⠙⠒⠒⠂⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  ].join("\n"),
};

const BG_ART_NAMES = Object.keys(BG_ART);
const DEFAULT_UI_FONT_FILE = "Miracode.ttf";
const UI_FONT_FAMILY = "PomodoroRuntimeFont";
const DEFAULT_UI_FONT_SIZE = 14;
const MIN_UI_FONT_SIZE = 12;
const MAX_UI_FONT_SIZE = 20;

const SETTING_DEFS = [
  { key: "theme", name: "color theme", type: "theme" },
  { key: "uiFont", name: "ui font", type: "font" },
  { key: "uiFontSize", name: "font size", unit: "px", min: MIN_UI_FONT_SIZE, max: MAX_UI_FONT_SIZE, step: 1 },
  { key: "bgArt", name: "background art", type: "bgArt" },
  { key: "bgArtBrightness", name: "bg art brightness", unit: "%", min: 0, max: 100, step: 5 },
  { key: "foodEmoji", name: "icon", type: "food" },
  { key: "longBreakDuration", name: "long break", unit: "min", min: 1, max: 60, step: 1 },
  { key: "longBreakInterval", name: "long break after", unit: "sessions", min: 2, max: 10, step: 1 },
  { key: "dailyGoal", name: "daily goal", unit: "fruit", min: 1, max: 30, step: 1, dynamic_unit: true },
  { key: "autoStartBreaks", name: "auto-start breaks", type: "bool" },
  { key: "autoStartWork", name: "auto-start focus", type: "bool" },
  { key: "alarmSound", name: "alarm sound", type: "bool" },
  { key: "alarmStyle", name: "alarm style", type: "alarm" },
  { key: "alarmVolume", name: "alarm volume", unit: "%", min: 10, max: 100, step: 10, scale: 100 },
  { key: "tickSound", name: "tick sound", type: "bool" },
  { key: "desktopNotifications", name: "notifications", type: "bool" },
  { key: "hideFocusTimer", name: "hide focus timer", type: "bool" },
  { key: "alwaysOnTop", name: "always on top", type: "bool" },
];

// ─── Emojis ──────────────────────────────────────────────────────────────────

const EMOJIS = {
  avocado:     "🥑",
  tomato:      "🍅",
  blueberry:   "🫐",
  grape:       "🍇",
  strawberry:  "🍓",
  peach:       "🍑",
  cherry:      "🍒",
  lemon:       "🍋",
  watermelon:  "🍉",
  mango:       "🥭",
  ladybug:     "🐞",
  cat:         "🐱",
  heart:       "🩷",
  caterpillar: "🐛",
};

const EMOJI_NAMES = Object.keys(EMOJIS);

// ─── Alarm Sounds ───────────────────────────────────────────────────────────

const ALARM_NAMES = ["chime", "bell", "pulse", "digital", "gong", "bird", "lofi", "softbit", "drift"];

// ─── Sound Engine ───────────────────────────────────────────────────────────

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  _ctx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.ctx;
  }

  // Helper: create an oscillator note
  _note(ctx, t, freq, type, vol, attack, decay, duration) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  }

  playAlarm(volume = 0.7, style = "chime") {
    const method = this["_alarm_" + style];
    if (method) method.call(this, volume);
    else this._alarm_chime(volume);
  }

  // Ascending three-tone chime (the original)
  _alarm_chime(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      this._note(ctx, t + i * 0.22, freq, "sine", vol * 0.35, 0.04, 0.8, 0.9);
    });
  }

  // Single resonant bell strike
  _alarm_bell(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    // Fundamental + harmonic for bell timbre
    [440, 880, 1320].forEach((freq, i) => {
      const v = vol * (i === 0 ? 0.35 : i === 1 ? 0.15 : 0.08);
      this._note(ctx, t, freq, "sine", v, 0.01, 1.5, 2.0);
    });
  }

  // Soft pulsing tones
  _alarm_pulse(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      this._note(ctx, t + i * 0.4, 440, "sine", vol * 0.25, 0.05, 0.2, 0.3);
    }
  }

  // Retro digital beep pattern
  _alarm_digital(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      this._note(ctx, t + i * 0.15, 1200, "square", vol * 0.1, 0.005, 0.06, 0.08);
    }
    // Second group after pause
    for (let i = 0; i < 4; i++) {
      this._note(ctx, t + 0.8 + i * 0.15, 1200, "square", vol * 0.1, 0.005, 0.06, 0.08);
    }
  }

  // Deep resonant gong
  _alarm_gong(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    [110, 220, 330, 55].forEach((freq, i) => {
      const v = vol * (i === 0 ? 0.3 : i === 3 ? 0.2 : 0.1);
      this._note(ctx, t, freq, "sine", v, 0.02, 2.5, 3.0);
    });
  }

  // Chirpy ascending bird call
  _alarm_bird(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    const freqs = [1047, 1175, 1319, 1568, 2093];
    freqs.forEach((freq, i) => {
      this._note(ctx, t + i * 0.12, freq, "sine", vol * 0.2, 0.01, 0.08, 0.1);
    });
    // Repeat after a short pause
    freqs.forEach((freq, i) => {
      this._note(ctx, t + 0.9 + i * 0.12, freq, "sine", vol * 0.18, 0.01, 0.08, 0.1);
    });
  }

  // Warm lo-fi chord stabs with gentle layering
  _alarm_lofi(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    const chordA = [261.63, 329.63, 392.0];
    const chordB = [246.94, 311.13, 369.99];
    chordA.forEach((freq) => {
      this._note(ctx, t, freq, "triangle", vol * 0.1, 0.05, 0.8, 1.0);
      this._note(ctx, t + 0.03, freq * 0.997, "sine", vol * 0.05, 0.05, 0.95, 1.1);
    });
    chordB.forEach((freq) => {
      this._note(ctx, t + 0.55, freq, "triangle", vol * 0.08, 0.05, 0.65, 0.85);
    });
  }

  // Soft 8-bit style melody with rounded transients
  _alarm_softbit(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    const seq = [523.25, 659.25, 783.99, 659.25, 523.25];
    seq.forEach((freq, i) => {
      const at = t + i * 0.16;
      this._note(ctx, at, freq, "triangle", vol * 0.11, 0.01, 0.12, 0.16);
      this._note(ctx, at, freq, "square", vol * 0.04, 0.004, 0.08, 0.11);
    });
  }

  // Slow tape-like drifting tones
  _alarm_drift(vol) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    const seq = [392.0, 440.0, 493.88, 523.25, 493.88, 440.0];
    seq.forEach((freq, i) => {
      const at = t + i * 0.18;
      this._note(ctx, at, freq, "sine", vol * 0.12, 0.02, 0.18, 0.24);
      this._note(ctx, at + 0.02, freq * 0.5, "triangle", vol * 0.06, 0.03, 0.22, 0.28);
    });
  }

  playTick(volume = 0.08) {
    const ctx = this._ctx();
    const t = ctx.currentTime;
    this._note(ctx, t, 600, "sine", volume, 0.002, 0.03, 0.04);
  }
}

// ─── App ────────────────────────────────────────────────────────────────────

class PomodoroApp {
  constructor() {
    // DOM
    this.output = document.getElementById("output");
    this.inputLine = document.getElementById("input-line");
    this.inputPrompt = document.getElementById("input-prompt");
    this.textInput = document.getElementById("text-input");

    // State
    this.screen = SCREEN.MAIN_MENU;
    this.cursor = 0;
    this.prevScreen = null;

    // Data (will be loaded from file)
    this.settings = {};
    this.tasks = [];
    this.stats = {};
    this.availableFonts = [];

    // Timer
    this.timer = {
      mode: "work", // "work" | "shortBreak" | "longBreak"
      totalSeconds: 0,
      remaining: 0,
      endTime: null, // wall-clock ms when timer should hit 0
      isRunning: false,
      isPaused: false,
      sessionsCompleted: 0,
      intervalId: null,
      workDuration: 25,
      breakDuration: 5,
      reps: 4,
    };

    // Sound
    this.sound = new SoundEngine();

    // Active task index
    this.activeTaskIndex = -1;

    // Input callback
    this._inputCallback = null;

    // Confirm state for clearing stats
    this._confirmingClear = false;
    this._confirmingEndPomodoro = false;
  }

  // ─── Init ───────────────────────────────────────────────────────────

  // ─── Theme ──────────────────────────────────────────────────────────

  applyTheme(name) {
    const theme = THEMES[name] || THEMES.violet;
    const root = document.documentElement;
    for (const [prop, val] of Object.entries(theme)) {
      root.style.setProperty(prop, val);
    }
  }

  applyBgArt(name) {
    const el = document.getElementById("bg-art");
    if (!el) return;
    const art = BG_ART[name] || "";
    el.textContent = art;
  }

  applyBgArtBrightness(percent) {
    const root = document.documentElement;
    const value = Number.isFinite(Number(percent)) ? Number(percent) : 25;
    const clamped = Math.min(100, Math.max(0, value));
    root.style.setProperty("--bg-art-opacity", String(clamped / 100));
  }

  fontLabel(filename) {
    if (!filename) return "Miracode";
    return filename.replace(/\.[^/.]+$/, "");
  }

  _fontList() {
    return this.availableFonts.length > 0 ? this.availableFonts : [DEFAULT_UI_FONT_FILE];
  }

  _resolveDefaultUIFont() {
    const fonts = this._fontList();
    if (fonts.includes(DEFAULT_UI_FONT_FILE)) {
      return DEFAULT_UI_FONT_FILE;
    }
    return fonts[0] || DEFAULT_UI_FONT_FILE;
  }

  _clampUIFontSize(size) {
    const parsed = Number(size);
    if (!Number.isFinite(parsed)) {
      return DEFAULT_UI_FONT_SIZE;
    }
    return Math.min(MAX_UI_FONT_SIZE, Math.max(MIN_UI_FONT_SIZE, Math.round(parsed)));
  }

  registerFontFace(filename) {
    const selectedFile = filename || this._resolveDefaultUIFont();
    const lowerName = selectedFile.toLowerCase();
    const format = lowerName.endsWith(".otf") ? "opentype" : "truetype";
    const safeFile = encodeURIComponent(selectedFile);
    const fontUrl = "../fonts/" + safeFile;
    let styleEl = document.getElementById("dynamic-font-face");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "dynamic-font-face";
      document.head.appendChild(styleEl);
    }

    styleEl.textContent =
      '@font-face{font-family:"' +
      UI_FONT_FAMILY +
      '";src:url("' +
      fontUrl +
      '") format("' +
      format +
      '");font-weight:normal;font-style:normal;}';
  }

  applyUIFont(filename) {
    const root = document.documentElement;
    const selected = filename || this._resolveDefaultUIFont();
    try {
      this.registerFontFace(selected);
      root.style.setProperty("--ui-font-family", '"' + UI_FONT_FAMILY + '"');
    } catch {
      root.style.setProperty("--ui-font-family", '"Miracode"');
    }
  }

  applyUIFontSize(sizePx) {
    const root = document.documentElement;
    const clamped = this._clampUIFontSize(sizePx);
    root.style.setProperty("--ui-font-size", clamped + "px");
  }

  _cycleFont(delta) {
    const fonts = this._fontList();
    const current = this.settings.uiFont || this._resolveDefaultUIFont();
    const idx = fonts.indexOf(current);
    const safeIdx = idx >= 0 ? idx : 0;
    this.settings.uiFont = fonts[(safeIdx + delta + fonts.length) % fonts.length];
    this.applyUIFont(this.settings.uiFont);
  }

  _normalizeAlarmStyle(style) {
    return ALARM_NAMES.includes(style) ? style : "chime";
  }

  _cycleAlarmStyle(delta = 1) {
    const current = this._normalizeAlarmStyle(this.settings.alarmStyle);
    const idx = ALARM_NAMES.indexOf(current);
    this.settings.alarmStyle = ALARM_NAMES[(idx + delta + ALARM_NAMES.length) % ALARM_NAMES.length];
    this.sound.playAlarm(this.settings.alarmVolume, this.settings.alarmStyle);
  }

  // ─── Init ───────────────────────────────────────────────────────────

  async init() {
    // Load persisted data
    const data = await window.api.loadData();
    this.settings = data.settings;
    this.tasks = data.tasks || [];
    this.stats = data.stats;

    try {
      const fonts = await window.api.listFonts();
      this.availableFonts = Array.isArray(fonts) ? fonts : [];
    } catch {
      this.availableFonts = [];
    }
    let shouldSaveSettings = false;
    if (!this._fontList().includes(this.settings.uiFont)) {
      this.settings.uiFont = this._resolveDefaultUIFont();
      shouldSaveSettings = true;
    }
    const clampedFontSize = this._clampUIFontSize(this.settings.uiFontSize);
    if (this.settings.uiFontSize !== clampedFontSize) {
      this.settings.uiFontSize = clampedFontSize;
      shouldSaveSettings = true;
    }
    const normalizedAlarmStyle = this._normalizeAlarmStyle(this.settings.alarmStyle);
    if (this.settings.alarmStyle !== normalizedAlarmStyle) {
      this.settings.alarmStyle = normalizedAlarmStyle;
      shouldSaveSettings = true;
    }
    if (shouldSaveSettings) {
      await this._saveSettings();
    }

    // Apply saved appearance settings
    this.applyTheme(this.settings.theme || "violet");
    this.applyBgArt(this.settings.bgArt || "none");
    this.applyBgArtBrightness(this.settings.bgArtBrightness ?? 25);
    this.applyUIFont(this.settings.uiFont || this._resolveDefaultUIFont());
    this.applyUIFontSize(this.settings.uiFontSize);

    // Listen for tray actions
    window.api.onTrayAction((action) => {
      if (action === "toggle") this.toggleTimer();
      else if (action === "skip") this.skipSession();
      else if (action === "reset") this.resetTimer();
      else if (action === "end") this._enterEndPomodoroConfirm();
    });

    // Listen for init data (on window re-show)
    window.api.onInitData(async (data) => {
      this.settings = data.settings;
      this.tasks = data.tasks || [];
      this.stats = data.stats;
      try {
        const fonts = await window.api.listFonts();
        this.availableFonts = Array.isArray(fonts) ? fonts : [];
      } catch {
        this.availableFonts = [];
      }
      let shouldSaveSettings = false;
      if (!this._fontList().includes(this.settings.uiFont)) {
        this.settings.uiFont = this._resolveDefaultUIFont();
        shouldSaveSettings = true;
      }
      const clampedFontSize = this._clampUIFontSize(this.settings.uiFontSize);
      if (this.settings.uiFontSize !== clampedFontSize) {
        this.settings.uiFontSize = clampedFontSize;
        shouldSaveSettings = true;
      }
      const normalizedAlarmStyle = this._normalizeAlarmStyle(this.settings.alarmStyle);
      if (this.settings.alarmStyle !== normalizedAlarmStyle) {
        this.settings.alarmStyle = normalizedAlarmStyle;
        shouldSaveSettings = true;
      }
      if (shouldSaveSettings) {
        await this._saveSettings();
      }
      this.applyTheme(this.settings.theme || "violet");
      this.applyBgArt(this.settings.bgArt || "none");
      this.applyBgArtBrightness(this.settings.bgArtBrightness ?? 25);
      this.applyUIFont(this.settings.uiFont || this._resolveDefaultUIFont());
      this.applyUIFontSize(this.settings.uiFontSize);
      this.render();
    });

    // Keyboard
    document.addEventListener("keydown", (e) => this.handleKey(e));

    // Text input handling
    this.textInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const val = this.textInput.value.trim();
        const cb = this._inputCallback;
        this.hideInput();
        if (cb) cb(val);
      } else if (e.key === "Escape") {
        e.preventDefault();
        const cb = this._inputCallback;
        this.hideInput();
        if (cb) cb(null);
      }
      e.stopPropagation();
    });

    // First render
    this.render();
  }

  // ─── Navigation ─────────────────────────────────────────────────────

  go(screen, resetCursor = true) {
    this.prevScreen = this.screen;
    this.screen = screen;
    if (resetCursor) this.cursor = 0;
    this._confirmingClear = false;
    this._confirmingEndPomodoro = false;
    this.render();
  }

  back() {
    if (this.timer.isRunning || this.timer.isPaused) {
      this.go(SCREEN.TIMER);
    } else {
      this.go(SCREEN.MAIN_MENU);
    }
  }

  _hasActiveTimer() {
    return this.timer.totalSeconds > 0 && this.timer.remaining > 0;
  }

  _isBreakMode() {
    return this.timer.mode === "shortBreak" || this.timer.mode === "longBreak";
  }

  _canSkipBreak() {
    return this._hasActiveTimer() && this._isBreakMode();
  }

  shouldMaskFocusTimer() {
    return Boolean(this.settings.hideFocusTimer) && this.timer.mode === "work" && this.timer.isRunning;
  }

  shouldHideFocusProgressBar() {
    return Boolean(this.settings.hideFocusTimer) && this.timer.mode === "work";
  }

  focusInProgressText() {
    return "focus session in progress.";
  }

  timerStatusText({ includePausedSuffix = false } = {}) {
    if (this.shouldMaskFocusTimer()) {
      return this.focusInProgressText();
    }

    const mode = this.timer.mode === "work" ? "focus" : "break";
    const time = this._fmt(this.timer.remaining);
    const paused = includePausedSuffix && this.timer.isPaused ? " (paused)" : "";
    return mode + " " + time + paused;
  }

  _enterEndPomodoroConfirm() {
    if (!this._hasActiveTimer()) return;
    if (this.screen !== SCREEN.TIMER) {
      this.go(SCREEN.TIMER);
    }
    this._confirmingEndPomodoro = true;
    this.render();
  }

  _cancelEndPomodoroConfirm() {
    if (!this._confirmingEndPomodoro) return;
    this._confirmingEndPomodoro = false;
    this.render();
  }

  _confirmEndPomodoro() {
    this._confirmingEndPomodoro = false;
    this.clearTimer();
    this.go(SCREEN.MAIN_MENU);
  }

  _skipBreakToFocus() {
    if (!this._canSkipBreak()) return;
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this.timer.isRunning = false;
    this.timer.isPaused = false;
    this.timer.endTime = null;
    this.timer.mode = "work";
    this.timer.totalSeconds = this.timer.workDuration * 60;
    this.timer.remaining = this.timer.workDuration * 60;
    this._resumeTimer();
    this.go(SCREEN.TIMER);
  }

  _skipActiveBreakToFocusMenu() {
    if (!this._canSkipBreak()) return;
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this.timer.isRunning = false;
    this.timer.isPaused = false;
    this.timer.endTime = null;
    this.timer.mode = "work";
    this.timer.totalSeconds = this.timer.workDuration * 60;
    this.timer.remaining = this.timer.workDuration * 60;
    this._updateTray();
    this.go(SCREEN.SESSION_DONE);
  }

  // ─── Rendering Helpers ──────────────────────────────────────────────

  clear() {
    this.output.innerHTML = "";
  }

  /**
   * Write a line to the terminal.
   * Parts can be strings or [text, colorClass] tuples.
   * Options: { cls: extra CSS class }
   */
  w(...parts) {
    const div = document.createElement("div");
    div.className = "line";

    // Check if last arg is an options object
    let opts = {};
    if (
      parts.length > 0 &&
      typeof parts[parts.length - 1] === "object" &&
      !Array.isArray(parts[parts.length - 1])
    ) {
      opts = parts.pop();
    }

    if (opts.cls) div.classList.add(opts.cls);

    if (parts.length === 0) {
      div.innerHTML = " ";
    } else {
      for (const part of parts) {
        if (typeof part === "string") {
          div.appendChild(document.createTextNode(part));
        } else if (Array.isArray(part)) {
          const [text, color] = part;
          const span = document.createElement("span");
          span.className = color || "";
          span.textContent = text;
          div.appendChild(span);
        }
      }
    }

    this.output.appendChild(div);
    return div;
  }

  // Shorthand: blank line
  blank() {
    this.w();
  }

  // Write timer display (large)
  wTimer(text, color = "text") {
    const div = document.createElement("div");
    div.className = "line-timer";
    const span = document.createElement("span");
    span.className = color;
    span.textContent = text;
    div.appendChild(span);
    this.output.appendChild(div);
  }

  // Menu item with > cursor
  menuItem(label, isSelected, color = null) {
    if (isSelected) {
      this.w(["❯ ", "pink"], [label, "pink"]);
    } else {
      this.w("  " + label);
    }
  }

  // Progress bar
  progressBar(percent, width = 36) {
    const filled = Math.round(width * percent);
    const empty = width - filled;
    this.w(
      ["  " + "█".repeat(filled), "purple"],
      ["░".repeat(empty), "dim"]
    );
  }

  // Separator
  sep(width = 42) {
    this.w(["  " + "─".repeat(width), "dim"]);
  }

  // Footer help text
  help(text) {
    this.blank();
    this.w(["  " + text, "dim"]);
  }

  // ─── Show/Hide Input ────────────────────────────────────────────────

  showInput(prompt, callback) {
    this._inputCallback = callback;
    this.inputPrompt.textContent = prompt + " ";
    this.textInput.value = "";
    this.inputLine.classList.add("visible");
    // Small delay to avoid the keypress that triggered this from entering the input
    setTimeout(() => this.textInput.focus(), 50);
  }

  hideInput() {
    this.inputLine.classList.remove("visible");
    this.textInput.blur();
    this._inputCallback = null;
  }

  // ─── Main Render ────────────────────────────────────────────────────

  render() {
    this.clear();

    switch (this.screen) {
      case SCREEN.MAIN_MENU:
        this.renderMainMenu();
        break;
      case SCREEN.SPLIT_SELECT:
        this.renderSplitSelect();
        break;
      case SCREEN.TIMER:
        this.renderTimer();
        break;
      case SCREEN.SESSION_DONE:
        this.renderSessionDone();
        break;
      case SCREEN.TASKS:
        this.renderTasks();
        break;
      case SCREEN.STATS:
        this.renderStats();
        break;
      case SCREEN.SETTINGS:
        this.renderSettings();
        break;
      case SCREEN.HELP:
        this.renderHelp();
        break;
    }

    // Scroll to top (unless on timer)
    if (this.screen !== SCREEN.TIMER) {
      this.output.scrollTop = 0;
    }
  }

  // ─── Screen: Main Menu ──────────────────────────────────────────────

  renderMainMenu() {
    // When timer is active, replace "start" with live status
    let startLabel = "start";
    if (this.timer.isRunning || this.timer.isPaused) {
      startLabel = this.timerStatusText({ includePausedSuffix: true });
    }

    const items = [startLabel, "tasks", "stats", "settings", "help", "quit"];

    this.blank();
    this.w(["  pomodoro.", "purple"]);
    this.blank();

    items.forEach((item, i) => {
      this.menuItem(item, i === this.cursor);
    });

    this.help("[↑↓] navigate  [enter] select  [?] help");
  }

  // ─── Screen: Split Select ───────────────────────────────────────────

  renderSplitSelect() {
    const items = [
      ...PRESETS.map((p) => p.label),
      "custom...",
      "back",
    ];

    this.blank();
    this.w(["  choose a pomodoro split.", "purple"]);
    this.blank();

    items.forEach((item, i) => {
      this.menuItem(item, i === this.cursor);
    });

    this.help("[↑↓] navigate  [enter] select");
  }

  // ─── Screen: Timer ──────────────────────────────────────────────────

  renderTimer() {
    const mode = this.timer.mode;
    const label =
      mode === "work"
        ? "focus"
        : mode === "shortBreak"
        ? "short break"
        : "long break";
    const color = mode === "work" ? "purple" : "green";

    this.blank();

    // Header: mode + session count
    const sessionInfo =
      mode === "work"
        ? "  session " +
          (this.timer.sessionsCompleted + 1) +
          "/" +
          this.timer.reps
        : "";
    this.w(["  " + label, color], [sessionInfo, "dim"]);

    if (this.timer.isPaused) {
      this.w(["  paused", "yellow"]);
    }

    this.blank();

    // Big timer display
    if (this.shouldMaskFocusTimer()) {
      this.w("  " + this.focusInProgressText());
    } else {
      this.wTimer("  " + this._fmt(this.timer.remaining), color);
    }

    this.blank();

    // Progress bar
    if (!this.shouldHideFocusProgressBar()) {
      const elapsed = this.timer.totalSeconds - this.timer.remaining;
      const percent = this.timer.totalSeconds > 0 ? elapsed / this.timer.totalSeconds : 0;
      this.progressBar(percent);
    }

    // Active task
    if (this.activeTaskIndex >= 0 && this.tasks[this.activeTaskIndex]) {
      const task = this.tasks[this.activeTaskIndex];
      const pomDone = task.pomodorosCompleted || 0;
      const pomEst = task.estimate || 1;
      this.blank();
      this.w(
        ["  ▸ ", "dim"],
        [task.name, "text"],
        [" " + pomDone + "/" + pomEst + " " + this._emoji(), "dim"]
      );
    }

    // Session dots
    this.blank();
    let dots = "  ";
    for (let i = 0; i < this.timer.reps; i++) {
      dots += i < this.timer.sessionsCompleted ? "● " : "○ ";
    }
    this.w([dots, "purple"]);

    // Controls
    if (this._confirmingEndPomodoro) {
      this.blank();
      this.w(["  end pomodoro? are you sure?", "red"]);
      this.help("[y] yes, end pomodoro  [n] cancel");
      return;
    }

    const startPauseAction = this.timer.isRunning
      ? "[space] pause"
      : this.timer.isPaused
      ? "[space] resume"
      : "[space] start";
    const skipBreakAction = this._canSkipBreak() ? "  [s] skip break" : "";
    this.help(
      startPauseAction +
        skipBreakAction +
        "  [r] reset  [x] end pomodoro  [q] menu"
    );
  }

  // ─── Screen: Session Done ───────────────────────────────────────────

  renderSessionDone() {
    // After _completeSession, mode has ALREADY been switched to the NEXT session type.
    // So if mode is now "work", that means a break just ended.
    // If mode is now "shortBreak"/"longBreak", that means work just ended.
    const nextIsWork = this.timer.mode === "work";
    const items = nextIsWork
      ? ["start focus"]
      : ["start break", "skip break"];

    this.blank();
    if (nextIsWork) {
      this.w(["  break over!", "cyan"]);
      this.blank();
      this.w("  ready to focus again?");
    } else {
      this.w(["  session complete!", "green"]);
      this.blank();
      this.w("  nice work. time for a break.");
    }

    this.blank();
    items.forEach((item, i) => {
      this.menuItem(item, i === this.cursor);
    });

    this.help(nextIsWork ? "[enter] select" : "[↑↓] navigate  [enter] select");
  }

  // ─── Screen: Tasks ──────────────────────────────────────────────────

  renderTasks() {
    this.blank();
    this.w(
      ["  tasks.", "purple"],
      ["  " + this.tasks.length + " items", "dim"]
    );
    this.blank();

    if (this.tasks.length === 0) {
      this.w(["  no tasks yet. press ", "dim"], ["a", "pink"], [" to add one.", "dim"]);
    } else {
      this.tasks.forEach((task, i) => {
        const isSelected = i === this.cursor;
        const isActive = i === this.activeTaskIndex;
        const check = task.done ? "✓" : "○";
        const checkColor = task.done ? "green" : "dim";

        const pomDone = task.pomodorosCompleted || 0;
        const pomEst = task.estimate || 1;
        const pomStr = " " + pomDone + "/" + pomEst + " " + this._emoji();

        if (isSelected) {
          this.w(
            ["❯ ", "pink"],
            [check + " ", checkColor],
            [task.name, task.done ? "dim" : "pink"],
            [pomStr, "dim"]
          );
        } else {
          this.w(
            ["  ", ""],
            [check + " ", checkColor],
            [task.name, task.done ? "dim" : "text"],
            [pomStr, "dim"]
          );
        }

        if (isActive && !task.done) {
          // Show active indicator on next line
          this.w(["    ▸ active", "yellow"]);
        }
      });
    }

    // Status bar if timer is running
    if (this.timer.isRunning || this.timer.isPaused) {
      this.blank();
      this.sep();
      this.w(
        ["  " + this.timerStatusText(), "purple"],
        ["  [t] timer", "dim"]
      );
    }

    this.help("[enter] set active  [x] toggle done  [a] add  [d] delete  [q] back");
  }

  // ─── Screen: Stats ─────────────────────────────────────────────────

  renderStats() {
    const today = this._todayKey();
    const todayData = this.stats.daily?.[today] || { sessions: 0, minutes: 0 };
    const goal = this.settings.dailyGoal;

    this.blank();
    this.w(["  stats.", "purple"]);
    this.blank();

    // Today
    this.w(
      ["  today         ", "dim"],
      [String(todayData.sessions), "text"],
      [" sessions   ", "dim"],
      [String(todayData.minutes), "text"],
      [" min focused", "dim"]
    );

    // All time
    const totalHrs = Math.floor(this.stats.totalMinutesFocused / 60);
    this.w(
      ["  all time      ", "dim"],
      [String(this.stats.totalCompleted), "text"],
      [" sessions   ", "dim"],
      [totalHrs, "text"],
      [" hrs focused", "dim"]
    );

    // Daily goal
    this.blank();
    const goalPct = Math.min(todayData.sessions / goal, 1);
    const goalFilled = Math.round(20 * goalPct);
    const goalEmpty = 20 - goalFilled;
    this.w(
      ["  daily goal  ", "dim"],
      [String(todayData.sessions) + "/" + goal + " " + this._emoji() + "  ", "text"],
      ["█".repeat(goalFilled), "green"],
      ["░".repeat(goalEmpty), "dim"]
    );

    // Streak
    if (this.stats.streakDays > 0) {
      this.w(
        ["  streak        ", "dim"],
        [String(this.stats.streakDays), "orange"],
        [" day" + (this.stats.streakDays > 1 ? "s" : ""), "dim"]
      );
    }

    // Weekly chart
    this.blank();
    this.w(["  this week", "purple"]);
    this.blank();

    const weekData = this._getWeekData();
    const maxSessions = Math.max(...weekData.map((d) => d.sessions), 1);
    const barWidth = 20;
    const dayNames = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    weekData.forEach((d, i) => {
      const filled = Math.round(barWidth * (d.sessions / maxSessions));
      const empty = barWidth - filled;
      const countStr = d.sessions > 0 ? " " + d.sessions : "";
      const isToday = i === this._dayOfWeekMon();

      this.w(
        ["  " + dayNames[i] + "  ", isToday ? "pink" : "dim"],
        [filled > 0 ? "█".repeat(filled) : "", "purple"],
        ["░".repeat(empty), "dim"],
        [countStr, "text"]
      );
    });

    // Status bar if timer is running
    if (this.timer.isRunning || this.timer.isPaused) {
      this.blank();
      this.sep();
      this.w(
        ["  " + this.timerStatusText(), "purple"],
        ["  [t] timer", "dim"]
      );
    }

    if (this._confirmingClear) {
      this.blank();
      this.w(["  are you sure? this cannot be undone.", "red"]);
      this.help("[y] yes, clear  [n] cancel");
    } else {
      this.help("[c] clear stats  [q] back");
    }
  }

  // ─── Screen: Settings ───────────────────────────────────────────────

  renderSettings() {
    this.blank();
    this.w(["  settings.", "purple"]);
    this.blank();

    SETTING_DEFS.forEach((def, i) => {
      const isSelected = i === this.cursor;
      const val = this.settings[def.key];
      let displayVal;

      if (def.type === "theme") {
        displayVal = "◂ " + (val || "violet") + " ▸";
      } else if (def.type === "font") {
        displayVal = "◂ " + this.fontLabel(val || this._resolveDefaultUIFont()) + " ▸";
      } else if (def.type === "bgArt") {
        displayVal = "◂ " + (val || "none") + " ▸";
      } else if (def.type === "food") {
        const name_ = val || "avocado";
        displayVal = "◂ " + EMOJIS[name_] + " " + name_ + " ▸";
      } else if (def.type === "alarm") {
        displayVal = "◂ " + this._normalizeAlarmStyle(val) + " ▸";
      } else if (def.type === "bool") {
        displayVal = val ? "on" : "off";
      } else if (def.scale) {
        displayVal = Math.round(val * def.scale) + def.unit;
      } else if (def.dynamic_unit) {
        displayVal = val + " " + this._emoji();
      } else {
        displayVal = val + " " + def.unit;
      }

      // Pad name and value for alignment
      const name = def.name.padEnd(24);
      const valStr = displayVal;

      if (isSelected) {
        this.w(
          ["❯ ", "pink"],
          [name, "pink"],
          [valStr, "text"]
        );
      } else {
        this.w(
          ["  ", ""],
          [name, "dim"],
          [valStr, "text"]
        );
      }
    });

    // Status bar if timer is running
    if (this.timer.isRunning || this.timer.isPaused) {
      this.blank();
      this.sep();
      this.w(
        ["  " + this.timerStatusText(), "purple"],
        ["  [t] timer", "dim"]
      );
    }

    this.help("[←→] adjust  [q] back");
  }

  // ─── Screen: Help ──────────────────────────────────────────────────

  renderHelp() {
    this.blank();
    this.w(["  help.", "purple"]);
    this.blank();

    // ── Global
    this.w(["  global", "pink"]);
    this.sep();
    this.w(["  ?             ", "text"], ["open this help screen", "dim"]);
    this.w(["  t             ", "text"], ["jump to timer (when running)", "dim"]);
    this.w(["  q / esc       ", "text"], ["go back / quit", "dim"]);
    this.w(["  ↑ / k         ", "text"], ["move cursor up", "dim"]);
    this.w(["  ↓ / j         ", "text"], ["move cursor down", "dim"]);
    this.w(["  enter         ", "text"], ["select / confirm", "dim"]);
    this.blank();

    // ── Timer
    this.w(["  timer", "pink"]);
    this.sep();
    this.w(["  space         ", "text"], ["start / pause / resume", "dim"]);
    this.w(["  s             ", "text"], ["skip break to focus prompt", "dim"]);
    this.w(["  r             ", "text"], ["reset session to full duration", "dim"]);
    this.w(["  x             ", "text"], ["end pomodoro (confirm y/n)", "dim"]);
    this.w(["  q             ", "text"], ["back to main menu", "dim"]);
    this.blank();

    // ── Tasks
    this.w(["  tasks", "pink"]);
    this.sep();
    this.w(["  enter         ", "text"], ["set / unset active task", "dim"]);
    this.w(["  x             ", "text"], ["toggle task done", "dim"]);
    this.w(["  a             ", "text"], ["add new task", "dim"]);
    this.w(["  d             ", "text"], ["delete task", "dim"]);
    this.blank();

    // ── Stats
    this.w(["  stats", "pink"]);
    this.sep();
    this.w(["  c             ", "text"], ["clear all stats", "dim"]);
    this.blank();

    // ── Settings
    this.w(["  settings", "pink"]);
    this.sep();
    this.w(["  ← / h         ", "text"], ["decrease / previous", "dim"]);
    this.w(["  → / l         ", "text"], ["increase / next", "dim"]);
    this.w(["  enter         ", "text"], ["toggle / cycle", "dim"]);
    this.blank();

    // ── Split Select
    this.w(["  split select", "pink"]);
    this.sep();
    this.w(["  enter         ", "text"], ["pick preset or custom split", "dim"]);
    this.w(["  custom format ", "text"], ["work/break/reps  (e.g. 30/10/6)", "dim"]);
    this.blank();

    // ── System
    this.w(["  system", "pink"]);
    this.sep();
    this.w(["  ⌘ + shift + p ", "text"], ["global show/hide shortcut", "dim"]);

    this.help("[q] back");
  }

  // ─── Key Handling ───────────────────────────────────────────────────

  handleKey(e) {
    // Don't handle if input is focused
    if (document.activeElement === this.textInput) return;

    switch (this.screen) {
      case SCREEN.MAIN_MENU:
        this._handleMainMenuKey(e);
        break;
      case SCREEN.SPLIT_SELECT:
        this._handleSplitSelectKey(e);
        break;
      case SCREEN.TIMER:
        this._handleTimerKey(e);
        break;
      case SCREEN.SESSION_DONE:
        this._handleSessionDoneKey(e);
        break;
      case SCREEN.TASKS:
        this._handleTasksKey(e);
        break;
      case SCREEN.STATS:
        this._handleStatsKey(e);
        break;
      case SCREEN.SETTINGS:
        this._handleSettingsKey(e);
        break;
      case SCREEN.HELP:
        this._handleHelpKey(e);
        break;
    }
  }

  _nav(items, e) {
    if (e.key === "ArrowUp" || e.key === "k") {
      this.cursor = (this.cursor - 1 + items) % items;
      this.render();
      return true;
    }
    if (e.key === "ArrowDown" || e.key === "j") {
      this.cursor = (this.cursor + 1) % items;
      this.render();
      return true;
    }
    return false;
  }

  _handleMainMenuKey(e) {
    const items = ["start", "tasks", "stats", "settings", "help", "quit"];
    if (this._nav(items.length, e)) return;

    if (e.key === "Enter") {
      switch (items[this.cursor]) {
        case "start":
          // If timer already active, go to timer screen
          if (this.timer.isRunning || this.timer.isPaused) {
            this.go(SCREEN.TIMER);
          } else {
            this.go(SCREEN.SPLIT_SELECT);
          }
          break;
        case "tasks":
          this.cursor = Math.min(this.cursor, Math.max(this.tasks.length - 1, 0));
          this.go(SCREEN.TASKS);
          break;
        case "stats":
          this.go(SCREEN.STATS);
          break;
        case "settings":
          this.go(SCREEN.SETTINGS);
          break;
        case "help":
          this.go(SCREEN.HELP);
          break;
        case "quit":
          window.api.close();
          break;
      }
    }

    // Quick key: ? opens help
    if (e.key === "?") {
      this.go(SCREEN.HELP);
    }

    // Quick key: t goes to timer if running
    if ((e.key === "t" || e.key === "T") && (this.timer.isRunning || this.timer.isPaused)) {
      this.go(SCREEN.TIMER);
    }
  }

  _handleSplitSelectKey(e) {
    const count = PRESETS.length + 2; // presets + custom + back
    if (this._nav(count, e)) return;

    if (e.key === "Enter") {
      if (this.cursor < PRESETS.length) {
        // Preset selected
        const preset = PRESETS[this.cursor];
        this.startTimer(preset.work, preset.brk);
        this.go(SCREEN.TIMER);
      } else if (this.cursor === PRESETS.length) {
        // Custom
        this.render(); // Re-render to show input
        this.showInput("split (work/break/reps):", (val) => {
          if (val) {
            const parts = val.split("/").map(Number);
            if (parts.length >= 2 && parts[0] > 0 && parts[1] > 0) {
              const reps = parts[2] > 0 ? parts[2] : null;
              this.startTimer(parts[0], parts[1], reps);
              this.go(SCREEN.TIMER);
            } else {
              // Invalid, just re-render
              this.render();
            }
          } else {
            this.render();
          }
        });
      } else {
        // Back
        this.go(SCREEN.MAIN_MENU);
      }
    }

    if (e.key === "?") {
      this.go(SCREEN.HELP);
    } else if (e.key === "q" || e.key === "Escape") {
      this.go(SCREEN.MAIN_MENU);
    }
  }

  _handleTimerKey(e) {
    if (this._confirmingEndPomodoro) {
      if (e.key === "y" || e.key === "Y") {
        this._confirmEndPomodoro();
      } else if (e.key === "n" || e.key === "N" || e.key === "Escape") {
        this._cancelEndPomodoroConfirm();
      }
      return;
    }

    if (e.key === " ") {
      e.preventDefault();
      this.toggleTimer();
    } else if (e.key === "s" || e.key === "S") {
      this.skipSession();
    } else if (e.key === "r" || e.key === "R") {
      this.resetTimer();
    } else if (e.key === "x" || e.key === "X") {
      this._enterEndPomodoroConfirm();
    } else if (e.key === "q" || e.key === "Escape") {
      this.go(SCREEN.MAIN_MENU);
    }
  }

  _handleSessionDoneKey(e) {
    const nextIsWork = this.timer.mode === "work";
    const items = nextIsWork ? 1 : 2;
    if (items > 1 && this._nav(items, e)) return;

    if (e.key === "Enter") {
      if (this.cursor === 0) {
        // Start next session
        this._startNextSession();
        this.go(SCREEN.TIMER);
      } else if (!nextIsWork && this.cursor === 1) {
        this._skipBreakToFocus();
      }
    }

    if (e.key === "q" || e.key === "Escape") {
      this.clearTimer();
      this.go(SCREEN.MAIN_MENU);
    }
  }

  _handleTasksKey(e) {
    if (this.tasks.length > 0 && this._nav(this.tasks.length, e)) return;

    if (e.key === "Enter" && this.tasks.length > 0) {
      // Set as active task
      if (this.activeTaskIndex === this.cursor) {
        this.activeTaskIndex = -1;
      } else {
        this.activeTaskIndex = this.cursor;
      }
      this.render();
    } else if (e.key === "x" || e.key === "X") {
      if (this.tasks.length > 0) {
        this.tasks[this.cursor].done = !this.tasks[this.cursor].done;
        this._saveTasks();
        this.render();
      }
    } else if (e.key === "a" || e.key === "A") {
      this.showInput("new task:", (name) => {
        if (name) {
          this.showInput("pomodoros (1-20):", (est) => {
            const estimate = parseInt(est) || 1;
            this.tasks.push({
              name,
              estimate: Math.min(Math.max(estimate, 1), 20),
              pomodorosCompleted: 0,
              done: false,
              createdAt: Date.now(),
            });
            this._saveTasks();
            this.cursor = this.tasks.length - 1;
            this.render();
          });
        } else {
          this.render();
        }
      });
    } else if (e.key === "d" || e.key === "D") {
      if (this.tasks.length > 0) {
        if (this.activeTaskIndex === this.cursor) this.activeTaskIndex = -1;
        else if (this.activeTaskIndex > this.cursor) this.activeTaskIndex--;
        this.tasks.splice(this.cursor, 1);
        this.cursor = Math.min(this.cursor, Math.max(this.tasks.length - 1, 0));
        this._saveTasks();
        this.render();
      }
    } else if (e.key === "?") {
      this.go(SCREEN.HELP);
    } else if (e.key === "t" || e.key === "T") {
      if (this.timer.isRunning || this.timer.isPaused) {
        this.go(SCREEN.TIMER);
      }
    } else if (e.key === "q" || e.key === "Escape") {
      this.back();
    }
  }

  _handleStatsKey(e) {
    if (this._confirmingClear) {
      if (e.key === "y" || e.key === "Y") {
        this.stats = {
          daily: {},
          totalCompleted: 0,
          totalMinutesFocused: 0,
          streakDays: 0,
          lastActiveDate: null,
        };
        this._saveStats();
        this._confirmingClear = false;
        this.render();
      } else if (e.key === "n" || e.key === "N" || e.key === "Escape") {
        this._confirmingClear = false;
        this.render();
      }
      return;
    }

    if (e.key === "c" || e.key === "C") {
      this._confirmingClear = true;
      this.render();
    } else if (e.key === "?") {
      this.go(SCREEN.HELP);
    } else if (e.key === "t" || e.key === "T") {
      if (this.timer.isRunning || this.timer.isPaused) {
        this.go(SCREEN.TIMER);
      }
    } else if (e.key === "q" || e.key === "Escape") {
      this.back();
    }
  }

  _handleHelpKey(e) {
    if (e.key === "q" || e.key === "Escape") {
      this.back();
    }
  }

  _handleSettingsKey(e) {
    if (this._nav(SETTING_DEFS.length, e)) return;

    const def = SETTING_DEFS[this.cursor];

    if (e.key === "ArrowLeft" || e.key === "h") {
      if (def.type === "theme") {
        const idx = THEME_NAMES.indexOf(this.settings.theme || "violet");
        this.settings.theme = THEME_NAMES[(idx - 1 + THEME_NAMES.length) % THEME_NAMES.length];
        this.applyTheme(this.settings.theme);
      } else if (def.type === "font") {
        this._cycleFont(-1);
      } else if (def.type === "bgArt") {
        const idx = BG_ART_NAMES.indexOf(this.settings.bgArt || "none");
        this.settings.bgArt = BG_ART_NAMES[(idx - 1 + BG_ART_NAMES.length) % BG_ART_NAMES.length];
        this.applyBgArt(this.settings.bgArt);
      } else if (def.type === "food") {
        const idx = EMOJI_NAMES.indexOf(this.settings.foodEmoji || "avocado");
        this.settings.foodEmoji = EMOJI_NAMES[(idx - 1 + EMOJI_NAMES.length) % EMOJI_NAMES.length];
      } else if (def.type === "alarm") {
        this._cycleAlarmStyle(-1);
      } else if (def.type === "bool") {
        this.settings[def.key] = !this.settings[def.key];
        if (def.key === "hideFocusTimer") this._updateTray();
      } else {
        const step = def.step || 1;
        const scale = def.scale || 1;
        let val = def.scale ? Math.round(this.settings[def.key] * scale) : this.settings[def.key];
        val = Math.max(def.min, val - step);
        this.settings[def.key] = def.scale ? val / scale : val;
        if (def.key === "bgArtBrightness") {
          this.applyBgArtBrightness(this.settings.bgArtBrightness);
        } else if (def.key === "uiFontSize") {
          this.applyUIFontSize(this.settings.uiFontSize);
        }
      }
      this._saveSettings();
      this.render();
    } else if (e.key === "ArrowRight" || e.key === "l") {
      if (def.type === "theme") {
        const idx = THEME_NAMES.indexOf(this.settings.theme || "violet");
        this.settings.theme = THEME_NAMES[(idx + 1) % THEME_NAMES.length];
        this.applyTheme(this.settings.theme);
      } else if (def.type === "font") {
        this._cycleFont(1);
      } else if (def.type === "bgArt") {
        const idx = BG_ART_NAMES.indexOf(this.settings.bgArt || "none");
        this.settings.bgArt = BG_ART_NAMES[(idx + 1) % BG_ART_NAMES.length];
        this.applyBgArt(this.settings.bgArt);
      } else if (def.type === "food") {
        const idx = EMOJI_NAMES.indexOf(this.settings.foodEmoji || "avocado");
        this.settings.foodEmoji = EMOJI_NAMES[(idx + 1) % EMOJI_NAMES.length];
      } else if (def.type === "alarm") {
        this._cycleAlarmStyle(1);
      } else if (def.type === "bool") {
        this.settings[def.key] = !this.settings[def.key];
        if (def.key === "hideFocusTimer") this._updateTray();
      } else {
        const step = def.step || 1;
        const scale = def.scale || 1;
        let val = def.scale ? Math.round(this.settings[def.key] * scale) : this.settings[def.key];
        val = Math.min(def.max, val + step);
        this.settings[def.key] = def.scale ? val / scale : val;
        if (def.key === "bgArtBrightness") {
          this.applyBgArtBrightness(this.settings.bgArtBrightness);
        } else if (def.key === "uiFontSize") {
          this.applyUIFontSize(this.settings.uiFontSize);
        }
      }
      this._saveSettings();
      this.render();
    } else if (e.key === "Enter") {
      if (def.type === "theme") {
        const idx = THEME_NAMES.indexOf(this.settings.theme || "violet");
        this.settings.theme = THEME_NAMES[(idx + 1) % THEME_NAMES.length];
        this.applyTheme(this.settings.theme);
        this._saveSettings();
        this.render();
      } else if (def.type === "font") {
        this._cycleFont(1);
        this._saveSettings();
        this.render();
      } else if (def.type === "bgArt") {
        const idx = BG_ART_NAMES.indexOf(this.settings.bgArt || "none");
        this.settings.bgArt = BG_ART_NAMES[(idx + 1) % BG_ART_NAMES.length];
        this.applyBgArt(this.settings.bgArt);
        this._saveSettings();
        this.render();
      } else if (def.type === "food") {
        const idx = EMOJI_NAMES.indexOf(this.settings.foodEmoji || "avocado");
        this.settings.foodEmoji = EMOJI_NAMES[(idx + 1) % EMOJI_NAMES.length];
        this._saveSettings();
        this.render();
      } else if (def.type === "alarm") {
        this._cycleAlarmStyle(1);
        this._saveSettings();
        this.render();
      } else if (def.type === "bool") {
        this.settings[def.key] = !this.settings[def.key];
        if (def.key === "hideFocusTimer") this._updateTray();
        this._saveSettings();
        this.render();
      }
    } else if (e.key === "?") {
      this.go(SCREEN.HELP);
    } else if (e.key === "t" || e.key === "T") {
      if (this.timer.isRunning || this.timer.isPaused) {
        this.go(SCREEN.TIMER);
      }
    } else if (e.key === "q" || e.key === "Escape") {
      this.back();
    }
  }

  // ─── Timer Logic ────────────────────────────────────────────────────

  startTimer(workMin, breakMin, reps) {
    this.clearTimer();
    this.timer.workDuration = workMin;
    this.timer.breakDuration = breakMin;
    this.timer.reps = reps || this.settings.longBreakInterval;
    this.timer.mode = "work";
    this.timer.totalSeconds = workMin * 60;
    this.timer.remaining = workMin * 60;
    this.timer.sessionsCompleted = 0;
    this._resumeTimer();
  }

  toggleTimer() {
    if (this.timer.isRunning) {
      this._pauseTimer();
    } else if (this.timer.isPaused) {
      this._resumeTimer();
    } else if (this.timer.remaining > 0) {
      this._resumeTimer();
    }
    // If on a different screen, switch to timer
    if (this.screen !== SCREEN.TIMER && (this.timer.isRunning || this.timer.isPaused)) {
      this.go(SCREEN.TIMER);
    } else {
      this.render();
    }
  }

  _resumeTimer() {
    this.timer.isRunning = true;
    this.timer.isPaused = false;
    this.timer.endTime = Date.now() + this.timer.remaining * 1000;
    if (this.timer.intervalId) clearInterval(this.timer.intervalId);
    this.timer.intervalId = setInterval(() => this._tick(), 1000);
    this._updateTray();
  }

  _pauseTimer() {
    this.timer.isRunning = false;
    this.timer.isPaused = true;
    this.timer.endTime = null;
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this._updateTray();
    this.render();
  }

  // Reset current session back to full duration (paused, ready to start with space)
  resetTimer() {
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this.timer.isRunning = false;
    this.timer.isPaused = true;
    this.timer.endTime = null;
    if (this.timer.totalSeconds > 0) {
      this.timer.remaining = this.timer.totalSeconds;
    }
    this._updateTray();
    this.render();
  }

  clearTimer() {
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this.timer.isRunning = false;
    this.timer.isPaused = false;
    this.timer.remaining = 0;
    this.timer.totalSeconds = 0;
    this.timer.endTime = null;
    this.timer.mode = "work";
    this.timer.sessionsCompleted = 0;
    this._updateTray();
  }

  skipSession() {
    if (!this._canSkipBreak()) return;
    if (this.timer.isRunning || this.timer.isPaused) {
      this._skipActiveBreakToFocusMenu();
    } else {
      this._skipBreakToFocus();
    }
  }

  _tick() {
    if (this.timer.endTime) {
      this.timer.remaining = Math.max(0, Math.round((this.timer.endTime - Date.now()) / 1000));
    }

    if (this.timer.remaining > 0) {
      // Tick sound
      if (this.settings.tickSound && this.timer.mode === "work") {
        this.sound.playTick(this.settings.alarmVolume * 0.15);
      }

      // Update tray
      this._updateTray();

      // Re-render if on timer screen
      if (this.screen === SCREEN.TIMER) {
        this.render();
      }
    }

    if (this.timer.remaining <= 0) {
      this._completeSession();
    }
  }

  _completeSession() {
    // Stop the interval
    if (this.timer.intervalId) {
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;
    }
    this.timer.isRunning = false;
    this.timer.isPaused = false;

    const wasWork = this.timer.mode === "work";

    if (wasWork) {
      // Record completed work session
      this.timer.sessionsCompleted++;
      this._recordSession();

      // Update active task
      if (this.activeTaskIndex >= 0 && this.tasks[this.activeTaskIndex] && !this.tasks[this.activeTaskIndex].done) {
        const task = this.tasks[this.activeTaskIndex];
        task.pomodorosCompleted = Math.min((task.pomodorosCompleted || 0) + 1, task.estimate || 1);
        if (task.pomodorosCompleted >= (task.estimate || 1) && !task.done) {
          task.done = true;
          this.activeTaskIndex = -1;
          if (this.settings.desktopNotifications) {
            window.api.notify({
              title: "task complete!",
              body: '"' + task.name + '" is done — great work!',
            });
          }
        }
        this._saveTasks();
      }

      // Play alarm
      if (this.settings.alarmSound) {
        this.sound.playAlarm(this.settings.alarmVolume, this.settings.alarmStyle || "chime");
      }

      // Notification
      if (this.settings.desktopNotifications) {
        window.api.notify({
          title: "session complete!",
          body: "nice work. time for a break.",
        });
      }

      // Determine next mode
      if (this.timer.sessionsCompleted >= this.timer.reps) {
        this.timer.mode = "longBreak";
        this.timer.totalSeconds = this.settings.longBreakDuration * 60;
        this.timer.remaining = this.settings.longBreakDuration * 60;
        this.timer.sessionsCompleted = 0;
      } else {
        this.timer.mode = "shortBreak";
        this.timer.totalSeconds = this.timer.breakDuration * 60;
        this.timer.remaining = this.timer.breakDuration * 60;
      }

      // Auto-start break?
      if (this.settings.autoStartBreaks) {
        this._resumeTimer();
        this.go(SCREEN.TIMER);
        return;
      }
    } else {
      // Break completed
      if (this.settings.alarmSound) {
        this.sound.playAlarm(this.settings.alarmVolume, this.settings.alarmStyle || "chime");
      }

      if (this.settings.desktopNotifications) {
        window.api.notify({
          title: "break over!",
          body: "ready to focus again?",
        });
      }

      this.timer.mode = "work";
      this.timer.totalSeconds = this.timer.workDuration * 60;
      this.timer.remaining = this.timer.workDuration * 60;

      // Auto-start work?
      if (this.settings.autoStartWork) {
        this._resumeTimer();
        this.go(SCREEN.TIMER);
        return;
      }
    }

    this._updateTray();
    this.cursor = 0;
    this.go(SCREEN.SESSION_DONE);
  }

  _startNextSession() {
    this._resumeTimer();
  }

  // ─── Stats ──────────────────────────────────────────────────────────

  _recordSession() {
    const today = this._todayKey();

    if (!this.stats.daily) this.stats.daily = {};
    if (!this.stats.daily[today]) {
      this.stats.daily[today] = { sessions: 0, minutes: 0 };
    }

    this.stats.daily[today].sessions++;
    this.stats.daily[today].minutes += this.timer.workDuration;
    this.stats.totalCompleted++;
    this.stats.totalMinutesFocused += this.timer.workDuration;

    // Streak calculation
    const yesterday = this._dateKey(new Date(Date.now() - 86400000));
    if (this.stats.lastActiveDate === yesterday || this.stats.lastActiveDate === today) {
      if (this.stats.lastActiveDate === yesterday) {
        this.stats.streakDays = (this.stats.streakDays || 0) + 1;
      }
    } else if (this.stats.lastActiveDate !== today) {
      this.stats.streakDays = 1;
    }
    this.stats.lastActiveDate = today;

    this._saveStats();
  }

  // ─── Persistence ────────────────────────────────────────────────────

  async _saveSettings() {
    await window.api.saveData({
      settings: this.settings,
      tasks: this.tasks,
      stats: this.stats,
    });
  }

  async _saveTasks() {
    await window.api.saveData({
      settings: this.settings,
      tasks: this.tasks,
      stats: this.stats,
    });
  }

  async _saveStats() {
    await window.api.saveData({
      settings: this.settings,
      tasks: this.tasks,
      stats: this.stats,
    });
  }

  // ─── Tray Update ───────────────────────────────────────────────────

  _updateTray() {
    const hasActiveTimer = this._hasActiveTimer();
    const trayState = {
      display: null,
      isRunning: this.timer.isRunning,
      mode: hasActiveTimer ? this.timer.mode : null,
      canSkipBreak: hasActiveTimer && this._isBreakMode(),
      hasActiveTimer,
    };

    if (this.timer.isRunning || this.timer.isPaused) {
      trayState.display = this.timerStatusText();
    }

    window.api.updateTimer(trayState);
  }

  // ─── Utility ────────────────────────────────────────────────────────

  _emoji() {
    return EMOJIS[this.settings.foodEmoji] || EMOJIS.avocado;
  }

  _fmt(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  _todayKey() {
    return this._dateKey(new Date());
  }

  _dateKey(date) {
    return date.toISOString().split("T")[0];
  }

  _dayOfWeekMon() {
    // 0 = Monday, 6 = Sunday
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  }

  _getWeekData() {
    const today = new Date();
    const dayMon = this._dayOfWeekMon();
    const result = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - dayMon + i);
      const key = this._dateKey(d);
      const data = this.stats.daily?.[key] || { sessions: 0, minutes: 0 };
      result.push(data);
    }

    return result;
  }
}

// ─── Initialize ─────────────────────────────────────────────────────────────

const app = new PomodoroApp();
app.init();
