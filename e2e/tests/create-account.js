const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');
const twilio = require('../utils/twilio.js');
const config = require('../utils/config.js');

const test = async () => {
  //Initialize the puppeteer instance
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  let page = await browser.newPage();

  //Navigate to the get-started page
  await page.goto('https://app-staging.allclear.app/get-started');

  //Click the get-started button
  let getStarted = await page.$x('//*[@id="root"]/div/div[2]/div/button[1]');
  await getStarted[0].click();

  //On the location page
  //Put in location and click next
  await page.waitForSelector('#google-maps-autocomplete');
  await page.type('#google-maps-autocomplete', '08050');
  await page.waitFor(3000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await page.waitFor(2000);
  let locationNext = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
  await locationNext[0].click();

  //On the health-worker status page
  //Select health-worker status of niether
  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[1]/div/div[3]');
  let healthWorkerStatus = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[3]');
  await healthWorkerStatus[0].click();

  await page.waitFor(500);
  let healthNext = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
  await healthNext[0].click();

  //On the Symptoms page
  //Select the symptom fever
  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[1]/div/div[1]');
  let symptoms = await page.$x('//*[@id="root"]/div/div[2]/div[1]/div/div[1]');
  await symptoms[0].click();

  await page.waitFor(500);
  let symptomsNext = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
  await symptomsNext[0].click();

  //On sign-up page
  //Input phone number and click ToS and PP check boxes to register number and get verification code.
  await page.waitForSelector(
    '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input',
  );
  await page.type(
    '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input',
    config.E2E_PHONE_NUMBER,
  );

  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]/div/label[1]/span[1]/span[1]/input');
  let checkbox = await page.$x('//*[@id="root"]/div/div[2]/div[2]/div/label[1]/span[1]/span[1]/input');
  await checkbox[0].click();

  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]/div/label[2]/span[1]/span[1]/input');
  checkbox = await page.$x('//*[@id="root"]/div/div[2]/div[2]/div/label[2]/span[1]/span[1]/input');
  await checkbox[0].click();

  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]/div/label[3]/span[1]/span[1]/input');
  checkbox = await page.$x('//*[@id="root"]/div/div[2]/div[2]/div/label[3]/span[1]/span[1]/input');
  await checkbox[0].click();

  await page.waitFor(500);
  let sendVerificationCode = await page.$x('//*[@id="root"]/div/div[2]/div[3]/span/button');
  await sendVerificationCode[0].click();

  //On sign-in-verification page
  //Capture code via twilio api in getVerificationCode() helper function
  //Enter verification code and verify the new account
  await page.waitForSelector('#token');
  await page.waitFor(1000);
  let code = await twilio.getCode();
  await page.waitFor(1000);
  await page.type('#token', code);

  let verify = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
  await verify[0].click();

  //At map page
  //Press logout button and close browser session
  await page.waitForXPath('//*[@id="root"]/section/div[1]/div[3]/nav/a[6]');
  let logout = await page.$x('//*[@id="root"]/section/div[1]/div[3]/nav/a[6]');
  await logout[0].click();
  await browser.close();
};

exports.test = test;
