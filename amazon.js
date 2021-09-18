const rp = require('request-promise');
const parse5 = require('parse5');
const url = 'https://www.amazon.ca/Apple-Watch-Smartwatch-Silver-Aluminum/dp/B07J2TQY8N/ref=sr_1_1_sspa?dchild=1&keywords=apple+watch&qid=1631940504&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExMFgwM1lLMjJCNzI4JmVuY3J5cHRlZElkPUEwNzEyNTIwM1VZSEoxUVpWNTJCUCZlbmNyeXB0ZWRBZElkPUEwMjY4Mzc5Mkg0TjdQMk1YTTNZUSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU='

rp(url)
    .then(function (html) {
        console.log("success");
        let indexTree = parse5.parse(html);
        console.log(indexTree);
    })
    .catch(function (err) {
        //handle error
    });

