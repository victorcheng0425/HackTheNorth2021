# HackTheNorth2021


## Setup/Installations for JavaScript Web Scraping
Here are some steps to use web scraper in JavaScript.

Step1: npm install puppeteer

Step2: brew install chromium (for Mac)
or apt-get install chromium-browser (for Linux)

Step3: Inside of JavaScript scraping file, we can set up a configuration like this:
const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
