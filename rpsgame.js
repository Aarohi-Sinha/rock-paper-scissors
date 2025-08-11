let humanScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;
let gameEnded = false;

const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return { result: "tie", message: "It's a tie!" };
    }

    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        return { result: "win", message: `You win! ${humanChoice} beats ${computerChoice}` };
    } else {
        computerScore++;
        return { result: "lose", message: `You lose! ${computerChoice} beats ${humanChoice}` };
    }
}

function updateDisplay(humanChoice, computerChoice, roundResult) {
    document.getElementById('humanChoiceIcon').textContent = choiceEmojis[humanChoice];
    document.getElementById('humanChoiceText').textContent = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    document.getElementById('computerChoiceIcon').textContent = choiceEmojis[computerChoice];
    document.getElementById('computerChoiceText').textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

    document.getElementById('choicesDisplay').style.display = 'flex';

    const resultElement = document.getElementById('result');
    resultElement.textContent = roundResult.message;
    resultElement.className = `result ${roundResult.result}`;
    resultElement.style.display = 'block';

    document.getElementById('humanScore').textContent = humanScore;
    document.getElementById('computerScore').textContent = computerScore;

    if (currentRound <= maxRounds) {
        document.getElementById('roundsLeft').textContent = `Round ${currentRound} of ${maxRounds}`;
    }
}

function checkGameEnd() {
    if (currentRound > maxRounds) {
        gameEnded = true;
        const finalResultElement = document.getElementById('finalResult');
        
        if (humanScore > computerScore) {
            finalResultElement.innerHTML = '🎉 You Won the Game! 🎉';
            finalResultElement.className = 'final-result win';
        } else if (computerScore > humanScore) {
            finalResultElement.innerHTML = '🤖 Computer Won the Game! 🤖';
            finalResultElement.className = 'final-result lose';
        } else {
            finalResultElement.innerHTML = '🤝 It\'s a Tie Overall! 🤝';
            finalResultElement.className = 'final-result tie';
        }

        finalResultElement.style.display = 'block';
        document.getElementById('roundsLeft').textContent = 'Game Complete!';

        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
    }
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    currentRound = 1;
    gameEnded = false;

    document.getElementById('humanScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('roundsLeft').textContent = 'Round 1 of 5';
    document.getElementById('choicesDisplay').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('finalResult').style.display = 'none';

    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (gameEnded) return;

            const humanChoice = this.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const roundResult = playRound(humanChoice, computerChoice);

            updateDisplay(humanChoice, computerChoice, roundResult);
            currentRound++;

            setTimeout(() => {
                checkGameEnd();
            }, 100);
        });
    });

    resetGame();
});