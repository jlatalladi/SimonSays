let buttonColors = ["red", "blue", "green", "yellow"]; // Define four playing colors

let gamePattern = []; // Initialize empty pattern
let userClickedPattern = []; // Initialized user selcted empty pattern

$(".btn").click(function () {
  
  let userChosenColor = $(this).attr("id"); // Player color sequence selected
  userClickedPattern.push(userChosenColor); // Store player pattern

  playSound(userChosenColor);               // Play sound for color selected by player
  animatePress(userChosenColor);
});

function nextSequence() {
  // Senquece generator function

  let randomNumber = Math.floor(Math.random() * 4); // Random number for index from [0 - 3]

  let randomChosenColor = buttonColors[randomNumber]; // Assing random color

  gamePattern.push(randomChosenColor); // Add colors to pattern

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Flash random color

  playSound(randomChosenColor);       // Play sound for color selected random
}

// Play random color sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add animation to user selected color
function animatePress(currentColor) {
  
  $("." + currentColor).addClass("pressed");      // Add class for animation

  setTimeout(function () {
    $("." + currentColor).removeClass("pressed"); // Remove class with timer to complete animation
  }, 100);
  
}
