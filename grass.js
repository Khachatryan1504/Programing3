let Parent = require('./parent')

module.exports = class Grass extends Parent{
    mul(){
        let count = 0
        this.multiply++;
        let emptyCells = this.chooseCell();
        let oneCell = this.random(emptyCells);
        if(oneCell && this.multiply==3){
            let x = oneCell[0];
            let y = oneCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x ,y);
            grassArr.push(grass);
            console.log(count);
            count++;
            // this.multiply = 0;
        }
    }
}
