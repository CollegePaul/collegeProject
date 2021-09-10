//version 7
//This file is code.gs on the webapp

//starts the service
function doGet(e) {
    return HtmlService.createHtmlOutputFromFile('WebAppLogin');
  }
  
  //----------------------------------------------Get Records
  function GetRecords(username) {

    var ss= SpreadsheetApp.getActiveSpreadsheet();
    var displaySheet = ss.getSheetByName("DISPLAY");
    var getLastRow =  displaySheet.getLastRow(); //get all the students
    var gradeArray = []; //this woulf be better ro return JSON information to make it more flexible

    //loop over all of the display sheets 2 to i
    for(var i = 2; i <= getLastRow; i++){ 
    
      //load in the grade sheet
      var gradeSheetName = displaySheet.getRange(i, 1).getValue();
      var gradeSheet = ss.getSheetByName(gradeSheetName);
      var getLastRowGrade =  gradeSheet.getLastRow();

      //loop over records in the grade sheet to get the result
      for(var y = 2; y <= getLastRowGrade; y++){
        if(gradeSheet.getRange(y, 1).getValue().toUpperCase() == username.toUpperCase()){
          var grade = gradeSheet.getRange(y, 2).getValue();
          var n = gradeSheet.getRange(y,5).getValue();
          gradeArray.push([n, gradeSheetName, grade]);
        }
      }
    }
    return gradeArray;  
  }

  //------------------------------------------- Check Login
  //called when the get data button is pressed on the web page
  function checkLogin() {
    var ss= SpreadsheetApp.getActiveSpreadsheet();
    var webAppSheet = ss.getSheetByName("USERNAMES");
    var getLastRow =  webAppSheet.getLastRow();
    var id = Session.getActiveUser().getEmail(); //get the google ID
    var found_record = 'FALSE'; //message

    for(var i = 2; i <= getLastRow; i++){
        // if(webAppSheet.getRange(i, 1).getValue().toUpperCase() == username.toUpperCase() && 
        //   webAppSheet.getRange(i, 4).getValue().toUpperCase() == password.toUpperCase())
        if(webAppSheet.getRange(i, 1).getValue().toUpperCase() == id.toUpperCase()){
        found_record = 'TRUE';
        }    
    }

    return [found_record, id];
    
  }