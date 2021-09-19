var express = require("express");
const {praseToPrice} = require("../ebay");
const {scrape} = require("../ebay");
const {wallmart_scraper} = require("../wallmart")
// var h = require("./footers/handler");

var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/search/:searchKey", (req, res, next) => {
    let search_key = req.params.searchKey;
    let ebay_website = "https://www.ebay.ca/sch/i.html?_from=R40&_trksid=p2380057.m570.l1312&_nkw=";
    let ebay_pro = scrape(ebay_website+search_key).then((value) => {
        for(let x = 0; x < value.length; x++) {
            value[x].price = praseToPrice(value[x].price);
        }
        return value;
        }).catch((error) => {
            console.log(error);
        });
    let wallmart_pro = wallmart_scraper(search_key).then((value )=> {
        for(let x = 0; x < value.length; x++) {
            value[x].price = praseToPrice(value[x].price);
        }
        console.log(value);
        return value
    });


    // TODO uncomment @andy
    // let amazon_pro = amazon_scraper(search_key).then((value )=> {
    //     console.log(value);
    //     return value
    // });

    // TODO uncomment @andy
    Promise.all([wallmart_pro, ebay_pro  /*, amazon_pro**/]).then((values) =>{
            let arr = [];
            for(let va of values){
                for(let ve of va) {
                    arr.push(ve);
                }
                // console.log(arr);
            }
            res.json(arr);
        }
    );
})