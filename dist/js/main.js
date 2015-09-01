(function() {
  "use strict";

  console.log('watch working??');

  var showNextSlide = function(slideObject) {
    var remainingSeconds = slideObject.seconds;
    var remainingSecondsDiv = document.getElementById("remaining-seconds");
    var instructionsDiv = document.getElementById("instructions");

    remainingSecondsDiv.textContent = remainingSeconds;
    instructionsDiv.textContent = slideObject.instructions;

    var intervalId = setInterval(function() {
      remainingSecondsDiv.textContent = --remainingSeconds;
      if (remainingSeconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  var request = new XMLHttpRequest();
  request.open('GET', '/data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText).data;
      showNextSlide(data[0])
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
})();
