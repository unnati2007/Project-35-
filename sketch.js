var balloon;

function preload() {
   bg = loadImage("bg.png")
   balloonImage3 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1500,550);
  balloon = createSprite(400, 200, 50, 50);
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(bg);  
  
    if(keyDown(LEFT_ARROW)){
        balloon.x = balloon.x-10
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x+10
    }
    else if(keyDown(UP_ARROW)){
      balloon.y = balloon.y-10;
      balloon.addAnimation("balloon",balloonImage3)
      balloon.scale = balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y+10
      balloon.scale = balloon.scale+0.01;
    }
    drawSprites();
}

function changePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}

function readPosition(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
}
function showError(){
  console.log("error in writing to the database")
}