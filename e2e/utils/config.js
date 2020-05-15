let E2E_PHONE_NUMBER = '';
let TWILIO_E2E_SID = '';
let TWILIO_E2E_SECRET = '';

try {
  const config = require('dotenv').config({ path: '.env.test.local' });
  E2E_PHONE_NUMBER = config.parsed.E2E_PHONE_NUMBER;
  TWILIO_E2E_SID = config.parsed.TWILIO_E2E_SID;
  TWILIO_E2E_SECRET = config.parsed.TWILIO_E2E_SECRET;
} catch (e) {
  E2E_PHONE_NUMBER = '6466030984';
  TWILIO_E2E_SID = process.env.TWILIO_E2E_SID;
  TWILIO_E2E_SECRET = process.env.TWILIO_E2E_SECRET;
}

exports.E2E_PHONE_NUMBER = E2E_PHONE_NUMBER;
exports.TWILIO_E2E_SID = TWILIO_E2E_SID;
exports.TWILIO_E2E_SECRET = TWILIO_E2E_SECRET;