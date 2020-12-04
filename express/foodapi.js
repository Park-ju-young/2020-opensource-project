var express = require('express');
var request = require('request');
//xml을 json으로 바꾼다.
const convert = require('xml-js');

var ProductCategoryName = '스위트초콜릿'; 

var url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var key ='ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' +key; 
//queryParams += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
queryParams += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent(ProductCategoryName); 
//queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('213'); 
//queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); 



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
            var resObj = eval("("+xmltojson+")");
            var resultItems = resObj.response.body.items;
            var resultLeng = Object.keys(resultItems);

            if(Object.keys(resultItems).length != 0){
                console.log("valid input : 식품 첨가물 정보를 받아옵니다.");
                
                var responseMessage ='[ ' + resultItems.item[0].PC_KOR_NM._text + ' ]\n';
                //하나의 카테고리에 대한 정보만 받는다고 가정해 반복문 밖으로 뺐습니다.

                for(var i=0 ; i < resultItems.item.length; i ++)
                {
                    //var responseMessage ='[ ' + resultItems.item[i].PC_KOR_NM._text + ' ]\n';
                    var addictive = resultItems.item[i].T_KOR_NM._text;
                    var specVal = resultItems.item[i].SPEC_VAL_SUMUP._text;
                    var yn = resultItems.item[i].INJRY_YN._text;
                    responseMessage += addictive + ' : ' + specVal + '['+yn+']'+ '\n';
                }
                
            }
            else
            {
                console.log("Invalid Input : 에러 메시지 전송");
                var responseMessage = "잘못 된 입력입니다. 라벨의 식품유형을 확인하고 다시 입력해주세요.";
            }
                console.log('[responese message]',responseMessage);
            
        }
    }

});
