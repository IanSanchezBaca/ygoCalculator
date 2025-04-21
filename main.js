/* this file starts up the electorn application */

const { app, BrowserWindow, ipcMain, dialog } = require('electron')

/* app: is being used to create the window when everything is ready
 * BrowserWindow: is used to initialized the window with certain variables
 * ipcMain: is used to "get" stuff from another js file
 * dialog: is used to create a popup window
 */

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 1024, // old width
    // height: 728, // old height
    
    // this should be the best size for android???
    // this is in pixels
    width: 1440,
    height: 1024,
    // frame: false,

    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false,     // This allows require in render.js
    }

  })

  win.loadFile('index.html')

  // win.webContents.openDevTools() 
  // this just opens the "inspect element"
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('exit-app', ()=>{
  console.log("clicked the exit button");
  
  dialog.showMessageBox({
    type: 'warning',
    buttons: ['yes', 'no'],
    title: 'Confirm Exit',
    message: 'Are you sure?',
  }).then(result => {
    if(result.response === 0) {
      app.quit();
    }
  })

})

