document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('connect4-board');
    const turnIndicator = document.getElementById('turn-indicator');
    const modalOverlay = document.getElementById('success-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const replayBtn = document.getElementById('replay-btn');

    const ROWS = 6;
    const COLS = 7;
    let board = [];
    let currentPlayer = 1; // 1 for player, 2 for AI
    let gameOver = false;

    function createBoard() {
        board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
        boardElement.innerHTML = '';
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement('div');
                cell.classList.add('connect4-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', () => handleCellClick(c));
                boardElement.appendChild(cell);
            }
        }
    }

    function handleCellClick(col) {
        if (gameOver || currentPlayer !== 1) return;

        const row = getNextAvailableRow(col);
        if (row === -1) return; // Column is full

        dropPiece(row, col, 1);
        if (checkWin(1)) {
            endGame(1);
            return;
        }
        if (checkDraw()) {
            endGame(0);
            return;
        }

        currentPlayer = 2;
        turnIndicator.textContent = "Robot's turn";
        setTimeout(aiMove, 500);
    }

    function aiMove() {
        if (gameOver) return;

        const col = findBestMove();
        const row = getNextAvailableRow(col);

        dropPiece(row, col, 2);
        if (checkWin(2)) {
            endGame(2);
            return;
        }
        if (checkDraw()) {
            endGame(0);
            return;
        }

        currentPlayer = 1;
        turnIndicator.textContent = "Your turn";
    }

    function findBestMove() {
        // 1. Check if AI can win in the next move
        for (let c = 0; c < COLS; c++) {
            const r = getNextAvailableRow(c);
            if (r !== -1) {
                board[r][c] = 2;
                if (checkWin(2)) {
                    board[r][c] = 0; // backtrack
                    return c;
                }
                board[r][c] = 0; // backtrack
            }
        }

        // 2. Check if player can win in the next move, and block them
        for (let c = 0; c < COLS; c++) {
            const r = getNextAvailableRow(c);
            if (r !== -1) {
                board[r][c] = 1;
                if (checkWin(1)) {
                    board[r][c] = 0; // backtrack
                    return c;
                }
                board[r][c] = 0; // backtrack
            }
        }

        // 3. Otherwise, pick a random valid column
        let validMoves = [];
        for (let c = 0; c < COLS; c++) {
            if (getNextAvailableRow(c) !== -1) {
                validMoves.push(c);
            }
        }
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    function getNextAvailableRow(col) {
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                return r;
            }
        }
        return -1; // Column is full
    }

    function dropPiece(row, col, player) {
        board[row][col] = player;
        const cell = document.querySelector(`.connect4-cell[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(`player${player}`);
        const piece = document.createElement('div');
        piece.classList.add('heart-piece');
        cell.appendChild(piece);
    }

    function checkWin(player) {
        // Check horizontal
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (board[r][c] === player && board[r][c + 1] === player && board[r][c + 2] === player && board[r][c + 3] === player) {
                    return true;
                }
            }
        }

        // Check vertical
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] === player && board[r + 1][c] === player && board[r + 2][c] === player && board[r + 3][c] === player) {
                    return true;
                }
            }
        }

        // Check diagonal (down-right)
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (board[r][c] === player && board[r + 1][c + 1] === player && board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
                    return true;
                }
            }
        }

        // Check diagonal (up-right)
        for (let r = 3; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (board[r][c] === player && board[r - 1][c + 1] === player && board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    }

    function checkDraw() {
        return board.every(row => row.every(cell => cell !== 0));
    }

    function endGame(winner) {
        gameOver = true;
        setTimeout(() => {
            if (winner === 1) {
                modalTitle.textContent = "You won!";
                modalMessage.textContent = "You are the queen of my heart!";
            } else if (winner === 2) {
                modalTitle.textContent = "You lost!";
                modalMessage.textContent = "The robot loves me more!";
            } else {
                modalTitle.textContent = "It's a draw!";
                modalMessage.textContent = "A tie? How romantic!";
            }
            modalOverlay.classList.add('show');
        }, 1000); // 1-second delay
    }

    replayBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
        gameOver = false;
        currentPlayer = 1;
        turnIndicator.textContent = "Your turn";
        createBoard();
    });

    createBoard();
});