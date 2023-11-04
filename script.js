let timeDiv = document.querySelector("#time");
let controlDiv = document.querySelector("#control");
let lapDiv = document.querySelector('#lap-con');
let start = document.querySelector('#start');
let reset = document.querySelector('#reset');
let stop = document.querySelector('#stop');
let lap = document.querySelector('#lap');

let hour = 0;
let minute = 0;
let second = 0;
let milisecond = 0;
let timer = 0;
let cond = 0;
let count = 1;

start.addEventListener("click", () => {
    timer = 1;
    cond = 1;
    stopWatch();
})
reset.addEventListener("click", () => {
    timer = 0;
    cond = 0;
    hour = 0;
    minute = 0;
    second = 0;
    milisecond = 0;
    count = 1;
    document.querySelector('#hour').innerHTML = "00";
    document.querySelector('#minute').innerHTML = "00";
    document.querySelector('#second').innerHTML = "00";
    document.querySelector('#milisecond').innerHTML = "00";
    lapDiv.innerHTML = "";
})
stop.addEventListener("click", () => {
    timer = 0;
    cond = 0;
})

lap.addEventListener("click", () => {
    let div = document.createElement("div");
    div.id = "lapDiv";
    let divForTime = document.createElement("div");
    divForTime.id = "divft";
    let divForText = document.createElement("div");
    divForText.innerHTML = "Lap  " + count;

    let h3hr = document.createElement("h3");
    let h3minute = document.createElement("h3");
    let h3sec = document.createElement("h3");
    let h3msec = document.createElement("h3");

    let hrString = hour;
    let minString = minute;
    let secString = second;
    let msecString = milisecond;

    if (milisecond < 10) {
        msecString = "0" + msecString;
    }
    if (second < 10) {
        secString = "0" + secString;
    }
    if (minute < 10) {
        minString = "0" + minString;
    }
    if (hour < 10) {
        hrString = "0" + hrString;
    }

    h3hr.innerHTML = hrString + ":";
    h3minute.innerHTML = minString + ":";
    h3sec.innerHTML = secString + ":";
    h3msec.innerHTML = msecString;

    divForTime.append(h3hr, h3minute, h3sec, h3msec);
    div.append(divForText, divForTime);
    if (cond == 1) {
        ++count;
        lapDiv.appendChild(div);
    }
})

function stopWatch() {
    if (timer) {
        milisecond++;

        if (milisecond == 100) {
            second++;
            milisecond = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let msecString = milisecond;

        if (milisecond < 10) {
            msecString = "0" + msecString;
        }
        if (second < 10) {
            secString = "0" + secString;
        }
        if (minute < 10) {
            minString = "0" + minString;
        }
        if (hour < 10) {
            hrString = "0" + hrString;
        }

        document.querySelector('#hour').innerHTML = hrString;
        document.querySelector('#minute').innerHTML = minString;
        document.querySelector('#second').innerHTML = secString;
        document.querySelector('#milisecond').innerHTML = msecString;
        setTimeout(stopWatch, 10);
    }
}