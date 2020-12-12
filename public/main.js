$(document).ready(function() {
  $("#bigbutton").click(function() {
    document.getElementById("bigbutton").style.color = "red";
    alert("hi!");
  });

  $("#hiddenbread").click(function() {
    document.getElementById("hiddenmessage").style.opacity = "1";
  });

  $("#playgame").click(function() {
    $('#game_content').load("game.html");
  });
});

function loadJSAsHTML(result) {
  var myString = "";

  for (var i = 0; i < result.length; i++) {
    var nextResult = result[i];

    myString += "<h2>" + nextResult['headline'] + "</h2>";
    myString += "<p>" + nextResult['author'] + ", " + nextResult['date'] + "</p>";
    myString += "<h3>" + nextResult['body'] + "</h3><br><br><br>";
  }
  $("#js_data").html(myString);

}

function requestJSData() {
  $.ajax({
    dataType: "json",
    url: "https://firebasestorage.googleapis.com/v0/b/advancedtopicscs.appspot.com/o/blogArticles.json?alt=media&token=478d06a6-d7e5-4cac-a92d-7670dea8de17",
    success: loadJSAsHTML,
  });
}

function load538Rss(result) {

  result = xmlToJson(result);

  result = result['rss']['channel']['item']

  htmlStr = "";

  for (var i = 0; i < result.length; i++) {
    var nextResult = result[i];
    htmlStr += "<a href=" + nextResult['link'] + "> <p>" + nextResult['title'] + "</p></a>";
    htmlStr += "<p style = \"font-size: 80%\">" + nextResult['pubDate'] + "</p>"
    htmlStr += "<br>"
  }

  $("#rss_data").html(htmlStr);

}

function request538Rss() {
  $.ajax({

    dataType: "xml",
    url: "https://cors-anywhere.herokuapp.com/https://fivethirtyeight.com/politics/feed/",
    success: load538Rss
  });
}

function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  // If all text nodes inside, get concatenated text from them.
  var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
