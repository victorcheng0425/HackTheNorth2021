const puppeteer = require('puppeteer')

/*input:
        keyword:str
return:
        price, price, image, url*/

let wallmart_scraper = async(keyword) => {
    /* 1. Setup and configurations*/
    const url='https://www.walmart.ca/search?q='+keyword;
    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
    const page = await browser.newPage();
    //uncomment if you want to debug!
    //page.on('console', (log) => console[log._type](log._text));
    /*page.on('console', consoleMessageObject => function (consoleMessageObject) {
        if (consoleMessageObject._type !== 'warning') {
            console.log(consoleMessageObject._text)
        }
    });*/

    await page.goto(url);
    console.log("Start:" + keyword);

    let productNames = await page.evaluate(() => {
        console.log("hello");
        let products = []
        let product_items = document.querySelectorAll("div[data-automation='product']");
        console.log("product_items.length", product_items.length)
        product_items.forEach(element => {
            let title = element.getElementsByTagName("p")[0];
            let price = element.querySelector("div[data-automation='price-section-wrapper']");
            let price_string = price.textContent.replace('$','');
            let price_float = parseFloat(price_string);
            let image = element.getElementsByTagName("img")[0];
            let url = "https://www.walmart.ca/" +
                element.getElementsByTagName("a")[0].getAttribute("href");
            //console.log(title.textContent, price.textContent, image.getAttribute("src"),url)
            products.push(
                {
                    'title': title.textContent,
                    'price': price_float,
                    'image': image.getAttribute("src"),
                    'link': url,
                }
            );
        });
        return products
    });
    console.log("end wallmart scraping.");
    await browser.close();
    return productNames;
};

wallmart_scraper('T-Shirt').then((value => {
        console.log(value);
    }
));
