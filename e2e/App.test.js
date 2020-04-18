const puppeteer = require('puppeteer');
const accountSid = 'ACc5e6ed7ed6c090937eedf9090f8f21fe';
const authToken = '';
const client = require('twilio')(accountSid, authToken);
const e2ePhoneNumber = '6466030984';
var verificationCode = "";


describe('App loads', () => {
  test('App splash page loads correctly', async () => {

  // Delete al text messages
  // console.log("deleting old messages")
  // client.messages.list({limit: 20, to: '+1' + e2ePhoneNumber})
  //   .then(messages => messages.forEach(m => 
  //     client.messages(m.sid).remove()
  //     ));

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

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.heading');
    await page.focus('[name="phone"]');
    await page.type('[name="phone"]',e2ePhoneNumber);
    await page.click('[name="termsAndConditions"]');
    await page.click('[name="alertable"]');
    const [button] = await page.$x("//button[contains(., 'Send Verification Code')]");
    if (button) {
      await button.click();
    }
    await page.waitForSelector('[placeholder="Enter Code"]');
    client.messages.list({limit: 20, to: '+1' + e2ePhoneNumber})
      .then(messages => messages.forEach(m => {
        console.log(m.body);
        verificationCode = m.body.match(/[0-9]{6}/g)[0]
        console.log('got')
        console.log(m.body.match(/[0-9]{6}/g))
        console.log(verificationCode);
      }));

    await page.type('[placeholder="Enter Code"]',verificationCode);
    await page.waitForSelector('.heading');
    await page.screenshot({path: 'buddy-screenshot.png'});

    await page.focus('[placeholder="Enter Code"]');
    await page.type('[placeholder="Enter Code"]',verificationCode);
    await page.click('.next');
    await delay(2000);
    await page.focus('#google-maps-autocomplete');
    await page.type('#google-maps-autocomplete',"Dallas TX");

    await page.screenshot({path: 'screenshot.png'});

    browser.close();
  }, 30000);
});
