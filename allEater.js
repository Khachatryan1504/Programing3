class AllEater{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.energy = 8;
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

    chooseCell(character, character1){
        let found = [];
        this.getNewCoordinates();
        for(let i = 0;i < this.directions.length;i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && y >= 0 && x<matrix[0].length && y<matrix.length){
                if(matrix[y][x]  == character){
                    found.push(this.directions[i])
                }
                else if(matrix[y][x]  == character1){
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    eat(){
        let found = this.chooseCell(1,2);
        let emptyCell = random(found);
        if(emptyCell){
            this.energy+=1;
            let NewX = emptyCell[0];
            let NewY = emptyCell[1];
            matrix[NewY][NewX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = NewX;
            this.y = NewY;
            for(let i in grassArr){
                if(NewX == grassArr[i].x && NewY == grassArr[i].y){
                    grassArr.splice(i,1);
                    break;
                }
            }
            for(let i in grassEaterArr){
                if(NewX == grassEaterArr[i].x && NewY == grassEaterArr[i].y){
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
        let found = this.chooseCell(0, 0);
        let emptyCell = random(found);
        if(emptyCell){
            this.energy--;
            let NewX = emptyCell[0];
            let NewY = emptyCell[1];
            matrix[NewY][NewX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = NewX;
            this.y = NewY;
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
        let found = this.chooseCell(0 ,0);
        let emptyCell = random(found);
        if(emptyCell){
            let NewX = emptyCell[0];
            let NewY = emptyCell[1];
            matrix[NewY][NewX] = 3;
            let allEater = new AllEater(NewX,NewY);
            allEaterArr.push(allEater);
            this.energy = 8;
        }
    }



    die(){
        for(let i in allEaterArr){
            if(allEaterArr[i].x == this.x && allEaterArr[i].y == this.y){
                allEaterArr.splice(i,1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }


}