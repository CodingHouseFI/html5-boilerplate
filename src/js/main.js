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

var Ajax = require("./ajax");
Ajax('/data.json', function(resp) {
  data = resp;
  data.push( { instructions: 'Done', seconds: null } );
  showNextSlide();
});
