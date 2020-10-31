import { Random } from "../helpers/random";

export class Position {
  readonly limitX: number;
  readonly limitY: number;
  private x: number;
  private y: number;
  constructor(limitX, limitY) {
    this.limitX = limitX;
    this.limitY = limitY;
  }
  protected generateRandomPosition() {
    this.x = Random.generateRandomNumber(this.limitX);
    this.y = Random.generateRandomNumber(this.limitY);
  }
  getCoords(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
  protected setCoords(x: number, y: number): void {
    if (x >= this.limitX && y >= this.limitY)
      throw new Error("Cant go outside limits");
    this.x = x;
    this.y = y;
  }
}
