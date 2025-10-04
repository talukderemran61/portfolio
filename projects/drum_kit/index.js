var drums = document.querySelectorAll(".drum");

for (var i = 0; i < drums.length; i++) {
    drums[i].addEventListener("click", function () {
        console.log(this.innerHTML);
        var buttonClicked = this.innerHTML;
        
        playSound(buttonClicked);

        buttonAnimation(buttonClicked);
    });
}

document.addEventListener("keydown", function (e) {
    console.log(e.key);
    playSound(e.key);

    buttonAnimation(e.key);
});


function playSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom1 = new Audio('sounds/tom-2.mp3');
            tom1.play();
            break;
        case "s":
            var tom1 = new Audio('sounds/tom-3.mp3');
            tom1.play();
            break;
        case "d":
            var tom1 = new Audio('sounds/tom-4.mp3');
            tom1.play();
            break;
        case "j":
            var tom1 = new Audio('sounds/snare.mp3');
            tom1.play();
            break;
        case "k":
            var tom1 = new Audio('sounds/crash.mp3');
            tom1.play();
            break;
        case "l":
            var tom1 = new Audio('sounds/kick-bass.mp3');
            tom1.play();
            break;
    }
}

function buttonAnimation(key) {
    var activeButton = document.querySelector("." + key);
    
    if(activeButton) {
        activeButton.classList.add("pressed");
    
        setTimeout(function(){
            activeButton.classList.remove("pressed");
        }, 200);
    }
}