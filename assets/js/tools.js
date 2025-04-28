const { ipcRenderer } = require('electron');

/* Buttons */
const coinButton = document.getElementById('coinBtn');
const diceButton = document.getElementById('diceBtn');
const exitButton = document.getElementById('extBtn')


const tempText = document.getElementById('flavorText');

coinButton.onclick = () => flip();
diceButton.onclick = () => roll();
exitButton.onclick = () => closeWin();

let ans;

function closeWin() {
    tempText.textContent = "testing exit button";

    ipcRenderer.send('closeTools');
} // closeWin

function flip(){
    tempText.textContent = "fliping coin...";
    
    setTimeout(() => {
        ans = Math.floor(Math.random() * 2);
        if (ans) {
            ans = "heads.";
        } else {
            ans = "tails.";
        }
        tempText.textContent = "coin landed on " + ans;
    }, 500); // 1/2-second delay

} // filp

function roll(){
    tempText.textContent = "Rolling die...";
    
    setTimeout(() => {
        ans = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        tempText.textContent = "die landed on " + ans;
    }, 500); // 1/2-second delay
} // roll