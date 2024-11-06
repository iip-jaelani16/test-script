const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const HeaderGenerator = require('header-generator');
const { newInjectedPage } = require('fingerprint-injector');

// Membaca file JSON product_url_no_extParam.json
const data = fs.readFileSync(path.join(__dirname, 'product_url_no_extParam.json'), 'utf8');
const jsonData = JSON.parse(data);
const numIterations = jsonData.length;

// Batas jumlah browser yang dibuka secara paralel
const maxParallelBrowsers = 7;

(async () => {
    const tasks = []; // Array untuk menyimpan tugas paralel

    for (let i = 0; i < numIterations; i++) {
        tasks.push(
            (async () => {
                try {
                    const operatingSystems = ['android', 'ios'];
                    const randomOS = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
                    const randomKeywordSearch = jsonData[i]; // Mendapatkan keyword secara acak

                    const browser = await puppeteer.launch({ headless: true });
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

                    // Mendapatkan User-Agent
                    const headers = await page.evaluate(() => {
                        return window.navigator.userAgent;
                    });
                    console.count(`Using User-Agent: ${headers}`);

                    // Akses halaman target
                    await page.goto(randomKeywordSearch);
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Scroll halaman
                    await page.evaluate(() => {
                        window.scrollBy(0, window.innerHeight);
                    });
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await browser.close();
                } catch (error) {
                    console.count(`Error in iteration ${i}:`, error);
                }
            })()
        );

        // Jalankan batch browser sesuai `maxParallelBrowsers`
        if (tasks.length >= maxParallelBrowsers || i === numIterations - 1) {
            await Promise.all(tasks);
            tasks.length = 0; // Bersihkan batch setelah selesai
        }
    }

    console.log("Loop selesai!");
})();
