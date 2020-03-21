var gameboard = [   // gameboard 
    ['','',''],     //  [0][0],[0][1],[0][2]
    ['','',''],     //  [1][0],[1][1],[1][2]
    ['','','']      //  [2][0],[2][0],[2][0]
];

const game = () => {
var w,h,r,canvas,ctx;
let turnAi = false;
var winnerResult = false;
let avaliablePlaces = [];
let avaliableSpots = {
  inUse1:false,
  inUse2:false,
  inUse3:false,
  inUse4:false,
  inUse5:false,
  inUse6:false,
  inUse7:false,
  inUse8:false,
  inUse9:false,

}
let noSpots = false;
let vsPC = false;


canvas = document.getElementById("canvas1");
const resetBtn = document.getElementById("reset");
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const boardReset = document.getElementById("resetBoard");
var table = document.getElementById("liveResults");
var total1 = document.getElementById("totalPlayer1");
var total2 = document.getElementById("totalPlayer2");
var vsPCSelect = document.getElementById("AiMode");

vsPCSelect.addEventListener("click",function(){
  if(vsPCSelect.checked == true){
    vsPC = true;
    
  }else{vsPC = false;
    
    }
    
})




boardReset.addEventListener("click", function(){
    table.innerHTML = "No game has been played yet.";
    total1.innerHTML = 0;
    total2.innerHTML = 0;
});
player1Name.addEventListener("click", function(){

  changeName("player1");
});
player2Name.addEventListener("click", function(){

  changeName("player2");
});
resetBtn.addEventListener("click", function(){
  reset();
});


let currentPlayer = Math.floor(Math.random() * 2);
    const setup = () =>{
        //setup of canvas
         
       // var gameboardDisplay = document.getElementById('gameBoard');
        canvas.width = 400;
        canvas.height = 400;

     
         w = canvas.width / 3;
         h = canvas.height / 3;
         r = w/4;
         ctx = canvas.getContext("2d");
        checkPlaces();
        //gameboardDisplay.appendChild(canvas);
        
    }
    function checkPlaces() {
      avaliablePlaces = [];
      avaliableSpots.inUse1 = false;
      avaliableSpots.inUse2 = false;
      avaliableSpots.inUse3 = false;
      avaliableSpots.inUse4 = false;
      avaliableSpots.inUse5 = false;
      avaliableSpots.inUse6 = false;
      avaliableSpots.inUse7 = false;
      avaliableSpots.inUse8 = false;
      avaliableSpots.inUse9 = false;
      noSpots = false;
      
    
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            avaliablePlaces.push([i, j]);
        }
      }
    }
    const draw = () => {

        ctx.beginPath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //draw the game grdi lines

        //first vertical
        ctx.moveTo(w,0);
        ctx.lineTo(w,400);
        ctx.stroke();
        //second vertical
        ctx.moveTo(w * 2,0);
        ctx.lineTo(w * 2,400);
        ctx.stroke();

        //first horizontal
        ctx.moveTo(0,h);
        ctx.lineTo(400,h);
        ctx.stroke();
        //second horizontal
        ctx.moveTo(0,h * 2);
        ctx.lineTo(400,h * 2);
        ctx.stroke();

    }
    const drawMarker = (i,j) => {

                
                let x = w * j + w / 2;
                let y = h * i + h / 2;
                let spot = gameboard[i][j];

                if (spot == players[0].marker){
                 //draw circle
                ctx.beginPath();
                ctx.arc(x,y,40,0,2 * r);
                ctx.stroke();
                }else if(spot == players[1].marker){
                 // draw x
                ctx.moveTo(x - r,y - r);
                ctx.lineTo(x + r,y + r);
                ctx.stroke();
                ctx.moveTo(x + r,y - r);
                ctx.lineTo(x - r,y + r);
                ctx.stroke();
                }
               checkPlayer(checkwiner());
    }
    function equals3(a,b,c)  {
        
             return a == b && b == c && a != '';
          
    }
    function checkwiner() {
        let winner = null;

        // horizontal
        for (let i = 0; i < 3; i++) {
          if (equals3(gameboard[i][0], gameboard[i][1], gameboard[i][2])) {
            drawLine(i,0,i,2);
              winnerResult = true;
            return winner = gameboard[i][0];
           
          }
        }   
        // Vertical
        for (let i = 0; i < 3; i++) {
          if (equals3(gameboard[0][i], gameboard[1][i], gameboard[2][i])) {
            winnerResult = true;
            drawLine(0,i,2,i);
            return winner = gameboard[0][i];
          }
        }
        // Diagonal
        if (equals3(gameboard[0][0], gameboard[1][1], gameboard[2][2])) {
          winnerResult = true;
          drawLine(0,0,2,2);
          return winner = gameboard[0][0];
        }
        if (equals3(gameboard[2][0], gameboard[1][1], gameboard[0][2])) {
          winnerResult = true;
          drawLine(2,0,0,2);
         return winner = gameboard[2][0]; 
        }
        if (winner == null && avaliableSpots.inUse1 == true
                            && avaliableSpots.inUse2 == true
                            && avaliableSpots.inUse3 == true
                            && avaliableSpots.inUse4 == true
                            && avaliableSpots.inUse5 == true
                            && avaliableSpots.inUse6 == true
                            && avaliableSpots.inUse7 == true
                            && avaliableSpots.inUse8 == true
                            && avaliableSpots.inUse9 == true) {
                              noSpots = true;
          winnerResult = true;
         
          return winner;
       }  
    }
    const nextTurn = (i,j) => {
      if(winnerResult == true){console.log("luz");}else{
      if(!i && !j && turnAi == true){ 
        let free;
        
        do{
          let index = Math.floor(Math.random() * avaliablePlaces.length);
          let spot = avaliablePlaces.splice(index, 1)[0];
           free = false;
          i  = spot[0];
          j = spot[1];
          if(gameboard[i][j] == ""){
            var temp = [i,j];

            switch(temp.join(",")){
              case "0,0":avaliableSpots.inUse1 = true;break;
              case "0,1":avaliableSpots.inUse2 = true;break;
              case "0,2":avaliableSpots.inUse3 = true;break;
              case "1,0":avaliableSpots.inUse4 = true;break;
              case "1,1":avaliableSpots.inUse5 = true;break;
              case "1,2":avaliableSpots.inUse6 = true;break;
              case "2,0":avaliableSpots.inUse7 = true;break;
              case "2,1":avaliableSpots.inUse8 = true;break;
              case "2,2":avaliableSpots.inUse9 = true;

            }
            gameboard[i][j] = players[currentPlayer].marker;
            
            currentPlayer = (currentPlayer + 1) % players.length;
            free = true;
            drawMarker(i,j);

            turnAi = false;
          }else{
            console.log("next spot");
            

          }
        }while(free == false);
      }else{//player
      
        if(gameboard[i][j] == ""){
            gameboard[i][j] = players[currentPlayer].marker;
           
            currentPlayer = (currentPlayer + 1) % players.length;
            
            drawMarker(i,j);
            if(winnerResult == true){
              currentPlayer = (currentPlayer + 1) % players.length;
            }
            turnAi = true;
            if (vsPC == true && winnerResult == false){
              nextTurn();
            }
        }

      }
    }

        }
    
    const player = (name,marker) => {
        const player = {name: name,score:0,marker:marker,ai:false}
        return player;
    }
    function drawLine(x,y,z,t) { 

      //horonizal
      if(x == 0 && y == 0 && z == 0 && t == 2){
        ctx.moveTo(0,h/2);
        ctx.lineTo(400,h/2);
        ctx.stroke();
      }else if(x == 1 && y == 0 && z == 1 && t == 2){ //horonizal 2 drawLine(i,0,i,2);
        ctx.moveTo(0,200);
        ctx.lineTo(400,200);
        ctx.stroke();
      }else if(x == 2 && y == 0 && z == 2 && t == 2){ //horonizal 3
        ctx.moveTo(0,400 - h/2);
        ctx.lineTo(400,400 -h/2);
        ctx.stroke();
    }
    else if(x == 0 && y == 0 && z == 2 && t == 0){ //verticaldrawLine(0,i,2,i);
      ctx.moveTo(w/2,0);
      ctx.lineTo(w/2,400);
      ctx.stroke();
    }else if(x == 0 && y == 1 && z == 2 && t == 1){ //verticaldrawLine(0,i,2,i); vert 2
      ctx.moveTo(200,0);
      ctx.lineTo(200,400);
      ctx.stroke();
    }
    else if(x == 0 && y == 2 && z == 2 && t == 2){ //verticaldrawLine(0,i,2,i); vert 3
      ctx.moveTo(400 - w/2,0);
      ctx.lineTo(400 - w/2,400);
      ctx.stroke();
    }    else if(x == 0 && y == 0 && z == 2 && t == 2){ //diagonial
      ctx.moveTo(0,0);
      ctx.lineTo(400,400);
      ctx.stroke();
    }else if(x == 2 && y == 0 && z == 0 && t == 2){ //diagonial2
      ctx.moveTo(0,400);
      ctx.lineTo(400,0);
      ctx.stroke();
    }

  }
    function checkPlayer(winner){

      
       
        if(winner == null && noSpots == true){
          table.innerHTML += "<br>tie<br>";
        }else{
          if(players[0].marker == winner){
            table.innerHTML += players[0].name + " win! Marker:" + winner + "<br>";
            players[0].score += 1;
            total1.innerHTML = players[0].score;
          }else if(players[1].marker == winner){
            table.innerHTML += players[1].name + " win! Marker1:" + winner + "<br>";
            players[1].score += 1;
            total2.innerHTML = players[1].score;
          }
        }
         
    }
    function reset(){
  
      for(let i = 0;i < 3 ;i++){
        for(let j = 0;j < 3;j++){
          gameboard[i][j] = "";
        }
      }
      winnerResult = false;
      
      // reset game screen
      checkPlaces();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
     draw();
    
  }
  function changeName(player){

    if(player == "player1"){

      var newName = prompt("Enter name: ");
      player1Name.innerHTML = newName;
      players[0].name = newName;
    }else{
      var newName = prompt("Enter name: ");
      player2Name.innerHTML = newName;
      players[1].name = newName;
    
    }
  }
  
  canvas.addEventListener("click", function(el){
    
    
    if(el.pageX <= 140 && el.pageY <= 140){ // gameboard[0][0] //first
      
      if(avaliableSpots.inUse1 == false){
        avaliableSpots.inUse1 = true;
        nextTurn(0,0);
      }
      
    
    }else if(el.pageX > 140 && el.pageY <= 140 && el.pageX <= 275){ // gameboard[0][1] //second
      
      if(avaliableSpots.inUse2 == false){
        avaliableSpots.inUse2 = true;
        nextTurn(0,1);
      }
     
    
    }else if(el.pageX > 275 && el.pageY <= 140 ){ // gameboard[0][2] //third    
      
      if(avaliableSpots.inUse3 == false){
        avaliableSpots.inUse3 = true;
        nextTurn(0,2);
      }
      
    
    }else if(el.pageX <= 140 && el.pageY > 140 && el.pageY <= 275 ){ // gameboard[1][0]  //fourth 
      if(avaliableSpots.inUse4 == false){
        avaliableSpots.inUse4 = true;
        nextTurn(1,0);
      }
      
    
    }else if(el.pageX > 140 && el.pageY > 140 && el.pageY <= 275 && el.pageX <= 275 ){ // gameboard[1][1] //fifth
      if(avaliableSpots.inUse5 == false){
        avaliableSpots.inUse5 = true;
        nextTurn(1,1);
      }
      
      
    }else if(el.pageX > 275 && el.pageY > 140 && el.pageY <= 275){ // gameboard[1][2]    //sixth
      if(avaliableSpots.inUse6 == false){
        avaliableSpots.inUse6 = true;
        nextTurn(1,2);
      }
     
     
      
    }else if(el.pageX <= 140 && el.pageY > 275 ){ // gameboard[2][0] //seventh
      if(avaliableSpots.inUse7 == false){
        avaliableSpots.inUse7 = true;
        nextTurn(2,0);
      }          
      
      
    }else if(el.pageX > 140 && el.pageY > 275 && el.pageX <= 275){ // gameboard[2][1] //eigth
      if(avaliableSpots.inUse8 == false){
        avaliableSpots.inUse8 = true;
        nextTurn(2,1);
      }
                 
      
     }else if(el.pageX > 275 && el.pageY > 275 ){ // gameboard[2][2]  //ninth            
      if(avaliableSpots.inUse9 == false){
        avaliableSpots.inUse9 = true;
        nextTurn(2,2);
      }

      
      
                    }
  },false)


    
    return {draw,player,nextTurn,setup}
}




var newGame = game();
let players = [];
players[0] = newGame.player("Dawid","o");
players[1] = newGame.player("Maria","x");
newGame.setup();
newGame.draw();


