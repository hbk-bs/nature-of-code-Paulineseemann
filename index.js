let sunHeight, pollution, humidity;
let clouds = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSL, 360, 100, 100, 255);
  noStroke();
  generateSunset();
  drawSunset(); // Nur einmal zeichnen
}

function generateSunset() {
  sunHeight = random(0.1, 1);
  pollution = random(0, 1);
  humidity = random(0, 1);
  clouds = [];

  let cloudCount = floor(lerp(5, 20, humidity));
  for (let i = 0; i < cloudCount; i++) {
    let cloud = {
      x: random(width),
      y: random(height * 0.05, height * 0.5),
      w: random(80, 160),
      h: random(40, 80),
      alpha: lerp(10, 40, humidity),
      blobs: []
    };

    for (let j = 0; j < 80; j++) {
      cloud.blobs.push({
        offsetX: random(-cloud.w / 2, cloud.w / 2),
        offsetY: random(-cloud.h / 2, cloud.h / 2),
        size: random(cloud.w * 0.4, cloud.w * 0.7)
      });
    }

    clouds.push(cloud);
  }
}

function drawSunset() {
  // Hintergrund
  for (let y = 0; y < height; y++) {
    let t = y / height;
    let hue = lerp(10, 45, t); // 10° = warmes Orange-Rot, 45° = Gelb-Orange
    let saturation = lerp(70, 100, 1 - pollution); // hohe Sättigung, weniger Pollution
    let lightness = lerp(15, 80, t * (1 - humidity) * sunHeight); // Heller nach unten hin
    fill(hue, saturation, lightness);
    rect(0, y, width, 1);
  }
  

  drawClouds();
  drawSun();
}

function drawSun() {
  let sunY = lerp(height * 0.3, height * 0.9, 1 - sunHeight);
  let sunHue = 50;
  let sunSat = lerp(80, 40, pollution);
  let sunLight = lerp(90, 60, 1 - sunHeight);

  for (let r = 200; r > 80; r -= 10) {
    let alpha = map(r, 200, 80, 10, 60);
    fill(sunHue, sunSat, sunLight, alpha);
    ellipse(width / 2, sunY, r, r);
  }

  fill(sunHue, sunSat, sunLight, 255);
  ellipse(width / 2, sunY, 80, 80);
}

function drawClouds() {
  for (let c of clouds) {
    let hue = 0;
    let sat = 0;
    let light = lerp(70, 90, 1 - humidity);
    fill(hue, sat, light, c.alpha);

    for (let b of c.blobs) {
      ellipse(c.x + b.offsetX, c.y + b.offsetY, b.size, b.size * 0.6);
    }
  }
}

function draw() {
  // leer
}

function mousePressed() {
  generateSunset();
  drawSunset();
}
function drawSun() {
  let sunY = lerp(height * 0.3, height * 0.9, 1 - sunHeight);

  // Farbe der Sonne dynamisch basierend auf Parametern
  let sunHue = lerp(10, 50, sunHeight); // tiefere Sonne = röter, höhere = gelber
  sunHue = lerp(sunHue, 5, pollution); // bei hoher Verschmutzung mehr Rotstich
  let sunSat = lerp(90, 40, pollution); // mehr Pollution = weniger Sättigung
  let sunLight = lerp(95, 60, 1 - sunHeight); // höher = heller

  for (let r = 200; r > 80; r -= 10) {
    let alpha = map(r, 200, 80, 10, 60);
    fill(sunHue, sunSat, sunLight, alpha);
    ellipse(width / 2, sunY, r, r);
  }

  fill(sunHue, sunSat, sunLight, 255);
  ellipse(width / 2, sunY, 80, 80);
}
