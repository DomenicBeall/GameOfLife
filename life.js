class Life {

    constructor(width, height) {
        this.board = CreateBitArray(width, height);
        this.isIterating = false;
    }

    Simulate() {
        let newBoard = [];

        for (let y = 0; y < this.board.length; y++) {
            const row = [];
            
            for (let x = 0; x < this.board[y].length; x++) {       

                var neighbours = this.getNeighbourCount(x, y);

                if (this.board[y][x] == 1)
                {
                    if (neighbours == 2 || neighbours == 3)
                        row.push(1);
                    else
                        row.push(0);
                } else {
                    if (neighbours == 3)
                        row.push(1);
                    else
                        row.push(0);
                }

                
            }


            newBoard.push(row);
        }

        this.board = newBoard;
    }

    getNeighbourCount(nx, ny) {
        var count = 0;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x == 0 && y == 0) {
                    continue;
                }

                if (nx + x < 64 && nx + x > -1 && ny + y < 64 && ny + y > -1)
                {
                    if (this.board[ny + y][nx + x] == 1)
                        count += 1;
                }
            }       
        }

        return count;
    }

} 

function CreateBitArray(width, height) {
    var bitArray = [];
    
    for (let y = 0; y < width; y++) {
        var bitRow = [];

        for (let x = 0; x < height; x++) {
               bitRow.push(0);   
        }

        bitArray.push(bitRow);
    }

    return bitArray;
}