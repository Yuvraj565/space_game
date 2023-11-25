
var background_img;
var grounds, ground_1, backdrop;
var astronaut, astronaut_animation_run = [] ,astronautsheet, astronautdata;
var lightning_img, acid_img;
var enemy_ship, enemy_img;
var enemy_bullet, player_bullet, enemy_bullet_img, player_bullet_img;

function preload(){
 background_img = loadImage("./assets/background.png");
 ground_1 = loadImage("./assets/ground1.png");
 astronautsheet = loadAnimation("./assets/Astronaut/run2.png");
 astronautdata = loadJSON("./assets/Astronaut/run2.json"); 
 temp = loadImage("./assets/Astronaut/spaceship.png");
 lightning_img = loadImage("./assets/Astronaut/lightning.png");
 acid_img = loadImage("./assets/Astronaut/acid.png");
 enemy_img = loadImage("./assets/Astronaut/enemyship.png");
 enemy_bullet_img = loadImage("./assets/Astronaut/enemy bullet.png");
 player_bullet_img = loadImage("./assets/Astronaut/player bullet.png");

 //astronaut_animation_run = loadAnimation("./assets/Astronaut/astonaut.gif");
 
}

function setup(){
    createCanvas(1200, 600);
    /*var astronautFrames = astronautdata.frames;
     for (var i = 0; i < astronautFrames.length; i++) {
        var pos = astronautFrames[i].position;
        var img = astronautsheet.get(pos.x, pos.y, pos.w, pos.h);
        astronaut_animation_run.push(img);
    }*/


    backdrop = createSprite(0, 0, 1200, 800);
    backdrop.addImage(background_img);
    backdrop.scale = 1.5;
    backdrop.velocityX = -2;
    backdrop.x = backdrop.width/1.5;
    astronaut = createSprite(200, 200, 20, 20);
    astronaut.addAnimation("run", temp);
    astronaut.scale = 0.5

    enemy_ship = createSprite(1300, 200, 20, 20);
    enemy_ship.addImage(enemy_img);


    bullet_group = new Group();
    lightning_group = new Group();
    acid_group = new Group();

    enemy_bullet = createSprite(enemy_ship.x, enemy_ship.y, 10, 10);
    enemy_bullet.addImage(enemy_bullet_img);


   
}

function draw(){
    background(255)
    if(backdrop.x < 100){
        backdrop.x = backdrop.width/1.5;
    }

    if (keyDown("up")){
        astronaut.y -= 4
    }
    if (keyDown("down")){
        astronaut.y += 4
    }
    if (keyDown("left")){
        astronaut.x -= 4
    }
    if (keyDown("right")){
        astronaut.x += 4
    }
    if (keyWentUp("space")){
        playerbullet();
    }
    if (astronaut.x>=400){
        astronaut.x = 399
    }
    spawn_obstacles();  
    enemy();
    drawSprites();
}


function spawn_obstacles(){
    if(frameCount%150===0){
        var lightning = createSprite(1200, 200, 10, 10);
        lightning.y = random(50, 600);
        lightning.addImage("lightning", lightning_img);
        lightning.velocityX = -2
        lightning.lifetime = 600
        lightning_group.add(lightning);
    }

    if(frameCount%170===0){
        var acid = createSprite(1200, 200, 10, 10);
        acid.y = random(50, 600);
        acid.addImage("acid", acid_img);
        acid.velocityX = -5
        acid.lifetime = 600
        acid_group.add(acid);
        

    }

    
}


function enemy(){
    if(frameCount%350===0){
        enemy_ship.x = 1000
        enemy_ship.y = random(100, 300);
        
    }

    if(frameCount%50===0){
        enemy_ship.y = random(100, 500);
        
        
    }

    
    //bullet_group.add(player_bullet)
}


function playerbullet(){
    player_bullet = createSprite(astronaut.x, astronaut.y, 10, 10);
    player_bullet.addImage(player_bullet_img);
    player_bullet.velocityX = 5
    player_bullet.scale = 0.3
    player_bullet.lifetime = 600
    bullet_group.add(player_bullet)

}

function enemybullet(){
    if(frameCount%20===0){
    enemy_bullet = createSprite(enemy_ship.x, enemy_ship.y, 10, 10);
    enemy_bullet.addImage(enemy_bullet_img);
    enemy_bullet.velocityX = -5
    enemy_bullet.scale = 1
    enemy_bullet.lifetime = 600
    }
    
}
