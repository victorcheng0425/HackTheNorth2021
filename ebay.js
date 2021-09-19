function praseToPrice(string) {
    //console.log(string);
    string = string.split(' ');
    //console.log(string);
    for(let i =0; i < string.length; i++) {
        if(string[i][0] === '$') {
            //console.log(string[i]);
            return parseFloat(string[i].slice(1));
        }
    }
}

let bestbuy_website = "https://www.bestbuy.ca/en-ca/search?search=";
let ebay_website = "https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p2380057.m570.l1312&_nkw=";
let searchItem = "apple+watch+se" //fix it later
const puppeteer = require('puppeteer');
async function scrape(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    //await page.waitFor(1000);
    // const [el] = await page.$(".sliderTarget_2Q87g"); ////*[@id="productTitle"]
    // console.log(el);
    // const src = await el.getProperty('src');
    // const srcTxt = await src.jsonValue();

    //console.log("before");
    let result = await page.evaluate(() => {
        // console.log("hello");
        let articles = [];
        // let body = document.querySelector('*').outerHTML;
        // console.log(body);
        // return body;
        let titles = document.getElementsByClassName('s-item__title');
        //let titles = document.getElementsByClassName('productItemName_3IZ3c');
        //let titles =  document.querySelectorAll(".productItemName_3IZ3c")
        //console.log("titles" + titles);
        // console.log(titles[0].innerText);
        // console.log(titles.length);
        //console.log(titles);
        //let price = document.getElementsByClassName('s-item__price');
        let price = document.getElementsByClassName('s-item__details clearfix');
        let image = document.getElementsByClassName('s-item__image-img');
        let link = document.getElementsByClassName('s-item__link');
        //console.log("price" + price); //let price = document.getElementsByClassName('s-item__details clearfix');
        for (let i = 1; i < titles.length; i++) { //i-1 for price because there an extra element on titles
            //console.log(titles[i].innerText);
            //console.log(price[i-1].innerText);
            let temp = price[i-1].getElementsByClassName('s-item__price')[0].innerText;
            //temp = praseToPrice(temp);
            // console.log(temp);
            articles.push(
                {
                    'title': titles[i].innerText,
                    'price': temp,
                    'image': image[i-1].src,
                    'link': link[i].href,
                })
        }
        return articles

    });
    //await browser.close();
    //console.log("end");
    return result;

    //let scores = document.getElementsByClassName('score');
    //console.log({srcTxt});
};
// scrape(ebay_website+searchItem).then((value) => {
//     for(let x = 0; x < value.length; x++) {
//         value[x].price = praseToPrice(value[x].price);
//     }
//     console.log(value);
// }).catch((error) => {
//     console.log("error");
// });
module.exports = {
    praseToPrice,
    scrape
}
//module.exports = "hello";



