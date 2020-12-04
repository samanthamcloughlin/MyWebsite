const time = $("#time");
const latestChocolateVote = $("#latest_vote");
const voteOnChocolate = $("#vote_chocolate");
const chocolateOutput = $("#chocolate_output");

var firestore = firebase.firestore();
const databaseDocumentRef = firestore.doc("sudoku/time");



function voteSuccess() {
  console.log("vote saved!");
}

function generalErrorHandler(errer) {
    console.log("Got an error", error);
};

function submitChocolateVote() {
    console.log('submitting chocolate vote: ' + time.val());
    databaseDocumentRef.set(
      {
          time : time.val()
      }
    ).then(voteSuccess).catch(generalErrorHandler);
}



voteOnChocolate.click(submitChocolateVote);

function getSudokuDocument(doc)
{
  if (doc && doc.exists){
    var myData = doc.data();
    console.log(myData);
    chocolateOutput.html(myData.time);
  }
}

function getTime(){
  databaseDocumentRef.get().then(getSudokuDocument).catch(generalErrorHandler)
}

latestChocolateVote.click(getTime);

function getRealTimeUpdate() {
  databaseDocumentRef.onSnapshot()
}
