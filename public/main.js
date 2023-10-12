const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    minHeight: 500,
    minWidth: 520,
  });

  const windowURL = false
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
