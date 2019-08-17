/**
 * Rotate the matrix picture.
 * @param {array} grid the input matrix.
 * @param {number} k number of rotating turn.
 * @return {array} Ouput matrix with rotated result.
**/
const rotate = (grid, k) => {
    k %= 4;
    if (k === 4 || k === 0) return grid;
    const rotated = grid.map((g, i) => { // {1}
        const dummy = [];
        for (let j = 0; j < grid.length; j++) { // {2}
            dummy.push(grid[j][i])
        }
        return dummy.reverse() // {3}
    })
   return rotate(rotated, k - 1); // {4}
}

module.exports = rotate;


