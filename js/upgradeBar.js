export default class UpgradeBar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(162, 64, 161);
    rect(0, 0, 5, 35);
    rect(75, 0, 5, 35);
    rect(150, 0, 5, 35);
    rect(225, 0, 5, 35);
    rect(300, 0, 5, 35);
    rect(0, 0, 300, 5);
    rect(0, 30, 300, 5);

    pop();
  }
}
