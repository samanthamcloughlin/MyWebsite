$(document).ready(function() {
  $("#bigbutton").click(function(){
    document.getElementById("bigbutton").style.color = "red";
    alert("hi!");
  });

  $("#hiddenbread").click(function(){
    document.getElementById("hiddenmessage").style.opacity = "1";
  });

  $("#playgame").click(function(){
    $('#game_content').load("game.html");
  });
});


function loadJSAsHTML(result)
{
  var myString = "";

  for (var i = 0; i < result.length; i++) {
    var nextResult = result[i];

    myString += "<h2>" + nextResult['headline']  + "</h2>";
    myString += "<p>" + nextResult['author']  + ", " + nextResult['date'] + "</p>";
    myString += "<h3>" + nextResult['body'] + "</h3> + <br> + <br> + <br>";
  }
  $("#js_data").html(myString);

}

function requestJSData(){
  $.ajax({
    dataType: "json",
    url: "https://firebasestorage.googleapis.com/v0/b/advancedtopicscs.appspot.com/o/blogArticles.json?alt=media&token=478d06a6-d7e5-4cac-a92d-7670dea8de17",
    success: loadJSAsHTML,
  });
}
