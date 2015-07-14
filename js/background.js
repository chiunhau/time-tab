var UPDATE_INTERVAL = 3;//sec
var IDLE_TIME = 30;//sec
var apps;

function updateLocal(domain) {
  //first update the current apps
  //then replace the local apps
  var timeIncrement = UPDATE_INTERVAL;
  if (!apps[domain]) {
    console.log("going to create this domain: " + domain);
    apps[domain] = { sumTime: timeIncrement }
  }
  else {
    apps[domain].sumTime += timeIncrement;
  }

  localStorage.setItem('apps', JSON.stringify(apps));
}

function initial(callback) {
  if (!localStorage.getItem('apps')) {
    console.log("no apps in local");
    localStorage.setItem('apps', JSON.stringify({}));
  }
  apps = JSON.parse(localStorage.getItem('apps'));
}


function update() {
  chrome.idle.queryState(IDLE_TIME, function(state) {
    
    if (state === "active") {
      console.log("go track!");
      chrome.tabs.query({ "active": true, "lastFocusedWindow": true}, function(tabs) {
        if (tabs.length === 0) {
          console.log("no tabs active...");
          return;
        }
        else {
          var tab = tabs[0];
          var domain = extractDomain(tab.url);
          updateLocal(domain);
          console.log("You Spent " + apps[domain].sumTime + "seconds on " + domain );
        }
      });
    }
    else {
      console.log("idle, nothing to track");
    }
  });
}

function extractDomain(url) {
  var link = document.createElement('a');
  link.href = url;

  return link.hostname;
}

initial();
setInterval(function() {
  update()
}, 3000);
