let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-containner");
let msg = document.querySelector("#msg");

let turnO = true; // true -> O's turn, false -> X's turn

// All winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Add click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#000000";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#000000";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    // Check for draw
    let isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        showDraw();
    }
};

// Disable all boxes after win
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enable all boxes (for new/reset game)
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! '${winner}' wins!`;
    msgContainer.style.display = "block";
    disableBoxes();
};

// Show draw message
const showDraw = () => {
    msg.innerText = "😐 It's a draw!";
    msgContainer.style.display = "block";
    disableBoxes();
};

// Reset or New Game
const resetGame = () => {
    enableBoxes();
    msgContainer.style.display = "none";
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
