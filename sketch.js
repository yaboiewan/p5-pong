var paddle_x, paddle_y;
var paddle_w, paddle_h;
var paddle_step;
var ball_x, ball_y;
var ball_r;
var ball_x_step, ball_y_step;
var ball_x2, ball_y2;
var ball_r2;
var ball_x_step2, ball_y_step2;
var score;

function setup() {
    createCanvas(600, 300);
    paddle_h = 16;
    paddle_w = 3 * paddle_h;
    paddle_x = width / 2;
    paddle_y = height - paddle_h;
    paddle_step = 0;
    ball_r = 18;
    ball_r2 = 16;
    reset();
    score = 0;
}

function draw() {
    background(99, 50, 200);
    // move paddle
    //paddle_x += (mouseX - paddle_x) * .1;
    paddle_x = paddle_x + paddle_step;
    // is the ball hitting the right or left wall?
    if (ball_x - ball_r < 0 || ball_x + ball_r > width) {
        ball_x_step = -ball_x_step;
    }
    // is the second ball hitting the right or left wall?
    if (ball_x2 - ball_r2 < 0 || ball_x2 + ball_r2 > width) {
        ball_x_step2 = -ball_y_step2;
    }
    // hitting the top?
    if (ball_y - ball_r < 0) {
        ball_y_step = -ball_y_step;
    }
    // second ball hitting the top?
    if (ball_y2 - ball_r2 < 0) {
        ball_y_step2 = -ball_y_step2;
    }
    //second ball hitting the paddle?
    if (ball_y2 + ball_r2 > paddle_y) {
        if (ball_x2 >= paddle_x2 && ball_x2 <= paddle_x + paddle_w) {
            ball_y_step2 = -ball_y_step2;
            ball_y2 = paddle_y - ball_r2;
        }
    }
    else if (ball_y2 + ball_r2 > paddle_y) {
        reset();
    }
    // move 2nd ball 
    ball_x2 = ball_x2 + ball_x_step2;
    ball_y2 = ball_y2 + ball_y_step2;
    // move ball by ball_x_step and ball_y_step
    ball_x = ball_x + ball_x_step;
    ball_y = ball_y + ball_y_step;
    // draw 2nd ball
    noStroke();
    fill(196, 0, 0);
    rect(ball_x2, ball_y2, ball_r2, ball_r2);
    // hitting the paddle?
    if (ball_y + ball_r > paddle_y) {
        if (ball_x >= paddle_x && ball_x <= paddle_x + paddle_w) {
            ball_y_step = -ball_y_step;
            ball_y = paddle_y - ball_r;
            score = score + 1;
        }
    }
    else if (ball_y + ball_r > paddle_y) {
        reset();
    }
    //draw ball
    noStroke();
    fill(84, 2, 50);
    rect(ball_x, ball_y, ball_r, ball_r);
    // draw paddle
    stroke(24);
    fill(64);
    rect(paddle_x, paddle_y, paddle_w, paddle_h);
}

function reset() {
    ball_x = random(ball_r, width - ball_r);
    ball_y = random(ball_r, height / 2);
    ball_x_step = random(-3, 3);
    ball_y_step = random(1, 3);
    ball_x2 = random(ball_r2, width - ball_r2);
    ball_y2 = random(ball_r2, height / 2);
    ball_x_step2 = random(-3, 3);
    ball_y_step = random(1, 3);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        paddle_step = -6;
    }
    else if (keyCode == RIGHT_ARROW) {
        paddle_step = 6;
    }
    else if (key == ' ') {
        reset();
    }
}

function keyReleased() {
    paddle_step = 0;
}
