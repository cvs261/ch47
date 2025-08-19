// ATENȚIE: Schimbă cu adresa serverului tău de chat (ngrok, VPS, etc.)
const socket = io('https://ac0341e11b88.ngrok-free.app');

let myId = null;

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Setează ID-ul clientului
socket.on('connect', () => {
  myId = socket.id;
});

// Trimite mesaj la server
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    socket.emit('chat message', { msg });
    input.value = '';
  }
});

// Primește mesaje și afișează-le
socket.on('chat message', (data) => {
  const item = document.createElement('li');
  item.textContent = data.msg;
  item.className = data.id === myId ? 'my-msg' : 'other-msg';
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
