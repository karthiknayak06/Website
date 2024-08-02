const { google } = require('googleapis');
const { googleSheets } = require('./config');

async function storeData(teamData) {
  const auth = new google.auth.GoogleAuth({
    credentials: googleSheets.credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const authClient = await auth.getClient();
  const sheetsApi = google.sheets({ version: 'v4', auth: authClient });

  const request = {
    spreadsheetId: googleSheets.spreadsheetId,
    range: `${googleSheets.sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [teamData]
    }
  };

  try {
    const response = await sheetsApi.spreadsheets.values.append(request);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { teamName, teamMembers, gameIDs, whatsappNumber } = req.body;
    try {
      await storeData([teamName, ...teamMembers, ...gameIDs, whatsappNumber]);
      res.status(200).send('Registration successful!');
    } catch (error) {
      res.status(500).send('Error during registration: ' + error.message);
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};
