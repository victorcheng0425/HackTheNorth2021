const puppeteer = require('puppeteer')
function praseToPrice(string) {
    //console.log(string);
    string = string.split(' ');
    console.log(string);
    // console.log(typeof(string));
    for(let i =0; i < string.length; i++) {
        if(string[i][0] === '$') {
            //console.log(string[i]);
            string[i] = string[i].replace(/[,]/g, "");
            return parseFloat(string[i].slice(1));
        }
    }
}
/*input:
        keyword:str
return:
        price, price, image, url*/

let wallmart_scraper = async(keyword) => {
    /* 1. Setup and configurations*/
    const url='https://www.walmart.ca/search?q='+keyword;
    const browser = await puppeteer.launch({
       // executablePath: '/usr/local/bin/chromium'',
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
            // let price_string = price.textContent.replace('$','');
            // let price_float = parseFloat(price_string);
            // console.log(price.textContent);
            let image = element.getElementsByTagName("img")[0];
            let url = "https://www.walmart.ca/" +
                element.getElementsByTagName("a")[0].getAttribute("href");
            //console.log(title.textContent, price.textContent, image.getAttribute("src"),url)
            products.push(
                {
                    'title': title.textContent,
                    'price': price.textContent,
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

wallmart_scraper('oled tv').then((value) => {
    for(let x = 0; x < value.length; x++) {
        value[x].price = praseToPrice(value[x].price);
    }
    console.log(value);
    }
);


module.exports = {
    praseToPrice,
    wallmart_scraper
}
