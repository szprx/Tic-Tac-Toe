const statusDisplay = document.querySelector('.game--status');

let gameActive = false;
let mode = "AI"
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let AITurn = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const chooseGameMode = () => `Choose game mode`;
const currentMode = () => `It's ${mode} mode`;

statusDisplay.innerHTML = chooseGameMode();

function isAITurn() {
    let s = Math.random();
    console.log(s)
    AITurn = s >= 0.5;
}

function AIGame() {
    mode = "AI";
    gameActive = true;
    statusDisplay.innerHTML = currentMode();

    isAITurn();
    if (AITurn) {
        handleComputerMove()
    }
}

function twoPlayersGame() {
    mode = "two Players";
    gameActive = true;
    statusDisplay.innerHTML = currentMode();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
        AITurn = AITurn === false
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '')
            continue;
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    if(mode==="AI" && AITurn){
        handleComputerMove();
    }
}

function handleComputerMove() {
    let randomCell;
    let i =0;
    do {
        randomCell = Math.floor(Math.random() * 9);
        i++;
    } while (gameState[randomCell] !== "" && i < 100 );
    let cell = document.querySelector(`div[data-cell-index="${randomCell}"]`);
    cell.click();
}

function handleRestartGame() {
    gameActive = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = chooseGameMode();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

document.querySelector('.mode--AI').addEventListener('click', AIGame);
document.querySelector('.mode--twoPlayers').addEventListener('click', twoPlayersGame);