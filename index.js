var playerText = $("#playerText");

var restartBtn = $("#restartBtn");

var boxes = Array.from($(".box"));

var winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const O_text = 'O';

const X_text = 'X';

let currentPlayer = X_text;

var spaces = Array(9).fill(null);



function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function startGame() {
    gameStarted = true;

    $(".box").on("click", boxClicked);
}

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon() !== false) {
            $("#playerText").text(currentPlayer + " has won");
            var winning_blocks = playerHasWon();
            for (var i = 0; i < winning_blocks.length; i++) {
                $("#" + winning_blocks[i]).addClass("winningBlocks");
            }
            return;
        }


        if (currentPlayer == O_text) {
            currentPlayer = X_text;
            $("#playerText").text("X's turn");
        }
        else {
            currentPlayer = O_text;
            $("#playerText").text("O's turn");
        }
    }
}
startGame();

$("#restartBtn").on("click", restartGame);

function restartGame() {
    spaces.fill(null);
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
    }
    $(".box").removeClass("winningBlocks");
    currentPlayer = X_text;
    $("#playerText").text("X's turn");
}







