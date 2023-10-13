const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");

require("update-electron-app")({
  repo: "cherubinifranco/electron-tests",
  updateInterval: "1 hour",
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: true,
    show: false
  });
  const updateWin = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
  })
  // const windowURL = true
  //   ? `file://${path.join(__dirname, "../build/index.html")}`
  //   : "http://localhost:3000/";

  const windowURL = `file://${path.join(__dirname, "./views/main.html")}`
  const updateURL = `file://${path.join(__dirname, "./views/update.html")}`
  updateWin.loadURL(updateURL)
  updateWin.show()
  // win.loadURL(windowURL);
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("checking-for-update", () => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "Checking for updates",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    console.log(returnValue);
  });
});
autoUpdater.on("update-available", () => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "An update is available",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    console.log(returnValue);
  });
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: "IDK message",
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
    else{
      console.log("LATER")
    }
  });
});
