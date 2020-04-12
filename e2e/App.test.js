const puppeteer = require('puppeteer');

describe('App loads', () => {
  test('App splash page loads correctly', async () => {

    let browser = await puppeteer.launch({
      headless: true
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.heading');

    browser.close();
  }, 30000);
});
