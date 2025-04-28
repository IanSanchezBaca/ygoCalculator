const { ipcRenderer } = require('electron');

let p1Text = document.getElementById('p1Txt');

ipcRenderer.on('logging', () => {
    tempFunct();
})

function tempFunct() {
    ipcRenderer.send('print', 'this function should run on open?');

    p1Text.textContent = "OWOWOWOWO";

}