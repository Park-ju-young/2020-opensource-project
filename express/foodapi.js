var express = require('express');
var request = require('request');

//xml을 json으로 바꾼다.
const convert = require('xml-js');

var url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var key ='ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' +key; 
//queryParams += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
queryParams += '&' + encodeURIComponent('pc_kor_nm');// + '=' + encodeURIComponent('스위트초콜릿'); 
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('213'); 
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
        if(response.statusCode ==200){
            var result =body;
            var xmltojson = convert.xml2json(result,{compact:true,spaces:4});
            //console.log(xmltojson);
            var resObj = eval("("+xmltojson+")");
            var resultItems = resObj.response.body.items;
            //console.log(xmltojson);
            


            for(var i=0 ; i < resultItems.item.length; i ++){
                var responseMessage ='[ ' + resultItems.item[i].PC_KOR_NM._text + ' ]\n';
                var addictive = resultItems.item[i].T_KOR_NM._text;
                var specVal = resultItems.item[i].SPEC_VAL_SUMUP._text;
                var yn = resultItems.item[i].INJRY_YN._text;
                responseMessage += addictive + ' : ' + specVal + '['+yn+']'+ '\n';
                console.log('[responese message]',responseMessage);
            }
            
        }
    }
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});
