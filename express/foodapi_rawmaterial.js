// 식품의약품 안전처 품목제조보고(원재료) API 요청 예시입니다

var express = require('express');
var request = require('request');

var url ='http://openapi.foodsafetykorea.go.kr/api';
var key ='f8ce3271a2dc4decb83b'; 
var filetype ='json';
var startIndex = 1;
var endIndex = 5;
var NameOfProduct ='하루견과 요거트S'; // 제품명 넣는 자리

var queryParams = '/' + encodeURIComponent(key); 
queryParams += '/' + encodeURIComponent('C002'); 
queryParams += '/' + encodeURIComponent(filetype); 
queryParams += '/' + encodeURIComponent(startIndex); 
queryParams += '/' + encodeURIComponent(endIndex); 
queryParams += '/' + encodeURIComponent('PRDLST_NM') + '=' + encodeURIComponent(NameOfProduct); 

//var fullRequest = encodeURIComponent("http://openapi.foodsafetykorea.go.kr/api/f8ce3271a2dc4decb83b/C002/xml/1/5/PRDLST_REPORT_NO=200101260032");
//var fullRequest ='http://openapi.foodsafetykorea.go.kr/api/f8ce3271a2dc4decb83b/C002/json/1/5';

console.log("[Input msg] ", NameOfProduct);

request({
    url: url + queryParams,
    //url : fullRequest,
    method: 'GET'
}, function (error, response, body) {
    if(error){
        console.log('에러입니다.')
    }
    else{
        if(response.statusCode ==200){
            console.log("식품명으로 식품유형과 첨가물 정보를 받아옵니다...");
            var result =body;
            var resObj = eval("("+result+")");
            var ProductCategory = resObj.C002.row[0].PRDLST_DCNM;
            // 첨가물정보 API가 입력으로 받을 parameter

            //console.log(result);
            console.log("[처리결과] ",resObj.C002.RESULT.MSG);
            console.log("[유형] ", ProductCategory);
            console.log("[첨가물] ",resObj.C002.row[0].RAWMTRL_NM )
        }
    }

});
