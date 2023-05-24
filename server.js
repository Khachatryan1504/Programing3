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
let Bomb = require('./bomb');

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

   generateMatrix(10, 100, 0, 0, 0, 0);


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
      let counter = 0
      counter++
      console.log(counter);
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

  
  let characterNumber = {
     grassNum: grassArr.length,
     grassEaterNum: grassEaterArr.length,
     allEaterNum: allEaterArr.length,
     predatorNum: predatorArr.length,
     bombNum: bombArr.length
   }
   io.emit('statistic', characterNumber)
   io.emit('matrix', matrix)
   
   
   return matrix
}

createMatrix()

setInterval(playGame, 500);



function lightning(){
   

   let minX = Math.floor(Math.random() * matrix[0].length);
   let minY = Math.floor(Math.random() * matrix[0].length)
   let maxX = Math.floor(Math.random() * matrix[0].length);
   let maxY = Math.floor(Math.random() * matrix[0].length)
   for(let x = minX;x < maxX;x++){
      for(let y = minY;y < maxY;y++){
         matrix[x][y] = 0

         if (matrix[y][x] == 1) {
            for (let i in grassArr) {
               if (x == grassArr[i].x && y == grassArr[i].y) {
                  console.log("fdhgskh");
                  grassArr.splice(i, 1);
                   break;
               }
           }
            
         }

         else if(matrix[y][x] == 2){
            for (let i in grassEaterArr) {
               if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                   grassEaterArr.splice(i, 1);
                   break;
               }
           }
         }
         else if(matrix[y][x] == 3){
            for (let i in allEaterArr) {
               if (x == allEaterArr[i].x && y == allEaterArr[i].y) {
                  allEaterArr.splice(i, 1);
                   break;
               }
           }
            
         } 
         else if(matrix[y][x] == 4){
            for (let i in predatorArr) {
               if (x == predatorArr[i].x && y == predatorArr[i].y) {
                  predatorArr.splice(i, 1);
                   break;
               }
           }
            
         } 
      }
      return matrix
   }
















//    lightningArea = [
//       [x, y],
//       [x - 1, y - 1],
//       [x    , y - 1],
//       [x + 1, y - 1],
//       [x - 1, y    ],
//       [x + 1, y    ],
//       [x - 1, y + 1],
//       [x    , y + 1],
//       [x + 1, y + 1]
   
      
//    ];

//    for (let i in lightningArea) {
//       let newX = lightningArea[i][0];
//       let newY = lightningArea[i][1];
//       if (newX >= 0 && newY >= 0 && newX < matrix[0].length && newY < matrix.length) {
//          if (matrix[newY][newX] == 1) {
//             matrix[newY][newX] = 0;
//             for (let i in grassArr) {
//                if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                   grassArr.splice(i, 1);
//                   break;
//                }
//             }
//           }
//           else if (matrix[newY][newX] == 2) {
//             matrix[newY][newX] = 0;
            //   for (let i in grassEaterArr) {
            //       if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
            //           grassEaterArr.splice(i, 1);
            //           break;
            //       }
            //   }
//           }
//           else if (matrix[newY][newX] == 3) {
//             matrix[newY][newX] = 0;
//               for (let i in allEaterArr) {
//                   if (newX == allEaterArr[i].x && newY == allEaterArr[i].y) {
//                       allEaterArr.splice(i, 1);
//                       break;
//                   }
//               }
//           }
//           else if (matrix[newY][newX] == 4) {
//             matrix[newY][newX] = 0;
//             for (let i in predatorArr) {
//                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
//                   predatorArr.splice(i, 1);
//                   break;
//                }
//             }
//         }
          
//       }

//   }
}


io.on('connection', function(socket) {
   socket.emit('matrix', matrix)
   socket.on('light', lightning)
})








