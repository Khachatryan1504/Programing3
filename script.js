let socket = io();
let side = 50;

function setup() {
    createCanvas(side * 50 , side * 50 );
    background("grey")
}
let colors = {
    green: "green",
    yellow: "yellow",
    red: "red",
    blue: "blue",
    black: "black"
}


function changeColor(){
    if (colors.green == "green"){
        colors.green = "#77fc03";
        colors.yellow = "#ff911c";
        colors.red = "#fc2803";
        colors.blue = "#03e7fc";
        colors.black = "#3a3a4a";
    }
    else{
        colors.green = "green";
        colors.yellow = "yellow";
        colors.red = "red";
        colors.blue = "blue";
        colors.black = "black";
    }
    console.log("weather changed");
}
let weather = document.getElementById("weather")
console.log(weather)
weather.addEventListener('click', changeColor)



function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(colors.green);
            }
            else if (matrix[y][x] == 2) {
                fill(colors.yellow);
            }
            else if (matrix[y][x] == 3) {
                fill(colors.red);
            }
            else if (matrix[y][x] == 4) {
                fill(colors.blue);
            }
            else if (matrix[y][x] == 5) {
                fill(colors.black);
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
let pGrass = document.getElementById("grass")
let pGrassEater = document.getElementById("grassEater")
let pAllEater = document.getElementById("allEater")
let pPredator = document.getElementById("predator")
let pBomb = document.getElementById("bomb")


socket.on('statistic', function(characterNumber){
    pGrass.innerText = "number of grass: " + characterNumber.grassNum
    pGrassEater.innerText = "number of grasseater: " + characterNumber.grassEaterNum
    pAllEater.innerText = "number of alleater: " + characterNumber.allEaterNum
    pPredator.innerText = "number of predator: " + characterNumber.predatorNum
    pBomb.innerText = "number of bombs: " + characterNumber.bombNum
})



let lightButton = document.getElementById("lightning")
lightButton.addEventListener("click", calllightning) 

function calllightning() {
    socket.emit("light")
}


