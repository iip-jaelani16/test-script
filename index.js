const puppeteer = require('puppeteer');
const { newInjectedPage } = require('fingerprint-injector');

// // Jumlah iterasi yang diinginkan
const numIterations = 10; // Misalnya, buka 5 kali dengan User-Agent berbeda
// const brandNames = [
//     "Casualix",
//     // "Casualix ft lalampahan",
//     // "Lalampahan ft casualix",
//     // "Casualix Lalampahan",
//     // "Casualix by Lalampahan",
// ];

// const productNames = [
//     // "blus atasan wanita",
//     // "blouse wanita elegan",
//     // "blouse lengan panjang wanita",
//     // "blus formal wanita",
//     // "blouse wanita modern",
//     // "blus atasan kasual",
//     // "blouse kerja wanita",
//     // "blouse wanita simpel",
//     // "atasan blouse casual",
//     // "blus trendy wanita",
//     'blus',
//     'blouse',

// ];

// const otherKeywords = [
//     "terbaru",
//     "elegan",
//     "kasual",
//     "modis",
//     "trendy",
//     "simple",
//     "gaya modern",
//     "model terbaru",
//     "fashion wanita",
//     "fashion kekinian",
//     "style kasual",
//     "nyaman dipakai",
//     "untuk kerja",
//     "untuk sehari-hari",
//     "untuk acara formal"
// ];


(async () => {
    for (let i = 0; i < numIterations; i++) {


        // const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)];
        // const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
        // const randomOtherKeyword = otherKeywords[Math.floor(Math.random() * otherKeywords.length)];

        // const randomKeywordSearch = `${randomBrand} ${randomProduct} ${randomOtherKeyword}`;

        const browser = await puppeteer.launch({ headless: true });
        const operatingSystems = ['android', 'ios'];
        const randomOS = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
        const page = await newInjectedPage(
            browser,
            {
                // constraints untuk fingerprint yang dihasilkan
                fingerprintOptions: {
                    devices: ['mobile'],
                    operatingSystems: [randomOS],
                },
            },
        );
        // console.log(`Iteration ${i + 1}: Using User-Agent: ${randomUserAgent}`);

        // Akses halaman target dan lakukan pencarian
        await page.goto('https://www.tokopedia.com/');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('body > div.joSw1cJhtoiKqB9ZOC45.css-6xix1i > div.joSw1cJhtoiKqB9ZOC45.hTMTg7toiDqQHMqLKAse')
        // await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('body > div.joSw1cJhtoiKqB9ZOC45.css-6xix1i > div.joSw1cJhtoiKqB9ZOC45.hTMTg7toiDqQHMqLKAse')


        await page.waitForSelector('input[data-unify="SearchBar"]');
        await page.click('input[data-unify="SearchBar"]');

        await page.waitForSelector('input[name="searchQuery"]');
        await page.type('input[name="searchQuery"]', 'casualix', { delay: 50 });
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });

        // await new Promise(resolve => setTimeout(resolve, 5000));

        // const hashButtonChangeKeyowrd = await page.evaluate(() => {
        //     const productElements = document.querySelector('button[data-testid="btnSRPChangeKeyword"]');
        //     return productElements ?? false;
        // });

        // console.log({
        //     hashButtonChangeKeyowrd
        // });


        // if (!hashButtonChangeKeyowrd) {
        //     await page.click('input[type="search"]', {
        //         count: 3
        //     });
        //     await page.type('input[type="search"]', 'Casualix', { delay: 50 });
        //     await page.keyboard.press('Enter');
        //     // Pindah ke tab toko
        //     await page.waitForSelector('button[data-testid="btnSRPShopTab"]');
        //     await page.click('button[data-testid="btnSRPShopTab"]');

        //     // Klik tombol 'Lihat Toko'
        //     await page.waitForSelector('button[data-testid="btnSRPShopSeeShop"]');
        //     await page.click('button[data-testid="btnSRPShopSeeShop"]');

        //     await page.waitForSelector('div.prd_container-card a')
        //     await page.click('div.prd_container-card a')
        //     await new Promise(resolve => setTimeout(resolve, 2000));
        //     // scroll page
        //     await page.evaluate(() => {
        //         window.scrollBy(0, window.innerHeight);
        //     });
        // }

        // Tunggu beberapa saat sebelum menutup browser (opsional, tergantung kebutuhan)

        // Tutup browser setelah setiap iterasi
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await page.close();
        await browser.close();
        console.log('success');

    }

    console.log("Loop selesai!");
})();

