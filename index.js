const request = require('request')
const Telegram = require('./telegram')
const telegram_token = 'token';
const userid = '188994062';
const codes = []
const timeout = 3;


async function main() {
    const bot = new Telegram(telegram_token);
    while (true) {
        await sleep(timeout * 1000)
        var response = await req({
            url: "https://www.reddit.com/r/Stadia/new/.rss"
        });
        //console.log(response.res.statusCode);
        var _codes = regex(response.body);
        _codes.forEach(code => {
            if (!codes.includes(code)) {
                bot.sendMessage(userid, code);
                codes.push(code);
            }
        })
    }
}

function req(parameters) {
    return new Promise(function(resolve, reject) {
        request(parameters, function(error, res, body) {
            if (!error) {
                resolve({
                    res: res,
                    error: error,
                    body: body
                });
            } else {
                reject(error);
            }
        });
    });
}

function regex(text) {
    var matches = [];
    var m;
    do {
        m = /([A-Z0-9]{16})/gm.exec(text);
        if (m) {
            matches.push(m[1]);
        }
    } while (m);
    return matches.filter((v, i, a) => a.indexOf(v) === i);
}

function sleep(t, v) {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null, v), t);
    });
}
main();