class Timer {

    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
        this.durationInput.addEventListener("onchange", this.onDuratonChange);
    }

    start = () => {        
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }

        this.intervalID = setInterval(this.tick, 50);
    }

    pause = () => {
        clearInterval(this.intervalID);
    }

    onDuratonChange() {

    } 

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();

            if (this.onComplete) {
                this.onComplete();
            }                 
            return;
        }

        this.timeRemaining = this.timeRemaining - .05;
        if (this.onTick) {
            this.onTick(this.timeRemaining);
        }
    }

    get timeRemaining() {

        return parseFloat(this.durationInput.value);
    }
    
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);        
    }

}