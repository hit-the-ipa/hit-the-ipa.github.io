let bg;
let ziele = [];
let radius = 15;
let punkte = 0;
let hoch = 250;
let breit = 400;
let level = 1;

function preload() {
  let ipa = [592, 593, 594, 603, 601, 618, 630, 623, 650, 105, 101, 230, 655];
  for (let i = 0; i < ipa.length; i++) {
    console.log(ipa[i] + '\n');
    ziele.push(new Ziel(ipa[i]));
    ziele.push(new Ziel(ipa[i], true));
  }
}

function setup() {
  bg = loadImage('assets/hintergrund.png');
  createCanvas(breit, hoch);
}

function draw() {
  background(bg);
  textSize(12);
  stroke(color('#00ff00'));
  text('Level: ' + level + ', ' + 'Punkte: ' + punkte, 10, 20);
  textSize(32);
  noStroke();
  fill(color('white'));
  for (let i = 0; i < ziele.length; i++) {
    ziele[i].move();
    ziele[i].display();
  }
  noFill();
  stroke(237, 34, 93);
  line(mouseX - radius, mouseY, mouseX + radius, mouseY);
  line(mouseX, mouseY - radius, mouseX, mouseY + radius);
  circle(mouseX, mouseY, radius + 2);
}

function mousePressed() {
  let len = ziele.length;
  for (let i = 0; i < ziele.length; i++) {
    if (mouseX < ziele[i].x + 20 && mouseX > ziele[i].x &&
      mouseY < ziele[i].y && mouseY > ziele[i].y - 20) {
      punkte += 5;
      ziele[i].sound.play();
      ziele.splice(i, 1);
    }
  }
  if (len <= ziele.length) {
    punkte -= 2;
  }
  if (0 == ziele.length) {
    level += 1;
    preload();
  }
}

class Ziel {
  constructor(sym, lang) {
    if (lang) {
      this.sym = char(sym) + char(720);
    } else {
      this.sym = char(sym);
    }
    this.sound = loadSound('assets/' + sym + '_' + (lang ? 'lang' : 'kurz') + '.mp3');
    this.x = random(breit);
    this.y = random(40, hoch);
    this.speed = level * random(0.5, 1.5) * (random() < 0.5 ? -1 : 1);
  }

  display() {
    text(this.sym, this.x, this.y);
  }

  move() {
    if (this.x > 400) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = 400;
    } else {
      this.x += this.speed;
    }
  }
}