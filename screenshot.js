const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const url = process.argv[2];
const timeout = 5000;

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false, // corrected to boolean
            executablePath: 'C:\\Users\\Jack\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
            userDataDir: 'C:\\Users\\Jack\\AppData\\Local\\Google\\Chrome SxS\\User Data\\Default',
        });

        const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 1200,
            deviceScaleFactor: 1,
        });

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: timeout,
        });

        await page.waitForTimeout(timeout);

        await page.screenshot({
            path: "screenshot.jpg",
            fullPage: true,
        });

    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();
