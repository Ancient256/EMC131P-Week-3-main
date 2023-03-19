var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var cursors;
var player;
var apple;
function preload(){
  this.load.image('bg', '../assets/maps/grass.png');
  this.load.image('apple', '../assets/misc/apple.png');
  this.load.image('slime', '../assets/misc/player.png');
}

function create(){
  this.add.image(400, 300, 'bg');
  
  apple = this.physics.add.image(600, 400, 'apple');
  apple.body.allowGravity = false;
  player = this.physics.add.image(100, 450, 'slime');
  
  player.setVelocity(100, 200);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  this.physics.add.overlap(player,apple,appleOverlap,gameScore);
}

function update(){
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
  }
  else {
    player.setVelocityX(0);
  }
  if (cursors.up.isDown)
{
    player.setVelocityY(-330);
}

}
function appleOverlap(){
apple.destroy();
}

function gameScore(){
score += 1 * 100;
scoreText.setText('Score: ' + score);
if(score === 100){
  winCondition();
}
}

function winCondition(){
  alert('You Win');
}