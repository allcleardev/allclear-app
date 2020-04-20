const config = require('dotenv').config();
const puppeteer = require('puppeteer');
const client = require('twilio')(
  config.parsed.TWILIO_E2E_SID, config.parsed.TWILIO_E2E_SECRET
);
const e2ePhoneNumber = '6466030984';
var verificationCode = "";


const takeScreenshot = async (page, name) => {
  page.screenshot({path: `./e2e/screenshots/${name}.png`});
}

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

    await page.goto('http://localhost:3000/get-started');
    await page.waitForXPath('.//button[contains(@class, "signup")]');

    browser.close();
  }, 20000);

  test('Can navigate to next page', async () => {
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

    await page.goto('http://localhost:3000/get-started');
    await page.waitForXPath('.//button[contains(@class, "signup")]');
    let button = await page.$x('.//button[contains(@class, "signup")]');
    button[0].click();

    await page.waitForNavigation();

    let header = await page.$x('.//h1[contains(@class, "heading")]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Background');

  }, 20000);

  test('Can input location on background page', async () => {
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

    await page.goto('http://localhost:3000/background');
    await page.waitForXPath('.//input[@id="google-maps-autocomplete"]');
    await page.type('#google-maps-autocomplete', '11211')

    // wait for popup to show
    await page.waitForSelector('#google-maps-autocomplete-popup');

    await takeScreenshot(page, 'location-loaded')

    // select the first option in the list
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // wait for the button to be enabled
    await page.waitFor(4000)
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    await takeScreenshot(page, 'on-health-worker-page')

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Health Worker Status');

  }, 30000);
});
