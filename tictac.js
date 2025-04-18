const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = true;
let count = 0;
let gameEnded = false;
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const resultDisplay = document.querySelector(".msg1");
const currentPlayerDisplay = document.querySelector(".current-player");

const disableBoxes = () => {
  boxes.forEach(box => {
      box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach(box => {
      box.disabled = false;
      box.innerText = "";
      box.style.backgroundColor = "#ffffff";
  });
};

const updateCurrentPlayer = () => {
  currentPlayerDisplay.textContent = `Player ${turn ? "X" : "O"}'s turn`;
};

const showResult = (message) => {
  resultDisplay.textContent = message;
};

const resetGame = () => {
  turn = true;
  count = 0;
  gameEnded = false;
  enableBoxes();
  showResult("");
  updateCurrentPlayer();
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
      if (gameEnded) return;

      if (box.innerText === "") {
          box.innerText = turn ? "X" : "O";
          box.style.color = turn ? "#2c6e7c" : "#ff6b6b";
          turn = !turn;
          count++;
          updateCurrentPlayer();
          
          const winner = checkWinner();
          if (winner) {
              gameEnded = true;
              showResult(`Player ${winner} wins!`);
              disableBoxes();
              highlightWinningBoxes(winner);
          } else if (count === 9) {
              gameEnded = true;
              showResult("Game ended in a draw!");
          }
      }
  });
});

const checkWinner = () => {
  for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
          boxes[a].innerText &&
          boxes[a].innerText === boxes[b].innerText &&
          boxes[a].innerText === boxes[c].innerText
      ) {
          return boxes[a].innerText;
      }
  }
  return null;
};

const highlightWinningBoxes = (winner) => {
  for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
          boxes[a].innerText === winner &&
          boxes[b].innerText === winner &&
          boxes[c].innerText === winner
      ) {
          [a, b, c].forEach(index => {
              boxes[index].style.backgroundColor = winner === "X" ? "#d4edff" : "#ffd4d4";
          });
          break;
      }
  }
};

resetBtn.addEventListener("click", resetGame);

// Initialize the game
updateCurrentPlayer();