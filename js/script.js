const gameArea = document.getElementById("game-area");
const piano = document.getElementById("piano");

// 각 쌍의 위치
const notePairs = [
  ["calc(50% - 150px)", "calc(50% - 90px)"],   // A 키
  ["calc(50% - 80px)", "calc(50% - 20px)"],    // S 키
  ["calc(50% - 10px)", "calc(50% + 50px)"],    // D 키
  ["calc(50% + 60px)", "calc(50% + 120px)"]    // F 키
];

// 키 → 쌍의 인덱스
const keyToIndex = {
  a: 0,
  s: 1,
  d: 2,
  f: 3
};

function createNote(leftPos, pairIndex) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.style.left = leftPos;
  note.dataset.index = pairIndex;
  note.dataset.hit = "false";
  gameArea.appendChild(note);

  setTimeout(() => note.remove(), 3000);
}

function spawnNotePair() {
  const index = Math.floor(Math.random() * notePairs.length);
  const [pos1, pos2] = notePairs[index];
  createNote(pos1, index);
  createNote(pos2, index);
}

setInterval(spawnNotePair, 1000);

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!keyToIndex.hasOwnProperty(key)) return;

  const pairIndex = keyToIndex[key];
  const pianoRect = piano.getBoundingClientRect();
  const top = pianoRect.top;
  const bottom = pianoRect.bottom;

  const candidates = Array.from(document.querySelectorAll(".note"))
    .filter(n => Number(n.dataset.index) === pairIndex)
    .filter(n => n.dataset.hit === "false")
    .filter(n => {
      const rect = n.getBoundingClientRect();
      return rect.bottom >= top && rect.top <= bottom;
    })
    .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top);

  if (candidates.length > 0) {
    const note = candidates[0];
    note.dataset.hit = "true";
    note.style.backgroundColor = "green";
    setTimeout(() => note.remove(), 200);
  }
});
