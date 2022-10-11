var gamePattern=[]
var userClickedPattern=[]
var buttonColors= ["red", "blue", "green", "yellow" ];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    const audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}
function handleclick(){
    var btn = $(this).attr("id");
    userClickedPattern.push(btn);
    const audio = new Audio("sounds/"+btn+".mp3");
    audio.play();
    animatePress(btn);
    checkAnswer(userClickedPattern.length-1);
}
$(".btn").click(handleclick);

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        const audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}