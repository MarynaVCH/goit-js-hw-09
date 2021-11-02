const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.start.addEventListener('click', startChangeBackground);
refs.stop.addEventListener('click', stopChangeBackground);

function startChangeBackground() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.disabled = true;
}

function stopChangeBackground() {
  clearInterval(timerId);
  refs.start.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
