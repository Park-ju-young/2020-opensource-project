var express = require('express');
var request = require('request');

//xml을 json으로 바꾼다.
const convert = require('xml-js');

var url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var key ='PFs%2BxbmfLdZwXaK7l5l9w4xEcdaDcYByiEj9PoHq2KCPAtx%2FE1N7OPUaCPr6bam18nVQgKOnuxMlaRsJhG6gyQ%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' +key; 
queryParams += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
queryParams += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent('과.채음료'); 
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); 

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    if(error){
        console.log('에러입니다.')
    }
    else{
        if(response.statusCode ==200)
            var result =body;
            var xmltojson = convert.xml2json(result,{compact:true,spaces:4});
            console.log(xmltojson);
        }
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});