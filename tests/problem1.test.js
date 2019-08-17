const rotate = require('../problems/problem1')

let grid;

beforeAll(() => {
    grid = [
        [0, 16, 255],
        [8, 128, 32],
        [0, 0, 0]
    ];
});

test('Ensure rotated matrix picture to be correct with k = 1!', () => {
    expect(rotate(grid, 1)).toEqual(
        [ 
            [ 0, 8, 0 ], 
            [ 0, 128, 16 ], 
            [ 0, 32, 255 ] 
        ]
    );
});
  
test('Ensure rotated matrix picture to be correct with k = 2!', () => {
    expect(rotate(grid, 2)).toEqual(
        [ 
            [ 0, 0, 0 ], 
            [ 32, 128, 8 ], 
            [ 255, 16, 0 ] 
        ]
    );
});

test('Ensure rotated matrix picture is not changed with k = 4!', () => {
    expect(rotate(grid, 4)).toEqual(
        [ 
            [0, 16, 255],
            [8, 128, 32],
            [0, 0, 0]
        ]
    );
});