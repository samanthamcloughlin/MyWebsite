
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
