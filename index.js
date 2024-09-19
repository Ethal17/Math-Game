const slider = document.getElementById("maxAddendSlider");
const output = document.getElementById("sliderSpan");
var timerStart;
var gameStarted = false;
var gameEnded = false;
var timerID;
var timeLeft;
var addend1;
var addend2;
var answerCount = 0;
var highScore = 0;
var difficultyCount = 0;
var difficultyIncreased = false;

// Display the default slider value
output.innerHTML = slider.value;

// Update the current slider value (each time the slider handle is dragged)
slider.oninput = function() {
  output.innerHTML = this.value;
};

$(document).ready(function() {
    createMathProblem();
    let typingTimer;
    const doneTypingInterval = 1000; // milliseconds (adjust as needed)
    
  
    $('#answerInput').on('keyup', function() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function() {
        if (gameStarted == false) {
        startGame();
        }
      }, doneTypingInterval);
    });
  });
  
var startGame = function () {
  document.getElementById("answerInput").focus();
$('#startGameButton').css("display", "none");
$('#sliderSpan').html($('#maxAddendSlider').val());    
answerCount = 0;
difficultyCount = 0;
$('#scoreSpan').html(answerCount);
$('#difficultySpan').html(difficultyCount);

gameStarted = true;

timerStart = new Date().getTime();

timerID = setInterval(updateGame, 5);

}

var getMaxAddend = function () {
    return $('#maxAddendSlider').val();
}

var updateGame = function  () {
    if ($('#answerInput').val() == (addend1 + addend2)) {
        createMathProblem();
        answerCount++;
        $('#answerInput').val("");
        $('#scoreSpan').html(answerCount);

        if (answerCount % 10 == 0) {
          var newMaxAddendValue = Number(document.getElementById("maxAddendSlider").value) + 2;
          $('#maxAddendSlider').val(newMaxAddendValue);
          $('#sliderSpan').html($('#maxAddendSlider').val());
          difficultyCount++;
          $('#difficultySpan').html(difficultyCount);
       }
    }
    timeLeft = ((timerStart + (1000 * 10) + (1000 * answerCount)) - new Date().getTime())/1000;
    $('#timerSpan').html(Math.floor(timeLeft + 1));
    if (timeLeft <= 0) {
        clearInterval(timerID);
        endGame();
    }
}
var createMathProblem =  function () {
    addend1 =  Math.floor(Math.random() * (getMaxAddend()) + 1);
    addend2 = Math.floor(Math.random() * (getMaxAddend()) + 1);
    //update html
    var mathProblem = addend1 + " + " + addend2 + " = ?";
    $('#mathProblem').html(mathProblem);
}

var endGame = function () {
if (answerCount > highScore) {
    highScore = answerCount;
    $('#highScoreSpan').html(highScore);
}
$('#startGameButton').css("display", "block");
$('#maxAddendSlider').val(10);
$('#sliderSpan').html($('#maxAddendSlider').val());    
$('#timerSpan').html('0');
}
//Will need a function that checks the inputted numbers on keyup and starts game after 1 sec
