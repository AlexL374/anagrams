// server.js - Multiplayer Anagram Game Server
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { WORDS } = require('./words');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// Game Rooms
// ============================================================
const rooms = new Map(); // code -> room

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function canFormWord(word, letters) {
  const available = [...letters.map(l => l.toLowerCase())];
  for (const ch of word.toLowerCase()) {
    const idx = available.indexOf(ch);
    if (idx === -1) return false;
    available.splice(idx, 1);
  }
  return true;
}

function scoreWord(word) {
  const len = word.length;
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 4;
  if (len === 6) return 6;
  if (len === 7) return 10;
  return 14; // 8+
}

const VOWEL_POOL = 'AAAAAEEEEEEIIIOOOUU'.split('');
const CONSONANT_POOL = 'BBCCDDDFFGGHHKLLLMMNNNNPPRRRRSSSTTTTTVVWW'.split('');

function generateRandomLetters() {
  const numVowels = Math.random() < 0.4 ? 2 : 3;
  const letters = [];
  for (let i = 0; i < numVowels; i++) {
    letters.push(VOWEL_POOL[Math.floor(Math.random() * VOWEL_POOL.length)]);
  }
  for (let i = 0; i < 6 - numVowels; i++) {
    letters.push(CONSONANT_POOL[Math.floor(Math.random() * CONSONANT_POOL.length)]);
  }
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

function send(ws, obj) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}

function broadcast(room, obj) {
  for (const p of room.players) {
    send(p.ws, obj);
  }
}

function createRoom(code) {
  return {
    code,
    players: [],           // [{ws, name, index, score, words}]
    state: 'waiting',      // waiting | countdown | playing | ended
    letters: [],           // array of letter chars
    foundWords: new Set(), // globally found words (any player)
    timerInterval: null,
    countdownInterval: null,
    timeLeft: 90,
    rematchVotes: new Set(),
  };
}

function startCountdown(room) {
  room.state = 'countdown';
  let count = 3;
  broadcast(room, { type: 'countdown', count });
  room.countdownInterval = setInterval(() => {
    count--;
    broadcast(room, { type: 'countdown', count });
    if (count <= 0) {
      clearInterval(room.countdownInterval);
      room.countdownInterval = null;
      startGame(room);
    }
  }, 1000);
}

function startGame(room) {
  room.state = 'playing';
  room.timeLeft = 90;
  // Reset scores, words
  for (const p of room.players) {
    p.score = 0;
    p.words = [];
  }
  room.foundWords = new Set();

  // Send game_start
  broadcast(room, {
    type: 'game_start',
    letters: room.letters,
    players: room.players.map(p => ({ name: p.name, index: p.index })),
  });

  // Start 90-second timer
  room.timerInterval = setInterval(() => {
    room.timeLeft--;
    broadcast(room, { type: 'timer', timeLeft: room.timeLeft });
    if (room.timeLeft <= 0) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      endGame(room);
    }
  }, 1000);
}

function endGame(room) {
  room.state = 'ended';
  room.rematchVotes = new Set();
  const results = room.players.map(p => ({
    name: p.name,
    index: p.index,
    score: p.score,
    words: p.words,
  }));
  broadcast(room, { type: 'game_end', results });
}

function handleRematch(room) {
  room.letters = generateRandomLetters();
  startCountdown(room);
}

// ============================================================
// WebSocket message handling
// ============================================================
wss.on('connection', (ws) => {
  ws.playerData = null; // {room, index}

  ws.on('message', (data) => {
    let msg;
    try {
      msg = JSON.parse(data);
    } catch {
      return;
    }

    const { type } = msg;

    if (type === 'create_room') {
      const name = (msg.name || 'Player').slice(0, 20).trim() || 'Player';
      // Generate unique code
      let code;
      do { code = generateCode(); } while (rooms.has(code));

      const room = createRoom(code);
      const player = { ws, name, index: 0, score: 0, words: [] };
      room.players.push(player);
      rooms.set(code, room);
      ws.playerData = { room, index: 0 };

      send(ws, { type: 'room_created', code, playerIndex: 0 });
    }

    else if (type === 'join_room') {
      const name = (msg.name || 'Player').slice(0, 20).trim() || 'Player';
      const code = (msg.code || '').toUpperCase().trim();
      const room = rooms.get(code);

      if (!room) {
        return send(ws, { type: 'error', message: 'Room not found. Check your code.' });
      }
      if (room.players.length >= 2) {
        return send(ws, { type: 'error', message: 'Room is full.' });
      }
      if (room.state !== 'waiting') {
        return send(ws, { type: 'error', message: 'Game already in progress.' });
      }

      const player = { ws, name, index: 1, score: 0, words: [] };
      room.players.push(player);
      ws.playerData = { room, index: 1 };

      send(ws, { type: 'room_joined', code, playerIndex: 1 });

      // Both players present — generate random letters and start countdown
      room.letters = generateRandomLetters();
      startCountdown(room);
    }

    else if (type === 'submit_word') {
      if (!ws.playerData) return;
      const { room, index } = ws.playerData;
      if (room.state !== 'playing') return;

      const word = (msg.word || '').toLowerCase().replace(/[^a-z]/g, '');
      if (word.length < 3 || word.length > 6) {
        return send(ws, { type: 'word_result', word, result: 'invalid', score: 0 });
      }

      const player = room.players[index];

      // Check duplicate (per player)
      if (player.words.includes(word)) {
        return send(ws, { type: 'word_result', word, result: 'duplicate', score: 0 });
      }

      // Validate: can form from letters AND in dictionary
      if (!canFormWord(word, room.letters) || !WORDS.has(word)) {
        return send(ws, { type: 'word_result', word, result: 'invalid', score: 0 });
      }

      // Valid word
      const pts = scoreWord(word);
      player.score += pts;
      player.words.push(word);
      room.foundWords.add(word);

      send(ws, { type: 'word_result', word, result: 'valid', score: pts });

      // Broadcast score update
      broadcast(room, {
        type: 'score_update',
        scores: room.players.map(p => ({ name: p.name, index: p.index, score: p.score })),
      });
    }

    else if (type === 'rematch') {
      if (!ws.playerData) return;
      const { room, index } = ws.playerData;
      if (room.state !== 'ended') return;

      room.rematchVotes.add(index);
      broadcast(room, {
        type: 'rematch_vote',
        votes: room.rematchVotes.size,
        total: room.players.length,
      });

      if (room.rematchVotes.size === room.players.length) {
        handleRematch(room);
      }
    }
  });

  ws.on('close', () => {
    if (!ws.playerData) return;
    const { room } = ws.playerData;

    // Clear timers
    if (room.timerInterval) { clearInterval(room.timerInterval); room.timerInterval = null; }
    if (room.countdownInterval) { clearInterval(room.countdownInterval); room.countdownInterval = null; }

    // Notify remaining player
    for (const p of room.players) {
      if (p.ws !== ws) {
        send(p.ws, { type: 'player_disconnected' });
        if (p.ws.playerData) p.ws.playerData = null;
      }
    }

    rooms.delete(room.code);
  });
});

// ============================================================
// Start server
// ============================================================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Anagram game server running on http://localhost:${PORT}`);
});
