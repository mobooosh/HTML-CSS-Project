const game_as = document.querySelector(".game--status");
const ce = document.querySelectorAll(".cell");
const game_re = document.querySelector(".game--restart");

let turn = "X";
let cells = [];
let index_x = [];
let index_o = [];
let counter = 0;

const win = [ [0,1,2] , [3,4,5] , [6,7,8] , 
              [0,4,8] , [2,4,6] , [0,3,6] , 
              [1,4,7] , [2,5,8]];

function handlplayed(targett, index_ce) {
    if (ce[index_ce].textContent === '') {
        ce[index_ce].textContent = turn;
        cells.push(turn);
        if (turn == 'X') {
            index_x.push(index_ce);
            counter += 1;
        } else if (turn == 'O') {
            index_o.push(index_ce);
            counter += 1;
        }
        playerturn();
    }
}

function restart() {
    ce.forEach(ce => ce.textContent = '');
    cells = [];
    index_x = [];
    index_o = [];
    turn = "X";
    counter = 0;
    game_as.textContent = `It's ${turn}'s turn`;
}

function handlclick(eventclick) {
    let targett = eventclick.target;
    let index_ce = parseInt(targett.getAttribute("data-cell-index"));
    handlplayed(targett, index_ce);
}

function playerturn() {
    turn = turn === "X" ? "O" : "X";
    game_as.textContent = `It's ${turn}'s turn`;
    if (counter === 9) {
        game_as.textContent = "Game ended in a draw";
        setTimeout(restart, 2000);
    } else {
        winner(); 
    }
}

function isSubset(array1, array2) {
    return array1.every(element => array2.includes(element));
}

function winner() {
    for (let count of win) {
        if (isSubset(count, index_o)) {
            game_as.textContent = "Player O has won";
            setTimeout(restart, 2000);
            return;
        } else if (isSubset(count, index_x)) {
            game_as.textContent = "Player X has won";
            setTimeout(restart, 2000);
            return;
        }
    }
}

game_re.onclick = restart;

ce.forEach(ce => ce.addEventListener('click', handlclick));







