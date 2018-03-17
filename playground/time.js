const moment = require('moment');

const date = moment();

// date.add(1, 'year');
// console.log(date.format('MMM Do, YYYY'));

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

console.log(date.format('h:mm a'));