const CARD_ARRAY = [
  {
    name: 'flower1',
    src: './assets/flower1.png'
  },
  {
    name: 'flower1',
    src: './assets/flower1.png'
  },
  {
    name: 'flower2',
    src: './assets/flower2.png'
  },
  {
    name: 'flower2',
    src: './assets/flower2.png'
  },
  {
    name: 'flower3',
    src: './assets/flower3.png'
  },
  {
    name: 'flower3',
    src: './assets/flower3.png'
  },
  {
    name: 'flower4',
    src: './assets/flower4.png'
  },
  {
    name: 'flower4',
    src: './assets/flower4.png'
  },
  {
    name: 'flower5',
    src: './assets/flower5.png'
  },
  {
    name: 'flower5',
    src: './assets/flower5.png'
  },
  {
    name: 'flower6',
    src: './assets/flower6.png'
  },
  {
    name: 'flower6',
    src: './assets/flower6.png'
  },
  {
    name: 'flower7',
    src: './assets/flower7.png'
  },
  {
    name: 'flower7',
    src: './assets/flower7.png'
  },
  {
    name: 'flower8',
    src: './assets/flower8.png'
  },
  {
    name: 'flower8',
    src: './assets/flower8.png'
  }
];

const MAIN = document.querySelector('.main');
const BOARD = document.querySelector('.memory-board');

const startScreen = document.createElement('div');
startScreen.classList.add('overlay-text', 'visible');
startScreen.innerText = 'Click to Start';
startScreen.setAttribute('data-action', 'newGame');
MAIN.appendChild(startScreen);

const victoryScreen = document.createElement('div');
victoryScreen.classList.add('overlay-text');
victoryScreen.setAttribute('id', 'victory-text');
victoryScreen.setAttribute('data-action', 'newGame');
MAIN.appendChild(victoryScreen);

const restart = document.createElement('span');
restart.classList.add('overlay-text-small');
restart.innerText = 'Click to Restart';
victoryScreen.appendChild(restart);

const movesBoard = document.querySelector('.movesBoard');
const time = document.querySelector('.time');

let backImg;
let frontImg;
let boardCard;
let cards;
let cardsWon = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

let moves = 0;
let seconds = 0;
let minutes = 0;
let seconds_str = '';
let minutes_str = '';
let timer;

function startGame() {
  seconds = 0;
  minutes = 0;
  seconds_str = '';
  minutes_str = '';
  time.innerHTML = '00:00';

  clearInterval(timer);
  createCard(BOARD, CARD_ARRAY);
  sortCards();

  MAIN.addEventListener('click', ({ target }) => {
    if (target.dataset.action === 'newGame') {
      target.classList.remove('visible');
      startWatching(seconds, minutes);
    }
  });
}

function createCard(wrapper, array) {
  array.forEach((card) => {
    const container = document.createElement('div');
    container.classList.add('board-card');
    container.setAttribute('data-name', card.name);
    wrapper.appendChild(container);
    const backImg = document.createElement('img');
    backImg.classList.add('back-face');
    backImg.setAttribute('src', './assets/clover-back.png');
    container.appendChild(backImg);
    const frontImg = document.createElement('img');
    frontImg.classList.add('front-face');
    frontImg.setAttribute('src', card.src);
    frontImg.setAttribute('data-name', card.name);

    container.appendChild(frontImg);
  });
}

function sortCards() {
  cards = Array.from(document.querySelectorAll('.board-card'));
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
    cardsWon += 1;
    moves++;
    movesBoard.innerHTML = `${moves}`;
    setTimeout(checkWon, 1000);
  } else {
    moves++;
    movesBoard.innerHTML = `${moves}`;
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function checkWon() {
  if (cardsWon === CARD_ARRAY.length / 2) {
    victoryScreen.innerText = `You won in ${moves} moves`;
    victoryScreen.classList.add('visible');
    victoryScreen.appendChild(restart);

    setTimeout(() => replay(), 1000);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function replay() {
  BOARD.innerHTML = '';
  movesBoard.innerHTML = 0;
  startGame();
  cardsWon = 0;
  moves = 0;
  let boardCards = cards.forEach((card) =>
    card.addEventListener('click', flipCard)
  );
}

function startWatching(seconds, minutes) {
  timer = setInterval(() => {
    seconds > 58 ? ((minutes += 1), (seconds = 0)) : (seconds += 1);
    seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;
    minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`;
    time.innerHTML = `${minutes_str}:${seconds_str}`;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  startGame();
  let boardCards = cards.forEach((card) =>
    card.addEventListener('click', flipCard)
  );
});
