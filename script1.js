document.addEventListener("DOMContentLoaded", function() {
    const timerDisplay = document.getElementById("timer");
    const sessionIncrement = document.getElementById("session-increment");
    const sessionDecrement = document.getElementById("session-decrement");
    const sessionLength = document.getElementById("session-length");
    const breakIncrement = document.getElementById("break-increment");
    const breakDecrement = document.getElementById("break-decrement");
    const breakLength = document.getElementById("break-length");
    const startStopButton = document.getElementById("start-stop");
    const resetButton = document.getElementById("reset");

    let sessionTime = 25;
    let breakTime = 5;
    let timer;
    let isSession = true;
    let isRunning = false;

    function updateDisplay() {
        sessionLength.textContent = sessionTime;
        breakLength.textContent = breakTime;
        if (isSession) {
            timerDisplay.textContent = `${sessionTime.toString().padStart(2, '0')}:00`;
        } else {
            timerDisplay.textContent = `${breakTime.toString().padStart(2, '0')}:00`;
        }
    }

    function toggleControls(disabled) {
        sessionIncrement.disabled = disabled;
        sessionDecrement.disabled = disabled;
        breakIncrement.disabled = disabled;
        breakDecrement.disabled = disabled;
    }

    sessionIncrement.addEventListener("click", function() {
        if (!isRunning && sessionTime < 60) {
            sessionTime++;
            updateDisplay();
        }
    });

    sessionDecrement.addEventListener("click", function() {
        if (!isRunning && sessionTime > 1) {
            sessionTime--;
            updateDisplay();
        }
    });

    breakIncrement.addEventListener("click", function() {
        if (!isRunning && breakTime < 60) {
            breakTime++;
            updateDisplay();
        }
    });

    breakDecrement.addEventListener("click", function() {
        if (!isRunning && breakTime > 1) {
            breakTime--;
            updateDisplay();
        }
    });

    startStopButton.addEventListener("click", function() {
        if (!isRunning) {
            isRunning = true;
            toggleControls(true);

            timer = setInterval(function() {
                const [minutes, seconds] = timerDisplay.textContent.split(':').map(Number);
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    isSession = !isSession;
                    updateDisplay();
                    startStopButton.click();
                } else {
                    if (seconds === 0) {
                        timerDisplay.textContent = `${(minutes - 1).toString().padStart(2, '0')}:59`;
                    } else {
                        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${(seconds - 1).toString().padStart(2, '0')}`;
                    }
                }
            }, 1000);

            startStopButton.textContent = "Stop";
        } else {
            isRunning = false;
            toggleControls(false);
            clearInterval(timer);
            startStopButton.textContent = "Start";
        }
    });

    resetButton.addEventListener("click", function() {
        isRunning = false;
        toggleControls(false);
        clearInterval(timer);
        if (isSession) {
            sessionTime = 25;
            breakTime = 5;
        } else {
            sessionTime = 25;
            breakTime = 5;
        }
        isSession = true;
        updateDisplay();
        startStopButton.textContent = "Start";
    });

    updateDisplay();
});
