var spaceImg, space;
var meteorImg, meteor, meteorsGroup;
var rocket, rocketImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var sound

function preload(){
  spaceImg = loadImage("space.jpg");
  meteorImg = loadImage("meteor.png");
  rocketImg = loadImage("rocket.png");
  sound = loadSound("cinematic-atmosphere-score-2-22136.mp3");
}
function setup(){
  createCanvas(600,600);
  sound.loop();
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 5;
  
  meteorsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.3;
  rocket.addImage("rocket", rocketImg);
}

function draw(){
  background(0);


 
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
        rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(space.y > 400){
      space.y = 300
    }
    spawnMeteors();

    
    //climbersGroup.collide(ghost);
    if(meteorsGroup.isTouching(rocket)){
      rocket.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
      rocket.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnMeteors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var meteor = createSprite(200, -50);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.height = 2;
    
    meteor.x = Math.round(random(120,400));
    invisibleBlock.x = meteor.x;
    
    meteor.addImage(meteorImg);
    meteor.scale = 0.1
    
    meteor.velocityY = 5;
    invisibleBlock.velocityY = 5;
    
    rocket.depth = meteor.depth;
    rocket.depth +=1;
   
    //assign lifetime to the variable
    meteor.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    meteorsGroup.add(meteor);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}