const express = require('express');
const path = require('path');
const foodapi = require('./foodapi');

//module - 변수 전달
const {variable1, variable2} = require('./moduleEx');
//module - 함수 전달 
const md = require("./moduleEx2");

const app = express();

app.set('port',process.env.PORT||3000);

app.get('/',(req,res)=>{
    // node js가 응답
    //res.send("Food Adtv Info Service");

    // HTML이 응답
    res.sendFile(path.join(__dirname,'/main.html'));
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});