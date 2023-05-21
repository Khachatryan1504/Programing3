var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000,() => {
   console.log("Server is started")
});

matrix = [];
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
predatorArr = [];
bombArr = [];


let Grass = require('./grass')
let GrassEater = require('./grasseater')
let AllEater = require('./allEater')
let Predator = require('./predator')
let Bomb = require('./bomb')

function createMatrix() {
   function generateMatrix(matLen, gr, grEat, allEat, predator, bomb) {
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

   generateMatrix(10, 50, 7, 7, 7, 5);


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


function playGame() {
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
  io.emit('matrix', matrix)
return matrix
}

createMatrix()

setInterval(playGame, 500);

io.on('connection', function(socket) {
   socket.emit('matrix', matrix)
})