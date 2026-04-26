// game.js - Anagram Duel Client

// ============================================================
// STATE
// ============================================================
let ws = null;
let playerIndex = 0;
let playerName = '';
let roomCode = '';
let gameLetters = [];      // [{char, used}, ...]
let selectedLetters = [];  // [{char, tileIndex}, ...]
let foundWords = [];
let myScore = 0;
let oppScore = 0;
let oppName = 'Opponent';
let gameActive = false;
let feedbackTimeout = null;
let countdownGoTimeout = null;

const TOTAL_TIME = 90;

// ============================================================
// DOM REFS
// ============================================================
const $ = id => document.getElementById(id);

const screens = {
  home:    $('home-screen'),
  waiting: $('waiting-screen'),
  game:    $('game-screen'),
  end:     $('end-screen'),
};

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(name) {
  for (const [key, el] of Object.entries(screens)) {
    el.classList.remove('active');
    el.style.display = '';
  }
  const el = screens[name];
  if (el) {
    el.style.display = 'flex';
    el.classList.add('active');
    // flex direction for game screen
    if (name === 'game') el.style.flexDirection = 'column';
  }
}

// ============================================================
// WEBSOCKET
// ============================================================
function connect(onOpen) {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const url = `${protocol}//${location.host}`;
  ws = new WebSocket(url);

  ws.addEventListener('open', () => {
    if (onOpen) onOpen();
  });

  ws.addEventListener('message', e => {
    let msg;
    try { msg = JSON.parse(e.data); } catch { return; }
    handleMessage(msg);
  });

  ws.addEventListener('close', () => {
    gameActive = false;
  });

  ws.addEventListener('error', () => {
    showError('home-error', 'Connection error. Please refresh.');
  });
}

function sendMsg(obj) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}

// ============================================================
// MESSAGE HANDLER
// ============================================================
function handleMessage(msg) {
  switch (msg.type) {
    case 'room_created':
      playerIndex = msg.playerIndex;
      roomCode = msg.code;
      $('waiting-code').textContent = msg.code;
      showScreen('waiting');
      break;

    case 'room_joined':
      playerIndex = msg.playerIndex;
      roomCode = msg.code;
      // Player 1 (joiner) goes straight to game screen (countdown will show)
      showScreen('game');
      break;

    case 'error':
      showError('home-error', msg.message);
      break;

    case 'game_start':
      handleGameStart(msg);
      break;

    case 'countdown':
      handleCountdown(msg.count);
      break;

    case 'timer':
      updateTimer(msg.timeLeft);
      break;

    case 'word_result':
      handleWordResult(msg);
      break;

    case 'score_update':
      handleScoreUpdate(msg.scores);
      break;

    case 'game_end':
      handleGameEnd(msg.results);
      break;

    case 'player_disconnected':
      gameActive = false;
      alert('Your opponent disconnected.');
      location.reload();
      break;

    case 'rematch_vote':
      $('rematch-status').textContent =
        msg.votes < msg.total
          ? `Waiting for opponent... (${msg.votes}/${msg.total})`
          : 'Starting rematch...';
      break;
  }
}

// ============================================================
// GAME START
// ============================================================
function handleGameStart(msg) {
  // Set up game state
  gameLetters = msg.letters.map(ch => ({ char: ch, used: false }));
  selectedLetters = [];
  foundWords = [];
  myScore = 0;
  oppScore = 0;

  // Find opponent name
  for (const p of msg.players) {
    if (p.index !== playerIndex) {
      oppName = p.name;
    }
  }

  // Update UI labels
  $('my-name-label').textContent = playerName;
  $('opp-name-label').textContent = oppName;
  $('my-score').textContent = '0';
  $('opp-score').textContent = '0';
  $('found-words-list').innerHTML = '';
  $('word-feedback').className = 'word-feedback';
  $('word-feedback').textContent = '';

  updateTimer(TOTAL_TIME);
  renderLetterTiles();
  renderWordArea();

  // Show game screen (player 0 switches now)
  showScreen('game');
}

// ============================================================
// COUNTDOWN
// ============================================================
function handleCountdown(count) {
  const overlay = $('countdown-overlay');
  const num = $('countdown-number');

  // Clear any pending "GO!" hide
  if (countdownGoTimeout) { clearTimeout(countdownGoTimeout); countdownGoTimeout = null; }

  overlay.classList.remove('hidden');

  if (count > 0) {
    num.className = 'countdown-number';
    num.textContent = count;
    // Force re-animation
    num.style.animation = 'none';
    void num.offsetWidth;
    num.style.animation = '';
  } else {
    // GO!
    num.className = 'countdown-number go';
    num.textContent = 'GO!';
    num.style.animation = 'none';
    void num.offsetWidth;
    num.style.animation = '';
    gameActive = true;
    // Hide overlay after first timer tick comes in OR after 800ms
    countdownGoTimeout = setTimeout(() => {
      overlay.classList.add('hidden');
    }, 900);
  }
}

// ============================================================
// TIMER
// ============================================================
function updateTimer(timeLeft) {
  // Hide the GO overlay once timer starts ticking
  const overlay = $('countdown-overlay');
  if (!overlay.classList.contains('hidden')) {
    overlay.classList.add('hidden');
  }

  gameActive = true;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  $('timer-display').textContent = `${m}:${s.toString().padStart(2, '0')}`;

  const pct = (timeLeft / TOTAL_TIME) * 100;
  const bar = $('timer-bar');
  bar.style.width = `${pct}%`;

  const disp = $('timer-display');
  bar.classList.remove('warn', 'danger');
  disp.classList.remove('warning', 'danger');

  if (timeLeft <= 10) {
    bar.classList.add('danger');
    disp.classList.add('danger');
  } else if (timeLeft <= 20) {
    bar.classList.add('warn');
    disp.classList.add('warning');
  }
}

// ============================================================
// RENDER TILES
// ============================================================
function renderLetterTiles() {
  const container = $('letter-tiles');
  container.innerHTML = '';
  gameLetters.forEach((lt, idx) => {
    const tile = document.createElement('div');
    tile.className = 'tile' + (lt.used ? ' tile-used' : '');
    tile.textContent = lt.char.toUpperCase();
    tile.dataset.idx = idx;
    if (!lt.used) {
      tile.addEventListener('click', () => clickTile(idx));
    }
    container.appendChild(tile);
  });
}

function renderWordArea() {
  const container = $('word-area');
  container.innerHTML = '';
  selectedLetters.forEach((sel, selIdx) => {
    const tile = document.createElement('div');
    tile.className = 'tile-selected';
    tile.textContent = sel.char.toUpperCase();
    tile.addEventListener('click', () => removeLetterAt(selIdx));
    container.appendChild(tile);
  });
}

// ============================================================
// TILE INTERACTION
// ============================================================
function clickTile(idx) {
  if (!gameActive) return;
  const lt = gameLetters[idx];
  if (lt.used) return;
  lt.used = true;
  selectedLetters.push({ char: lt.char, tileIndex: idx });
  renderLetterTiles();
  renderWordArea();
}

function removeLetterAt(selIdx) {
  if (!gameActive) return;
  const sel = selectedLetters[selIdx];
  gameLetters[sel.tileIndex].used = false;
  selectedLetters.splice(selIdx, 1);
  renderLetterTiles();
  renderWordArea();
}

function clearWord() {
  selectedLetters.forEach(sel => {
    gameLetters[sel.tileIndex].used = false;
  });
  selectedLetters = [];
  renderLetterTiles();
  renderWordArea();
}

function submitWord() {
  if (!gameActive) return;
  const word = selectedLetters.map(s => s.char).join('').toLowerCase();
  if (word.length < 3) {
    showFeedback('Too short!', 'invalid');
    clearWord();
    return;
  }
  sendMsg({ type: 'submit_word', word });
  clearWord();
}

// ============================================================
// SHUFFLE (Fisher-Yates, unused tiles only)
// ============================================================
function shuffleTiles() {
  if (!gameActive) return;

  // Get indices of unused tiles
  const unusedIdx = gameLetters
    .map((lt, i) => lt.used ? null : i)
    .filter(i => i !== null);

  // Fisher-Yates shuffle on those indices
  for (let i = unusedIdx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the letter objects at those positions
    const a = unusedIdx[i], b = unusedIdx[j];
    [gameLetters[a], gameLetters[b]] = [gameLetters[b], gameLetters[a]];
  }

  // Fix up selectedLetters tileIndex references
  // (After shuffle, the char at each tileIndex may have changed)
  // Re-sync: for each selected letter, find its matching char in gameLetters
  // Since used=true tiles are fixed and only unused tiles were shuffled,
  // we need to update selectedLetters to reflect new positions.
  //
  // Strategy: track by rebuilding a map of char->positions for used=true tiles
  const usedPositions = new Map();
  gameLetters.forEach((lt, i) => {
    if (lt.used) {
      if (!usedPositions.has(lt.char)) usedPositions.set(lt.char, []);
      usedPositions.get(lt.char).push(i);
    }
  });

  // Re-assign tileIndex in selectedLetters
  const assignedPositions = new Set();
  selectedLetters = selectedLetters.map(sel => {
    const positions = usedPositions.get(sel.char) || [];
    const newIdx = positions.find(p => !assignedPositions.has(p));
    if (newIdx !== undefined) {
      assignedPositions.add(newIdx);
      return { char: sel.char, tileIndex: newIdx };
    }
    return sel; // fallback
  });

  renderLetterTiles();
  renderWordArea();
}

// ============================================================
// WORD RESULT
// ============================================================
function handleWordResult(msg) {
  if (msg.result === 'valid') {
    foundWords.push(msg.word);
    showFeedback(`+${msg.score}  ${msg.word.toUpperCase()}`, 'valid');
    renderFoundWords();
    // Score will be updated via score_update
  } else if (msg.result === 'duplicate') {
    showFeedback('Already found!', 'duplicate');
  } else {
    showFeedback('Not a word!', 'invalid');
  }
}

function renderFoundWords() {
  const list = $('found-words-list');
  list.innerHTML = '';
  // Show newest first
  [...foundWords].reverse().forEach(word => {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    const pts = scoreWord(word);
    chip.innerHTML = `${word.toUpperCase()} <span class="chip-score">+${pts}</span>`;
    list.appendChild(chip);
  });
}

function scoreWord(word) {
  const len = word.length;
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 4;
  if (len === 6) return 6;
  if (len === 7) return 10;
  return 14;
}

// ============================================================
// SCORE UPDATE
// ============================================================
function handleScoreUpdate(scores) {
  for (const s of scores) {
    if (s.index === playerIndex) {
      const prev = myScore;
      myScore = s.score;
      const el = $('my-score');
      el.textContent = myScore;
      if (myScore > prev) bumpScore(el);
    } else {
      oppScore = s.score;
      $('opp-score').textContent = oppScore;
    }
  }
}

function bumpScore(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

// ============================================================
// FEEDBACK
// ============================================================
function showFeedback(text, type) {
  const el = $('word-feedback');
  el.textContent = text;
  el.className = `word-feedback show ${type}`;
  if (feedbackTimeout) clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    el.classList.remove('show');
  }, 1800);
}

// ============================================================
// GAME END
// ============================================================
function handleGameEnd(results) {
  gameActive = false;
  const me = results.find(r => r.index === playerIndex);
  const opp = results.find(r => r.index !== playerIndex);

  let resultClass, resultText;
  if (!opp) {
    resultClass = 'win';
    resultText = 'YOU WIN!';
  } else if (me.score > opp.score) {
    resultClass = 'win';
    resultText = 'YOU WIN!';
  } else if (me.score < opp.score) {
    resultClass = 'lose';
    resultText = 'YOU LOSE';
  } else {
    resultClass = 'tie';
    resultText = "IT'S A TIE!";
  }

  const titleEl = $('result-title');
  titleEl.textContent = resultText;
  titleEl.className = `result-title ${resultClass}`;

  // Build results grid
  const grid = $('results-grid');
  grid.innerHTML = '';

  const ordered = me && opp ? [me, opp] : results;
  ordered.forEach((r, i) => {
    const isWinner = opp && r.score > (i === 0 ? opp.score : me.score);
    const card = document.createElement('div');
    card.className = 'result-player' + (isWinner ? ' winner' : '');

    const nameLine = document.createElement('div');
    nameLine.className = 'result-player-name';
    nameLine.textContent = r.index === playerIndex ? 'You' : r.name;

    const scoreLine = document.createElement('div');
    scoreLine.className = 'result-player-score';
    scoreLine.textContent = r.score;

    const wordsDiv = document.createElement('div');
    wordsDiv.className = 'result-words';
    (r.words || []).sort((a, b) => b.length - a.length).forEach(w => {
      const chip = document.createElement('div');
      chip.className = 'result-word-chip';
      chip.textContent = w.toUpperCase();
      wordsDiv.appendChild(chip);
    });

    card.appendChild(nameLine);
    card.appendChild(scoreLine);
    card.appendChild(wordsDiv);
    grid.appendChild(card);
  });

  $('rematch-status').textContent = '';
  $('rematch-btn').disabled = false;
  showScreen('end');
}

// ============================================================
// ERROR DISPLAY
// ============================================================
function showError(id, msg) {
  const el = $(id);
  if (el) {
    el.textContent = msg;
    setTimeout(() => { if (el) el.textContent = ''; }, 4000);
  }
}

// ============================================================
// KEYBOARD SUPPORT
// ============================================================
document.addEventListener('keydown', e => {
  if (!gameActive) return;
  const screen = screens.game;
  if (!screen.classList.contains('active')) return;

  // Ignore if typing in an input
  if (e.target.tagName === 'INPUT') return;

  const key = e.key;

  if (key === 'Enter') {
    e.preventDefault();
    submitWord();
  } else if (key === 'Backspace' || key === 'Delete') {
    e.preventDefault();
    if (selectedLetters.length > 0) {
      removeLetterAt(selectedLetters.length - 1);
    }
  } else if (key === ' ') {
    e.preventDefault();
    shuffleTiles();
  } else if (/^[a-zA-Z]$/.test(key)) {
    e.preventDefault();
    const ch = key.toLowerCase();
    // Find first unused tile with this character
    const idx = gameLetters.findIndex(lt => lt.char.toLowerCase() === ch && !lt.used);
    if (idx !== -1) {
      clickTile(idx);
    }
  }
});

// ============================================================
// UI EVENT LISTENERS
// ============================================================

// Home screen
$('create-btn').addEventListener('click', () => {
  const name = $('player-name').value.trim() || 'Player';
  playerName = name;
  connect(() => {
    sendMsg({ type: 'create_room', name });
  });
});

$('join-btn').addEventListener('click', doJoin);
$('join-code').addEventListener('keydown', e => { if (e.key === 'Enter') doJoin(); });
$('player-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') $('create-btn').click();
});

function doJoin() {
  const name = $('player-name').value.trim() || 'Player';
  const code = $('join-code').value.trim().toUpperCase();
  if (!code) {
    showError('home-error', 'Please enter a room code.');
    return;
  }
  playerName = name;
  connect(() => {
    sendMsg({ type: 'join_room', code, name });
  });
}

// Copy room code
$('copy-code-btn').addEventListener('click', () => {
  navigator.clipboard.writeText(roomCode).then(() => {
    const fb = $('copy-feedback');
    fb.classList.add('show');
    setTimeout(() => fb.classList.remove('show'), 2000);
  }).catch(() => {
    // Fallback: select text
    const el = $('waiting-code');
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  });
});

// Game buttons
$('shuffle-btn').addEventListener('click', shuffleTiles);
$('clear-btn').addEventListener('click', () => { if (gameActive) clearWord(); });
$('submit-btn').addEventListener('click', submitWord);

// Rematch
$('rematch-btn').addEventListener('click', () => {
  $('rematch-btn').disabled = true;
  $('rematch-status').textContent = 'Waiting for opponent... (1/2)';
  sendMsg({ type: 'rematch' });

  // Show game screen immediately (countdown will overlay it)
  showScreen('game');
  gameActive = false;
  // Clear old state display
  $('found-words-list').innerHTML = '';
  $('word-feedback').className = 'word-feedback';
  $('word-area').innerHTML = '';
  $('letter-tiles').innerHTML = '';
});

// ============================================================
// INIT
// ============================================================
showScreen('home');
