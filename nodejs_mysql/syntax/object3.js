// var v1 = 'v1';
// // 10000 code
// v1 값이 사라짐
// v1 = 'egoing';
// var v2 = 'v2';

// 위의 경우를 위해 객체를 활용
var p = {
  v1: 'v1',
  v2: 'v2',
  f1: function() {
    // console.log(o.v1); // 이렇게 하면 변수 o를 알고 있어야함 달라지면 문제가 생김
    console.log(this.v1); // 이렇게 하면 어떠한 변수에 담겨도 함수가 속해있는 객체를 호출 할 수 있음
  },
  f2: function() {
    // console.log(o.v2);
    console.log(this.v2);
  }
};

// function f1() {
//   console.log(o.v1);
// }
//
// // 이렇게 누군가 새로 만들면 이전의 f1이 삭제 될 수 이음
// function f1() {
//
// }
//
// function f2() {
//   console.log(o.v2);
// }

// f1();
// f2();

// 위의 경우를 위해 객체를 활용
p.f1();
p.f2();
