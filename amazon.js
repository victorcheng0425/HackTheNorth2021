// console.log("first");
// const [el] = await page.$x('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div[3]/div/span/div/div/div/div/div[2]/div/span/a/div/img');
// const src = await el.getProperty('src');
// const image = await src.jsonValue();
//
// console.log("second");
// const [el2] = await page.$x('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div[3]/div/span/div/div/div/div/div[3]/div[1]/h2/a');
// const txt = await el2.getProperty('textContent');
// const title = await txt.jsonValue();
//
// console.log("third");
// const [el3] = await page.$x('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div[3]/div/span/div/div/div/div/div[3]/div[3]/div/a/span/span[1]');
// const price = await el3.getProperty('textContent');
// const priceTxt = await price.jsonValue();
// console.log({image, title, priceTxt});
// temp.push({image, title, priceTxt});

const puppeteer = require('puppeteer');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

async function amazon_scraper(keyword) {
    const url = 'https://www.amazon.ca/s?k=' + keyword;
    const browser = await puppeteer.launch({
        // headless: false
    })
    const page = await browser.newPage();
    await page.goto(url);
    console.log("browser ok");
    let result = await page.evaluate(() => {
        let temp = [];
        console.log("test");
        let product_items = document.querySelectorAll("div[class='a-section a-spacing-medium a-text-center']");
        product_items.forEach(element => {
            let href = element.getElementsByTagName("a")[0].getAttribute("href");
            let image = element.getElementsByTagName("img")[0].getAttribute("src");
            // let title = element.querySelector("span[class='a-size-base-plus a-color-base a-text-normal']");
            // let price = element.querySelector("span[class='a-offscreen']");
            temp.push(
                {
                    // 'title': title.textContent,
                    // 'price': price,
                    'image': image,
                    'link': 'https://www.amazon.ca/' + href
                });
        });
        return temp;
    });
    console.log("end");
    await browser.close();
    return result;
}

amazon_scraper('apple watch').then((result => {
    console.log(result);
}))
