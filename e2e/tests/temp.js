/*const puppeteer = require('puppeteer');
const config = require('dotenv').config();
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
// const takeScreenshot = async (page, name) => {
//   page.screenshot({path: `./e2e/screenshots/${name}.png`});
// }

const setDomainLocalStorage = async (browser, url, values) => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    r.respond({
      status: 200,
      contentType: 'text/plain',
      body: 'tweak me.',
    });
  });
  await page.goto(url);
  await page.evaluate((values) => {
    localStorage.setItem("appState", JSON.stringify(values));
  }, values);

  await page.close();
  return;
};

const clickNext = async (page) => {
  let button = await page.$x('.//span[contains(@class, "tooltip-button")]');
  button[0].click();
  return;
}

const headerText = async (page) => {
  let header = await page.$('h1');
  var text = await (await header.getProperty('textContent')).jsonValue();
  return text;
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

    let url = new URL(page.url());
    expect(url.pathname).toBe('/get-started');

    await browser.close();
  }, 10000);

  test('Can skip to sign-in page', async () => {

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

    await page.waitFor(4000);
    let button = await page.$x('.//button[contains(@class, "signin")]');
    button[0].click();

    await page.waitForNavigation();

    let url = new URL(page.url());
    expect(url.pathname).toBe('/sign-in');

    await browser.close();
  }, 10000);

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

    var text = await headerText(page);
    expect(text).toBe('Location');

    await browser.close();
  }, 10000);

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

    await page.goto('http://localhost:3000/location');
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
    await clickNext(page);

    await page.waitForNavigation();

    // await takeScreenshot(page, 'on-health-worker-page')

    var text = await headerText(page);
    expect(text).toBe('Health Worker Status');

    await browser.close();
  }, 10000);

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
    await clickNext(page);

    await page.waitForNavigation();

    var text = await headerText(page);
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
    await clickNext(page);

    await page.waitForNavigation();

    var text = await headerText(page);
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
    await clickNext(page);

    await page.waitForNavigation();

    var text = await headerText(page);
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

    var text = await headerText(page);
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
    await page.type('#google-maps-autocomplete', '11211');

    // wait for popup to show
    await page.waitForSelector('#google-maps-autocomplete-popup');

    // select the first option in the list
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // wait for the button to be enabled
    await page.waitFor(4000);
    await clickNext(page);

    // navigate to HWS page
    await page.waitForNavigation();

    await page.waitFor(2000);
    let chipsOnHWSPage = await page.$$('[role="button"]');
    chipsOnHWSPage[0].click();

    // wait for the button to be enabled
    await page.waitFor(4000);
    await clickNext(page);

    // navigate to symptoms page
    await page.waitForNavigation();

    await page.waitFor(2000);
    let chipsOnSymptomsPage = await page.$$('[role="button"]');
    chipsOnSymptomsPage[0].click(); // select "Fever"

    // wait for the button to be enabled
    await page.waitFor(4000);
    await clickNext(page);

    // navigate to sign-up page
    await page.waitForNavigation();

    var text = await headerText(page);
    expect(text).toBe('Phone Number Registration');

  }, 25000);
});

describe('Start on sign-up page', () => {
  test('Land on signup page', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    let appState = require('./fixtures/app_state.json');
    appState.sessionId = config.parsed.SESSION_ID;
    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', appState
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

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', {}
    );
  }, 20000);

  test('Can navigate from signup page to signin', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    let appState = require('./fixtures/app_state.json');
    appState.sessionId = config.parsed.SESSION_ID;
    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', appState
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

    let signIn = await page.$x('.//a[@class="sign-in"]');
    signIn[0].click();

    await page.waitForNavigation();

    let url = new URL(page.url());
    expect(url.pathname).toBe('/sign-in');

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', {}
    );
  }, 20000);

  test('Can click send verification code', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    let appState = require('./fixtures/app_state.json');
    appState.sessionId = config.parsed.SESSION_ID;
    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', appState
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

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', {}
    );
  }, 20000);

  test('Land on signin page', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    let appState = require('./fixtures/app_state.json');
    appState.sessionId = config.parsed.SESSION_ID;
    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', appState
    );

    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/sign-in');

    let url = new URL(page.url());
    expect(url.pathname).toBe('/sign-in');

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', {}
    );
  }, 20000);

  test('Land on map', async () => {
    let browser = await puppeteer.launch({
      headless: true
    });

    let appState = require('./fixtures/app_state.json');
    appState.sessionId = config.parsed.SESSION_ID;
    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', appState
    );

    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/map');
    let url = new URL(page.url());
    expect(url.pathname).toBe('/map');

    await setDomainLocalStorage(
      browser, 'http://localhost:3000/get-started', {}
    );
  }, 20000);

  // test('Can land on profile page', async () => {
  //   let browser = await puppeteer.launch({
  //     headless: true
  //   });

  //   let appState = require('./fixtures/app_state.json');
  //   appState.sessionId = config.parsed.SESSION_ID;
  //   await setDomainLocalStorage(
  //     browser, 'http://localhost:3000/get-started', appState
  //   );

  //   let page = await browser.newPage();

  //   page.emulate({
  //     viewport: {
  //       width: 500,
  //       height: 2400
  //     },
  //     userAgent: ''
  //   });

  //   await page.goto('http://localhost:3000/profile');

  //   let url = new URL(page.url());
  //   expect(url.pathname).toBe('/profile');

  //   await setDomainLocalStorage(
  //     browser, 'http://localhost:3000/get-started', {}
  //   );
  // }, 20000);
});*/
