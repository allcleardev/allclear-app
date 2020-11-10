const config = require('./config.js');

const getCode = async () => {
    const client = require('twilio')(config.TWILIO_E2E_SID, config.TWILIO_E2E_SECRET);
    let messages = await client.messages.list({ limit: 20, to: '+1' + config.E2E_PHONE_NUMBER });
    return messages[0].body.match(/[0-9]{6}/g)[0];
};

exports.getCode = getCode;