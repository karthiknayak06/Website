module.exports = {
  googleSheets: {
    spreadsheetId: 'your_spreadsheet_id',
    sheetName: 'Sheet1',
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
  }
};
