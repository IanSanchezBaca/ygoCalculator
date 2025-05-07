/* this file starts up the electorn application */

const { app, BrowserWindow, ipcMain, dialog } = require('electron')

/* app: is being used to create the window when everything is ready
 * BrowserWindow: is used to initialized the window with certain variables
 * ipcMain: is used to "get" stuff from another js file
 * dialog: is used to create a popup window
 */

let win; 
let toolsWin;
/* the main window.
 * need this to be global as it will need to be linked as the parent to sub windows */

const createWindow = () => {
    win = new BrowserWindow({
    width: 800, // old width
    height: 600, // old height
    
    // frame: false, // makes borderless window
    // transparent: true,
    resizable: false,

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

});

ipcMain.on('print', (event, arg) => {
  console.log(arg);
});

ipcMain.on('tools', () => {
  
  toolsWin = new BrowserWindow({
    width: 400,
    height: 300,
    parent: win,
    modal: true, // blocks input to main window
    show: false, // dont show until ready
    frame: true, // true: border, false: borderless window
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  toolsWin.loadFile('assets/html/tools.html');

  toolsWin.once('ready-to-show', () => {
    toolsWin.show();
  })

});

ipcMain.on('closeTools', () => {
  if(toolsWin){
    toolsWin.close();
  }
})

ipcMain.on('log', (event, v1, v2) => {
  
  const logWin = new BrowserWindow({
    width: 600,
    height: 800,
    parent: win,
    modal: true, // blocks input to main window
    show: false, // dont show until ready
    frame: true, // true: border, false: borderless window
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  logWin.loadFile('assets/html/log.html');

  logWin.webContents.on('did-finish-load', () => {
    logWin.webContents.send('logging', v1, v2);
  })

  logWin.once('ready-to-show', () => {
    logWin.show();
  })

});

