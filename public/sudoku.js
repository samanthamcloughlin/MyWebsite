const time = $("#time");
const latestTime = $("#latest_time");
const sudokuInput = $("#sudoku_input");
const sudokuOutput = $("#sudoku_output");

var firestore = firebase.firestore();
const databaseDocumentRef = firestore.doc("sudoku/time");



function voteSuccess() {
  console.log("vote saved!");
}

function generalErrorHandler(errer) {
    console.log("Got an error", error);
};

function submitTime() {
    console.log('submitting time: ' + time.val());
    databaseDocumentRef.set(
      {
          time : time.val()
      }
    ).then(voteSuccess).catch(generalErrorHandler);
}



sudokuInput.click(submitTime);

function getSudokuDocument(doc)
{
  if (doc && doc.exists){
    var myData = doc.data();
    console.log(myData);
    sudokuOutput.html(myData.time);
  }
}

function getTime(){
  databaseDocumentRef.get().then(getSudokuDocument).catch(generalErrorHandler)
}

latestTime.click(getTime);

function getRealTimeUpdate() {
  databaseDocumentRef.onSnapshot()
}
