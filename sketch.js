const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World  = Matter.World;

var gameState = "play"
var bodyguard,bodyguardImage;
var backgroundImage;
var world;
var engine;
var ground;
var box1,box2,box3;
var boxGroup;
var FImage;
var score =0
var lives = 2
var song;

function preload(){
  bodyguardImage = loadAnimation("Animation/Man1.png","Animation/Man2.png","Animation/Man3.png","Animation/Man4.png","Animation/Man5.png","Animation/Man6.png")
  backgroundImage = loadImage("Animation/Background.png")
  box1 = loadImage("Animation/box1.png")
  box2 = loadImage("Animation/box2.png")
 FImage = loadAnimation("Animation/FallingImg1.png","Animation/FallingImg2.png","Animation/FallingImg3.png","Animation/FallingImg4.png","Animation/FallingImg5.png","Animation/FallingImg6.png","Animation/FallingImg7.png","Animation/FallingImg8.png","Animation/FallingImg9.png")
  song = loadSound("bensound-epic.mp3")
}
function setup() {

  engine = Engine.create();
  world = engine.world;
  createCanvas(1500,700);
  ground = createSprite(150,600,1500,10)
  background = createSprite(400,240,1500,700)
  background.addImage(backgroundImage)
  background.x = 400;
 bodyguard =  createSprite(150, 590, 40, 40);
 bodyguard.addAnimation("Running",bodyguardImage)
 bodyguard.addAnimation("Falling",FImage)

 boxGroup = new Group()
 bodyguard.debug = false
 bodyguard.setCollider("circle",0,0,40)

 



 
}

function draw() {
  //background(backgroundImage); 
  //song.play()

  background.velocityX = -3;

  if (background.x < 0){
   background.x =  background.width/2;
  }
 
  bodyguard.collide(ground);
  bodyguard.velocityY = bodyguard.velocityY +0.5

  if(keyDown("up")&& bodyguard.y >= 479 ) {
    bodyguard.velocityY = -12;
  }
//console.log(bodyguard.y)
  
 // if(frameCount % 80 === 0){
    //box1 = createSprite(0,565,20,10)


  // }
  if(gameState === "run" && keyDown("space") ){
    
    bodyguard.changeAnimation("Running",bodyguardImage)
    gameState = "play"
    }
if(bodyguard.isTouching(boxGroup)&& gameState === "play"){
    bodyguard.changeAnimation("Falling",FImage)
    gameState = "run"
    lives = lives-1
    
}
    if(lives === 0){
      gameState = "end"
    }
 

  createBox()
 

  drawSprites();
  if (gameState === "run"){
    textSize(30)
    text("Press Space to stand",50,100)
    }
    //textSize(20)
   // text("Score :" +score,500,50 )
   // score = score+Math.round(getFrameRate()/60)
   textSize(20)
 text("Remaining Lives = "+lives,50,50)
  
if(gameState === "end"){
  textSize(100)
  
text("GameOver",750,250)
background.velocityX = 0;
bodyguard.velocityY = 0;
box.velocityX = 0
}
}





function createBox(){
  if(frameCount % 120 === 0){

    box = createSprite(1500,600,30,10)
    box.velocityX = -3
    
   // box.y = Math.round(random(600,500))
    box.scale = 0.2

  var rand = Math.round(random(1,3))
    switch(rand){
      case 1 : box.addImage(box1);
      break;
      case 2 : box.addImage(box2);
      break;
     
      default:break
    }
    boxGroup.add(box)
 box.debug = false
 box.setCollider("rectangle",0,0,box.width,box.height)
 box.lifetime = 500
  }
  box.depth = bodyguard.depth
  bodyguard.depth = bodyguard.depth +1
   

  }


