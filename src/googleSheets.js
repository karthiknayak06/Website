const { google } = require('googleapis');
const { googleSheets } = require('./config');

async function storeData(teamData) {
  const auth = new google.auth.GoogleAuth({
    keyFile: googleSheets.credentials,
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

module.exports = { storeData };
