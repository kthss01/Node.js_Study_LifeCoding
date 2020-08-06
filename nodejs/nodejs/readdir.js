var testFolder = './data'; // 파일 실행하는 위치에서 데이터 경로 적어야함
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist) {
  console.log(filelist);
})
