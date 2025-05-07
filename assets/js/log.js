const { ipcRenderer } = require('electron');

// the text that gets printed out in the log
let p1Text = document.getElementById('p1Txt');
let p2Text = document.getElementById('p2Txt'); 

// this will be the actual log(s)

ipcRenderer.on('logging', (event, v1, v2) => {
    showLog(v1, v2);
})

function findEmptyTagVector(vectors) {
    return vectors.find(entry => entry[0] === "");
}
  
function logging(v1, v2, player, symbol, rhs, result){
    // ipcRenderer.send('print', 'player: ' + player + " symbol: " + symbol + " rhs: " + rhs + " result: " + result);
    
    // ipcRenderer.send('print', "inside logging?");


    if(!player){ // player 1
        v1.push([symbol, rhs, 0]);
        v2.push(["nothing", "", 1]);
        
        v1.push(["", result, 1]);
        
        let last = findEmptyTagVector(v2);
        
        v2.push(last);

    }
    else{ // player 2
        v2.push([symbol, rhs, 0]);
        v1.push(["nothing", "", 1]);
        
        v2.push(["", result, 1]);
        let last = findEmptyTagVector(v1);
        v1.push(last);
    }

    // ipcRenderer.send('print', vector);

} // logging

function showLog(vect1, vect2){

    // let p1html = vect1.map(entry => `${entry[0]} ${entry[1]}`).join('<br>');
    let p1html = vect1.map(entry => {
        let className = '';
        if (entry[0] === '-') {
          className = 'bg-red';
        } else if (entry[0] === '+') {
          className = 'bg-green';
        } else if (entry[0] === '') {
          className = 'bg-blue';
        }
        else if (entry[0] === "nothing") {
            className = 'bg-gray';
        }
      
        return `<div class="${className}">${entry[0]} ${entry[1]}</div>`;
    }).join('');
      

    // let p2html = vect2.map(entry => `${entry[0]} ${entry[1]}`).join('<br>');
    let p2html = vect2.map(entry => {
        let className = '';
        if (entry[0] === '-') {
          className = 'bg-red';
        } else if (entry[0] === '+') {
          className = 'bg-green';
        } else if (entry[0] === '') {
          className = 'bg-blue';
        }
        else if (entry[0] === "nothing") {
            className = 'bg-gray';
        }
      
        return `<div class="${className}">${entry[0]} ${entry[1]}</div>`;
    }).join('');


    p1Text.innerHTML = p1html;
    p2Text.innerHTML = p2html

}// showLog



module.exports = {logging, showLog};


// let vec = [10, 20, 30, 40];

// let outputHTML = vec.join('<br>');

// document.getElementById('output').innerHTML = outputHTML;

// Why innerHTML instead of textContent?
// textContent shows <br> as plain text.
// innerHTML interprets it as an HTML line break.