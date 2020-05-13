const puppeteer = require('puppeteer');

const clipboardy = require('clipboardy');

let phone = '';
let account = '';
let auth = '';

try {
  const config = require('dotenv').config({ path: '.env.test.local' });
  phone = config.parsed.E2E_PHONE_NUMBER;
  account = config.parsed.TWILIO_SID;
  auth = config.parsed.TWILIO_AUTH;
} catch (e) {
  phone = '6466030984';
  account = process.env.TWILIO_SID;
  auth = process.env.TWILIO_AUTH;
}

const client = require('twilio')(account, auth);
let code = '';

async function getVerificationCode() {
  let messages = await client.messages.list({ limit: 20, to: '+1' + phone });
  code = messages[0].body.match(/[0-9]{6}/g)[0];
}

const test = async () => {
  //Initialize the puppeteer instance
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  let page = await browser.newPage();

  //Navigate to AllClear application
  await page.goto('https://app-staging.allclear.app');

  //Click the login button
  await page.waitForXPath('//*[@id="root"]/div/div[1]/div/nav/a[3]');
  let login = await page.$x('//*[@id="root"]/div/div[1]/div/nav/a[3]');
  await login[0].click();

  //On the sign-in page, enter the phone number and click send verification code
  await page.waitForSelector(
    '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input',
  );
  await page.type(
    '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input',
    phone,
  );
  await page.waitForXPath('//*[@id="root"]/div/div[2]/div[2]/div/span/button');
  let sendVerificationCode = await page.$x('//*[@id="root"]/div/div[2]/div[2]/div/span/button');
  await sendVerificationCode[0].click();

  //On sign-in-verification page
  //Capture code via twilio api in getVerificationCode() helper function
  //Enter verification code and verify the new account
  await page.waitForSelector('#token');
  await page.waitFor(1000);
  getVerificationCode();
  await page.waitFor(1000);
  await page.type('#token', code);

  let verify = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
  await verify[0].click();

  //Once logged in, hit the home button on the map page
  await page.waitForXPath('//*[@id="root"]/div/div[1]/div/nav/a[6]');
  let home = await page.$x('//*[@id="root"]/div/div[1]/div/nav/a[1]');
  await home[0].click();

  //On the home page
  //Click the share link and make sure it is copied and matches 'https://go.allclear.app'
  await page.waitForXPath('//*[@id="root"]/section/div[2]/article[3]/button');
  let share = await page.$x('//*[@id="root"]/section/div[2]/article[3]/button');
  await share[0].click();

  //await page.waitForXPath('//*[@id="root"]/section/div[3]');

  let link = clipboardy.readSync();

  if (link !== 'https://go.allclear.app') {
    process.exit(1);
  }

  //On the home page
  //Check to see if the first five saved/pinned locations are there and correct
  //1
  await page.waitFor(1000);
  let firstPin = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(2)>dl',
      ).innerText,
  );
  //2
  let secondPin = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(3)>dl',
      ).innerText,
  );
  //3
  let thirdPin = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(4)>dl',
      ).innerText,
  );
  //4
  let fourthPin = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(5)>dl',
      ).innerText,
  );
  //5
  let fifthPin = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(6)>dl',
      ).innerText,
  );

  if (
    !firstPin.includes('AtlantiCare Urgent Care Manahawkin') &&
    !secondPin.includes('Southern Ocean Medical Center') &&
    !thirdPin.includes('SEARCH - Community Family Services') &&
    !fourthPin.includes('Hackensack Meridian Urgent Care-Long Beach Island') &&
    !fifthPin.includes('Hackensack Meridian Urgent Care-Forked River')
  ) {
    process.exit(1);
  }

  //At home page
  //Get initial banner to compare to after change
  //Click gear icon and edit health worker status
  //Save the new satus and check if the CDC priority banner at the top has changed
  let initialBanner = '';
  try {
    initialBanner = await page.evaluate(
      () =>
        document.querySelector(
          '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.banner--warn.banner.article>p>span',
        ).innerText,
    );
  } catch (e) {
    initialBanner = await page.evaluate(
      () =>
        document.querySelector(
          '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.banner--pass.banner.article>p>span',
        ).innerText,
    );
  }

  await page.waitForXPath('//*[@id="root"]/section/div[1]/div[3]/button/span[1]');
  let gear = await page.$x('//*[@id="root"]/section/div[1]/div[3]/button/span[1]');
  await gear[0].click();

  await page.waitFor(500);
  let healthWorkerStatus = await page.evaluate(
    () =>
      document.querySelector(
        '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthLg>article>div:nth-child(3)>div>div>div',
      ).innerText,
  );

  if (healthWorkerStatus.includes('Neither')) {
    let statusDropDown = await page.$x('//*[@id="root"]/section/div[2]/article/div[3]/div/div/div');
    await statusDropDown[0].click();
    await page.waitFor(700);
    let selection = await page.$x('//*[@id="menu-"]/div[3]/ul/li[1]');
    await selection[0].click();
  } else {
    let statusDropDown = await page.$x('//*[@id="root"]/section/div[2]/article/div[3]/div/div/div');
    await statusDropDown[0].click();
    await page.waitFor(700);
    let selection = await page.$x('//*[@id="menu-"]/div[3]/ul/li[3]');
    await selection[0].click();
  }

  await page.waitFor(500);
  let update = await page.$x('/html/body/div/section/div[2]/div/button[1]');
  await update[0].click();

  await page.waitForSelector(
    '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.banner--warn.banner.article>p>span',
  );
  await page.waitFor(1000);
  let updatedBanner = '';
  try {
    updatedBanner = await page.evaluate(
      () =>
        document.querySelector(
          '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.banner--pass.banner.article>p>span',
        ).innerText,
    );
  } catch (e) {
    updatedBanner = await page.evaluate(
      () =>
        document.querySelector(
          '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.banner--warn.banner.article>p>span',
        ).innerText,
    );
  }

  if (initialBanner === updatedBanner) {
    process.exit(1);
  }

  //On the home page
  //Click location to be taken to map screen and make sure the location id is 15218
  await page.click(
    '#root>section>div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd>article.locations.article>section:nth-child(3)>dl>dt',
  );

  let url = await page.url();

  if (!url.includes('15218')) {
    process.exit(1);
  }

  //At map page
  //Press logout button and close browser session
  await page.waitForXPath('//*[@id="root"]/div/div[1]/div/nav/a[6]');
  let logout = await page.$x('//*[@id="root"]/div/div[1]/div/nav/a[6]');
  await logout[0].click();
  await browser.close();
};

exports.test = test;
