const fs = require('fs');

let input = fs.readFileSync('./4input').toString().split('\n');

function isValid(input, r, c) {
    return !(r < 0 || c < 0 || r >= input.length || c >= input[r].length);
}

function checkWord(input, r, c, rIncrement, cIncrement, word) {
    let tempR = r;
    let tempC = c;
    for (let i = 0; i < word.length; i++) {
        if (isValid(input, tempR, tempC) && input[tempR][tempC] === word[i]) {
            tempR += rIncrement;
            tempC += cIncrement;
        } else {
            return false;
        }
    }
    return true;
}

// part 1
// let total = 0;
// for (let r = 0; r < input.length; r++) {
//     for (let c = 0; c < input[r].length; c++) {
//         for (let i = -1; i <= 1; i++) {
//             for (let j = -1; j <= 1; j++) {
//                 if (checkWord(input, r, c, i, j, 'XMAS')) {
//                     total++;
//                 }
//             }
//         }
//     }
// }
// console.log(total);

// part 2
function checkXMAS(input, r, c) {
    return (checkWord(input, r + 1, c + 1, -1, -1, 'SAM') || checkWord(input, r + 1, c + 1, -1, -1, 'MAS'))
        && (checkWord(input, r + 1, c - 1, -1, 1, 'SAM') || checkWord(input, r + 1, c - 1, -1, 1, 'MAS'))
}

let total = 0;
for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        if (checkXMAS(input, r, c)) {
            total++;
        }
    }
}
console.log(total);
