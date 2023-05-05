class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    explode() {
        console.log(this.energy);

        if (this.energy == 0) {
            this.die()
            for (let i in this.directions) {
                let newX = this.directions[i][0];
                let newY = this.directions[i][1];
                this.x = newX;
                this.y = newY;
                if (newX >= 0 && newY >= 0 && newX < matrix[0].length && newY < matrix.length) {
                    if (matrix[newY][newX] == 1) {
                        matrix[newY][newX] = 0;
                        for (let i in grassArr) {
                            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[this.directions[i][1]][this.directions[i][0]] == 2) {
                        matrix[this.directions[i][1]][this.directions[i][0]] = 0;
                        for (let i in grassEaterArr) {
                            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[this.directions[i][1]][this.directions[i][0]] == 0) {
                        matrix[this.directions[i][1]][this.directions[i][0]] = 0;
                        for (let i in allEaterArr) {
                            if (newX == allEaterArr[i].x && newY == allEaterArr[i].y) {
                                allEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    
                }

            }

            
        }
        else {
            this.wait();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
    wait() {
        this.energy--;
    }
}