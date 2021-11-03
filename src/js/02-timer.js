import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;
let timerId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.btn.disabled = true;
    const startDate = Date.now();
    const selectedDate = selectedDates[0];

    if (startDate > selectedDate) {
      return Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btn.disabled = false;
    }

    console.log(selectedDates[0]);

    refs.btn.addEventListener('click', onStart);

    function onStart() {
      timerId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);

        endOfTime({ days, hours, minutes, seconds });
        if (deltaTime <= 1000) {
          return clearInterval(timerId);
        }
      }, 1000);
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function endOfTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
