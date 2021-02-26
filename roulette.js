(function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var imageHeight
  var imageWidth
  var cardsX;
  setImageDimensions();
  var fontSize = getFontSize();

  class CardsPile {
    idx = -1;

    constructor(cards, game) {
      this.game = game;
      this.cards = cards;

      this.buttonFlip = game.add
        .text(cardsX, height / 2 - imageHeight / 2 - 2*fontSize, 'Flip', { fill: '#eee', fontSize: fontSize })
        .setInteractive()
        .setOrigin(0.5, 0)
        .setVisible(false);
      this.buttonFlip.on('pointerdown', () => {
        this.buttonFlip.setVisible(false);
        animationStarted = 'decrease';
      });

      this.buttonThrow = game.add
        .text(cardsX, height / 2 + imageHeight / 2 + fontSize, 'Throw', { fill: '#eee', fontSize: fontSize })
        .setInteractive()
        .setOrigin(0.5, 0)
        .setVisible(false);
      this.buttonThrow.on('pointerdown', () => {
        this.buttonFlip.setVisible(false);
        this.buttonThrow.setVisible(false);
        wheelButton.setVisible(true);
        this.nextImage();
      });

      this.nextImage();
    }

    show() {
      this.image.setVisible(true);
      this.buttonFlip.setVisible(true);
      this.buttonThrow.setVisible(true);
    }

    getImage() {
      return this.image;
    }

    turnImage() {
      if (this.image) {
        this.image.destroy();
      }
      this.setImage(1);
      //this.image.scale = 0;
    }

    nextImage() {
      this.idx++;
      if (this.idx >= this.cards.length) {
        this.buttonFlip.destroy();
        this.buttonThrow.destroy();
        this.image.destroy();
        wheelButton.setVisible(false);
        playAgainButton.setVisible(true);
        return;
      }
      
      if (this.image) {
        this.image.destroy();
      }
      this.setImage(0);
      this.image.setVisible(false);
    }

    setImage(frontBackIdx) {
      this.image = this.game.add
        .image(cardsX, height / 2, this.cards[this.idx][frontBackIdx])
        .setDisplaySize(imageWidth, imageHeight)
        .setInteractive();
    }

    adaptDimensions(newX) {
      this.image.setX(newX).setY(height / 2).setDisplaySize(imageWidth, imageHeight);
      this.buttonThrow.setX(newX).setY(height / 2 + imageHeight / 2 + fontSize).setFontSize(fontSize);
      this.buttonFlip.setX(newX).setY(height / 2 - imageHeight / 2 - 2*fontSize).setFontSize(fontSize);
    }
  }

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

  const cards = {
    'green': shuffleArray([
      ['AN/AN1F.png', 'AN/AN1B.png'],
      ['AN/AN2F.png', 'AN/AN2B.png'],
      ['AN/AN3F.png', 'AN/AN3B.png'],
      ['AN/AN4F.png', 'AN/AN4B.png'],
    ]),
    'yellow': shuffleArray([
      ['M/M1F.png', 'M/M1B.png'],
      ['M/M2F.png', 'M/M2B.png'],
      ['M/M3F.png', 'M/M3B.png'],
      ['M/M4F.png', 'M/M4B.png'],
    ]),
    'blue': shuffleArray([
      ['OP/OP1F.png', 'OP/OP1B.png'],
      ['OP/OP2F.png', 'OP/OP2B.png'],
      ['OP/OP3F.png', 'OP/OP3B.png'],
      ['OP/OP4F.png', 'OP/OP4B.png'],
    ]),
    'violet': shuffleArray([
      ['OU/OU1F.png', 'OU/OU1B.png'],
      ['OU/OU2F.png', 'OU/OU2B.png'],
      ['OU/OU3F.png', 'OU/OU3B.png'],
      ['OU/OU4F.png', 'OU/OU4B.png'],
    ]),
    'red': shuffleArray([
      ['R/R1F.png', 'R/R1B.png'],
      ['R/R2F.png', 'R/R2B.png'],
      ['R/R3F.png', 'R/R3B.png'],
      ['R/R4F.png', 'R/R4B.png'],
    ]),
  }

  var game = new Phaser.Game(config);

  var wheelStarted = false;
  var wheelSpeed = 1;
  var wheel;
  var wheelButton;
  var playAgainButton;
  var stopper;

  var cardsMap = new Map();
  var cardPileSelected = null;
  var animationStarted = 'none';

  function preload() {
    this.load.image(`roulette`, `assets/roulette.png`);
    for (let i in cards) {
      cards[i].forEach(element => {
        this.load.image(`${element[0]}`, `assets/cards/${element[0]}`);
        this.load.image(`${element[1]}`, `assets/cards/${element[1]}`);
      });
    }
  }

  function create() {
    const backButton = this.add.text(10, 15, 'Back to main page', { fill: '#eee', fontSize: fontSize });
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => window.history.back() );

    const wheelSize = getWheelSize();
    wheel = this.add.image(wheelSize * 0.6, height / 2, `roulette`);
    wheel.setDisplaySize(wheelSize, wheelSize);

    wheelButton = this.add
      .text(cardsX, height / 2, 'Turn wheel', { fill: '#eee', fontSize: fontSize })
      .setOrigin(0.5, 0)
      .setInteractive();
    wheelButton.on('pointerdown', () => {
      startWheel();
      wheelButton.setVisible(false);
    });

    playAgainButton = this.add
      .text(cardsX, height / 2, 'Play again', { fill: '#eee', fontSize: fontSize })
      .setOrigin(0.5, 0)
      .setInteractive()
      .setVisible(false);

    playAgainButton.on('pointerdown', () => {
      wheelButton.setVisible(true);
      playAgainButton.setVisible(false);
      initCardSet.bind(this)();
    });

    stopper = this.add.triangle(0, height / 2, 0, 0, 0, height / 6, height / 6, height / 12, 0xdddddd);

    initCardSet.bind(this)();
  }

  function update ()
  {
    if (wheelStarted) {
      wheelSpeed -= 0.001;
      if (wheelSpeed <= 0) {
        wheelStarted = false;
        const color = getSelectedArea(wheel.rotation);
        cardPileSelected = cardsMap.get(color);
        cardPileSelected.show();
        return;
      }

      wheel.setRotation(wheel.rotation + wheelSpeed * Math.PI);
      return;
    }

    if (animationStarted !== 'none') {
      const image = cardPileSelected.getImage();
      const tick = getTick();
      if (animationStarted === 'decrease') {
        image.scaleX -= tick;
        if (image.scaleX <= 0) {
          animationStarted = 'increase'
          cardPileSelected.turnImage();
        }
      } else {
        image.scaleX += tick;
        if (image.displayWidth >= imageWidth) {
          image.displayWidth = imageWidth;
          animationStarted = 'none'
        }
      }
    }
  }

  function initCardSet() {
    cardsMap.set('blue', new CardsPile(cards.blue, this));
    cardsMap.set('yellow', new CardsPile(cards.yellow, this));
    cardsMap.set('red', new CardsPile(cards.red, this));
    cardsMap.set('green', new CardsPile(cards.green, this));
    cardsMap.set('violet', new CardsPile(cards.violet, this));
  }

  function startWheel() {
    wheelStarted = true;
    wheelSpeed = getRandomArbitrary(0.08, 0.17);
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRatio() {
    return 827 / 1182;
  }

  function getSelectedArea(rad) {
    // rad is between -PI and PI
    rad += Math.PI;
    const pi2 = 2 * Math.PI;
    if (rad < pi2 / 5) {
      return 'yellow'
    } else if (rad < (pi2 / 5) * 2) {
      return 'green';
    } else if (rad < (pi2 / 5) * 3) {
      return 'blue';
    } else if (rad < (pi2 / 5) * 4) {
      return 'red';
    } else {
      return 'violet';
    }
  }

  function getTick() {
    return imageHeight / 7000;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getWheelSize() {
    if (width / height > 3/2) {
      return height * 0.75;
    }
    return width / 2;
  }

  function setImageDimensions() {
    imageHeight = height / 1.5;
    if (width / height <= 3/2) {
      imageHeight = width / 3;
    }
    
    imageWidth = imageHeight * getRatio();
    cardsX = width - 0.75 * imageWidth;
    if (width / height > 3/2) {
      cardsX = 1.2 * height;
    }
  }

  function getFontSize() {
    return height / 40;
  }

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    fontSize = getFontSize();
    game.scale.resize(width, height);
    
    const wheelSize = getWheelSize();
    wheel.setPosition(wheelSize * 0.6, height / 2);
    wheel.setDisplaySize(wheelSize, wheelSize);

    stopper.setY(height / 2)//.setTo(0, 0, 0, height / 6, height / 6, height / 12);

    setImageDimensions();

    cardsMap.forEach(entry => {
      entry.adaptDimensions(cardsX);
    })
    playAgainButton.setX(cardsX).setY(height / 2).setFontSize(fontSize);
    wheelButton.setX(cardsX).setY(height / 2).setFontSize(fontSize);
  });
})();