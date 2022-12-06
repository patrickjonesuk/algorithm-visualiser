
export const InputType = {
    NUMBER: 0x1,
    STRING: 0x2,
}


export class InputContainer {

    /**
     * @param {Number} typeMask allowed input data types
     * @param {Number} minCol minmum number of column of input data 
     * @param {Number} maxCol maximum number of column of input data 
     * @param {Number} minRow minmum number of rows of input data
     * @param {Number} maxRow maximum number of rows of input data
     */
    constructor(typeMask, minCol, maxCol, minRow, maxRow) {
        this.typeMask = typeMask;
        this.minCol = minCol;
        this.maxCol = maxCol;
        this.minRow = minRow;
        this.maxRow = maxRow;

        this.data = new Array(minRow).fill(null).map(() => new Array(minCol).fill(null))
    }
}

// InputContainer.LIST | (InputType.NUMBER | InputType.STRING)
