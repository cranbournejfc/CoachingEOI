const SHEET_ID   = '1ca-GH6thWhXiPcup4lqKn6NjweS4lOuk74HqHvu6QtY';
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const p = e?.parameter || {};
    const pp = e?.parameters || {}; // arrays for multi-value fields
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const headers = [
      'submitted_at','full_name','email','phone','team_applied','role',
      'coached_before','experience','accreditation','wwcc','availability_season',
      'philosophy','success_metrics'
    ];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);

    const roleSelections = pp.role || [];
    const roleValue = Array.isArray(roleSelections) && roleSelections.length
      ? roleSelections.join(', ')
      : (p.role || '');

    const row = [
      p.submitted_at || '',
      p.full_name || '',
      p.email || '',
      p.phone || '',
      p.team_applied || '',
      roleValue,
      p.coached_before || '',
      p.experience || '',
      p.accreditation || '',
      p.wwcc || '',
      p.availability_season || '',
      p.philosophy || '',
      p.success_metrics || ''
    ];
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

function doGet(){ return ContentService.createTextOutput('OK'); }
