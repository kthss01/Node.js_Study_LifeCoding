var fs = require('fs');

/*
// readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
console.log(result);
console.log('C');
// A B C 순차 읽음
*/

console.log('A');
// resdFile은 return 값 없음
fs.readFile('syntax/sample.txt', 'utf-8', function(err, result) {
  console.log(result);
}); // 비동기적인 처리 두번째 파라미터로 파일 내용 반환
console.log('C');
// A C B 로 읽음
