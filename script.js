document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startbtn');
    const gameContent = document.querySelector('.gamecontent');
    const cells = document.querySelectorAll('.cells');
    const statusDisplay = document.querySelector('.status');
    const resetBtn = document.getElementById('resetbtn');
    const clickSound = document.getElementById('clicksound');
    const winSound = new Audio('win.mp3');
    const darkModeToggle = document.getElementById('darkModeToggle');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // Start button event
    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        gameContent.style.display = 'block';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    });

    // Cell click event
    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] !== "" || !gameActive) return;

        boardState[index] = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.textContent = currentPlayer;
        clickSound.play();

        checkResult();
    }

    // Check winner
    function checkResult() {
        let roundWon = false;

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
            winSound.play();
            gameActive = false;
            return;
        }

        if (!boardState.includes("")) {
            statusDisplay.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Reset game
    function resetGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o');
        });
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Cell listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Reset button
    resetBtn.addEventListener('click', resetGame);

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
        }
    });
});
