const express = require('express');
const request = require('request');
const convert = require('xml-js');

const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'z5iy5sMU1W4xZAlwvn0/5x4U+4ZsqI0hKO1ZZNFxUGlNzGBjFg2D1u6/Ij5C/Sbkncx3hyYg7Nfz5JnMD8BG/9Z3TEEHPvy1A2XhkPKs04v0/n6TjH1A3e9X23zYdYmNSGyPn2hDGglgm2p3YmtLSwdB04t89/1O/w1cDnyilFU='

var ProductCategoryName ; 
var first_url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList';
var first_key ='ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';

var second_url ='http://openapi.foodsafetykorea.go.kr/api';
var second_key ='f8ce3271a2dc4decb83b'; 
var filetype ='json';
var startIndex = 1;
var endIndex = 5; 
var simpleResult = true;


const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "www.foodbot2020.ml"
const sslport = 23023;
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


function sendOneLineMessage(eventObj, line)
{
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
                    "text": line
                }
            ]
        }
    },(error,response,body)=>{
        console.log(body)
    });
}

function helloAndErrorMsg(eventObj){
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
                    "text": "정확한 식품명을 기입해주세요.\n안내가 필요하신 경우 '안내'라고 입력해주세요."
                }

            ]
        }
    },(error,response,body)=>{
        console.log(body)
    });
}

function prdNameNotFound(eventObj){
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
                    "text": "죄송합니다. \n해당 식품의 정보를 찾을 수 없습니다.\n"
                    +"정확한 식품명을 기입해주세요.\n"
                    +"사용 안내가 필요하신 경우 '안내'라고 입력해주세요."
                },
                {
                    "type": "sticker",
                    "packageId": "11537",
                    "stickerId": "52002770"
                }
            ]
        }
    },(error,response,body)=>{
        console.log(body)
    });
}

function instruction(eventObj){
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
                    "text": "식품유해정보 알리미 사용 안내입니다."
                },
                {
                    "type":"text",
                    "text": "사용방법\n"
                            +"1. 식품명을 '정확하게' 입력해주세요.\n"
                            +"2. 입력하신 식품명이 식약처 데이터베이스에 존재하는 경우,\n"
                            +"식품 유형과 첨가물, 첨가물 안전정보에 대해 받아보실 수 있습니다.\n"
                            +"3. '모드' 명령어를 통해 결과 간단히 보기/자세히 보기 모드를 전환할 수 있습니다.\n"
                            +"4. 결과 간단히 보기 모드에서는 첨가물과 식품유형을 확인하실 수 있습니다.\n"
                            +"5. 자세한 결과 보기 모드에서는 위 정보 및 첨가물 안전정보를 확인하실 수 있습니다."
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

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    if(message_text =='안내'){
        console.log('[안내 출력]');
        instruction(eventObj);
    }
    else if(message_text == '모드')
    {
        console.log("모드를 변경합니다")
        simpleResult = !simpleResult;
        if(simpleResult)
        {
            var msg = "결과 간단히 보기 모드 입니다.";
        }
        else
        {
            var msg = "자세한 결과 보기 모드입니다. 첨가물 안전정보를 확인하실 수 있습니다."
        }

        sendOneLineMessage(eventObj, msg);
    }
    else{
    getfoodinfoByPdtName(eventObj, message_text); 
    }

    res.sendStatus(200);
});

function getfoodinfoByPdtName(eventObj, prdName)
{
    var queryParams = '/' + encodeURIComponent(second_key); 
    queryParams += '/' + encodeURIComponent('C002'); 
    queryParams += '/' + encodeURIComponent(filetype); 
    queryParams += '/' + encodeURIComponent(startIndex); 
    queryParams += '/' + encodeURIComponent(endIndex); 
    queryParams += '/' + encodeURIComponent('PRDLST_NM') + '=' + encodeURIComponent(prdName); 

        request({
            url: second_url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            if(error){
                helloAndErrorMsg(oventObj);
                console.log('에러입니다.')
            }
            else{
                var result2 =body;
                var resObj2 = eval("("+result2+")");
                var resultCode2 = resObj2.C002.RESULT.CODE;

                console.log("[입력] : ", prdName);
                console.log("식품명으로 식품유형과 첨가물 정보를 받아옵니다...");

                if(resultCode2 == "INFO-200")//'유효하지 않은 입력'
                {
                    console.log("존재하지 않는 식품명입니다.");
                    prdNameNotFound(eventObj);
                }
                else if(response.statusCode ==200)
                { // 유효한 입력
                    var ProductCategory = resObj2.C002.row[0].PRDLST_DCNM;
                    // 첨가물정보 API가 입력으로 받을 parameter
        
                    //console.log(result);
                    console.log("성공적으로 정보를 받았습니다.")
                    console.log("[처리결과] ",resObj2.C002.RESULT.MSG);
                    console.log("[유형] ", ProductCategory);
                    console.log("[첨가물] ",resObj2.C002.row[0].RAWMTRL_NM )

                   

                    // 다음 API호출
                    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' +first_key;
                    queryParams += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent(ProductCategory); 

                    request({
                        url: first_url + queryParams,
                        method: 'GET'
                    }, function (error, response, body) {
                        if(error){
                            console.log('에러입니다.')
                        }
                        else if(response.statusCode ==200)
                        {
                                var result1 =body;
                                var xmltojson = convert.xml2json(result1,{compact:true,spaces:4});
                                var resObj1 = eval("("+xmltojson+")");
                                var resultItems = resObj1.response.body.items;
                    
                                if(Object.keys(resultItems).length != 0)
                                {
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
                                    

                                    var replyment = 
                                    {
                                        "replyToken":eventObj.replyToken,
                                        "messages":[
                                            {
                                                "type":"text",
                                                "text":prdName +"에 대해 알아볼까요?"
                                            },
                                            {
                                                "type":"text",
                                                "text":"[유형]\n" + ProductCategory
                                            },
                                            {
                                                "type":"text",
                                                "text":"[첨가물]\n" + resObj2.C002.row[0].RAWMTRL_NM
                                            }
                                        ]
                                    }

                                    if(! simpleResult)
                                    {
                                        var moreInfo =
                                        {
                                            "type":"text",
                                            "text":"더 자세한 첨가물 안전 정보\n" +responseMessage
                                        };
                                        replyment.messages.push(moreInfo);
                                    }

                                //메시지 전송
                                    request.post(
                                        {
                                            url: TARGET_URL,
                                            headers: {
                                                'Authorization': `Bearer ${TOKEN}`
                                            },
                                            json: replyment
                                        },(error, response, body) => {
                                            console.log(body)
                                        });
                                }
                                else
                                {
                                    console.log("Invalid Input : 에러 메시지 전송");
                                    var responseMessage = "잘못 된 입력입니다. 라벨의 식품유형을 확인하고 다시 입력해주세요.";
                                }
                                console.log('[responese message]',responseMessage);
                            
                        }
                        
                    });
                }
                else
                {
                    console.log("입력 이외의 오류가 발생하였습니다.");
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
  