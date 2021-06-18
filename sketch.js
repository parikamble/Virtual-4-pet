//Create variables here
var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage ("images/Dog.png");
  dogimg2 = loadImage("images/happy dog.png")
	//load images here
}

function setup() {
	createCanvas(800, 600);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(600,340,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.30
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("Feed Drago !!")
  feed.position(700,95)
  feed.mousePressed(FeedDog);
 
  add = createButton("Add Food")
  add.position(850,95)
  add.mousePressed(AddFood)


} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(25);
textFont("Comic Sans MS");
text("Last Feed : 5:00 P. M",50,50);
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
