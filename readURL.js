// function processDom(responseText) {
//     console.log(responseText);
//     // const jsdom = require("jsdom");
//     // const dom = new jsdom.JSDOM(responseText);
//     // //dom.window.document.querySelector("p").textContent; // 'Hello world'
//     // console.log(dom.window.document.getElementsByClassName('productItemName_3IZ3c')[0].innerText);
//
// }
//
// function readURL(url) {
//     let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     let website_request = new XMLHttpRequest();
//     website_request.open('GET', url, true);
// //console.log(bestbuy_website+searchItem);
//     website_request.onreadystatechange = function (){
//         if (website_request.readyState === 4)  { //0. unsend, 1.open, 2. have received 3. loading, 4. done
//             if (website_request.status === 200) {
//                 processDom(website_request.responseText);
//                 // return website_request.responseText;
//             }else {
//                 console.log("something wrong, can't get the message");
//             }
//         } else {
//             console.log("readyState is not 4");
//         }
//     };
//     website_request.send();
// }
// readURL("https://www.bestbuy.ca/en-ca/search?search=applewatch");