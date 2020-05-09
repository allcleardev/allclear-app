const puppeteer = require('puppeteer');

let phone = '';
let account = '';
let auth = '';

try {
    const config = require('dotenv').config({ path: '.env.test.local' });
    phone = config.parsed.E2E_PHONE_NUMBER;
    account = config.parsed.TWILIO_SID;
    auth = config.parsed.TWILIO_AUTH;
} catch(e){
    phone = '6466030984';
    account = process.env.TWILIO_SID;
    auth = process.env.TWILIO_AUTH;
}

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

    //Navigate to the get-started page
    await page.goto('https://app-staging.allclear.app/get-started');
    
    //Click the get-started button
    let getStarted = await page.$x('//*[@id="root"]/div/div[2]/div/button[1]');
    await getStarted[0].click();

    //On the location page
    //Put in location and click next 
    await page.waitForSelector('#google-maps-autocomplete');
    await page.type('#google-maps-autocomplete', '08050');
    await page.waitFor(500);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    await page.waitFor(1000);
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
        '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input'
        );
    await page.type(
        '#root > div > div.MuiContainer-root.onboarding-body.MuiContainer-maxWidthLg > div.content-container > form > div > div > input',
        phone,
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
    getVerificationCode();
    await page.waitFor(1000);
    await page.type('#token', code);

    let verify = await page.$x('//*[@id="root"]/div/div[2]/div[2]/span/button');
    await verify[0].click();

    //At map page
    //Press logout button and close browser session
    await page.waitForXPath('//*[@id="root"]/div/div[1]/div/nav/a[6]');
    let logout = await page.$x('//*[@id="root"]/div/div[1]/div/nav/a[6]');
    await logout[0].click();
    await browser.close();
};

exports.test = test;