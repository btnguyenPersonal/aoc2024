const fs = require('fs');

let input = fs.readFileSync('./2input').toString().split('\n');
input = input.map(line => line.split(' ').map(s => parseInt(s)));

function tryPermutations(line) {
    if (isSafe(line)) {
        return true;
    }
    for (let i = 0; i < line.length; i++) {
        let temp = JSON.parse(JSON.stringify(line));
        temp.splice(i, 1);
        if (isSafe(temp)) {
            return true;
        }
    }
    return false;
}

function isSafe(line) {
    let decreasing;
    for (let i = 0; i + 1 < line.length; i++) {
        let first = line[i];
        let second = line[i + 1];
        if (Math.abs(first - second) > 3 || Math.abs(first - second) === 0) {
            return false;
        } else if (decreasing === undefined) {
            decreasing = first - second > 0;
        } else if (decreasing === true) {
            if (first - second < 0) {
                return false;
            }
        } else if (decreasing === false) {
            if (first - second > 0) {
                return false;
            }
        }
    }
    return true;
}

let sum = 0;
input.forEach(line => {
    if (tryPermutations(line)) {
        sum++
    }
});
console.log(sum);
