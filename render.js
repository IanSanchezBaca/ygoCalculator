/* This file gives the code what it needs to function correctly */
const { ipcRenderer } = require('electron');
const { logging } = require('./assets/js/log.js')

/* variables */
let p1 = 8000; // player 1 lifepoints
let p2 = 8000; // player 2 lifepoints
let rhs = "";
let symbol = '-'; // the current symbol that is being used
let player = false; 
/* p1 is 0/false
*  p2 is 1/true 
*  will be using this bool to know what lifepoints i will be manipulating*/

const calc = document.querySelector('.calc');
// Checks if any of the calc buttons where pressed

/* Buttons */
const exitButton = document.getElementById('exitButton');
const resetButton = document.getElementById('resetButton');
const toolsButton = document.getElementById('toolsButton');
const logButton = document.getElementById('logButton');

const p1Button = document.getElementById('duelist1');
const p2Button = document.getElementById('duelist2');


/* This should be the text that gets updated*/
let tempText = document.getElementById('text');


exitButton.onclick = () => closeApp(); 
// adding the arrow makes it so that you can make a function call and it wont be called automatically

p1Button.classList.add('btn', 'btn-primary');
p1Button.onclick = function () { swapPlayers(this); };
p2Button.onclick = function () { swapPlayers(this); };
// this way of creating functions is used so that you can check who is clicking it

resetButton.onclick = () => reset();
toolsButton.onclick = () => openTools();
logButton.onclick = () => openLog();


    
calc.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const val = event.target.textContent;
        // ipcRenderer.send('print', 'calc pressed. value: ' + val);
        eval(val);
    }
})

function equals(a, b){
    // this function will be called when the equals sign is pressed
    let sum;


    switch (symbol){
        case '-':
            sum = a - b;
            
            if(sum <= 0){
                return 0;    
            }

            return sum;
            // break;
        
        case '+':
            return Number(a) + Number(b);
            // break;
        
        default:
            ipcRenderer.send('print', 'Error: equals()');
            break;
    }    

    return -1; // if it does return -1 something is wrong
} // equals


function eval(val){
    // ipcRenderer.send('print', 'inside val with ' + val);
    let currLP = "";

    
    if(!player){
        currLP = p1;
    }
    else{
        currLP = p2;
    }


    switch (val){
        case '-':
            symbol = '-';
            rhs = "";
            tempText.textContent = currLP + symbol;
            break;
        
        case '+':
            symbol = '+';
            rhs = "";
            tempText.textContent = currLP + symbol;
            break;
        
        case "clr":
            rhs = "";
            tempText.textContent = currLP;
            break;
        
        case "/2":
            symbol = '-'
            
            rhs = Math.ceil(currLP / 2)

            if(rhs == 1){
                rhs = "";
            }
            else{
                tempText.textContent = currLP + symbol + rhs;
            } 
            break;

        case '=':
            
            if(!rhs){
                // ipcRenderer.send('print', "rhs empty.");
                break;
            } // pretty much dont do anything if rhs is zero
            
            

            if(!player){
                p1 = equals(p1, rhs);
                p1Button.textContent = "Duelist 1: " + p1;
                tempText.textContent = p1;

                logging(player, symbol, rhs, p1);
            }
            else{
                p2 = equals(p2, rhs);
                p2Button.textContent = "Duelist 2: " + p2;
                tempText.textContent = p2;
                
                logging(player, symbol, rhs, p2);
            }

            // logging(player, symbol, rhs, result);

            // cleaning up the values
            rhs = "";

            break;

        default:
            rhs = rhs + val;
            tempText.textContent = currLP + symbol + rhs;
            // ipcRenderer.send('print', 'new rhs: ' + rhs);
            break;
    }
    // ipcRenderer.send('print', 'currLP: ' + currLP);
} // eval


function reset(){// this should reset everything

    const confirmation = confirm("Are you sure you want to reset?");

    if (confirmation){
        p1 = 8000;
        p2 = 8000;
        p1Button.textContent = "Duelist 1: " + p1;
        p2Button.textContent = "Duelist 2: " + p2;
        tempText.textContent = p1;
        rhs = "";
        // clear log
    }
} // reset


function swapPlayers(button){ // this only swaps the focus on which life points will be manipulating
    if(button.id === "duelist1" && player){
    //    ipcRenderer.send('print', 'duelist 1 click');
       Text.textContent = p1;
       player = false;
    //    ipcRenderer.send('print', 'player = duelist1');
    }
    else if(button.id === "duelist2" && !player){
        // ipcRenderer.send('print', 'duelist 2 click');
        Text.textContent = p2;
        player = true;
        // ipcRenderer.send('print', 'player = duelist2');
    }

    eval("clr")

} // swapPlayers


function closeApp() { // closes the app
    ipcRenderer.send('exit-app');
} // exit


function openLog(){
    ipcRenderer.send('log');
}

function openTools(){
    ipcRenderer.send('tools');
}

