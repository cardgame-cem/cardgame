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
var x = width / 3;

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

  const fontSize = height/10;

  if (!isMobile()) {
    const buttonLeft = this.add.text(fontSize, height - 1.5*fontSize, 'i', { fill: '#ef7f66', fontSize: fontSize, align: 'center' }).setOrigin(0.5, 0);
    buttonLeft.setInteractive();
    buttonLeft.on('pointerdown', () => showInfoLeft() );

    const buttonRight = this.add.text(width - fontSize, height - 1.5*fontSize, 'i', { fill: '#a2d1ac', fontSize: fontSize, align: 'center' }).setOrigin(0.5, 0);
    buttonRight.setInteractive();
    buttonRight.on('pointerdown', () => showInfoRight() );
  }

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

function showInfoLeft() {
  $('#modalLeft').modal();
}

function showInfoRight() {
  $('#modalRight').modal();
}

function isMobile() {
  // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
  var a = navigator.userAgent||navigator.vendor||window.opera;
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
}