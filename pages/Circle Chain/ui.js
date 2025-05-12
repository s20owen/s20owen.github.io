
function showHomeScreen() {
  const home = document.createElement('div');
  home.style.position = 'absolute';
  home.style.top = 0;
  home.style.left = 0;
  home.style.width = '100%';
  home.style.height = '100%';
  home.style.display = 'flex';
  home.style.flexDirection = 'column';
  home.style.justifyContent = 'center';
  home.style.alignItems = 'center';
  home.style.background = 'transparent';
  home.style.zIndex = 5;

  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play';
  playBtn.style.fontSize = '2rem';
  playBtn.style.padding = '1rem 2rem';
  playBtn.style.border = 'none';
  playBtn.style.borderRadius = '12px';
  playBtn.style.background = '#ffffffcc';
  playBtn.style.color = '#333';
  playBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  playBtn.onclick = () => {
    document.body.removeChild(home);
    showLevelSelect();
  };

  home.appendChild(playBtn);
  document.body.appendChild(home);
}

function showLevelSelect() {
  document.getElementById("overlay")?.remove();
  canvas.style.display = "block";
const levelScreen = document.createElement('div');
  levelScreen.id = 'level-screen';
  levelScreen.style.position = 'absolute';
  levelScreen.style.top = 0;
  levelScreen.style.left = 0;
  levelScreen.style.width = '100%';
  levelScreen.style.height = '100%';
  levelScreen.style.display = 'flex';
  levelScreen.style.flexDirection = 'column';
  levelScreen.style.justifyContent = 'center';
  levelScreen.style.alignItems = 'center';
  levelScreen.style.zIndex = 4;

  const title = document.createElement('h1');
  title.textContent = 'Select Level';
  title.style.color = 'white';
  levelScreen.appendChild(title);

  const scrollBox = document.createElement('div');
  scrollBox.style.height = '300px';
  scrollBox.style.overflowY = 'auto';
  scrollBox.style.display = 'flex';
  scrollBox.style.flexDirection = 'column';
  scrollBox.style.alignItems = 'center';
  scrollBox.style.background = '#ffffffcc';
  scrollBox.style.borderRadius = '12px';
  scrollBox.style.padding = '20px';
  scrollBox.style.width = '220px';

  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel") || 1);

  LEVELS.forEach((level, index) => {
    const btn = document.createElement("button");
    btn.textContent = `Level ${index + 1}`;
    btn.disabled = index >= unlockedLevel;
    btn.style.margin = "10px";
    btn.style.padding = "1rem";
    btn.style.fontSize = "1.2rem";
    btn.style.borderRadius = "8px";
    btn.style.border = "none";
    btn.style.background = btn.disabled ? "#999" : "#1e90ff";
    btn.style.color = "#fff";
    btn.style.width = "100%";

    btn.onclick = () => {
      document.body.removeChild(levelScreen);
      const game = new Game(canvas, LEVELS, index);
      game.gameLoop();
    };

    scrollBox.appendChild(btn);
  });

  levelScreen.appendChild(scrollBox);
  document.body.appendChild(levelScreen);
}

function showOverlay(message, buttons = []) {
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.6)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 6;

  const text = document.createElement('h1');
  text.textContent = message;
  text.style.color = 'white';
  overlay.appendChild(text);

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '20px';
  buttonContainer.style.marginTop = '20px';

  buttons.forEach(({ label, onClick }) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.padding = '10px 20px';
    btn.style.fontSize = '1rem';
    btn.onclick = () => {
      canvas.style.opacity = 1;
      document.body.removeChild(overlay);
      onClick();
    };
    buttonContainer.appendChild(btn);
  });

  overlay.appendChild(buttonContainer);
  
  canvas.style.transition = 'opacity 0.5s ease';
  canvas.style.opacity = 0.2;

  overlay.style.opacity = 0;
  overlay.style.transition = 'opacity 0.5s ease';
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = 1;
  });

}


function shakeScreen(duration = 500, intensity = 5) {
  const canvas = document.getElementById('gameCanvas');
  let elapsed = 0;

  const interval = setInterval(() => {
    const dx = (Math.random() - 0.5) * intensity * 2;
    const dy = (Math.random() - 0.5) * intensity * 2;
    canvas.style.transform = `translate(${dx}px, ${dy}px)`;
    elapsed += 16;
    if (elapsed >= duration) {
      clearInterval(interval);
      canvas.style.transform = '';
    }
  }, 16);
}
