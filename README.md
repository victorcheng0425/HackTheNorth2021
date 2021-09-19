### #HackTheNorth2021 ###
# ![image](https://user-images.githubusercontent.com/53034685/133922856-c6789bae-af58-4807-bdc1-fb212abbef2a.png)

## Dependencies
* [Node v16](https://nodejs.org/)
* [PHP v7](https://www.php.net/)

## Setup/Installations
Here are some steps to use web scraper in JavaScript.

* Step 1: type "npm install puppeteer" in terminal

* Step 2: brew install chromium (for Mac)
or apt-get install chromium-browser (for Linux)

* Step 3(optional): Inside of JavaScript scraping file, we can set up a configuration like this:
const browser = await puppeteer.launch({
        executablePath: '/usr/local/bin/chromium',
        headless: false
    })
  
* Step 4: Install php under the frontend folder, and type "C:/php/php.exe -S localhost:8080" in terminal to run the php server
* Step 5: Go to footers folder and type "node index.js" in terminal to run the application