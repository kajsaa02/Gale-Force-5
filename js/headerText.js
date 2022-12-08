export default class Header {
  constructor(header, x, y, size) {
    this.header = header;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(46, 22, 88);
    textFont("impact");
    textSize(this.size);
    text(this.header, 0, 0);
    pop();
  }
}
