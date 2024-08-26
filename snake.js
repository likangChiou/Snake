$(()=>{
    $('#gamePad').hide();
    $('#ti').show();
    $('#cheat').hide();
})
$('#strt').click(()=>{
    $('#ti').hide();
    $('#gamePad').show();
    $('#gi').hide();
})
$('#showCheat').click(()=>{
    $('#cheat').toggle();
})
var game = new Game($('#game'));
var front = game.getLayer('front');
game.setColor('black');
var main = front.createScene('main', 0, 0, 1200, 800);
//---------------------------
var head = main.createSprite("head", ['head.gif'], 600, 400, 16, 16);
//head.showHitBox(true)
var food = main.createSprite("food", ['food.gif'], 0, 0, 16, 16);
//head.createDefaultHitBox('rect');
head.createRectHitBox(0, 0, 7, 7);
food.createDefaultHitBox('rect');
food.x = Math.random() * 1100;
food.y = Math.random() * 750;
var tick = 0;
var bodies = [];
var score = 0;
var speed = 6;
var pen = new Pen();
function move(){
    if(bodies.length > 0){
        var lastBody = bodies.pop();
        lastBody.x = head.x;
        lastBody.y = head.y;
        bodies.unshift(lastBody);
    }
    head.stepForward(16);
    if (head.x < 0) {
        head.x += 1200;
    }
    if (head.x > 1200) {
        head.x -= 1200;
    }
    if (head.y < 0) {
        head.y += 800;
    }
    if (head.y > 800) {
        head.y -= 800;
    }
}
function checkEat(){
    if(head.touches(food)){
        food.x = Math.random() * 1200;
        food.y = Math.random() * 800;
        score++;
        var newBody = main.createSprite(`body${Date.now()}`, ['body.gif'], -10, -10, 16, 16);
        //newBody.createDefaultHitBox('rect');
        newBody.createRectHitBox(0, 0, 7, 7);
        //newBody.showHitBox(true);
        bodies.push(newBody);
        if (score % 15 === 0 && speed > 1) {
            speed -= 1;
        }
    }
}
function playercontrol() {
    if (Key.pressed('ArrowUp') && head.degree != 180) {
        head.degree = 0;
    }
    if (Key.pressed('ArrowDown') && head.degree !== 0) {
        head.degree = 180;
    }
    if (Key.pressed('ArrowRight') && head.degree != 270) {
        head.degree = 90;
    }
    if (Key.pressed('ArrowLeft') && head.degree != 90) {
        head.degree = 270;
    }

}
function checkGameOver() {
    if (head.touchSprites(bodies)) {
        pen.drawText(front, "GAMEOVER", 600, 400, '#45f78f', "60px sans-serif");
        game.stop();
    }
}
game.forever(()=>{
    tick++;
    pen.drawText(front, "速度" + speed, 10, 30, 'white', '40px serif');
    pen.drawText(front, "分數" + score, 10, 70, 'white', '40px serif');
    if (tick % speed === 0) {
        checkEat();
        playercontrol();
        move();
        checkGameOver();
    }
    if(Key.pressed('c')){
        pen.drawLine(front, 0, head.y, 1200, head.y, 2, 'white');
        pen.drawLine(front, head.x, 0, head.x, 800, 2, 'white');
    }
})