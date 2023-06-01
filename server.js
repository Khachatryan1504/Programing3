var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3001,() => {
   console.log("Server is started")
});

matrix = [];
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
predatorArr = [];
bombArr = [];
walkerArr = []


let Grass = require('./grass')
let GrassEater = require('./grasseater')
let AllEater = require('./allEater')
let Predator = require('./predator')
let Bomb = require('./bomb');
let Walker = require('./walker')



function createMatrix() {
   function generateMatrix(matLen, gr, grEat, allEat, predator, bomb, walker) {
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
      for (let i = 0; i < walker; i++) {
         let x = Math.floor(Math.random() * matLen);
         let y = Math.floor(Math.random() * matLen)
         if (matrix[y][x] == 0) {
            matrix[y][x] = 6;
         }
      }
      return matrix;

   }

   generateMatrix(30, 90, 20, 10, 20, 5, 30);


   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
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
         else if (matrix[y][x] == 6) {
            let walker = new Walker(x, y);
            walkerArr.push(walker);
         }
      }
   }
}


function playGame() {
   for (let i = 0; i < grassArr.length; i++) {
      let counter = 0
      counter++
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
   for (let i = 0; i < walkerArr.length; i++) {
      walkerArr[i].move();
   }
  
  let characterNumber = {
     grassNum: grassArr.length,
     grassEaterNum: grassEaterArr.length,
     allEaterNum: allEaterArr.length,
     predatorNum: predatorArr.length,
     bombNum: bombArr.length,
     walkerNum: walkerArr.length
   }
   io.emit('statistic', characterNumber)
   io.emit('matrix', matrix)
   
   return matrix
}

createMatrix()




let time = 500
let intervalChange = setInterval(playGame, time);




function slower(){
   time = 1000
   clearInterval(intervalChange)
   intervalChange = setInterval(playGame, time);
}



function lightning(){
   let minX = Math.floor(Math.random() * matrix[0].length);
   let minY = Math.floor(Math.random() * matrix.length);
   let maxX = Math.floor(Math.random() * (matrix[0].length - minX) + minX + 1);
   let maxY = Math.floor(Math.random() * (matrix.length - minY) + minY + 1);
   for(let y = minY;y < maxY;y++){
      for(let x = minX;x < maxX;x++){
         if (matrix[x][y] == 1) {
            for (let i in grassArr) {
               if (x == grassArr[i].x && y == grassArr[i].y) {
                  grassArr.splice(i, 1);
                  matrix[y][x] = 0
                  break;
               }
            }
            
         }
         
         else if(matrix[y][x] == 2){
            for (let i in grassEaterArr) {
               if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                  grassEaterArr.splice(i, 1);
                  matrix[y][x] = 0
                  break;
               }
            }
         }
         else if(matrix[y][x] == 3){
            for (let i in allEaterArr) {
               if (x == allEaterArr[i].x && y == allEaterArr[i].y) {
                  allEaterArr.splice(i, 1);
                  matrix[y][x] = 0
                  break;
               }
            }
            
         } 
         else if(matrix[y][x] == 4){
            for (let i in predatorArr) {
               if (x == predatorArr[i].x && y == predatorArr[i].y) {
                  predatorArr.splice(i, 1);
                  matrix[y][x] = 0
                  break;
               }
            }
            
            
         } 
      }
      // return matrix
   }
}



io.on('connection', function(socket) {
   socket.emit('matrix', matrix)
   socket.on('light', lightning)
   socket.on("slow", slower)
   socket.on("fast", faster)
})









function faster(){
   time = 200
   clearInterval(intervalChange)
   intervalChange = setInterval(playGame, time);
   console.log("barev");
}
