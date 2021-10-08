import { Character } from './character.mjs';

const $wallContainer = document.querySelector('.wall-container');
const $stage = document.querySelector('.stage');
const $progressbar = document.querySelector('.progress-bar-inner');
let maxPageHeight = 0;

function resizeHandler() {
  maxPageHeight = document.body.offsetHeight - window.innerHeight;
}

window.addEventListener('scroll', function (e) {
  $wallContainer.style.transform = `translateZ(${(window.pageYOffset / (maxPageHeight) * 980 - 490)}vw)`
  $progressbar.style.width = `${window.pageYOffset / maxPageHeight * 100}%`
})

window.addEventListener('mousemove', function (e) {
  let x = (e.clientX / window.innerWidth * 2) - 1
  let y = (e.clientY / window.innerHeight * -2 + 1)

  $stage.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`

})

$stage.addEventListener('click', function (e) {
  new Character({
    createX: e.x / window.innerWidth
  });
})

window.addEventListener('resize', resizeHandler)

resizeHandler();
