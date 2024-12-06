const fs = require('fs');
let input = fs.readFileSync("./1input").toString().split("\n");
input = input.map((line) => line.split('   '));
let list1 = [];
let list2 = [];
input.forEach(line => {
    list1.push(line[0]);
    list2.push(line[1]);
});
// answer 1
// list1.sort();
// list2.sort();
// let sum = 0;
// for (let i = 0; i < list1.length; i++) {
//     sum += Math.abs(list1[i] - list2[i]);
// }
// console.log(sum);

// answer 2

let similarity = 0;
for (let i = 0; i < list1.length; i++) {
    let occurences = 0;
    for (let j = 0; j < list2.length; j++) {
        if (list1[i] === list2[j]) {
            occurences++;
        }
    }
    similarity += list1[i] * occurences;
}
console.log(similarity);
