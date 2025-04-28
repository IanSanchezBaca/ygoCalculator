const { ipcRenderer } = require('electron');

/* Buttons */
const coinButton = document.getElementById('coinBtn');
const diceButton = document.getElementById('diceBtn');
const tempText = document.getElementById('flavorText');

coinButton.onclick = () => flip();
diceButton.onclick = () => roll();

let ans;

function flip(){
    tempText.textContent = "fliping coin...";
    
    setTimeout(() => {
        let ans = Math.floor(Math.random() * 2);
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
        let ans = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        


        tempText.textContent = "die landed on " + ans;
    }, 500); // 1/2-second delay
} // roll