var width = window.innerWidth;
var height = window.innerHeight;

var cards1960 = [
  ["AssambledNature1960/AS1.png", "AssambledNature1960/ASBackside.png"],
  ["AssambledNature1960/AS2.png", "AssambledNature1960/ASBackside.png"],
  ["AssambledNature1960/AS3.png", "AssambledNature1960/ASBackside.png"],
  ["AssambledNature1960/AS4.png", "AssambledNature1960/ASBackside.png"],
  ["MediatingMembrane1960/MM1.png", "MediatingMembrane1960/MMBackside.png"],
  ["MediatingMembrane1960/MM2.png", "MediatingMembrane1960/MMBackside.png"],
  ["MediatingMembrane1960/MM3.png", "MediatingMembrane1960/MMBackside.png"],
  ["MediatingMembrane1960/MM4.png", "MediatingMembrane1960/MMBackside.png"],
  ["Megastructure1960/M1.png", "Megastructure1960/MBackside.png"],
  ["Megastructure1960/M2.png", "Megastructure1960/MBackside.png"],
  ["Megastructure1960/M3.png", "Megastructure1960/MBackside.png"],
  ["Megastructure1960/M4.png", "Megastructure1960/MBackside.png"],
  ["OpenSystem1960/OS1.png", "OpenSystem1960/OSBackside.png"],
  ["OpenSystem1960/OS2.png", "OpenSystem1960/OSBackside.png"],
  ["OpenSystem1960/OS3.png", "OpenSystem1960/OSBackside.png"],
  ["OpenSystem1960/OS4.png", "OpenSystem1960/OSBackside.png"],
  ["Revolution1960/R1.png", "Revolution1960/RBackside.png"],
  ["Revolution1960/R2.png", "Revolution1960/RBackside.png"],
  ["Revolution1960/R3.png", "Revolution1960/RBackside.png"],
  ["Revolution1960/R4.png", "Revolution1960/RBackside.png"],
  ["Utopia1960/U1.png", "Utopia1960/UBackside.png"],
  ["Utopia1960/U2.png", "Utopia1960/UBackside.png"],
  ["Utopia1960/U3.png", "Utopia1960/UBackside.png"],
  ["Utopia1960/U4.png", "Utopia1960/UBackside.png"],
];

var cards2020 = [
  ["AssambledNature2020/AS5.png", "AssambledNature2020/ASBackside.png"],
  ["AssambledNature2020/AS6.png", "AssambledNature2020/ASBackside.png"],
  ["AssambledNature2020/AS7.png", "AssambledNature2020/ASBackside.png"],
  ["AssambledNature2020/AS8.png", "AssambledNature2020/ASBackside.png"],
  ["MediatingMembrane2020/MM5.png", "MediatingMembrane2020/MMBackside.png"],
  ["MediatingMembrane2020/MM6.png", "MediatingMembrane2020/MMBackside.png"],
  ["MediatingMembrane2020/MM7.png", "MediatingMembrane2020/MMBackside.png"],
  ["MediatingMembrane2020/MM8.png", "MediatingMembrane2020/MMBackside.png"],
  ["Megastructure2020/M5.png", "Megastructure2020/MBackside.png"],
  ["Megastructure2020/M6.png", "Megastructure2020/MBackside.png"],
  ["Megastructure2020/M7.png", "Megastructure2020/MBackside.png"],
  ["Megastructure2020/M8.png", "Megastructure2020/MBackside.png"],
  ["OpenSystem2020/OS5.png", "OpenSystem2020/OSBackside.png"],
  ["OpenSystem2020/OS6.png", "OpenSystem2020/OSBackside.png"],
  ["OpenSystem2020/OS7.png", "OpenSystem2020/OSBackside.png"],
  ["OpenSystem2020/OS8.png", "OpenSystem2020/OSBackside.png"],
  ["Revolution2020/R5.png", "Revolution2020/RBackside.png"],
  ["Revolution2020/R6.png", "Revolution2020/RBackside.png"],
  ["Revolution2020/R7.png", "Revolution2020/RBackside.png"],
  ["Revolution2020/R8.png", "Revolution2020/RBackside.png"],
  ["Utopia2020/U5.png", "Utopia2020/UBackside.png"],
  ["Utopia2020/U6.png", "Utopia2020/UBackside.png"],
  ["Utopia2020/U7.png", "Utopia2020/UBackside.png"],
  ["Utopia2020/U8.png", "Utopia2020/UBackside.png"],
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

var y = height / 2;
var x = width / 4;

var imageSizeY = height / 1.5;
var imageSizeX = imageSizeY * 711 / 1056;

var imageLeft;
var imageLeftScaleX;
var imageLeftScaleY;
var animationLeftStarted = 'none';

var imageRight;
var imageRightScaleX;
var imageRightScaleY;
var animationRightStarted = 'none';

function preload() {
  cards1960.forEach((card, i) => {
    this.load.image(`card_front_1960_${i}`, `assets/cards/${card[0]}`);
    this.load.image(`card_back_1960_${i}`, `assets/cards/${card[1]}`);
  });
  cards2020.forEach((card, i) => {
    this.load.image(`card_front_2020_${i}`, `assets/cards/${card[0]}`);
    this.load.image(`card_back_2020_${i}`, `assets/cards/${card[1]}`);
  });
}

function create() {
  left = shuffleArray(Array.from(Array(cards1960.length).keys()));
  right = shuffleArray(Array.from(Array(cards2020.length).keys()));

  nextImageLeft.bind(this)();
  nextImageRight.bind(this)();
}

function nextImageLeft() {
  if (!left.length) {
    return;
  }

  imageLeft = this.add
    .image(x, y, `card_back_1960_${left[0]}`)
    .setInteractive();
  imageLeft.setDisplaySize(imageSizeX, imageSizeY);
  imageLeft.on('pointerdown', function (pointer) {
    animationLeftStarted = 'decrease';
  });
}

function nextImageRight() {
  if (!right.length) {
    return;
  }

  imageRight = this.add
    .image(width - x, y, `card_back_2020_${right[0]}`)
    .setInteractive();
  imageRight.setDisplaySize(imageSizeX, imageSizeY);
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
          .image(x, y, `card_front_1960_${left[0]}`)
          .setInteractive();
        left.shift();

        imageLeft.displayWidth = imageSizeX;
        imageLeft.scale = 0;
        imageLeft.displayHeight = imageSizeY;
        
        imageLeft.on('pointerdown', function (pointer) {
          imageLeft.destroy();
          nextImageLeft.bind(scene)();
        });
      }
    } else {
      imageLeft.scaleX += 0.1;
      if (imageLeft.displayWidth >= imageSizeX) {
        imageLeft.displayWidth = imageSizeX;
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
          .image(width - x, y, `card_front_2020_${right[0]}`)
          .setInteractive();
        right.shift();

        imageRight.displayWidth = imageSizeX;
        imageRight.scale = 0;
        imageRight.displayHeight = imageSizeY;
        
        imageRight.on('pointerdown', function (pointer) {
          imageRight.destroy();
          nextImageRight.bind(scene)();
        });
      }
    } else {
      imageRight.scaleX += 0.1;
      if (imageRight.displayWidth >= imageSizeX) {
        imageRight.displayWidth = imageSizeX;
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
