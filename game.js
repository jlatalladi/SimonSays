var buttonColors = ["red", "blue", "green", "yellow"]; // Define four playing colors

var gamePattern = []; // Initialize empty pattern
var userClickedPattern = []; // Initialized user selcted empty pattern

var started = false; // Game not started
let level = 0; // Initial level at game startup

// If any key is pressed and the game is not started run nextsequence()
$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // Player color sequence selected
  userClickedPattern.push(userChosenColor); // Store player pattern

  playSound(userChosenColor); // Play sound for color selected by player
  animatePress(userChosenColor);
});

function nextSequence() {
  // Senquece generator function

  level++;  // Level increase
  $("#level-title").text("Level " + level); // Update current level to user

  var randomNumber = Math.floor(Math.random() * 4); // Random number for index from [0 - 3]

  var randomChosenColor = buttonColors[randomNumber]; // Assing random color

  gamePattern.push(randomChosenColor); // Add colors to pattern

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Flash random color

  playSound(randomChosenColor); // Play sound for color selected random
}

// Play random color sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add animation to user selected color
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed"); // Add class for animation

  setTimeout(function () {
    $("." + currentColor).removeClass("pressed"); // Remove class with timer to compvare animation
  }, 100);
}
