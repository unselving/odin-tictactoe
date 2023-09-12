let Players=[];

const newPlayer = (name) => {
    return {name};
}

const startGameBtn = document.getElementById("startGame")
startGameBtn.addEventListener("click", ()=>{
    playerDialog.showModal();
    clearBoard(gameBoard);
    makeBoard(gameBoard);
})



let addPlayersForm = document.forms["addPlayers"];
addPlayersForm.addEventListener("submit",  getPlayers);

function getPlayers(e) {
    const player1Name = addPlayersForm.player1_Name.value;
    const player2Name = addPlayersForm.player2_Name.value;
    const player1 = newPlayer(player1Name);
    const player2 = newPlayer(player2Name);
    Players = [player1, player2];
}


const gameBoard = (() => {

    const row1 = ["","",""];
    const row2 = ["","",""];
    const row3 = ["","",""];

return {
    row1,
    row2,
    row3,
};
})();



const gameBoardContainer = document.getElementById("gameBoard-container")

function clearBoard() {
    gameBoardContainer.innerHTML="";
    gameBoard.row1 = ["","",""];
    gameBoard.row2 = ["","",""];
    gameBoard.row3 = ["","",""];

    return gameBoard;
}

const makeBoard = ((gameBoard) => {
    for (const property in gameBoard) {
        const arr = gameBoard[property]
        for (var i = 0; i < arr.length; i++){
            const gridSquare = document.createElement("div");
            gridSquare.dataset.row = property;
            gridSquare.dataset.index = i;
            gridSquare.classList.add("grid-square")
            gridSquare.onclick=placeMark;
            gameBoardContainer.appendChild(gridSquare);

        }
      }
});

function placeMark(e) {
    const square = e.target;
    if (turnCheck.turn=="player1"){
        square.textContent = "x";
        turnCheck.turn="player2";
    } else {
        square.textContent = "o";
        turnCheck.turn="player1";
    }
    const row = square.dataset.row;
    const index = square.dataset.index;
    for (const property in gameBoard) {
        if (property == row) {
            const arr = gameBoard[property];
            arr[index] = square.textContent;
        }
    }
    winCheck(Players);
    return gameBoard;

}

const turnCheck = (() => {
    const turn = "player1";
    return {turn};
})();

const winCheck = () => {

    const player1 = Players[0];
    const player2 = Players[1];
    const gameOverDialog = document.getElementById("gameOverDialog");
/*Winning with 3 in a row*/
    for (const property in gameBoard) {
        const arr = gameBoard[property];
        if ((arr[0]==arr[1])&&(arr[0]==arr[2])&&(arr[0]!=="")){
            if(arr[0]=="x"){
                gameOverDialog.textContent = `Congrats ${player1.name}`;
                gameOverDialog.showModal();

            } else {
                gameOverDialog.textContent = `Congrats ${player2.name}`;
                gameOverDialog.showModal();
            }
        }
      }
/*Winning with 3 in a column*/

    const gridRow1 = gameBoard['row1'];
    const gridRow2 = gameBoard['row2'];
    const gridRow3 = gameBoard['row3'];

    for (let i=0; i<3; i++){
        if((gridRow1[i]==gridRow2[i])&&(gridRow1[i]==gridRow3[i])&&(gridRow1[i]!=="")){
            if(gridRow1[i]=="x"){
                gameOverDialog.textContent = `Congrats ${player1.name}`;
                gameOverDialog.showModal();
            } else {
                gameOverDialog.textContent = `Congrats ${player2.name}`;
                gameOverDialog.showModal();
            }
        }
    }

/*Winning with a diagonal*/
    if((gridRow1[0]==gridRow2[1])&&(gridRow1[0]==gridRow3[2])&&(gridRow1[0]!=="")){
        if(gridRow1[0]=="x"){
            gameOverDialog.textContent = `Congrats ${player1.name}`;
            gameOverDialog.showModal();
        } else {
            gameOverDialog.textContent = `Congrats ${player2.name}`;
            gameOverDialog.showModal();
        }
    } else if ((gridRow1[2]==gridRow2[1])&&(gridRow1[2]==gridRow3[0])&&(gridRow1[2]!=="")){
        if(gridRow1[2]=="x"){
            gameOverDialog.textContent = `Congrats ${player1.name}`;
            gameOverDialog.showModal();
        } else {
            gameOverDialog.textContent = `Congrats ${player2.name}`;
            gameOverDialog.showModal();
        }
    }

}