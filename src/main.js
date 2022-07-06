const newGame = document.querySelector('#new-game');
const start = document.querySelector('#start');
const message = document.querySelector('#msg-layer');
const newGameButton = document.querySelector(
  '#new-game footer button:first-child'
);
const quit = document.querySelector('#msg-layer button:first-child');
const cont = document.querySelector('#msg-layer button:last-child');

newGameButton.addEventListener('click', function () {
  newGame.classList.toggle('not-show-element');
  console.log(newGame);
  start.classList.toggle('not-show-element');
  console.log(start);
});

start.addEventListener('click', function () {
  message.classList.toggle('not-show-element');
});

quit.addEventListener('click', function () {
  message.classList.toggle('not-show-element');
  start.classList.toggle('not-show-element');
  newGame.classList.toggle('not-show-element');
});
cont.addEventListener('click', () => {
  message.classList.toggle('not-show-element');
});
