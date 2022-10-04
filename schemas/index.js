const mongoose = require("mongoose");  //mongoose 라이브러리 가져와서 connect

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/sparta_prac")  //여기에 연결하고 sparta_prac이란 db에 연결한다
        .catch(err => console.log(err));  //connect가 실패(몽고db에 연결 실패)하면 에러처리 진행(콘솔로그로 발생한 에러 보여주세요~!)
};

mongoose.connection.on("error", err => console.error("몽고디비 연결 에러", err));  //몽구스 커넥션 실패하면 콘솔 에러로 보여줌

module.exports = connect;  //현재 모듈에서 connect를 내보내줘서 밖에서 mongodb랑 연결하고 사용할 수 있게 해 줌