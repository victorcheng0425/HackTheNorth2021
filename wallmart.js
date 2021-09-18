const puppeteer = require('puppeteer')

/*input:
        keyword:str
return:
        price, description, image*/
async function wallmart_scraper(keyword){
    const url='https://www.walmart.ca/search?q='+keyword;
    const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })

    try{
        const page = await browser.newPage();
        await page.goto(url);

        //const [el] = await page.$x('//*[@id="product-results"]/div[1]/div/a/div/div[1]/img');
        const [el] = await page.$x('/html/body/div[1]/div[1]/div[3]/div/div/div/div/div[7]/div[2]/div[2]/div[1]/div/div[1]/div[1]/div/a/div/div[1]/img');
        const src = await el.getProperty('src');
        const imageURL = await src.jsonValue();


        const [el2] = await page.$x('//*[@id="product-results"]/div[1]/div/a/div/div[2]/div[2]/span/div/p');
        const txt = await el2.getProperty('textContent');
        const title = await txt.jsonValue();

        const [el3] = await page.$x('//*[@id="product-results"]/div[1]/div/a/div/div[2]/div[3]/div[1]/div/span/span');
        const price = await el3.getProperty('textContent');
        const priceTxt = await price.jsonValue();
        console.log({imageURL, title, priceTxt});
    } catch (err){
        console.error(err.message);
    } finally {
        await browser.close();
    }
}



wallmart_scraper('glove')
