function getComputerChoice(){
    const choices=["rock","paper","scissors"];
    let computerChoice=choices[Math.floor(Math.random()*3)];
    return computerChoice;
}

function getHumanChoice(){
    let humanChoice=prompt("Enter your choice:").toLowerCase();
    return humanChoice;
}

let humanScore=0, computerScore=0;

function playRound(humanChoice,computerChoice){
    if(humanChoice==computerChoice)
        return "It's a tie!";
    if((humanChoice=="rock" && computerChoice=="scissors") ||
        (humanChoice=="paper" && computerChoice=="rock")||
        (humanChoice=="scissors" && computerChoice=="paper"))
        {humanScore++;
         return `You win! ${humanChoice} beats ${computerChoice}`;
        }
    else{computerScore++;
        return `You lose! ${computerChoice} beats ${humanChoice}`;
        }
}

for(let round=1;round<=5; round++){
    const human=getHumanChoice();
    const computer=getComputerChoice();
    console.log(`You chose: ${human}`);
    console.log(`Computer chose: ${computer}`);
    console.log(playRound(human, computer));
    console.log(`Score: You ${humanScore} - ${computerScore} Computer`);
}

console.log(`\n--- Game Over ---`);
if (humanScore > computerScore) {
    console.log("You won the game!");
} else if (computerScore > humanScore) {
    console.log("Computer won the game!");
} else {
    console.log("It's a tie overall!");
}