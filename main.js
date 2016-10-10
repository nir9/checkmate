var board; // [row, col]
var EMPTY = '';
var PAWN = 'P';
var KNIGHT = 'Kn';
var ROOK = 'R';
var BISHOP = 'B';
var KING = 'Ki';
var QUEEN = 'Q';

$(function() {
    console.log("Loaded!");
    setupBoard();    
});

function setupBoard() {
    for(var i = 0; i <= 8; i++) {
        board[1][i] = PAWN;
        board[6][i] = PAWN;
    }

    for(var i = 0; i<2; i++) {
        board[i*7][0] = ROOK;
        board[i*7][1] = KNIGHT;
        board[i*7][2] = BISHOP;
        board[i*7][3] = QUEEN;
        board[i*7][4] = KING;
        board[i*7][5] = BISHOP;
        board[i*7][6] = KNIGHT;
        board[i*7][7] = ROOK;
    }

    console.log(board);
}

function initBoard() {
    board = [];
    for(var i = 0; i < 8; i++) {
        //board;
        for(var c = 0; c < 8; c++) {
            board[i][c].push(EMPTY);
        }
    }
}