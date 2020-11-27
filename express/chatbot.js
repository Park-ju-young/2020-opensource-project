const request = require('request');
const url = 'https://notify-api.line.me/api/notify';
const token = 'BX7LrLUnmQ2QosiYlg5g8BIXKcfraZnFvLqpLhMBjY8';
request.post(
    {
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        form: {
            message: '안녕하세요. 유해물질 알리미 챗봇입니다.',
            stickerPackageId: 1,
            stickerId: 1
        }
    },(error, response, body) => {
        console.log(body)
    });
