const dialogBox = document.getElementById("dialog-box");

const dialogs = [
  "엄마 > 음악 따위는 하지 말고 공부나 열심히 해라.",
  "신해철 > ...알겠습니다."
];

let currentIndex = 0;
let charIndex = 0;
let typingInterval = null;
let isTyping = false;

function typeText(text) {
  dialogBox.textContent = "";
  charIndex = 0;
  isTyping = true;

  typingInterval = setInterval(() => {
    dialogBox.textContent += text.charAt(charIndex);
    charIndex++;

    if (charIndex >= text.length) {
      clearInterval(typingInterval);
      isTyping = false;
    }
  }, 50); // ← 表示速度（50msごとに1文字）
}

function nextDialog() {
  if (isTyping) {
    // タイピング中にクリックされたら、全文を一気に表示
    clearInterval(typingInterval);
    dialogBox.textContent = dialogs[currentIndex - 1];
    isTyping = false;
    return;
  }

  if (currentIndex < dialogs.length) {
    const currentText = dialogs[currentIndex];
    currentIndex++;
    typeText(currentText);
  } else {
    dialogBox.textContent = ""; // 終了後は非表示（任意）
  }
}

// 最初のセリフ表示
nextDialog();

// Enterキーで次のセリフ（または全文表示）
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    nextDialog();
  }
});

