module.exports = class Parent {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.multiply=0;
        this.energy = 5;
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
    chooseCell(){
        let found = [];
        for(let i = 0;i < this.directions.length;i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && y >= 0 && x<matrix[0].length && y<matrix.length){
                if(matrix[y][x]  == 0){
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    random(arr) {
        let result = Math.floor(Math.random() * arr.length)
        return arr[result]
    }
}