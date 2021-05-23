
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
var buttonColours=["red","blue","green","yellow"];

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () { 
    if(!started)
    {
        started=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
    
});

function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                userClickedPattern=[];
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        audio.play();
        startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}