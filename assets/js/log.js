const { ipcRenderer } = require('electron');

// the text that gets printed out in the log
let p1Text = document.getElementById('p1Txt');
let p2Text = document.getElementById('p2Txt'); 

// this will be the actual log(s)
let p1log = [8000];
let p2log = [8000];

ipcRenderer.on('logging', () => {
    tempFunct();
})

function tempFunct() {
    ipcRenderer.send('print', 'this function should run on open?');

    p1Text.textContent = "OWOWOWOWO";

}

function logging(player, symbol, rhs, result){
    ipcRenderer.send('print', 'player: ' + player + " symbold: " + symbol + " rhs: " + rhs + " result: " + result);

    
} // logging



module.exports = {logging};


// let vec = [10, 20, 30, 40];

// let outputHTML = vec.join('<br>');

// document.getElementById('output').innerHTML = outputHTML;

// Why innerHTML instead of textContent?
// textContent shows <br> as plain text.
// innerHTML interprets it as an HTML line break.