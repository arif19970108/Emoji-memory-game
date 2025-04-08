const emojis = ['🍎', '🍌', '🍇', '🍒', '🍋', '🍉', '🍓', '🍑'];
let cards = [...emojis, ...emojis]; // 16 total (2 of each)
let firstCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const board = document.getElementById('gameBoard');
  const shuffled = shuffle(cards);
  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  if (firstCard.dataset.emoji === this.dataset.emoji) {
    firstCard.classList.add('matched');
    this.classList.add('matched');
    matchedCount += 2;
    if (matchedCount === cards.length) {
      document.getElementById('message').textContent = "🎉 You Win!";
    }
    firstCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = '';
      this.textContent = '';
      firstCard.classList.remove('flipped');
      this.classList.remove('flipped');
      firstCard = null;
      lockBoard = false;
    }, 800);
  }
}

createBoard();
