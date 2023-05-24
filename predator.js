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

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
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
            for(let i in grassArr){
                if(newX == grassArr[i].x && newY == grassArr[i].y){
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
            this.energy = 10;
            predatorArr.push(predator);
        }
    }
    
    die(){
        for(let i in predatorArr){
            if(predatorArr[i].x == this.x && predatorArr[i].y == this.y){
                console.log("splice");
                predatorArr.splice(i,1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }


}