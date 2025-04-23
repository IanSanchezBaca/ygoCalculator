/* This file gives the code what it needs to function correctly */
const { ipcRenderer } = require('electron');


/* variables */
let p1 = 8000; // player 1 lifepoints
let p2 = 8000; // player 2 lifepoints
let symbol = '^'; // the current symbol that is being used
let player = false; 
/* p1 is 0/false
*  p2 is 1/true 
*  will be using this bool to know what lifepoints i will be manipulating*/

const calc = document.querySelector('.calc'); // checks for the class calc

/* Buttons */
const exitButton = document.getElementById('exitButton');
const p1Button = document.getElementById('duelist1');
const p2Button = document.getElementById('duelist2');
const resetButton = document.getElementById('resetButton');
const Text = document.getElementById('text');


exitButton.onclick = () => closeApp(); 
// adding the arrow makes it so that you can make a function call and it wont be called automatically

p1Button.classList.add('btn', 'btn-primary');
p1Button.onclick = function () { swapPlayers(this); };
p2Button.onclick = function () { swapPlayers(this); };
// this way of creating functions is used so that you can check who is clicking it

resetButton.onclick = () => reset();


    
calc.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const val = event.target.textContent;
        // ipcRenderer.send('print', 'calc pressed. value: ' + val);
        eval(val);
    }
})

function eval(val){
    ipcRenderer.send('print', 'inside val with ' + val);

    switch (val){
        case '-':
            symbol = '-';
            break;
        
        case '+':
            symbol = '+';
            break;
        
        case "clr":
            break;
        
        case '=':
            break;
    
        case "/2":
            break;

        default:
            ipcRenderer.send('print', 'shouldn\'t really be here!');
    }
} // eval


function reset(){// this should reset everything

    const confirmation = confirm("Are you sure you want to reset?");

    if (confirmation){
        p1 = 8000;
        p2 = 8000;
        p1Button.textContent = "Duelist 1: " + p1;
        p2Button.textContent = "Duelist 2: " + p2;
        // Text.textContent = "clicked reset!";
        // clear log
    }
} // reset


function swapPlayers(button){ // this only swaps the focus on which life points will be manipulating
    if(button.id === "duelist1" && player){
    //    ipcRenderer.send('print', 'duelist 1 click');
       Text.textContent = p1;
       player = false;
       ipcRenderer.send('print', 'player = duelist1');
    }
    else if(button.id === "duelist2" && !player){
        // ipcRenderer.send('print', 'duelist 2 click');
        Text.textContent = p2;
        player = true;
        ipcRenderer.send('print', 'player = duelist2');
    }

   
} // swapPlayers


function closeApp() { // closes the app
    ipcRenderer.send('exit-app');
} // exit
