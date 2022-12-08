import Header from "./headerText.js";

export default class Button extends Header {
  constructor(header, x, y, size) {
    super(header, x, y, size);
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(229, 90, 228);
    textFont("impact");
    textSize(this.size);
    text(this.header, 0, 0);
    pop();
  }
}
