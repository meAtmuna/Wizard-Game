const TILE_SIZE = 12;
const COLS = 70;
const ROWS = 40
const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;

function createWorld() {
  const self = {};

  self.mainLayer = {
    backgroundLayer: document.getElementById("background"),
  };

  self.drawBackground = function(ctx) {
    if (self.mainLayer.backgroundLayer && self.mainLayer.backgroundLayer) {
      ctx.drawImage(self.mainLayer.backgroundLayer, 0, 0,GAME_WIDTH,GAME_HEIGHT);
    }
  };

  return self;
}

function createGame() {
  const self = {};
  self.world = createWorld();

  self.render = function(ctx) {
    self.world.drawBackground(ctx);
  };

  return self;
}

const game = createGame();

function startGame() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  let lastTime = 0;
  function animate(timeStamp) {
    requestAnimationFrame(animate);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.render(ctx, deltaTime);
  }

  requestAnimationFrame(animate);
}

window.addEventListener("load", startGame);
