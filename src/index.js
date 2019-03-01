module.exports = function solveSudoku(matrix) {
    const d =convertToMatrixCell(matrix);
    recalc(d);

    const m = recursiveBruteForce(d);

    const rez = convertFromMatrixCell(m);
   // print(rez);



  return rez;
}
class Cell {
    constructor(value,possibleValues, row,col) {
        this.value = value;
        this.row = row;
        this.col = col;
        if (!value) {
            this.possibleValues = possibleValues;
        } else {
            this.possibleValues = [];
        }
    }

    static calculatePossibleValues(cell, matrixOfCell, row, col) {

        if (cell.value != 0 ){
            cell.possibleValues = [];
        } else {
            let rowVals = getRowByNumber(matrixOfCell, row).map(t=>t.value);
            console.log('rowVals'+row+' '+col);
            console.log(rowVals);
            let colVals = getColByNumber(matrixOfCell, col).map(t=>t.value);
            console.log('colVals');
            console.log(colVals);
            let square = getSquareByRowCol(matrixOfCell, col, row).map(t=>t.value);

            console.log('square');
            console.log(square);

            console.log('imposs');

            let setOfImpossibleValues = new Set([...rowVals, ...colVals, ...square]);
            console.log(setOfImpossibleValues);
            let difference = new Set([...set_of_values].filter(x => !setOfImpossibleValues.has(x)));
            cell.possibleValues = [...difference];
        }
    }
    static cloneCell(cell){
        let cellNew = {...cell};
        cellNew.possibleValues = [...cell.possibleValues];
        console.log(' clone res '+cellNew.row);
        return cellNew;
    }
}
function getRowByNumber(matrixOfCell, row){
    let arr = [];
    console.log('before ret');
    console.log([...matrixOfCell[row]]);
    return [...matrixOfCell[row]];
}
function getColByNumber(matrixOfCell, col){
    console.log("getColByNumber")
    let arr = [];

    return [1,2,3,4,5,6,7,8,9].map(i=>i-1).map(i=>matrixOfCell[i][col]);
}
function getSquareByRowCol(matrixOfCell, col, row){
    let result = [];
    const colLeftTop = col - (col %3);
    const rowLeftTop = row - (row%3);
    for (let i = rowLeftTop; i<rowLeftTop+3; i++)
        for (let j = colLeftTop; j<colLeftTop+3; j++){
            result.push(matrixOfCell[i][j])
        }
    return result;
}
function convertToMatrixCell(matrix){
    let res = [];
    [1,2,3,4,5,6,7,8,9].forEach(i=>res.push([]));
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            let cell = new Cell(matrix[i][j],[], i, j)
            res[i].push(cell);
        }
    }
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            const cell = res[i][j];
            Cell.calculatePossibleValues(cell, res, i,j);
        }
    }
    return res;

}
function getEmptyCells(matrixOfCell){
    const res = [];
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
           if (!(matrixOfCell[i][j].value)){
               res.push(matrixOfCell[i][j]);
           }
        }
    }
    return res;
}

function recursiveBruteForce(matrixOfCell){
    let emptyCells = getEmptyCells(matrixOfCell);

    if (emptyCells.length == 0){
        return matrixOfCell;
    }
   // emptyCells.forEach(cell=>{

    const cell = emptyCells[0];
    let poss =  [...cell.possibleValues];

   // poss.forEach(val=>{
     for (let idx = 0; idx< poss.length; idx++ ){
         console.log('set value = '+cell.possibleValues[idx]);
        let cellNew = Cell.cloneCell(cell);
        cellNew.value = cell.possibleValues[idx];
        cellNew.possibleValues = [];
        const newMatrix = cloneMatrix(matrixOfCell);
        newMatrix[cellNew.row][cellNew.col] = cellNew;
        recalc(newMatrix);
       // print(newMatrix);
        if (isVrong(newMatrix)){

            return false;
        }

        const r =  recursiveBruteForce(newMatrix);
        if (!r){

            continue;

        } else {

            //print(r)
            return r;
        }



     }

   // })
}
function cloneMatrix(matrixOfCell){
    const res = [];
    [1,2,3,4,5,6,7,8,9].forEach(i=>res.push([]));

    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            const cell = matrixOfCell[i][j];
            const clone = Cell.cloneCell(cell);
            res[i].push(clone);
        }
    }
    return res;
}

function recalc(matrixCell){
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            Cell.calculatePossibleValues(matrixCell[i][j],matrixCell,i,j);
        }
    }

}
function isVrong(matrixCell){
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            if (!matrixCell[i][j] && matrixCell[i][j].possibleValues.length == 0){
                return true;
            }
        }
    }
    return false;

}
function print(matrix){
    for (let i = 0; i<9; i++){
        console.log(matrix[i]);
    }


}

function convertFromMatrixCell(matrix){
    let res = [];
    [1,2,3,4,5,6,7,8,9].forEach(i=>res.push([]));
    for (let i = 0; i<9; i++){
        for (let j = 0; j<9; j++){
            res[i].push(matrix[i][j].value);
        }
    }
    return res;


}


const arr_of_values = [1,2,3,4,5,6,7,8,9];
const set_of_values = new Set([1,2,3,4,5,6,7,8,9]);


