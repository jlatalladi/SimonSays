// Step2.3: At the top of the index.js file, create a new array called buttonColors and set it to hold the sequence "red", "blue", "green", "yellow".
var buttonColors = ["red", "blue", "green", "yellow"];

// Setp2.5: At the top of the index.js file, create a new empty array called gamePattern.
gamePattern = [];

// Step4.3: Create a new empty array called userClickPattern.
var userClickedPattern = [];

// Step7.1*: to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Step7.2: Create a new variable called level and start at level 0.
var level = 0;

// Step7.1: Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    // Step7.3: The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

// Step4.1: Use jQuery to detect when any of the buttons click and trigger a handler function.
$(".btn").click(function() {

  // Step4.2: Inside the handler, create a new variable called userChosenColor to store the id of the button that got clicked.
  var userChosenColor = $(this).attr("id");

  // Step4.4: Add the contents of the variable userChosenColor created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColor);

  // Step5.3: Send chosen color to playSound().
  playSound(userChosenColor);

  // Step6.3*: Send chosen color to animatePress().
  animatePress(userChosenColor);

  // Step8.2: Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Step8.1: 
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel.
function checkAnswer(currentLevel) {
  
  // Step8.3: Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    console.log("Success");

    // Step8.4: If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Step8.5: Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextsequence();
      }, 1000);
    } 
  } else {

    console.log("wrong");

    // Step9.1: In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    // Step9.2: In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Step9.3: Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    // Step10.2: Call startOver if the user gets the sequence wrong.
    startOver();
  }
}

// Step2.1: Inside index.js create a new fubction called nextsequense().
function nextsequence() {

  // Step7.4: Increase level by 1.
  level++;

  // Step7.5: Update the h1 or title.
  $("#level-title").text("Level " + level);
  
  // Step8.6: Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

  userClickedPattern = [];

  // Step2.2: Inside the new fucntion generate a new random number between 0 and 3, store it in a variable called randomNumber.
  var randomNumber = Math.floor(Math.random() * 4);

  // Step2.4: Create a new variable called randomChosenColor and use the randomNumber ffrom Step1.2 to select a random color from the buttonColors array.
  var randomChosenColor = buttonColors[randomNumber];

  // Step2.6: Add the new randomChosenColor generated in step 4 to the end of the gamePatter.
  gamePattern.push(randomChosenColor);

  // Step3.1: Use jQuery to select the button with the same #id as the randomChosenColor. 
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // See Step5.4
  playSound(randomChosenColor);
}

// Step5.2: Create a new function name playSound().
function playSound(name) {
  // Step3.3: Play sound corresponding to the color used.
  // Note: Step3.3 was moved outside nextsequence.
  // Step5.4: Same function to play sound for random and clicked color.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step6.1: Create a new function called animatePress(), it should take a single input parameter called currentColor.
function animatePress(currentColor) {
  
  // Step6.3: Add "pressed" class to clcked button.
  $("#" + currentColor).addClass("pressed");

  // Step6.4: Remove "pressed" class to clicked button.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Step10.1: Create a new function called startOver().
function startOver() {
  
  // Step10.3: Restart the values of "level", "gamePattern", and "started".
  level = 0;
  gamePattern = [];
  started = false;
}