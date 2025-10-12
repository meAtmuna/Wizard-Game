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

function createGameObject({ game, sprite, position, scale }) {
    const self = {};
    self.game = game;
    self.sprite = sprite ?? { x:0, y:0, width:TILE_SIZE, height:TILE_SIZE, image: null };
    self.position = position ?? { x:0, y:0 };
    self.scale = scale ?? 1;
    self.destinationPosition = { x: self.position.x, y: self.position.y };
    self.width = self.sprite.width * self.scale;
    self.halfWidth = self.width / 2;
    self.height = self.sprite.height * self.scale;
  
    self.draw = function(ctx) {
      if (self.sprite.image && self.sprite.image.complete) {
        ctx.drawImage(
          self.sprite.image,
          self.sprite.x * self.sprite.width,
          self.sprite.y * self.sprite.height,
          self.sprite.width, self.sprite.height,
          self.position.x + TILE_SIZE/2 - self.halfWidth,
          self.position.y + TILE_SIZE - self.height,
          self.width, self.height
        );
      }
    };
  
    return self;
}

function createHero({ game, sprite, position, scale }) {
  const base = createGameObject({ game, sprite, position, scale });
  const self = {};
  Object.assign(self, base);
  self.speed = 100;
  self.maxFrame = 2;
  // self.update = function(deltaTime) {};
  self.draw = function(ctx) {
    base.draw(ctx);
  };
  return self;
}

function createGame() {
  const self = {};
  self.world = createWorld();
  self.hero = createHero({
    game: self,
    sprite: { x:0, y:0, width:64, height:64, image: document.getElementById("hero") },
    position: { x: TILE_SIZE, y: TILE_SIZE },
    scale: 1
  });

  self.demoObj = createGameObject({ game: self, position: { x: TILE_SIZE, y: TILE_SIZE } });


  self.render = function(ctx, deltaTime) {
    self.world.drawBackground(ctx);
    self.demoObj.draw(ctx);
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
