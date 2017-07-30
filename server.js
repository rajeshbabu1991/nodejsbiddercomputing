var operatingArray = [];
var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('small.txt');

lr.on('error', function (err) {
    // 'err' contains error object
});

// Printing Heading.
console.log("TIME         VALUE    N_O   SUM     MIN_VALUE  MAX_VALUE");

lr.on('line', function (line) {
    let lineArray = line.split("\t");
    let time = +lineArray[0]; // Converting string to number
    let value = +lineArray[1]; // Converting string to number
    let newItem = {
        time : time,
        value : value
    };

    // Push the incoming input value in the operatingArray.
    operatingArray.push(newItem);

    // Filter function for operating array.
    function filterOperatingArray(item) {
        return (newItem.time - item.time < 60);
    }
    // Filter operating array.
    operatingArray = operatingArray.filter(filterOperatingArray);
    
    // Defaulting to these values.
    let minValue = newItem.value;
    let maxValue = newItem.value;
    let sum = newItem.value;
    let count = operatingArray.length;
    let otime = newItem.time;
    let ovalue = newItem.value;

    // Reduce the minvalue, maxvalue and sum to single values when the array length is more than one.
    if (operatingArray.length > 1) {
        // Minimum value in the operating array.
        minValue = operatingArray.reduce(function(prev, curr) {
            return prev.value < curr.value ? prev : curr;
        });
        minValue = minValue.value; // extracted from the object

        // Maximum value in the operating array.
        maxValue = operatingArray.reduce(function(prev, curr) {
            return prev.value > curr.value ? prev : curr;
        });
        maxValue = maxValue.value; // extracted from the object

        // Sum of the values in the current operating array.
        sum = 0;
        operatingArray.forEach(function(item) {
            sum = sum + item.value;
        });
    }

    // Printing output.
    console.log(otime+"   "+ovalue+"   "+count+"   "+sum.toFixed(5)+"   "+minValue.toFixed(5)+"   "+maxValue.toFixed(5));
});

lr.on('end', function () {
    // Do after line read.
});