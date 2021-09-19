### #HackTheNorth2021 ###
# ![image](https://user-images.githubusercontent.com/53034685/133922856-c6789bae-af58-4807-bdc1-fb212abbef2a.png)

## Dependencies
* https://nodejs.org/en/
* https://www.php.net/

## Setup/Installations
Here are some steps to use web scraper in JavaScript.

* Step 1: npm install puppeteer

* Step 2: brew install chromium (for Mac)
or apt-get install chromium-browser (for Linux)

* Step 3: Inside of JavaScript scraping file, we can set up a configuration like this:
const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
