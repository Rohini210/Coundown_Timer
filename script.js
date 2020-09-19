"use strict"

const ALERT_THRESHOLD = 10;
const FULL_DASH_ARRAY = 283
const TIME_LIMIT = 60
let timePassed = 0
let timeLeft = TIME_LIMIT
let timerInterval = null

const COLOR_CODES = {
  info: {
    color: "yellow"
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx=60 cy="60" r="58"/>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 60, 60
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTimeLeft(timeLeft)}
  </span>

</div>
`
document.getElementById("b1").addEventListener("click", startTimer);
document.getElementById("b2").addEventListener("click", () => {
  location.reload();
});



function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray)
}

function startTimer() {
  timerInterval = setInterval(() => {
    // The amount of time passed increments by one
    timePassed = timePassed += 1
    timeLeft = TIME_LIMIT - timePassed

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft)
    setCircleDasharray()
    setRemainingPathColor(timeLeft);

  }, 1000)
}

function formatTimeLeft(time) {
  let seconds = time

  if (seconds < 0) {
    seconds = `${0}`
  }
  return `${seconds}`
}

function setRemainingPathColor(timeLeft) {
const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } 
}