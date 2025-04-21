/* This file gives the code what it needs to function correctly */

const { ipcRenderer } = require('electron');

// const {Menu} = ipcRenderer;

/* Buttons */
const exitButton = document.getElementById('exitButton');
exitButton.onclick = closeApp;

/* exit */
function closeApp() {
    ipcRenderer.send('exit-app');
}
