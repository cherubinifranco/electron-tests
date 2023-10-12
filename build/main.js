const { app, BrowserWindow } = require("electron");
const path = require('path');



require("update-electron-app")({
  repo: "cherubinifranco/electron-tests",
  updateInterval: "1 hour",
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    minHeight: 500,
    minWidth: 520,
  });

  const windowURL = true
    ? `file://${path.join(__dirname, "../build/index.html")}`
    : "http://localhost:3000/";

  win.loadURL(windowURL);
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
