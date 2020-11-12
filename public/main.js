
$( document ).ready(function() {
  $("#bigbutton").click(function(){
    document.getElementById("bigbutton").style.color = "red";
    alert("hi!");
  });


  $("#hiddenbread").click(function(){
    document.getElementById("hiddenmessage").style.opacity = "1";
  });

  $.ajax({url: "/pages/splash.html", success: loadContent}); 

});
