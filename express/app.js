const express = require('express');
const request = require('request');
const convert = require('xml-js');

const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'z5iy5sMU1W4xZAlwvn0/5x4U+4ZsqI0hKO1ZZNFxUGlNzGBjFg2D1u6/Ij5C/Sbkncx3hyYg7Nfz5JnMD8BG/9Z3TEEHPvy1A2XhkPKs04v0/n6TjH1A3e9X23zYdYmNSGyPn2hDGglgm2p3YmtLSwdB04t89/1O/w1cDnyilFU='

var ProductCategoryName ; 
var first_url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var first_key ='ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';
/*
var queryParams1 = '?' + encodeURIComponent('ServiceKey') + '=' +first_key; 
//queryParams1 += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
queryParams1 += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent(ProductCategoryName); 
//queryParams1 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('213'); 
//queryParams1 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); 
*/

var NameOfProduct ; // 제품명 넣는 자리
var second_url ='http://openapi.foodsafetykorea.go.kr/api';
var second_key ='f8ce3271a2dc4decb83b'; 
var filetype ='json';
var startIndex = 1;
var endIndex = 5; 
//var fullRequest = encodeURIComponent("http://openapi.foodsafetykorea.go.kr/api/f8ce3271a2dc4decb83b/C002/xml/1/5/PRDLST_REPORT_NO=200101260032");
//var fullRequest ='http://openapi.foodsafetykorea.go.kr/api/f8ce3271a2dc4decb83b/C002/json/1/5';

const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "www.foodbot2020.ml"
const sslport = 23023;
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


function first(text1){
    if(text1 == 'y'){
        return true;
    }
    else 
        return false;
}

function hello(eventObj){
    request.post({
        url: TARGET_URL,
        headers:{
            'Authorization': `Bearer ${TOKEN}`
        },
        json:{
            "replyToken":eventObj.replyToken,
            "messages" :[
                {
                    "type":"text",
                    "text": "안녕하세요, 식품 유해정보를 알려드립니다."
                },
                {
                    "type":"text",
                    "text": "무엇을 도와드릴까요?"
                },
                {
                    "type":"text",
                    "text": "식품 유해정보가 궁금하시면 y를 입력해주세요"
                }

            ]
        }
    },(error,response,body)=>{
        console.log(body)
    });
}

app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;
    var message_text = message.text;
    //var text1;
    var text2;

    var findfoods;
    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    text = first(message_text);

    if(text == true){
        console.log('Hi',message);
        hello(eventObj);
    }
    else{
    getfoodinfo(eventObj.replyToken); 
    getfood(eventObj.replyToken);
    }

    res.sendStatus(200);
});

//rawmaterial
// 식품의약품 안전처 품목제조보고(원재료) API 요청 예시입니다

console.log("[Input msg] ", NameOfProduct);

function getfoodinfo(replyToken){
    request.post(
        {
            url: TARGET_URL,
            headers:{
                'Authorization': `Bearer ${TOKEN}`
            },
            json:{
                "replyToken": replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text": "입력하신 상품은 " + replyToken +"입니다."
                    }
                ]
            }
        },(error, reponse, body) => {
            console.log(body)
        });

        var queryParams2 = '/' + encodeURIComponent(second_key); 
        queryParams2 += '/' + encodeURIComponent('C002'); 
        queryParams2 += '/' + encodeURIComponent(filetype); 
        queryParams2 += '/' + encodeURIComponent(startIndex); 
        queryParams2 += '/' + encodeURIComponent(endIndex); 
        queryParams2 += '/' + encodeURIComponent('PRDLST_NM') + '=' + encodeURIComponent(replyToken); 
    request({
        second_url: second_url + queryParams2,
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
            request.post({
                url:TARGET_URL,
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                json:{
                    "messages":[
                        {
                            "type":"text",
                            "text":"[처리결과] " + resObj.C002.RESULT.MSG
                        },
                        {
                            "type":"text",
                            "text":"[유형] " + ProductCategory
                        },
                        {
                            "type":"text",
                            "text":"[첨가물] " + resObj.C002.row[0].RAWMTRL_NM
                        }
                    ]
                }
            }),(error, response, body) =>{
                console.log(body)
            }
        }

    });
}


// 처음에 하던거
function getfood(replyToken){
    request.post(
        {
            url: TARGET_URL,
            headers:{
                'Authorization': `Bearer ${TOKEN}`
            },
            json:{
                "replyToken": replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text": "입력하신 상품은 " + replyToken +"입니다."
                    }
                ]
            }
        },(error, reponse, body) => {
            console.log(body)
        });

        var queryParams1 = '?' + encodeURIComponent('ServiceKey') + '=' +first_key; 
        //queryParams1 += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
        queryParams1 += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent(replyToken); 
        //queryParams1 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('213'); 
        //queryParams1 += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); 
        
        
    request({
        first_url: first_url + queryParams1,
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
                    request.post({
                        url: TARGET_URL,
                        headers: {
                            'Authorization': `Bearer ${TOKEN}`
                        },
                        json:{
                            "messages": [
                                {
                                    "type":"text",
                                    "text": responseMessage
                                }
                            ]
                        }
                    }),(error, response,body) =>{
                        console.log(body)
                    }
            }
        }

    });
}

try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  