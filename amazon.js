const puppeteer = require('puppeteer');
const {praseToPrice} = require("./ebay");
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

let amazon_scraper = async(keyword) => {
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
        product_items.forEach((element, i= 2) => {
            let href = element.getElementsByTagName("a")[0].getAttribute("href");
            let image = element.getElementsByTagName("img")[0].getAttribute("src");
            let price = document.getElementsByClassName("a-offscreen")[i++];
            // let title = document.getElementsByClassName("a-size-base-plus a-color-base a-text-normal")[0];
            let title;
            if (element.getElementsByClassName('a-size-base-plus a-color-base a-text-normal')) {
                title = element.getElementsByTagName("span")[2];
            }

            //TODO: Fix the case where there is missing price (need to shift)
            //TODO: Add title (fix bugs like 'sponsor')

            if(price!=null){
                // price = price.textContent.replace('.','');
                console.log("price :", price.textContent)
            } else{
                price = "";
            }
            if(title!=null){
                title = title.textContent;
            } else {
                title = "";
            }
            temp.push(
                {
                    'title': title,
                    'price': price.innerText,
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

module.exports = {
    amazon_scraper
}
