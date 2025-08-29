const SHEET_ID   = '1ca-GH6thWhXiPcup4lqKn6NjweS4lOuk74HqHvu6QtY';
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const params = e?.parameter || {};
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const headers = [
      'submitted_at','full_name','email','phone','team_applied','role',
      'coached_before','experience','accreditation','wwcc','availability_season',
      'philosophy','success_metrics'
    ];

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      const existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      if (existing.filter(String).length === 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    // Build row in header order
    const row = headers.map(h => params[h] ?? '');
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status:'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('OK');
}
