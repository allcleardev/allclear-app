const puppeteer = require('puppeteer');

const clipboardy = require('clipboardy');

const config = require('dotenv').config({ path: '.env.test.local' });
const phone = config.parsed.E2E_PHONE_NUMBER;
const account = config.parsed.TWILIO_SID;
const auth = config.parsed.TWILIO_AUTH;

const client = require('twilio')(account, auth);
var code = '';

async function getVerificationCode(){ 
    let messages = await client.messages.list({limit: 20, to: '+1' + phone});
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
        '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input'
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
    //Click location to be taken to map screen and make sure the location id is 15218
    await page.waitForXPath('//*[@id="root"]/section/div[2]/article[3]/button');
    let share = await page.$x('//*[@id="root"]/section/div[2]/article[3]/button');
    await share[0].click();

    await page.waitForXPath('//*[@id="root"]/section/div[3]');

   let link = clipboardy.readSync();

   if(link === 'https://go.allclear.app'){
   } else {
       await page.click('');
   }

    await page.click(
        '#root > section > div.MuiContainer-root.cards-container.MuiContainer-maxWidthMd > article.locations.article > section:nth-child(4) > dl > dt'
        );

    let url = await page.url();

    if(url.includes('15218')){
    } else {
        await page.click('');
    }

    //At map page
    //Press logout button and close browser session
    await page.waitForXPath('//*[@id="root"]/div/div[1]/div/nav/a[6]');
    let logout = await page.$x('//*[@id="root"]/div/div[1]/div/nav/a[6]');
    await logout[0].click();
    await browser.close();
}

exports.test = test;