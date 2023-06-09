let Parent = require('./parent')

module.exports = class Predator extends Parent{
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];    
    }

    chooseCell(character){
        let found = [];
        for(let i = 0;i < this.directions.length;i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && y >= 0 && x<matrix[0].length && y<matrix.length){
                if(matrix[y][x]  == character){
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
 
    eat(){
        let found = this.chooseCell(2);
        let emptyCell = this.random(found);
        if(emptyCell){
            this.energy++;
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for(let i in grassEaterArr){
                if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                    grassEaterArr.splice(i,1);
                    break;
                }
            }
            if(this.energy > 16){
                this.mul();
            }
        }
        else{
            this.move();
        }
    }
    move(){
        let found = this.chooseCell(0);
        let emptyCell = this.random(found);
        if(emptyCell){
            this.energy--;
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if(this.energy <= 0){
                this.die();
            }
        }
        else{
            this.energy--;
            if(this.energy <= 0){
                this.die();
            }
        }
    }
    mul(){
        let found = this.chooseCell(0);
        let emptyCell = this.random(found);
        if(emptyCell){
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 2;
            let predator = new Predator(newX,newY);
            this.energy = 5;
            predatorArr.push(predator);
        }
    }
    
    die(){
        for(let i in predatorArr){
            if(predatorArr[i].x == this.x && predatorArr[i].y == this.y){
                predatorArr.splice(i,1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }


}