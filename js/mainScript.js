// DOM이 모두 로드된 후 실행
window.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById('game-area');
  if (!gameArea) {
    console.warn('#game-area 요소를 찾을 수 없습니다.');
    return;
  }

  // 뷰포트 기준 좌표 및 크기
  const rect = gameArea.getBoundingClientRect();
  console.log('Viewport 기준 좌표와 크기:', rect);
  // → { top, right, bottom, left, width, height, x, y }

  // 문서 전체 기준 절대 좌표
  const absX = rect.left + window.scrollX;
  const absY = rect.top  + window.scrollY;
  console.log(`문서 기준 절대 좌표: x=${absX}, y=${absY}`);

  console.log(`width=${rect.width}, height=${rect.height}`);
});
