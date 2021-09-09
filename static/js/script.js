// This is 'script.js' file for Coastal Hacks Hackathon

const open = document.querySelector('.open');
const close = document.querySelector('.close');

const habit_open = document.querySelector('.habit-open');
const habit_close = document.querySelector('.habit-close');

const popup = document.querySelector('.popup');
const habit = document.querySelector('.habit');

open.addEventListener("click", () => {
    popup.classList.add("show");
});

close.addEventListener("click", () => {
    popup.classList.remove("show");
});


habit_open.addEventListener("click", () => {
    habit.classList.add("show");
});

habit_close.addEventListener("click", () => {
    habit.classList.remove("show");
});

const date = new Date();
const today = document.querySelector('.today');
today.innerHTML = date;

const confe_open = document.querySelector('.confe')
let confe = document.querySelector('#my-canvas');

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

confe_open.addEventListener("click", () => {
    confe.classList.add("active");
    setTimeout(() => {
        confe.classList.remove("active");
    }, 5000);
});

