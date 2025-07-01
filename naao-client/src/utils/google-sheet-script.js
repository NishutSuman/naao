/**
 * This is Google Apps Script code that should be deployed as a web app in Google Sheets.
 * Steps to set it up:
 * 1. Create a new Google Sheet for registrations
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code into the script editor
 * 4. Deploy as web app, set access to "Anyone, even anonymous"
 * 5. Copy the web app URL and use it in your React app
 */

// Header row for the sheet
// function doPost(e) {
//   try {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
//     // If this is the first submission, add headers
//     if (sheet.getLastRow() === 0) {
//       sheet.appendRow([
//         'Timestamp',
//         'Full Name',
//         'State',
//         'JNV District',
//         'Batch',
//         'Contact Number',
//         'Email',
//         'Profession',
//         'Event Title',
//         'Event ID',
//         'Registration Date'
//       ]);
//     }
    
//     // Get form data
//     var formData = e.parameter;
    
//     // Append the data to the sheet
//     sheet.appendRow([
//       new Date(),                 // Timestamp
//       formData.fullName,          // Full Name
//       formData.state,             // State
//       formData.jnvDistrict,       // JNV District
//       formData.batch,             // Batch
//       formData.contactNumber,     // Contact Number
//       formData.email,             // Email
//       formData.profession,        // Profession
//       formData.eventTitle,        // Event Title
//       formData.eventId,           // Event ID
//       formData.registrationDate   // Registration Date
//     ]);
    
//     // Return success response
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   } 
//   catch(error) {
//     // Log the error
//     Logger.log(error);
    
//     // Return error response
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }

// function doGet(e) {
//   // Handle GET requests (optional)
//   return ContentService
//     .createTextOutput(JSON.stringify({ 'result': 'success', 'data': 'Received GET request' }))
//     .setMimeType(ContentService.MimeType.JSON);
// }