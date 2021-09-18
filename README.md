# HackTheNorth2021


## setup/installation for javascript scrapers
Here are some steps to use web scrape in javascript.
Step1: npm install puppeteer
Step2: brew install chromium (for Mac)
or apt-get install chromium-browser (for linux)

Step3: inside of javascript scraping file, we can set up configuraiton like this.
const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
