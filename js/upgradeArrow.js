import UpgradeBar from "./upgradeBar.js";

export default class UpgradeArrow extends UpgradeBar {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(229, 90, 228);
    rect(-5, 0, 5, 15);
    rect(-7.5, 2.5, 10, 5);
    rect(-10, 5, 15, 2.5);

    pop();
  }
}
