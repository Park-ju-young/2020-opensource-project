var express = require('express');
var request = require('request');

//xml을 json으로 바꾼다.
const convert = require('xml-js');

var url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var key ='ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' +key; 
//queryParams += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
//queryParams += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent('과.채음료'); 
//queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('3'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); 

global.foods = new Array();


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
            //console.log(xmltojson);
            var resObj = eval("("+xmltojson+")");
            
            for(var i=0;i<100;i++){
                function fo(){
                    foods.push(food);
                }
                function foo(){
                    var food =resObj.response.body.items.item[i].PC_KOR_NM._text;
                    fo();
                }
                var food = resObj.response.body.items.item[i].PC_KOR_NM._text;
                global.foods.push(food);
                //foods.food = resObj.response.body.items.item[i].PC_KOR_NM._text;
                //foods.push(resObj.response.body.items.item[i].PC_KOR_NM._text);
                //console.log(resObj.response.body.items.item[i].PC_KOR_NM._text);
            }
            //console.log(xmltojson);
        }
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
    console.log(foods[99]);
});

console.log(foods);