var express = require('express');
const request = require('request');
const api_url = 'http://apis.data.go.kr/1471000/FoodAdtvInfoService';
//발급받은 키
const key = 'PFs%2BxbmfLdZwXaK7l5l9w4xEcdaDcYByiEj9PoHq2KCPAtx%2FE1N7OPUaCPr6bam18nVQgKOnuxMlaRsJhG6gyQ%3D%3D'

const a_url = api_url +'/getFoodAdtvInfoList?ServiceKey='+key+'&numOfRows=3&pageNo=1';

console.log(a_url);

request.post({
    url: a_url,
    form:{
        key:'value',
    }
    
},(error,respopnse,body) =>{
    console.log(body)
});