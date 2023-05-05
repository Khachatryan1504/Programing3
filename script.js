function generateMatrix(matLen, gr, grEat, allEat, predator, bomb) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix.push([]);
        for (let j = 0; j < matLen; j++) {
            matrix[i].push(0);

        }
    }


    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < allEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
    for (let i = 0; i < bomb; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    return matrix;

}

let matrix = generateMatrix(10, 100, 7, 7, 7, 5);



let side = 50;
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let predatorArr = [];
let bombArr = [];
function setup() {
    frameRate(5);
    createCanvas(side * matrix[0].length + 1, side * matrix.length + 1);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let allEater = new AllEater(x, y);
                allEaterArr.push(allEater);
            }
            else if (matrix[y][x] == 4) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 5) {
                let bomb = new Bomb(x, y);
                bombArr.push(bomb);
            }
            
        }
    }

}
function draw() {

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

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < allEaterArr.length; i++) {
        allEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].explode();
    }
}




