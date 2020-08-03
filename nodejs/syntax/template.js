var name = 'k8805';
var letter = 'Dear ' + name +'\
\
Lorem ipsum dolor sit amet,\n consectetur adipisicing elit,\n\
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Ut enim ad minim veniam, quis nostrud exercitation ullamco ' + name + ' laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in ' + name + ' voluptate velit esse cillum dolore eu fugiat nulla pariatur.\
\Excepteur sint occaecat ' + 'egoing' + ' cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' + name;
// console.log(letter);

letter = `Dear ${name}

Lorem ipsum dolor sit amet,n consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco  ${name} laboris nisi ut aliquip ex ea commodo consequat. ${1 + 1} Duis aute irure dolor in reprehenderit in ${name} voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat  egoing cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ${name}`;
console.log(letter);
