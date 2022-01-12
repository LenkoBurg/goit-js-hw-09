import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const formInput = document.querySelector('#datetime-picker')
const value = document.querySelectorAll('.value')
const btnToStart = document.querySelector('button[data-start]')

let currentDate = new Date();
let selectedDate = new Date();
let countDate = {};

btnToStart.disabled = true


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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    selectedDate = selectedDates[0]
    
        if (selectedDate > currentDate) {
        btnToStart.disabled = false
        } else {
         Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(formInput, options)

btnToStart.addEventListener('click', onClick) 

function onClick() {
    const timerId = setInterval(() => {
        
        currentDate = new Date()


        if (currentDate < selectedDate) {
            countDate = convertMs(selectedDate - currentDate)
            showCountDate(countDate)
        } else {
            clearInterval(timerId);
        }
    }, 1000)
}

function showCountDate(countDate) {
    
    value[0].textContent = addLeadingZero(countDate.days)
    value[1].textContent = addLeadingZero(countDate.hours)
    value[2].textContent = addLeadingZero(countDate.minutes)
    value[3].textContent = addLeadingZero(countDate.seconds)
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}


