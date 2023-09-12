const newPlayer = (name) => {
    const score = 0;
    return {name, score};
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

const makeBoard = ((gameBoard) => {
    for (const property in gameBoard) {
        const arr = gameBoard[property]
        for (var i = 0; i < arr.length; i++){
            const gridSquare = document.createElement("div");
            gridSquare.dataset.row = property;
            gridSquare.dataset.index = i;
            console.log(property,i);
            gridSquare.classList.add("grid-square")
            gridSquare.onclick=placeMark;
            gameBoardContainer.appendChild(gridSquare);

        }
      }
})(gameBoard);

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
            console.log(gameBoard);
        }
    }
    winCheck();
    return gameBoard;

}

const turnCheck = (() => {
    const turn = "player1";
    return {turn};
})();

const winCheck = () => {

/*Winning with 3 in a row*/
    for (const property in gameBoard) {
        const arr = gameBoard[property];
        if ((arr[0]==arr[1])&&(arr[0]==arr[2])&&(arr[0]!=="")){
            console.log("WIN");
        }
      }
/*Winning with 3 in a column*/

    const gridRow1 = gameBoard['row1'];
    const gridRow2 = gameBoard['row2'];
    const gridRow3 = gameBoard['row3'];

    for (let i=0; i<3; i++){
        if((gridRow1[i]==gridRow2[i])&&(gridRow1[i]==gridRow3[i])&&(gridRow1[i]!=="")){
            console.log("WIN");
        }
    }

/*Winning with a diagonal*/
    if((gridRow1[0]==gridRow2[1])&&(gridRow1[0]==gridRow3[2])&&(gridRow1[0]!=="")){
        console.log("WIN");
    } else if ((gridRow1[2]==gridRow2[1])&&(gridRow1[2]==gridRow3[0])&&(gridRow1[2]!=="")){
        console.log("WIN");
    }

}