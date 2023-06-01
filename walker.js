let Parent = require('./parent')

module.exports = class Walker extends Parent{
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

    move(){
        let found = this.chooseCell(0);
        let emptyCell = this.random(found);
        if(emptyCell){
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

}