const config = require('dotenv').config();
const puppeteer = require('puppeteer');
const client = require('twilio')(
  config.parsed.TWILIO_E2E_SID, config.parsed.TWILIO_E2E_SECRET
);
const e2ePhoneNumber = '6466030984';
var verificationCode = "";

// I pulled these args from a SO post, puppeteer seems eat up a lot
// of resources on my machine, this is intended to reduce some of that
// https://stackoverflow.com/questions/49008008/chrome-headless-puppeteer-too-much-cpu
const defaultArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--no-first-run',
  '--no-zygote',
  '--single-process', // <- this one doesn't works in Windows
  '--disable-gpu'
];

// FYI: Use this sparingly, the screenshots are useful but
// seem to cause issues when running all the tests together
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

    await browser.close();
  }, 7000);

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

    await browser.close();
  }, 7000);

  test('Can input location on background page', async () => {
    let browser = await puppeteer.launch({
      args: defaultArgs,
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

    // await takeScreenshot(page, 'location-loaded')

    // select the first option in the list
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // wait for the button to be enabled
    await page.waitFor(4000)
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    // await takeScreenshot(page, 'on-health-worker-page')

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Health Worker Status');

    await browser.close();
  }, 7000);

  test('Can select I am a Health Worker', async () => {
    let browser = await puppeteer.launch({
      args: defaultArgs,
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

    await page.goto('http://localhost:3000/health-worker');

    await page.waitFor(2000);
    let chips = await page.$$('[role="button"]');
    chips[0].click();
    // await takeScreenshot(page, 'i-am-hw-selected');

    // wait for the button to be enabled
    await page.waitFor(4000);
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Symptoms');

    await browser.close();
  }, 10000);

  test('Can select I live with Health Worker', async () => {
    let browser = await puppeteer.launch({
      args: defaultArgs,
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

    await page.goto('http://localhost:3000/health-worker');

    await page.waitFor(2000);
    let chips = await page.$$('[role="button"]');
    chips[1].click(); // should be I live with health worker
    // await takeScreenshot(page, 'i-live-hw-selected');

    // wait for the button to be enabled
    await page.waitFor(4000);
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Symptoms');

    await browser.close();
  }, 10000);

  test('Can select Neither', async () => {
    let browser = await puppeteer.launch({
      args: defaultArgs,
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

    await page.goto('http://localhost:3000/health-worker');

    await page.waitFor(2000);
    let chips = await page.$$('[role="button"]');
    chips[2].click(); // should be "Neither"
    // await takeScreenshot(page, 'neither-selected');

    // wait for the button to be enabled
    await page.waitFor(2000)
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Symptoms');

    await browser.close();
  }, 10000);
});
