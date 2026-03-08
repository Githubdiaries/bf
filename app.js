const confettiLayer = document.getElementById('confettiLayer');
const feedList = document.getElementById('feedList');
const feedTemplate = document.getElementById('feedTemplate');
const clearFeedButton = document.getElementById('clearFeed');

const counters = {
  total: 0,
  hug: 0,
  choc: 0,
};

const counterElements = {
  total: document.getElementById('totalBursts'),
  hug: document.getElementById('hugBursts'),
  choc: document.getElementById('chocBursts'),
};

const emojiSets = {
  hug: ['🤗', '🫂', '💞', '💗', '✨'],
  choc: ['🍫', '🍬', '🍪', '🤎', '✨'],
};

const labels = {
  hug: 'Hug burst',
  choc: 'Chocolate burst',
};

function updateCounterUI() {
  counterElements.total.textContent = counters.total;
  counterElements.hug.textContent = counters.hug;
  counterElements.choc.textContent = counters.choc;
}

function addFeedEntry(kind) {
  const stamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const item = feedTemplate.content.firstElementChild.cloneNode(true);
  item.textContent = `${labels[kind]} launched at ${stamp}`;
  feedList.prepend(item);

  if (feedList.children.length > 12) {
    feedList.removeChild(feedList.lastElementChild);
  }
}

function spawnEmoji(kind, originX, originY) {
  const symbols = emojiSets[kind];
  const amount = 26;

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const x = `${(Math.random() - 0.5) * 320}px`;
    const y = `${-120 - Math.random() * 340}px`;
    const r = `${(Math.random() - 0.5) * 1080}deg`;
    const duration = `${900 + Math.random() * 900}ms`;

    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.setProperty('--x', x);
    piece.style.setProperty('--y', y);
    piece.style.setProperty('--r', r);
    piece.style.setProperty('--duration', duration);

    confettiLayer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

function celebrate(kind, event) {
  counters.total += 1;
  counters[kind] += 1;
  updateCounterUI();
  addFeedEntry(kind);

  const rect = event.currentTarget.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  spawnEmoji(kind, originX, originY);
}

for (const button of document.querySelectorAll('.celebrate-btn')) {
  button.addEventListener('click', (event) => {
    const kind = event.currentTarget.dataset.kind;
    celebrate(kind, event);
  });
}

clearFeedButton.addEventListener('click', () => {
  feedList.textContent = '';
});

updateCounterUI();
