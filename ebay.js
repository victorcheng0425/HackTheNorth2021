//import {readURL} from './readURL.js';
//let XMLHttpRequest = require('xhr2');
let bestbuy_website = "https://www.bestbuy.ca/en-ca/search?search=";
let ebay_website = "https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p2380057.m570.l1312&_nkw=";
let searchItem = "apple+watch+se" //fix it later
const puppeteer = require('puppeteer');
let scrape = async(url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    //await page.waitFor(1000);
    // const [el] = await page.$(".sliderTarget_2Q87g"); ////*[@id="productTitle"]
    // console.log(el);
    // const src = await el.getProperty('src');
    // const srcTxt = await src.jsonValue();

    console.log("before");
    let result = await page.evaluate(() => {
        console.log("hello");
        let articles = [];
        // let body = document.querySelector('*').outerHTML;
        // console.log(body);
        // return body;
        let titles = document.getElementsByClassName('s-item__title');
        //let titles = document.getElementsByClassName('productItemName_3IZ3c');
        //let titles =  document.querySelectorAll(".productItemName_3IZ3c")
        console.log("titles" + titles);
        // console.log(titles[0].innerText);
        // console.log(titles.length);
        console.log(titles);
        let price = document.getElementsByClassName('s-item__price');
        let image = document.getElementsByClassName('s-item__image-img');
        //console.log("price" + price);
        for (let i = 1; i < titles.length; i++) { //i-1 for price because there an extra element on titles
            console.log(titles[i].innerText);
            console.log(price[i-1].innerText);
            articles.push(
                {
                    'title': titles[i].innerText,
                    'price': price[i-1].innerText,
                    'image': image[i-1].src
                })
        }
        return articles

    });
    //await browser.close();
    console.log("end");
    return result;

    //let scores = document.getElementsByClassName('score');
    //console.log({srcTxt});
};
scrape(ebay_website+searchItem).then((value) => {
//scrape(bestbuy_website+searchItem).then((value) => {
    console.log("123");
    console.log(value);
}).catch((error) => {
    console.log("error");
});

// function readURL(URL) {
//     let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     let website_request = new XMLHttpRequest();
//     website_request.open('GET', bestbuy_website+searchItem, true);
//     let html;
//     website_request.onreadystatechange = function (){
//         if (website_request.readyState === 4)  { //0. unsend, 1.open, 2. have received 3. loading, 4. done
//             if (website_request.status === 200) {
//                 html = website_request.responseText;
//                 return html;
//
//             }else {
//                 console.log("something wrong, can't get the message");
//             }
//         } else {
//             console.log("readyState is not 4");
//         }
//     };
//     website_request.send();
// }




