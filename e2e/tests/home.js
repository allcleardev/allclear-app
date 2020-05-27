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

  //Navigate to AllClear application
  await page.goto('https://app-staging.allclear.app');

  //Click the login button
  await page.waitFor(
    '#root>div>div.mobile-top-bar>div.mobile-menu.mobile-menu--white>button'
    );
  await page.click(
    '#root>div>div.mobile-top-bar>div.mobile-menu.mobile-menu--white>button'
    );
  await page.waitFor(
    '#menu-list-grow>a:nth-child(3)'
    );
  await page.click(
    '#menu-list-grow>a:nth-child(3)'
    );

  //On the sign-in page, enter the phone number and click send verification code
  await page.waitFor(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.content-container>form>div>div>input'
    );
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.content-container>form>div>div>input'
    );
  await page.type(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.content-container>form>div>div>input',
    config.E2E_PHONE_NUMBER,
  );

  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div:nth-child(2)>div>span>button'
    );

  //On sign-in-verification page
  //Capture code via twilio api in getVerificationCode() helper function
  //Enter verification code and verify the new account
  await page.waitForSelector('#token');
  await page.waitFor(1000);
  let code = await twilio.getCode();
  await page.waitFor(1000);
  await page.type('#token', code);

  await page.waitFor(500);
  await page.click(
    '#root>div>div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg>div.onboarding-navigation.jss354>span>button'
    );

  //On the home page
  //Check to see if the first five saved/pinned locations are there and correct
  //1
  await page.waitFor(2000);
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

  await page.click(
    '#root>section>button'
  );

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
  await page.waitFor(
    '#root>div>div.mobile-top-bar>div.mobile-menu.mobile-menu--white>button'
    );
  await page.click(
    '#root>div>div.mobile-top-bar>div.mobile-menu.mobile-menu--white>button'
    );
  await page.waitFor(
    '#menu-list-grow>a:nth-child(6)'
    );
  await page.click(
    '#menu-list-grow>a:nth-child(6)'
    );
  await browser.close();
};

exports.test = test;
