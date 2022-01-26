const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration = 0;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalTime ) {
        duration = totalTime;
    },

    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', 
            perimeter * timeRemaining / duration - perimeter
        ); 
    },

    onComplete() {
        console.log("oi vse da ti zaebal");  
    }
});

timer.start();