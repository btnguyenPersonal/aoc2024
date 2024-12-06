const fs = require('fs');

let input = fs.readFileSync('./5input').toString().split('\n');

let s = false;
let rules = [];
let codes = [];
for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
        s = true;
    } else if (s) {
        codes.push(input[i]);
    } else {
        rules.push(input[i]);
    }
}
rules = rules.map(rule => rule.split('|'));
codes = codes.map(code => code.split(','));

function checkRules(code, rules) {
    return rules.every(rule => {
        let foundFirst = false;
        let foundSecond = false;
        if (code.includes(rule[0]) && code.includes(rule[1])) {
            for (let i = 0; i < code.length; i++) {
                if (code[i] === rule[0]) {
                    foundFirst = true;
                } else if (code[i] === rule[1]) {
                    foundSecond = true;
                }
                if (foundSecond && !foundFirst) {
                    return false;
                }
            }
        }
        return true;
    });
}

function sortCode(code, rules) {
    let tempCode = code;
    while (!checkRules(tempCode, rules)) {
        for (let l = 0; l < rules.length; l++) {
            const rule = rules[l];
            let foundFirst = false;
            let firstIndex = -1;
            let foundSecond = false;
            let secondIndex = -1;
            if (tempCode.includes(rule[0]) && tempCode.includes(rule[1])) {
                let swap = false;
                for (let i = 0; i < tempCode.length; i++) {
                    if (tempCode[i] === rule[0]) {
                        foundFirst = true;
                        firstIndex = i;
                    } else if (tempCode[i] === rule[1]) {
                        foundSecond = true;
                        secondIndex = i;
                    }
                    if (foundSecond && !foundFirst) {
                        swap = true;
                    }
                }
                if (swap) {
                    let temp = tempCode[firstIndex];
                    tempCode[firstIndex] = tempCode[secondIndex];
                    tempCode[secondIndex] = temp;
                    break;
                }
            }
        }
    }
    return tempCode;
}

// part 1
// let total = 0;
// for (let i = 0; i < codes.length; i++) {
//     if (checkRules(codes[i], rules)) {
//         total += parseInt(codes[i][Math.floor(codes[i].length / 2)]);
//     }
// }
// console.log(total);

// part 2
let total = 0;
for (let i = 0; i < codes.length; i++) {
    if (!checkRules(codes[i], rules)) {
        codes[i] = sortCode(codes[i], rules);
        total += parseInt(codes[i][Math.floor(codes[i].length / 2)]);
    }
}
console.log(total);
