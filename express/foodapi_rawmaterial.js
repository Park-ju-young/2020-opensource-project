// 식품의약품 안전처 품목제조보고(원재료) API 요청 예시입니다

var express = require('express');
var request = require('request');

var url = 'http://openapi.foodsafetykorea.go.kr/api';
var key ='인증키'; // 12월03일 신청하였습니다.
var filetype = 'json';
var startIndex = 1;
var endIndex = 5;
var NameOfProduct = '해오름다시마간장'; // 제품명 넣는 자리

var queryParams = '/' + key; 
queryParams += '/' + encodeURIComponent('C002'); 
queryParams += '/' + encodeURIComponent(filetype); 
queryParams += '/' + encodeURIComponent('startIdx') + '=' + encodeURIComponent(startIndex); 
queryParams += '/' + encodeURIComponent('endIdx') + '=' + encodeURIComponent(endIndex); 
queryParams += '&' + encodeURIComponent('PRDLST_NM') + '=' + encodeURIComponent('제품명'); 



request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    if(error){
        console.log('에러입니다.')
    }
    else{
        if(response.statusCode ==200){
            var result =body;

            var resObj = eval("("+result+")");

            console.log(result);


        }
    }

});
