const express = require('express');
const bodyParser = require('body-parser');
const { storeData } = require('./googleSheets');
const { sendWelcomeMessage } = require('./twilio');
const { stripeSecretKey } = require('./config');
const stripe = require('stripe')(stripeSecretKey);

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', async (req, res) => {
  const { teamName, teamMembers, gameIDs, whatsappNumber } = req.body;
  try {
    await storeData([teamName, ...teamMembers, ...gameIDs, whatsappNumber]);
    await sendWelcomeMessage(whatsappNumber);
    res.status(200).send('Registration successful and welcome message sent!');
  } catch (error) {
    res.status(500).send('Error during registration: ' + error.message);
  }
});

app.post('/payment', async (req, res) => {
  const { amount, source } = req.body;
  try {
    await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: source,
      description: 'Esports Tournament Registration Fee'
    });
    res.status(200).send('Payment successful!');
  } catch (error) {
    res.status(500).send('Payment failed: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
