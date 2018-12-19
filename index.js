const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1bnsajR4ySnuXZLLRkoVroenfnf6ULfa-6_9H2t0yD0Q');
var schedule = []
// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function(err) {
  if (err) {
    console.log("Auth error: ", err)
  }
  doc.getRows(1, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      schedule.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch
      })
    }
    console.log(schedule);
  })
});