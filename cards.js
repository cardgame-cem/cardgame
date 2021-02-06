var width = 1000;
var height = 600;

var cards = [
  ["CardKit_Nik_Leonie_Front1960_1.png", "CardKit_Nik_Leonie_Back1960_1.png"],
  ["CardKit_Nik_Leonie_Front2020_1.png", "CardKit_Nik_Leonie_Back2020_1.png"],
  // duplicates for testing
  ["CardKit_Nik_Leonie_Front1960_1.png", "CardKit_Nik_Leonie_Back1960_1.png"],
  ["CardKit_Nik_Leonie_Front2020_1.png", "CardKit_Nik_Leonie_Back2020_1.png"],
  ["CardKit_Nik_Leonie_Front1960_1.png", "CardKit_Nik_Leonie_Back1960_1.png"],
  ["CardKit_Nik_Leonie_Front2020_1.png", "CardKit_Nik_Leonie_Back2020_1.png"],
  ["CardKit_Nik_Leonie_Front1960_1.png", "CardKit_Nik_Leonie_Back1960_1.png"],
  ["CardKit_Nik_Leonie_Front2020_1.png", "CardKit_Nik_Leonie_Back2020_1.png"],
];

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
var iter = 0;
var left, right;

var x = 200;
var y = 300;

var imageLeft;
var imageLeftScaleX;
var imageLeftScaleY;
var animationLeftStarted = 'none';

var imageRight;
var imageRightScaleX;
var imageRightScaleY;
var animationRightStarted = 'none';

function preload() {
  cards.forEach((card, i) => {
    this.load.image(`card_front_${i}`, `assets/${card[0]}`);
    this.load.image(`card_back_${i}`, `assets/${card[1]}`);
  });
}

function create() {
  right = shuffleArray(Array.from(Array(cards.length).keys()));
  left = right.splice(0, Math.ceil(right.length / 2));

  nextImageLeft.bind(this)();
  nextImageRight.bind(this)();
}

function nextImageLeft() {
  if (!left.length) {
    return;
  }

  imageLeft = this.add
    .image(x, y, `card_back_${left[0]}`)
    .setInteractive();
  imageLeft.setDisplaySize(400, 500);
  imageLeft.on('pointerdown', function (pointer) {
    animationLeftStarted = 'decrease';
  });
}

function nextImageRight() {
  if (!right.length) {
    return;
  }

  imageRight = this.add
    .image(width - x, y, `card_back_${right[0]}`)
    .setInteractive();
  imageRight.setDisplaySize(400, 500);
  imageRight.on('pointerdown', function (pointer) {
    animationRightStarted = 'decrease';
  });
}

function update ()
{
  const scene = this;

  if (animationLeftStarted !== 'none') {
    if (animationLeftStarted === 'decrease') {
      imageLeft.scaleX -= 0.1;
      if (imageLeft.scaleX <= 0) {
        animationLeftStarted = 'increase'
        imageLeft.destroy();
        imageLeft = this.add
          .image(x, y, `card_front_${left[0]}`)
          .setInteractive();
        left.shift();

        imageLeft.displayWidth = 400;
        imageLeft.scale = 0;
        imageLeft.displayHeight = 500;
        
        imageLeft.on('pointerdown', function (pointer) {
          imageLeft.destroy();
          nextImageLeft.bind(scene)();
        });
      }
    } else {
      imageLeft.scaleX += 0.1;
      if (imageLeft.displayWidth >= 400) {
        imageLeft.displayWidth = 400;
        animationLeftStarted = 'none'
      }
    }
  }

  if (animationRightStarted !== 'none') {
    if (animationRightStarted === 'decrease') {
      imageRight.scaleX -= 0.1;
      if (imageRight.scaleX <= 0) {
        animationRightStarted = 'increase'
        imageRight.destroy();
        imageRight = this.add
          .image(width - x, y, `card_front_${right[0]}`)
          .setInteractive();
        right.shift();

        imageRight.displayWidth = 400;
        imageRight.scale = 0;
        imageRight.displayHeight = 500;
        
        imageRight.on('pointerdown', function (pointer) {
          imageRight.destroy();
          nextImageRight.bind(scene)();
        });
      }
    } else {
      imageRight.scaleX += 0.1;
      if (imageRight.displayWidth >= 400) {
        imageRight.displayWidth = 400;
        animationRightStarted = 'none'
      }
    }
  }
}

const randomImageNumber = () => {
  return Math.floor(Math.random() * cards.length);
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
