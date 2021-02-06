var width = 600;
var height = 600;

var config = {
  type: Phaser.AUTO,
  width,
  height,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var wheelStarted = false;
var wheelSpeed = 1;
var image;

function preload() {
  this.load.image(`roulette`, `assets/roulette.png`);
}

function create() {
  image = this.add.image(300, 300, `roulette`);
  image.setScale(0.3, 0.3);

  const button = this.add.text(10, 10, 'Turn wheel', { fill: '#0f0' });
  button.setInteractive();
  button.on('pointerdown', () => startWheel() );

  const stopper = this.add.triangle(40, 300, 0, 0, 0, 80, 80, 40, 0xdddddd);
}

function update ()
{
  if (!wheelStarted) {
    return;
  }

  wheelSpeed -= 0.001;
  if (wheelSpeed <= 0) {
    wheelStarted = false;
    return;
  }

  image.setRotation(image.rotation + wheelSpeed * Math.PI);
}

function startWheel() {
  wheelStarted = true;
  wheelSpeed = getRandomArbitrary(0.08, 0.17);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}