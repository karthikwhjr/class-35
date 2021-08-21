//creating varibles for the ball and database
var hypnoticBall, database;
var position;


function setup(){
  //creating database
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  
  //creating ball
  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

  //reffered two database values
  var hypnoticBallPosition = database.ref('ball/position');
  //to listen to the changing values
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    //to control the ball
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

//to write the positions
function writePosition(x,y){
database.ref('ball/position').set({
  'x':position.x + x,
  'y':position.y + y,
})
}

//to read the values
function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

//to find error in realtime database
function showError(){
  console.log("Error in writing to the database");
}
