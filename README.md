# 식품정보를 알려주는 챗봇

### 라인 채널 아이콘
![KakaoTalk_20201204_094440922](/uploads/9d022e8b2258172848de87db33cb8134/KakaoTalk_20201204_094440922.jpg)

### 라인 QR코드 
![화면_캡처_2020-12-02_011317](/uploads/5c2fe4463a9ba8b6307eda0c4a6269fb/화면_캡처_2020-12-02_011317.png)


## 프로젝트 소개
라인 챗봇 API, 식품의약품안전처_식품첨가물 정보 서비스 API,식품(첨가물)품목제조보고(원재료) API를 결합하여 사용자가 식품의 이름을 입력하면 그에 대한 정보를 자동적으로 사용자에게 응답해주는 챗봇 서비스이다. 이를통해 사용자는 식품에 함유된 첨가물정보를 구체적이고 신뢰할 수 있는 정보처(식품의약품안전처)로 부터 챗봇을 통해 얻을 수 있다.


## 챗봇 사용방법
1. QR코드를 통해 라인 챗봇을 추가한 뒤, 접속한다.
2. 사용자는 궁금한 식품 첨가물의 이름을 챗봇에게 말한다.
3. 챗봇은 사용자가 입력한 식품첨가물에 대한 정보를 보여준다.


## 설치 방법
repository를 clone을 먼저 해줍니다.

git clone http://khuhub.khu.ac.kr/term-project/project.git

필요한 key들을 발급받습니다.

    식품(첨가물)품목제조보고(원재료) key: https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=C002

    식품의약품안전처_식품첨가물 정보 서비스:https://www.data.go.kr/data/15058807/openapi.do

    line developer: https://developers.line.biz/en/services/messaging-api/

필요한 module을 다운받습니다.

    npm install

    npm install express

    npm install xml-js

app.js를 수정합니다.

    const TOKEN = 'line' // line messenger api의 channel access token으로 수정합니다. 

    var first_key = '식품첨가물 정보 서비스' // 발급받은 식품첨가물 정보 서비스의 key로 수정합니다. 

    var second_key = '식품품목제조보고(원재료)' // 발급받은 식품품목제조보고 key로 수정합니다.

    const domain = 'your domain' // 당신의 도메인의 주소로 수정합니다. 


## Built with
Nodejs

Express

Line Messenger API

## API 
 식품(첨가물)품목제조보고(원재료) (제공기관: 식품의약품안전처)

 식품의약품안전처_식품첨가물 정보 서비스(제공기관: 식품의약품안전처)

 Line Messenger API


## 연락처
jj5973@khu.ac.kr

ssol2906@khu.ac.kr

smtwtfstoot@khu.ac.kr 