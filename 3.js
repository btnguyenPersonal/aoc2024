const fs = require('fs');

let input = fs.readFileSync("./3input").toString();

let sum = 0;
let enabled = true;
for (let i = 0; i < input.length; i++) {
    if (enabled && input.substring(i, i + 4) === "mul(") {
        num1 = '';
        num2 = '';
        let j = i + 4;
        while (j < input.length) {
            if (isNaN(parseInt(input[j]))) {
                break;
            }
            num1 += input[j];
            j++;
        }
        if (input[j] === ',') {
            j++;
            while (j < input.length) {
                if (isNaN(parseInt(input[j]))) {
                    break;
                }
                num2 += input[j];
                j++;
            }
            if (input[j] === ')') {
                sum += parseInt(num1) * parseInt(num2);
            }
        }
    } else if (input.substring(i, i + 4) === 'do()') {
        enabled = true;
    } else if (input.substring(i, i + 7) === 'don\'t()') {
        enabled = false;
    }
}
console.log(sum);
