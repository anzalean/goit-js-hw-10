import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const btnStart = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector("#datetime-picker");
btnStart.setAttribute("disabled", "disabled");
let userSelectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
            btnStart.setAttribute("disabled", "disabled");
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
            });
            return;
        } else {
            btnStart.removeAttribute("disabled");
        }
        userSelectedDate = selectedDates[0];
    },
};
flatpickr("#datetime-picker", options);
btnStart.addEventListener("click", () => {
    console.log("userSelectedDate", userSelectedDate);
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const time = userSelectedDate - currentTime;
        if (time <= 0) {
            clearInterval(intervalId);
            datetimePicker.removeAttribute("disabled");
            btnStart.removeAttribute("disabled");
            return;
        }
        btnStart.setAttribute("disabled", "disabled");
        datetimePicker.setAttribute("disabled", "disabled");
        const { days, hours, minutes, seconds } = convertMs(time);
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

    }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}