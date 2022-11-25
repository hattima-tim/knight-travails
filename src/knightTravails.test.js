const knightMoves = require('./knightTravails');

describe('knight can travel from square [0,0] to square [1,2] in 1 move', () => {
    test('move count', () => {
        expect(knightMoves([0, 0], [1, 2]).movesCount).toBe(1);
    })

    test('path', () => {
        expect(knightMoves([0, 0], [1, 2]).path).toStrictEqual(["0,0", "1,2"]);
    })
})

describe('knight can travel from square [0,0] to square [3,3] in 2 moves', () => {
    test('move count', () => {
        expect(knightMoves([0, 0], [3, 3]).movesCount).toBe(2);
    })

    test('path', () => {
        expect(knightMoves([0, 0], [3, 3]).path).toStrictEqual(["0,0", "2,1", "3,3"]);
    })
})

describe('knight can travel from square [3,3] to square [0,0] in 2 moves', () => {
    test('move count', () => {
        expect(knightMoves([3, 3], [0, 0]).movesCount).toBe(2);
    })

    test('path', () => {
        expect(knightMoves([3, 3], [0, 0]).path).toStrictEqual(["3,3", "2,1", "0,0"]);
    })
})

describe('knight can travel from square [3,3] to square [4,3] in 3 moves', () => {
    test('move count', () => {
        expect(knightMoves([3, 3], [4, 3]).movesCount).toBe(3);
    })

    test('path', () => {
        expect(knightMoves([3, 3], [4, 3]).path).toStrictEqual(["3,3", "5,4", "6,2", "4,3"]);
    })
})
