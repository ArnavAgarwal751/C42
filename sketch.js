//CREATING OBJECTS
var monkey, banana, obstacle ;

//IMAGES
var monkey_running, bananaImage, obstacleImage, backgroundImage ;

//CREATING GROUPS
var bananaGroup, obstacleGroup ;

//GROUND
var ground ; 

//SCORE
var score = 0 ;
var survivalTime = 0 ;

//GAMESTATE
var gameState ;
var PLAY, END ; 
var end ; 

function preload () {
  
  //LOADING IMAGES
  monkey_running = loadAnimation  ( "sprite_0.png" , "sprite_1.png" , "sprite_2.png" , "sprite_3.png" , "sprite_4.png" , "sprite_5.png" ,  "sprite_6.png" , "sprite_7.png" , "sprite_8.png" ) ;
  
  bananaImage = loadImage ( " banana.png " ) ; 
  obstacleImage = loadImage ( " obstacle.jpg " ) ;
  backgroundImage = loadImage("Jungle.jpg") ;
  
  //end = loadAnimation( "sprite_0.png" ) ;
  
}

function setup () { 
  
  createCanvas (600,400) ; 
  
  //GAMESTATE
  PLAY = 1 ; 
  gameState = PLAY ; 
  END = 0 ; 
  
  //NEW GROUPS
  bananaGroup = new Group () ; 
  obstacleGroup = new Group () ; 
  
  //CREATING MONKEY
  monkey = createSprite (50,300,50,50) ; 
  monkey.addAnimation ( "running" , monkey_running) ; 
  monkey.scale = 0.1 ;
  monkey.setCollider ("circle",0,0,200);
  
  //CREATING GROUND
  ground = createSprite (300,350,1000,10) ;
  ground.x = ground.width/2 ;
  ground.visible = false ;
 
}
  
function draw () { 
  
  background (backgroundImage) ; 
  backgroundImage.velocityX = (5 + 2 * score/100);
  
  //MOVING BACKGROUND
    if ( backgroundImage.x < 0 ) {
       
      backgroundImage.x = backgroundImage.width / 2 ;
      
    } 
    
  
  //GAMESTATE PLAY
  if ( gameState === PLAY ) { 
    
    //MOVING GROUND
    if ( ground.x < 0 ) {
       
      ground . x = ground.width / 2 ;
      
    } 
    
    ground.velocityX = -(5 + 2 * score/100) ; 
    
    //JUMPING MONKEY
    if (keyDown("space") && monkey.y < 500) {
      
      monkey.y = monkey.y - 8 ;
      
    } 
        
    //ADDING GRAVITY
    monkey.velocityY = monkey.velocityY + 0.2 ;
  
    monkey.collide(ground) ;
    
    //INCREAING SCORE
    survivalTime = Math.round(frameCount/frameRate()) ; 
    
    //DESTROYING BANANA
    if (monkey.isTouching(bananaGroup)) { 
      
      bananaGroup.destroyEach() ;
      
      score = score + 1 ; 
      
      monkey.scale = monkey.scale + 0.05 ;
      
    } 
    
    //SPAWNING OBJECTS
    spawnBanana() ;
    spawnObstacle() ;
    
  }
    
  //GAMESTATE END
  if (monkey.isTouching(obstacleGroup)) { 
      
    monkey.scale = 0.07 ;
      
  } 
   
  if ( gameState === END ) {
      
    //STOPING GROUND
    ground.velocityX = 0 ; 
     
    //STOPING BANANA & OBSTACLES
    obstacleGroup.setVelocityEach(0) ; 
    bananaGroup.setVelocityEach(0) ; 
      
    //VISIBLE = FALSE
    bananaGroup.setLifetimeEach(-1) ; 
    obstacleGroup.setLifetimeEach(-1);
      
    // monkey.changeAnimation ( "monkey_running " , end) ; 
      
  }
  
  monkey.depth = backgroundImage.depth ;
  monkey.depth = monkey.depth + 1;
  
  //DISPLAYING SCORE
  stroke( "blue" ) ; 
  textSize( 20 ) ;
  fill( "blue" ) ;
  text( "SCORE : " + score,400,50 ) ; 
    
  //DISPLAYING TIME
  stroke( "red" ) ;
  textSize( 20 ) ;
  fill( "red" ) ; 
  text( "SURVIVAL TIME : " + survivalTime,100,50 ) ;
    
  drawSprites () ;
    
}
  
function spawnBanana () { 
    
  if ( frameCount % 100 === 0 ) {
      
    var banana = createSprite (500,0,10,20) ; 
    banana.addImage(bananaImage) ;
    banana.velocityX = -(5 + 2 * score/100) ; 
    banana.y = Math.round(random(150,200)) ;
    banana.scale = 0.1 ;
      
    bananaGroup.add(banana) ; 
    bananaGroup.setLifetimeEach(100) ;
      
    banana.setCollider("rectangle",0,0,400,400) ; 
      
  }
    
} 
  
function spawnObstacle () {
    
  if ( frameCount % 200 === 0 ) { 
      
    var obstacle = createSprite (500,320,20,30) ; 
    obstacle.velocityX = -(5 + 2 * score/100) ;
    obstacle.addImage (obstacleImage) ; 
    obstacle.scale = 0.2 ;
    obstacleGroup.add(obstacle) ;
    obstacleGroup.setLifetimeEach(100) ; 
    obstacle.debug = true ;
    obstacle.setCollider ("circle",0,0,200);
      
  } 
    
}   