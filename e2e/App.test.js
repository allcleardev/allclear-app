const puppeteer = require('puppeteer');
// const config = require('dotenv').config();
// const client = require('twilio')(
//   config.parsed.TWILIO_E2E_SID, config.parsed.TWILIO_E2E_SECRET
// );
// const e2ePhoneNumber = '6466030984';
// var verificationCode = "";

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

describe('Testing individual pages', () => {
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
    await page.waitFor(4000);
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
    await page.waitFor(4000);
    let button = await page.$x('.//button[contains(@class, "next")]');
    button[0].click();

    await page.waitForNavigation();

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Symptoms');

    await browser.close();
  }, 10000);

  test('Can land on symptoms page', async () => {
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

    await page.goto('http://localhost:3000/symptoms');

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Symptoms');

    await browser.close();
  }, 5000);
});

describe('Stepping through from get-started to sign-up', () => {
  test('Can get to sign-up page', async () => {
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
    let signupButton = await page.$x('.//button[contains(@class, "signup")]');
    signupButton[0].click();

    // navigate to background page

    await page.waitForNavigation();

    await page.waitForXPath('.//input[@id="google-maps-autocomplete"]');
    await page.type('#google-maps-autocomplete', '11211')

    // wait for popup to show
    await page.waitForSelector('#google-maps-autocomplete-popup');

    // select the first option in the list
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // wait for the button to be enabled
    await page.waitFor(4000);
    let nextButton = await page.$x('.//button[contains(@class, "next")]');
    nextButton[0].click();

    // navigate to HWS page
    await page.waitForNavigation();

    await page.waitFor(2000);
    let chipsOnHWSPage = await page.$$('[role="button"]');
    chipsOnHWSPage[0].click();

    // wait for the button to be enabled
    await page.waitFor(4000);
    let nextButtonHWS = await page.$x('.//button[contains(@class, "next")]');
    nextButtonHWS[0].click();

    // navigate to symptoms page
    await page.waitForNavigation();

    await page.waitFor(2000);
    let chipsOnSymptomsPage = await page.$$('[role="button"]');
    chipsOnSymptomsPage[0].click(); // select "Fever"

    // wait for the button to be enabled
    await page.waitFor(4000);
    let nextButtonSymptoms = await page.$x('.//button[contains(@class, "next")]');
    nextButtonSymptoms[0].click();

    // navigate to sign-up page
    await page.waitForNavigation();

    let header = await page.$x('.//h1[@class="heading"]');
    var text = await (await header[0].getProperty('textContent')).jsonValue();
    expect(text).toBe('Phone Number Registration');

  }, 25000);
});

const setDomainLocalStorage = async (browser, url, values) => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', r => {
    r.respond({
      status: 200,
      contentType: 'text/plain',
      body: 'tweak me.',
    });
  });
  await page.goto(url);
  await page.evaluate(values => {
    localStorage.setItem("appState", JSON.stringify(values));
  }, values);

  await page.close();
  return;
};

describe('Start on sign-up page', () => {
  test('Land on signup page', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    const localStorage = require('./fixtures/app_state.json');

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', localStorage
    );

    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/sign-up');

    let url = new URL(page.url());
    expect(url.pathname).toBe('/sign-up');
  }, 20000);

  test('Can click send verification code', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    const localStorage = require('./fixtures/app_state.json');

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', localStorage
    );

    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/sign-up');

    await page.type('input[name=phone]', '5555555555')

    const is_disabled = (await page.$x('//button[@disabled]')).length !== 0;
    expect(is_disabled).toBe(true);

    let terms = await page.$x('.//input[@name="termsAndConditions"]');
    terms[0].click();

    // wait for the button to be enabled
    await page.waitFor(4000);
    const is_not_disabled = (await page.$x('//button[@disabled]')).length === 0;
    expect(is_not_disabled).toBe(true);
  }, 20000);

  // TODO: can land on map
  // test('Land on map', async () => {
  //   let browser = await puppeteer.launch({
  //     headless: false
  //   });

  //   const localStorage = require('./fixtures/app_state.json');

  //   await setDomainLocalStorage(
  //     browser, 'http://localhost:3000/get-started', localStorage
  //   );

  //   let page = await browser.newPage();

  //   page.emulate({
  //     viewport: {
  //       width: 500,
  //       height: 2400
  //     },
  //     userAgent: ''
  //   });

  //   await page.goto('http://localhost:3000/map');

  //   let url = new URL(page.url());
  //   expect(url.pathname).toBe('/map');
  // }, 20000);
});
