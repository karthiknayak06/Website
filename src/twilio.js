const twilio = require('twilio');
const { twilio: twilioConfig } = require('./config');

const client = new twilio(twilioConfig.accountSid, twilioConfig.authToken);

function sendWelcomeMessage(phoneNumber) {
  return client.messages.create({
    body: 'Welcome to the Esports Tournament!',
    from: twilioConfig.whatsappFrom,
    to: `whatsapp:${phoneNumber}`
  });
}

module.exports = { sendWelcomeMessage };
