let symmetry = 9; // 对称轴的数量
let angle;
let brushColor=0;
let lastColorChangeTime = 0;
let colorChangeInterval = 1000; // 1秒 (1000毫秒)

let noise;
let filter;

function setup() {
  createCanvas(1580, 900);
  angle = TWO_PI / symmetry;
  colorMode(HSB);
  background(0);
  
  // 初始化 p5.js 中的 WhiteNoise 和 BandPass
  noise = new p5.Noise('white');
  filter = new p5.BandPass();

  noise.start();
  noise.amp(0.5); // 设置噪音音量
  filter.process(noise);
}

function draw() {
  // 映射水平鼠标位置到频率范围 (20Hz - 10000Hz)
  let frequency = map(mouseX, 0, width, 20, 10000);
  // 映射垂直鼠标位置到带宽范围 (1000 - 100)
  let bandwidth = map(mouseY, 0, height, 1000, 100);

  filter.freq(frequency);
  filter.res(bandwidth); // p5.js 使用 res() 设置带宽

  translate(width / 2, height / 2); // 将画布原点移到中心

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;

  for (let i = 0; i < symmetry; i++) {
    rotate(angle);
    stroke(brushColor);
    strokeWeight(5);
    line(mx, my, pmx, pmy);  // 在当前对称轴绘制线条
    push();
    scale(1, -1);            // 创建镜像对称
    line(mx, my, pmx, pmy);  // 在镜像对称轴上绘制线条
    pop();
  }

  // 定时更改笔刷颜色
  if (millis() - lastColorChangeTime > colorChangeInterval) {
    brushColor = color(random(45), random(255), random(200, 255),random(50, 100));
    
    lastColorChangeTime = millis(); // 记录当前时间
  }
}

// 清除画布
function keyPressed() {
  if (key === ' ') {
    background(0); // 按下空格键清除画布
  }
}

