// array, object

// 값이 될 수 있음
var f = function () {
  console.log(1 + 1);
  console.log(1 + 2);
}
// console.log(f);
// f();

// 배열의 원소로서 함수가 존재할 수 있음
var a = [f];
a[0]();

// 객체의 값으로 함수가 존재할 수 있음
var o = {
  func : f
}
o.func();

// 값이 될 수 없음
// var i = if (true) {
//   console.log(1);
// }

// var w = while(true) {console.log(1)}
