'use strict';
const buttons = document.querySelectorAll('.cell'); //vsechna tlačítka
let images = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6'];
let counterOfClicks = 0;
let pair = []; // dvojice obrazků k vyhodnocení

//promíchat obrázky
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//nová hra
document.querySelector('.btn-new-game').addEventListener('click', () => {
  const shuffledImages = shuffle(images);
  console.log(shuffledImages);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = `cell img-${shuffledImages[i]} no-active`;
    buttons[i].disabled = false;
  }
  counterOfClicks = 0;
  pair = [];
});

//co se má stát, když nastane nějaká událost (e)
const kliknuto = (e) => {
  e.target.classList.toggle(`no-active`);
  counterOfClicks++;

  let numberOfImg = e.target.className.slice(9, 10);
  pair.push(numberOfImg);

  if (pair[0] === pair[1]) {
    const matchingPair = document.querySelectorAll(`.img-${pair[0]}`);
    for (let j = 0; j < matchingPair.length; j++) {
      matchingPair[j].disabled = true;
    }
  }

  if (counterOfClicks > 2) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('no-active');
      counterOfClicks = 0;
      pair = [];
    }
  }
};

//vybrání všech políček a zároveň kliknutí na jedno konkrétní:

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', kliknuto);
}
