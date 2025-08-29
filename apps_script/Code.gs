/**
 * Cranbourne Eagles JFC — Coaching EOI (Season 2026)
 * Google Apps Script endpoint writing submissions to Google Sheets.
 */
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const params = e.parameter || {};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Ensure header row exists
    const headers = [
      'submitted_at','full_name','email','phone','team_applied','role',
      'coached_before','experience','accreditation','wwcc','availability_season',
      'philosophy','success_metrics'
    ];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      // If existing, ensure headers are in row 1
      const existing = sheet.getRange(1,1,1,headers.length).getValues()[0];
      if (existing.filter(String).length === 0) {
        sheet.getRange(1,1,1,headers.length).setValues([headers]);
      }
    }

    // Build row in header order
    const row = headers.map(h => params[h] || '');
    sheet.appendRow(row);

    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

    // CORS headers
    const resp = HtmlService.createHtmlOutput(output.getContent());
    resp.addMetaTag('Access-Control-Allow-Origin','*');
    resp.addMetaTag('Access-Control-Allow-Methods','POST, OPTIONS');
    resp.addMetaTag('Access-Control-Allow-Headers','Content-Type');
    return output;
  } catch (err) {
    const output = ContentService
      .createTextOutput(JSON.stringify({ status:'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

function doGet() {
  return ContentService.createTextOutput('OK');
}
