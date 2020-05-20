const puppeteer = require('puppeteer');
const twilio = require('../utils/twilio.js');
const config = require('../utils/config.js');
const args = require('../utils/default-args.js');

const test = async () => {
  //Initialize the puppeteer instance
  const browser = await puppeteer.launch({
    args: args.defaults,
    headless: true,
  });
  let page = await browser.newPage();

  //Navigate to the get-started page
  await page.goto('https://app-staging.allclear.app/get-started');

  //Click the get-started button
  await page.waitForSelector(
    `#root>div>div.MuiContainer-root.content.MuiContainer-maxWidthMd
    >div>button.MuiButtonBase-root.MuiButton-root.jss77.MuiButton-contained.jss78.signup`
    );
  await page.click(
    `#root>div>div.MuiContainer-root.content.MuiContainer-maxWidthMd>div
    >button.MuiButtonBase-root.MuiButton-root.jss77.MuiButton-contained.jss78.signup`
    );

  //On the location page
  //Put in location and click next
  await page.waitForSelector('#google-maps-autocomplete');
  await page.type('#google-maps-autocomplete', '08050');
  await page.waitFor(3000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await page.waitFor(2000);
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss167>span>button'
  );

  //On the health-worker status page
  //Select health-worker status of niether
  await page.waitFor(1000);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await page.waitFor(1000);
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss167>span>button'
  );

  //On the Symptoms page
  //Select the symptom fever
  await page.waitFor(1000);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await page.waitFor(500);
  await page.waitForSelector(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss167>span>button'
  );
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss167>span>button'
  );

  //On sign-up page
  //Input phone number and click ToS and PP check boxes to register number and get verification code.
  await page.waitFor(1000);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type(config.E2E_PHONE_NUMBER);

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');

  await page.waitFor(500);
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss167>span>button'
  );

  //On sign-in-verification page
  //Capture code via twilio api in getVerificationCode() helper function
  //Enter verification code and verify the new account
  await page.waitFor(1000);
  let code = await twilio.getCode();
  await page.waitFor(1000);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type(code);

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  //logout
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await browser.close();
};

exports.test = test;
