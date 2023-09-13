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

    const arr = [null,null,null,null,null,null,null,null,null];


return {
    arr
};
})();



const gameBoardContainer = document.getElementById("gameBoard-container")

function clearBoard() {
    gameBoardContainer.innerHTML="";
    gameBoard.arr = [null,null,null,null,null,null,null,null,null];

    return gameBoard;
}

const makeBoard = ((gameBoard) => {
    const arr = gameBoard.arr;
    for (var i = 0; i < arr.length; i++){
            const gridSquare = document.createElement("div");
            gridSquare.dataset.index = i;
            gridSquare.classList.add("grid-square")
            gridSquare.onclick=placeMark;
            gameBoardContainer.appendChild(gridSquare);

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
    const index = square.dataset.index;
    const arr = gameBoard.arr;
    arr[index] = square.textContent;
    winAnnouncement(winCheck(Players));
    return gameBoard;

}

const turnCheck = (() => {
    const turn = "player1";
    return {turn};
})();

const winCheck = () => {


    let winner = ""

/*Winning with 3 in a row*/
    
    const arr = gameBoard.arr;
    if ((arr[0]==arr[1])&&(arr[0]==arr[2])&&(arr[0]!==null)){
        if(arr[0]=="x"){
            winner = "player1"

        } else if(arr[0]=="o"){
            winner = "player2"
        }
    } else if ((arr[3]==arr[4])&&(arr[3]==arr[5])&&(arr[3]!==null)){
        if(arr[3]=="x"){
            winner = "player1"

        } else if(arr[3]=="o"){
            winner = "player2"
        }
    } else if ((arr[6]==arr[7])&&(arr[6]==arr[8])&&(arr[6]!==null)){
        if(arr[6]=="x"){
            winner = "player1"

        } else if(arr[6]=="o"){
            winner = "player2"
        }
    }

/*Winning with 3 in a column*/


    else if((arr[0]==arr[3])&&(arr[0]==arr[6])&&(arr[0]!==null)){
            if(arr[0]=="x"){
                winner = "player1"
            } else if(arr[0]=="o"){
                winner = "player2"
            }
        } else if ((arr[1]==arr[4])&&(arr[1]==arr[7])&&(arr[4]!==null)){
            if(arr[1]=="x"){
                winner = "player1"
            } else if(arr[1]=="o"){
                winner = "player2"
            }
        } else if ((arr[2]==arr[5])&&(arr[2]==arr[8])&&(arr[2]!==null)){
            if(arr[2]=="x"){
                winner = "player1"
            } else if(arr[2]=="o"){
                winner = "player2"
            }
        }


/*Winning with a diagonal*/
    else if((arr[0]==arr[4])&&(arr[0]==arr[8])&&(arr[0]!==null)){
        if(arr[0]=="x"){
            winner = "player1"
        } else if(arr[0]=="o"){
            winner = "player2"
        }
    } else if ((arr[2]==arr[4])&&(arr[2]==arr[6])&&(arr[2]!==null)){
        if(arr[2]=="x"){
            winner = "player1"
        } else if(arr[2]=="o"){
            winner = "player2"
        }
    }

    /* It's a Tie*/

    else if ((winner=="")&&(arr.every(function(i) { return i !== null}))){
        winner = "tie"
    }


    return winner

}


const winAnnouncement = (winner) => {
    const gameOverDialog = document.getElementById("gameOverDialog");
    const gameOverDialogText = document.getElementById("gameOverDialog-text");
    const player1 = Players[0];
    const player2 = Players[1];

    if (winner == "player1"){
        gameOverDialogText.textContent = `Congrats ${player1.name}`;
        gameOverDialog.showModal();
    } else if (winner == "player2"){
        gameOverDialogText.textContent = `Congrats ${player2.name}`;
        gameOverDialog.showModal();
    } else if (winner == "tie"){
        gameOverDialogText.textContent = `It's a tie!`;
        gameOverDialog.showModal();
    }
}


let restartGameForm = document.forms["restartGameForm"];
restartGameForm.addEventListener("submit",  restartGame);

function restartGame(e) {
    clearBoard(gameBoard);
    makeBoard(gameBoard);
}
