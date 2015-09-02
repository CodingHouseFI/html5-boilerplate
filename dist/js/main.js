(function() {
  "use strict";

  console.log('watch working??');

  var data, currentSlideId = -1;

  var showNextSlide = function() {
    var slideObject = data[++currentSlideId];
    var remainingSeconds = slideObject.seconds;
    var remainingSecondsDiv = document.getElementById("remaining-seconds");
    var instructionsDiv = document.getElementById("instructions");

    remainingSecondsDiv.textContent = remainingSeconds;
    instructionsDiv.textContent = slideObject.instructions;

    if (!remainingSeconds) {
      return;
    }

    var intervalId = setInterval(function() {
      remainingSecondsDiv.textContent = --remainingSeconds;
      if (remainingSeconds === 0) {
        clearInterval(intervalId);
        showNextSlide();
      }
    }, 1000);
  };

  var request = new XMLHttpRequest();
  request.open('GET', '/data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      data = JSON.parse(request.responseText).data;
      data.push( { instructions: 'Done', seconds: null } );
      showNextSlide();
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
})();
