const MINUTE_MILLIS = 60000;
const HOUR_MILLIS = MINUTE_MILLIS * 60;
const DAY_MILLIS = HOUR_MILLIS * 24;
const WEEK_MILLIS = DAY_MILLIS * 7;
const FOUR_WEEK_MILLIS = WEEK_MILLIS * 4;

const avatar = document.getElementById('comment-avatar');
const input = document.getElementById('comment-input');
const submit = document.getElementById('comment-submit');
const comments = document.getElementById('comments');
const template = document.getElementById('comment-entry-template');

const users = [
  { username: 'rob', name: 'Rob Hope' },
  { username: 'sophie', name: 'Sophie Brecht' },
  { username: 'cameron', name: 'Cameron Lawrence' },
  { username: 'james', name: 'James' }
];

let selectedUser;


function mapDate(message) {
  message.timestamp = new Date(message.timestamp);
  return message;
}

function fetchMessages() {
  return fetch('/api/messages')
    .then(response => response.json())
    .then(messages => messages.map(m => mapDate(m)));
}

function postMessage(message) {
  const options = {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch('/api/messages', options)
    .then(response => response.json())
    .then(message => mapDate(message));
}

function vote(id) {
  return fetch(`/api/messages/${id}/actions/vote`, { method: 'POST' });
}

function interpolate(template, params) {
  const replaceTags = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '(': '&#40;', ')': '&#41;' };
  const safeInnerHTML = text => text.toString().replace(/[&<>\(\)]/g, tag => replaceTags[tag] || tag);
  const keys = Object.keys(params);
  const keyVals = Object.values(params).map(safeInnerHTML);
  return new Function(...keys, `return \`${template}\``)(...keyVals);
}

function formatTimeDistance(date) {
  const now = new Date();
  const millisDistance = now.getTime() - date.getTime();

  if (millisDistance < MINUTE_MILLIS) {
    return 'now';
  }

  if (millisDistance < HOUR_MILLIS) {
    return `${Math.round(millisDistance / MINUTE_MILLIS)} minutes ago`;
  }

  if (millisDistance < DAY_MILLIS) {
    return `${Math.round(millisDistance / HOUR_MILLIS)} hours ago`;
  }

  if (millisDistance < WEEK_MILLIS) {
    return `${Math.round(millisDistance / DAY_MILLIS)} days ago`;
  }

  return `${Math.round(millisDistance / WEEK_MILLIS)} weeks ago`;
}

function loadMessages() {
  let html = '';
  fetchMessages().then(messages => {
    messages
      .map(m => {
        m.timeDistance = formatTimeDistance(m.timestamp);
        return m;
      })
      .forEach(m => html += interpolate(template.innerHTML.toString().trim(), m));
    comments.innerHTML = html;
  });
}

function selectRandomUser() {
  selectedUser = users[Math.floor(Math.random() * 4)];
  avatar.src = `assets/avatars/${selectedUser.username}.png`;
}

// Bind event listeners
submit.addEventListener('click', () => {
  const message = {
    username: selectedUser.username,
    name: selectedUser.name,
    text: document.getElementById('comment-input').value
  };

  postMessage(message).then(() => {
    input.value = '';
    loadMessages();
  });
});

comments.addEventListener('click', ev => {
  const action = ev.target.getAttribute('action');
  const messageId = ev.target.getAttribute('message-id');
  
  switch(action) {
    case 'vote':
      vote(messageId).then(() => loadMessages());
      break;
  }
});

// Do initial comment fetching and user randomizing
loadMessages();
selectRandomUser();