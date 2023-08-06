const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require('url');

let electron_window;
const createWindow = () => {
  electron_window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
    }
  })

  electron_window.loadURL(
    url.format({
      pathname: path.join(__dirname, '/build/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )

  electron_window.on('closed', () => {
    electron_window = null;
  });
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (electron_window === null) {
    createWindow();
  }
});