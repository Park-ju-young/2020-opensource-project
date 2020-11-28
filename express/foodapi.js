let request = require('request');

// REST API 경로 & 요청 메시지
const url = 'http://apis.data.go.kr/1470000/FoodAdtvInfoService/getFoodAdtvInfoList?ServiceKey=';

//api key
const key = 'ofY2ppOq5kBqT5jYPaGsW%2BEy7OR5a1bf5Z9PHvqNKvwO5DSCaU2x2qCj%2FoXnuB1YVbMTlErkHWSMEsR5b7isrw%3D%3D';

//REST(URL)
const complete_url = url +key ;// '&numOfRows=2&pageNo=2';

console.log(complete_url);

request(complete_url, function(error, response, body){
    if(!error && response.statusCode ==200)
        console.log(body);
})


/*
queryParams += '&' + encodeURIComponent('prdlst_cd') + '=' + encodeURIComponent('C0118010300000'); 
queryParams += '&' + encodeURIComponent('pc_kor_nm') + '=' + encodeURIComponent('과.채음료'); 
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); 
*/


/*
예제코드
request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
});
*/

// module.exports.이름 = 함수;
