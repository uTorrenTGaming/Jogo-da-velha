// --- Elementos do DOM ---
const statusDisplay = document.querySelector('.game-status');
const restartButton = document.querySelectorAll('.game-restart-button');
const cells = document.querySelectorAll('.cell');
const resultOverlay = document.getElementById('resultOverlay');
const resultText = document.getElementById('resultText');
const winningImage = document.getElementById('winningImage');

// --- Variáveis de Estado do Jogo ---
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// --- Mensagens do Jogo ---
const winningMessage = () => `Jogador ${currentPlayer} venceu!`;
const drawMessage = () => `O jogo empatou!`;
const currentPlayerTurn = () => `É a vez do ${currentPlayer}`;

// --- Condições de Vitória ---
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// --- Funções ---
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winningImage.classList.remove('hidden');
        resultText.innerHTML = winningMessage();
        resultOverlay.classList.remove('hidden');
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        resultText.innerHTML = drawMessage();
        resultOverlay.classList.remove('hidden');
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('X', 'O');
    });
    resultOverlay.classList.add('hidden');
    // --- CORREÇÃO APLICADA ---
    winningImage.classList.add('hidden');
}

// --- Event Listeners ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.forEach(button => button.addEventListener('click', handleRestartGame));

// Inicia a exibição do status do jogo
statusDisplay.innerHTML = currentPlayerTurn();
