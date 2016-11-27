var board; // [row, col]
var EMPTY = '';
var PAWN = 'P';
var KNIGHT = 'Kn';
var ROOK = 'R';
var BISHOP = 'B';
var KING = 'Ki';
var QUEEN = 'Q';

var turn = 0;
var pendingMove = new Point();

$(function () {
    console.log("Loaded!");
    initBoard();
    setupBoard();
    drawBoard();
});

/* also check to see if the move is ok */
function doTurn(from, to) {

    console.log("DOTURN; going from", from.row, from.col, "To", to.row, to.col);

    /* First check if move is according to the rules */
    switch(board[from.row][from.col]) {
        case EMPTY:
            console.log("Cant move nothing :)");
            return;
        case PAWN:
            if(to.row == from.row-1 && to.col == from.col) {
                console.log("asDASD");
                break;
            }
        case KNIGHT:
            if(to.row == from.row-2 && to.col == from.col+1) {
                break;
            }
        case BISHOP:
            if(Math.abs(to.row - from.row) == Math.abs(to.col - from.col)) {
                break;
            }
            //else if(to.row == )
        default:
            return;
    }


    /* Destination Point change */
    board[to.row][to.col] = board[from.row][from.col];
    /* Clean Source Point */
    board[from.row][from.col] = EMPTY;
    drawBoard();
}

function initBoard() {
    board = [];
    for (var i = 0; i < 8; i++) {
        //board;
        board[i] = [];

        for (var c = 0; c < 8; c++) {
            board[i].push(EMPTY);
        }
    }
}

function clickEvent(e) {
    console.log("Clicked!");
    var row = $(this).parent('tr').index();
    var col = $(this).index();


    console.log(row, col);

    //if(board[row][col] == EMPTY) {
    if (pendingMove.col != -1) {
        doTurn(pendingMove, new Point(row, col));
        pendingMove = new Point();
    } else {
        console.log("Pend Move");
        pendingMove = new Point(row, col);
    }
    //}
}

function initEvents() {
    $("#board tr td").click(clickEvent);
}

function setupBoard() {
    for (var i = 0; i <= 8; i++) {
        board[1][i] = PAWN;
        board[6][i] = PAWN;
    }

    for (var i = 0; i < 2; i++) {
        board[i * 7][0] = ROOK;
        board[i * 7][1] = KNIGHT;
        board[i * 7][2] = BISHOP;
        board[i * 7][3] = QUEEN;
        board[i * 7][4] = KING;
        board[i * 7][5] = BISHOP;
        board[i * 7][6] = KNIGHT;
        board[i * 7][7] = ROOK;
    }

    console.log(board);
}

function drawBoard() {
    var content = "";


    for (var i = 0; i < 8; i++) {
        content += "<tr>";
        for (var j = 0; j < 8; j++) {
            content += "<td>" + board[i][j] + "</td>";
        }
        content += "</tr>";
    }

    $("#board").html(content);
    initEvents();
}
