var board; // [row, col]
var EMPTY = '',
    PAWN = 'P',
    KNIGHT = 'Kn',
    ROOK = 'R',
    BISHOP = 'B',
    KING = 'Ki',
    QUEEN = 'Q';

var WHITE_PIECE = "<span class='white-piece'>W",
    END_WHITE_PIECE = "</span>";

var WHITE = "White";
var BLACK = "Black";
var turn = WHITE;
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
    try {
        var piece = board[from.row][from.col].replace(/<.+?>/g, ""); // get the piece by replacing the html tags
    } catch (err) {
        return;
    }
    console.log(piece);
    
    if(piece.search("W") != -1) {
        // White moved
        if(turn != WHITE) {
            console.log("Not your turn yet dude :)");
            return; // nope :)
        }
    }
    else {
        // Black moved
        if(turn != BLACK) {
            console.log("Not your turn yet dude :)");
            return; // nope :)
        }
    }
    
    if (piece == EMPTY) {
        console.log("Cant move nothing :)");
        //pendingMove.reset();
        return;
    } else if (piece == PAWN) {
        if (to.row == from.row + 1 && to.col == from.col) {
            console.log("Pawn Move");
        } else if (from.row == 1 && to.row == from.row + 2 && to.col == from.col) {
            console.log("Pawn Move");
        }
        
        /* Eating */
        else if(to.row == from.row + 1 && (board[to.row][to.col] != EMPTY && (to.col == from.col + 1 || to.col == from.col - 1)))
        {
            console.log("Eating");
        }
        
        else {
            return;
        }
    } else if (piece == "W" + PAWN) {
        if (to.row == from.row - 1 && to.col == from.col) {
            console.log("PawnWhite Move");
        }
        else if (from.row == 6 && to.row == from.row - 2 && to.col == from.col) {
            console.log("Pawn Move");
        }
        /* Eating */
        else if(to.row == from.row - 1 && (board[to.row][to.col] != EMPTY && (to.col == from.col + 1 || to.col == from.col - 1)))
        {
            console.log("Eating");
        }
        else {
            return;
        }
    }
    else if(piece == KNIGHT || piece == "W" + KNIGHT) {
        if (!(to.row == from.row - 2 && to.col == from.col + 1)) {
            return;
        }
    }
    else if(piece == BISHOP || piece == "W" + BISHOP) {
        console.log("Bishop")
        if (!(Math.abs(to.row - from.row) == Math.abs(to.col - from.col))) {
            return;
        }
    }
    else if(piece == ROOK || piece == "W" + ROOK) {
        console.log("Rook");
        if(!((to.row == from.row && to.col != from.col) || to.row != from.row && to.col == from.col)) {
            return;
        }
    }
    else if(piece == KING || piece == "W" + KING) {
        console.log("King");
        if(!((Math.abs(to.row-from.row) == 1) || (Math.abs(to.col-from.col) == 1))) {
            return;
        }
    }
    else if(piece == QUEEN || piece == "W" + QUEEN) {
        console.log("Queen");
        /* Basically rook and bishop rules ored */
        if (!(Math.abs(to.row - from.row) == Math.abs(to.col - from.col))) {
            if(!((to.row == from.row && to.col != from.col) || to.row != from.row && to.col == from.col)) {
                return;
            }
        }
    }
    else {
        return;
    }

    /* Destination Point change */
    board[to.row][to.col] = board[from.row][from.col];
    /* Clean Source Point */
    board[from.row][from.col] = EMPTY;
    drawBoard();
    turn = (turn == WHITE ? BLACK : WHITE);
    $("#turn").html(turn + " Turn");
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
    if (pendingMove.col != -4) {
        doTurn(pendingMove, new Point(row, col));
        pendingMove = new Point();
    } else {
        console.log("Pend Move");
        console.log(row,col);
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
        board[6][i] = WHITE_PIECE + PAWN + END_WHITE_PIECE;
    }

    for (var i = 0; i < 2; i++) {
        var h = (i == 1 ? WHITE_PIECE : ""); // header
        var f = (i == 1 ? END_WHITE_PIECE : ""); // footer
        board[i * 7][0] = h + ROOK + f;
        board[i * 7][1] = h + KNIGHT + f;
        board[i * 7][2] = h + BISHOP + f;
        board[i * 7][3] = h + QUEEN + f;
        board[i * 7][4] = h + KING + f;
        board[i * 7][5] = h + BISHOP + f;
        board[i * 7][6] = h + KNIGHT + f;
        board[i * 7][7] = h + ROOK + f;
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