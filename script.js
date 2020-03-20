
var gameboard = [   // gameboard 
    ['','',''],     //  [0][0],[0][1],[0][2]
    ['','',''],     //  [1][0],[1][1],[1][2]
    ['','','']      //  [2][0],[2][0],[2][0]
];

const game = () => {
var w,h,r,canvas,ctx;
let avaliablePlaces = [];

let currentPlayer = Math.floor(Math.random() * 2);
    const setup = () =>{
        //setup of canvas
         canvas = document.createElement('canvas');
        var gameboardDisplay = document.getElementById('gameBoard');
        canvas.width = 400;
        canvas.height = 400;
         w = canvas.width / 3;
         h = canvas.height / 3;
         r = w/4;
         ctx = canvas.getContext("2d");
        
        gameboardDisplay.appendChild(canvas);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                avaliablePlaces.push([i, j]);
            }
          }
    }
    const draw = () => {

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
               
    }
    function equals3(a,b,c)  {
        
             return a == b && b == c && a != '';
          
     }
    function checkwiner() {
        let winner = null;

        // horizontal
        for (let i = 0; i < 3; i++) {
          if (equals3(gameboard[i][0], gameboard[i][1], gameboard[i][2])) {
           return winner = gameboard[i][0];
          }
        }
      
        // Vertical
        for (let i = 0; i < 3; i++) {
          if (equals3(gameboard[0][i], gameboard[1][i], gameboard[2][i])) {
            return winner = gameboard[0][i];
          }
        }
      
        // Diagonal
        if (equals3(gameboard[0][0], gameboard[1][1], gameboard[2][2])) {
          return winner = gameboard[0][0];
        }
        if (equals3(gameboard[2][0], gameboard[1][1], gameboard[0][2])) {
         return winner = gameboard[2][0]; 
        }
      
        if (winner == null && avaliablePlaces.length == 0) {
          return console.log('tie');
       } 
    
    }
    const nextTurn = () => {
        let index = Math.floor(Math.random() * avaliablePlaces.length);
        let spot = avaliablePlaces.splice(index, 1)[0];
        let i  = spot[0];
        let j = spot[1];
        gameboard[i][j] = players[currentPlayer].marker;
        currentPlayer = (currentPlayer + 1) % players.length;
        drawMarker(i,j);
   
    }
    const player = (name,marker) => {
        const player = {name: name,score:0,marker:marker}
        return player;
    }
    return {draw,player,nextTurn,setup}
}




var newGame = game();
let players = [];
players[0] = newGame.player("Dawid","O");
players[1] = newGame.player("Dawid","x");
newGame.setup();
newGame.draw();
newGame.nextTurn();
newGame.nextTurn();
newGame.nextTurn();

newGame.nextTurn();
newGame.nextTurn();
newGame.nextTurn();

newGame.nextTurn();
newGame.nextTurn();
newGame.nextTurn();




