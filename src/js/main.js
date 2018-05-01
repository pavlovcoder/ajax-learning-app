//1. Introduction to the AJAX:

//1.1 Using a default standart way getting a data from the server:
var xhr = new XMLHttpRequest();
xhr.open('GET', '../server-side/send-ajax-data.php');

xhr.onreadystatechange = function() {
  var DONE = 4;
  var OK = 200;
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) {
      console.log(xhr.responseText);
    } else {
      console.log('Error: ' + xhr.status);
    }
  }
};

xhr.send(null);

//1.2 Using a new Fetch API for doing the same thing:
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', '../server-side/send-ajax-data2.php');

fetch('../server-side/send-ajax-data2.php').then(function(response) {
  return response.text();
}).then(function(data) {
  console.log(data);
}).catch(function(error) {
  console.log('Error: ' + error);
});

//1.3 Using jQuery methods for doing the same thing:
var xhr3 = new XMLHttpRequest();
xhr3.open('GET', '../server-side/send-ajax-data3.php');

$.ajax({
  type: 'GET',
  url: '../server-side/send-ajax-data3.php',
  dataType: "JSON",
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.log('Error: ' + data);
  }
});
