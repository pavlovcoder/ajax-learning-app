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
/*
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
*/

//2.1 Making a simple request for the server:
var httpRequest;
document.getElementsByTagName('button')[0].addEventListener('click', makeRequest);

function makeRequest() {
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = alertContent;
  httpRequest.open('GET', 'test.html');
  httpRequest.send();
}

function alertContent() {
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request!');
      }
    }
  } catch (e) {
    alert('Caugth Exception: ' + e.description);
  }
}

//2.2 Making a request with response from server:
var httpRequest2;
document.getElementsByTagName('button')[1].onclick = function() {
  var userName = document.getElementById('ajaxTextBox').value;
  makeRequest2('test2.php', userName);
}

function makeRequest2(url, userName) {
  httpRequest2 = new XMLHttpRequest();
  if (!httpRequest2) {
    alert('Cannot create an XMLHTTP instance');
    return false;
  }
  httpRequest2.onreadystatechange = alertContent2;
  httpRequest2.open('POST', url);
  httpRequest2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest2.send('userName=' + encodeURIComponent(userName));
}

function alertContent2() {
  try {
    if (httpRequest2.readyState === XMLHttpRequest.DONE) {
      if (httpRequest2.status === 200) {
        var response = JSON.parse(httpRequest2.responseText);
        alert(response.computedString);
      }
    }
  } catch (e) {
    alert('Caugth Exception: ' + e.description);
  }
}

//2.3 Monitoring progress of getting data from the server:
var oReq;
var monitorOut = document.getElementsByClassName('monitor-output')[0];
document.getElementsByTagName('button')[2].addEventListener('click', monitorRequest());

function monitorRequest() {
  oReq = new XMLHttpRequest();

  if (!oReq) {
    monitorOut.innerHTML += 'Cannot create an XMLHTTP instance!<br/>';
    return false;
  } else {
    oReq.addEventListener('progress', updateProgress);
    oReq.addEventListener('load', transferComplete);
    oReq.addEventListener('error', transferFailed);
    oReq.addEventListener('abort', transferCanceled);
    oReq.onreadystatechange = outData;

    oReq.open('GET', 'test3.html');
    oReq.send();
  }
}

function outData() {
  try {
    if (oReq.readyState === XMLHttpRequest.DONE) {
      if (oReq.status === 200) {
        monitorOut.innerHTML += oReq.responseText;
      } else {
        monitorOut.innerHTML += 'There was a problem with the request!<br/>';
      }
    }
  } catch (e) {
    monitorOut.innerHTML += `Caugth Exception: ${e.description}<br/>`;
  }
}

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total * 100;
    monitorOut.innerHTML += `Transferring progress:  ${percentComplete}% <br/>`; 
  } else {
    monitorOut.innerHTML += 'Unable to compute progress info since the total size is unknown!<br/>';
  }
}

function transferComplete(evt) {
  monitorOut.innerHTML += 'The transfer is complete!<br/>';
}

function transferFailed(evt) {
  monitorOut.innerHTML += 'An error occured while transfering the file!<br/>';
}

function transferCanceled(evt) {
  monitorOut.innerHTML += 'The transfer has been canceled by the user!<br/>';
}

//3.1 Make a simple request using AJAX:
document.getElementsByTagName('button')[3].onclick = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('block-request').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', '../templates/test.xml', true);
  xhttp.send();
}

let jsonServer = new Object;
//3.2 Testing configuration of server request:
document.getElementsByTagName('button')[4].onclick = () => {
  const inputs = Array.from(document.getElementsByTagName('input'));
  console.log(jsonServer);
  inputs.forEach(input => {
    if (input.value !== '') {
      jsonServer[input.name] = input.value;
      input.style.borderColor = '#0000ff';
    } else {
      input.style.borderColor = '#ff0000';
      jsonServer = {};
      return;
    }
  });
  console.log(JSON.stringify(jsonServer));
}



