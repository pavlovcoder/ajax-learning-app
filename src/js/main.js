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

//3.2 Testing configuration of server request:
let getString = '';
document.getElementsByTagName('button')[4].onclick = () => {
  const inputs = Array.from(document.getElementsByTagName('input'));
  inputs.forEach(input => {
    if (input.value !== '') {
      input.style.borderColor = '#0000ff';
      getString += `${input.name}=${input.value}&`
    } else {
      input.style.borderColor = '#ff0000';
      return;
    }
  });
  getString = getString.slice(0, -1);
  document.getElementsByClassName('testing-request')[0].style.display = 'none';
  document.getElementsByClassName('form-message')[0].style.display = 'block';
  console.log(getString);
}

//4. AJAX Requests:

let outBlock = Array.from(document.getElementsByClassName('out-block'));
//4.1 Sending simple request to the server:
document.getElementsByTagName('button')[5].onclick = () => {
  let xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp1.open('GET', '../server-side/ajax-data-1.php?t=' + Math.random(), true);
  xhttp1.send();
}

//4.2 Sending simple request to the server with data:
document.getElementsByTagName('button')[6].onclick = () => {
  let xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp2.open('GET', `../server-side/ajax-data-1.php?${getString}`, true);
  xhttp2.send();
}

//4.3 Sending simple request to the server with POST-method:
document.getElementsByTagName('button')[7].onclick = () => {
  let xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp3.open('POST', '../server-side/ajax-data-1.php', true);
  xhttp3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp3.send('fanme=Wlodzimierz&lname=Pavlov');
}

//4.4 Using a callback function:
document.getElementsByTagName('button')[8].onclick = () => {
  loadDoc('../server-side/request1.txt', requestFunction1);
}

document.getElementsByTagName('button')[9].onclick = () => {
  loadDoc('../server-side/request2.txt', requestFunction2);
}

document.getElementsByTagName('button')[10].onclick = () => {
  loadDoc('../server-side/request3.txt', requestFunction3);
}

function loadDoc(url, subFunction) {
  let xhttp4 = new XMLHttpRequest();
  xhttp4.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      subFunction(this);
    }
  };
  xhttp4.open('GET', url, true);
  xhttp4.send();
}

function requestFunction1(xhttp) {
  console.log('Output from request-1:');
  console.log(xhttp.responseText);
}

function requestFunction2(xhttp) {
  console.log('Output from requet-2:');
  console.log(xhttp.responseText);
}

function requestFunction3(xhttp) {
  console.log('Output from request-3:');
  console.log(xhttp.responseText);
}

//4.5 Getting full response header from the server:
document.getElementsByTagName('button')[11].onclick = () => {
  let xhttp5 = new XMLHttpRequest();
  xhttp5.onreadystatechange = function() {
    if (this.state == 4 && this.status == 200) {
      console.log(this.getAllResponseHeaders());
    }
  };
  xhttp5.open('GET', '../server-side/request4.txt', true);
  xhttp5.send();
}

//4.6 Getting table with albums as XML-file from the server:
document.getElementsByTagName('button')[12].onclick = () => {
  
}

let xmlBtn = document.getElementsByTagName('button')[12];

xmlBtn.addEventListener('click', loadXML);

function loadXML() {
  let xhttp6 = new XMLHttpRequest();
  xhttp6.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      tableCreator(this);
    }
  };
  xhttp6.open('GET', '../server-side/albums.xml', true);
  xhttp6.send();
  xmlBtn.removeEventListener('click', loadXML);
}

function tableCreator(xml) {
  let xmlResponse = xml.responseXML;
  console.log(xmlResponse);
  let table = '<table><tr><th>Artist</th><th>Title</th></tr>';
  let cd = Array.from(xmlResponse.getElementsByTagName('CD'));
  console.log(cd);
  let outBlock = document.getElementsByClassName('out-block')[0];
  cd.forEach(rel => {
    table += '<tr><td>' +
    rel.getElementsByTagName('ARTIST')[0].childNodes[0].nodeValue +
    '</td><td>' +
    rel.getElementsByTagName('TITLE')[0].childNodes[0].nodeValue +
    '</td></tr>';    
  });
  table += '</table>';
  outBlock.style.display = 'block';
  outBlock.innerHTML = table;
}

//4.7 Implementation AJAX-PHP dynamic search panel:
let ajaxInput = document.getElementById('ajax-search-id');
ajaxInput.onkeyup = function() {
  var xhtt7;
  var str = ajaxInput.value;
  if (str.length == 0) { 
    document.getElementById("search-result").innerHTML = "";
    return;
  }
  xhttp7 = new XMLHttpRequest();
  xhttp7.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      document.getElementById("search-result").innerHTML = this.responseText;
    }
  };
  xhttp7.open("GET", "../server-side/search-ajax-data.php?q="+str, true);
  xhttp7.send();
  console.error(letObject);
  console.error(element_property) 
}

//5. AJAX & ASP Requests:

//5.1 Implementation AJAX-ASP dynamic search panel:
let ajaxAspInput = document.getElementById('first_name');
ajaxAspInput.onkeyup = function() {
  showHint(ajaxAspInput.value);
}

function showHint(str) {
  var xhttp;
  if (str.length == 0) { 
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "gethint.asp?q="+str, true);
  xhttp.send();
}


