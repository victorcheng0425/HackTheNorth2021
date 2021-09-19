//const scrape = require('puppeteer');

//import scrape from '../ebay';
// let msg = require('../ebay');
// console.log(msg);

const {praseToPrice} = require("../ebay");
const {scrape} = require("../ebay");
let ebay_website = "https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p2380057.m570.l1312&_nkw=";
let searchItem = "apple+watch+se" //fix it later
function handler() {
    // let field = document.getElementById("search_field").value;
    // document.getElementById("search_field").value = "";
    // console.log(field);
    scrape(ebay_website+searchItem).then((value) => {
    for(let x = 0; x < value.length; x++) {
        value[x].price = praseToPrice(value[x].price);
    }
        console.log(value);
    }).catch((error) => {
        console.log("error");
    });

}

handler();