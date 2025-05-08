let sunHeight, pollution, humidity;
let clouds = [];

function setup() {
  createCanvas(600, 400);
  generateSunset();
}

function generateSunset() {
  sunHeight = random(0.1, 1);
  pollution = random(0, 1);
  humidity = random(0, 1);
  clouds = [];

  // Erstelle Wolken basierend auf Luftfeuchtigkeit
  let cloudCount = floor(lerp(1, 15, humidity));
  for (let i = 0; i < cloudCount; i++) {
    clouds.push({
      x: random(width),
      y: random(height * 0.05, height * 0.5),
      w: random(60, 150),
      h: random(30, 60),
      speed: random(0.1, 0.5),
      alpha: lerp(50, 180, humidity)
    });
  }
}

function draw() {
  drawSunset();
  updateClouds();
}

function drawSunset() {
  noStroke();

  // Hintergrund
  for (let y = 0; y < height; y++) {
    let t = y / height;

    let r = lerp(100, 255, t * pollution + 0.2);
    let g = lerp(50, 200, t * (1 - pollution));
    let b = lerp(100, 255 * (1 - humidity), t * (1 - sunHeight));

    fill(r, g, b);
    rect(0, y, width, 1);
  }

  // Wolken
  drawClouds();

  // Sonne
  let sunY = lerp(height * 0.3, height * 0.9, 1 - sunHeight);
  let sunR = 255;
  let sunG = lerp(150, 80, pollution + (1 - sunHeight));
  let sunB = lerp(0, 30, 1 - sunHeight);
  fill(color(sunR, sunG, sunB, 255));
  noStroke();
  ellipse(width / 2, sunY, 80, 80);

  // Text
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`☀️ Sonnenstand: ${sunHeight.toFixed(2)}
🌫️ Verschmutzung: ${pollution.toFixed(2)}
💧 Feuchtigkeit: ${humidity.toFixed(2)}
🖱️ Klicke für neuen Sonnenuntergang`, 10, 10);
}

function drawClouds() {
  for (let c of clouds) {
    fill(lerp(200, 255, 1 - humidity), c.alpha);
    noStroke();
    ellipse(c.x, c.y, c.w, c.h);
    ellipse(c.x - c.w * 0.4, c.y + 10, c.w * 0.6, c.h * 0.8);
    ellipse(c.x + c.w * 0.4, c.y + 5, c.w * 0.7, c.h * 0.6);
  }
}

function updateClouds() {
  for (let c of clouds) {
    c.x += c.speed;
    if (c.x - c.w > width) {
      c.x = -c.w; // Wieder von links erscheinen
    }
  }
}

function mousePressed() {
  generateSunset();
}
