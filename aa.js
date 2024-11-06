const fs = require('fs');
const path = require('path');

// get json file dada.json

const data = fs.readFileSync(path.join(__dirname, 'dada.json'), 'utf8');


const jsonData = JSON.parse(data);


console.log({
    d: jsonData
});


// get product_url olny
const product_url = jsonData.map((item) => item.product_url);
console.log({
    product_url
});

// remove ?extParam=xxx from product_url
const product_url_no_extParam = product_url.map((item) => item.split('?')[0]);
console.log({
    product_url_no_extParam
});

// save to file
fs.writeFileSync(path.join(__dirname, 'product_url_no_extParam.json'), JSON.stringify(product_url_no_extParam, null, 4), 'utf8');