const puppeteer = require('puppeteer')

/*input:
        keyword:str
return:
        price, description, image*/

let wallmart_scraper = async(keyword) => {
    const url='https://www.walmart.ca/search?q='+keyword;
    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
    const page = await browser.newPage();
    await page.goto(url);
    console.log("Start:" + keyword);

    let productNames = await page.evaluate(()=>{
        console.log("hello");
        let div = document.querySelectorAll("div[data-automation='product']");

        let products = []

        div.forEach(element => {
            let price = element.querySelector("div[data-automation='current-price']");
            if(price != null){
                products.push(price.textContent);
            }
        });
        console.log(products)
        return products
    })
    console.log("end wallmart scraping.");
    await browser.close();
    return productNames;

};

wallmart_scraper('shoes').then((value => {
        console.log("returned.");
    }
));
