let socket = io();
let side = 50;

function setup() {
    createCanvas(side * 10 , side * 10 );
    background("grey")
}
function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
            }
            else if (matrix[y][x] == 3) {
                fill('red');
            }
            else if (matrix[y][x] == 4) {
                fill('blue');
            }
            else if (matrix[y][x] == 5) {
                fill('black');
            }
            else {
                fill('white')
            }
            rect(x * side, y * side, side, side);
            fill('black');
            text(x + ';' + y, x * side + 10, y * side + 20);
        }
    }
}

socket.on('matrix', function(matrix){
    drawMatrix(matrix)
})


