export default class Frame {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(162, 64, 161);
    rect(0, -10, this.width, 10);
    rect(-10, 0, 10, this.height);

    fill(116, 37, 115);
    rect(0, this.height, this.width, 10);
    rect(this.width, 0, 10, this.height);

    pop();
  }
}
