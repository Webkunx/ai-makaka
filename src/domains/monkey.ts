import { Banana } from "./banana";
import { Box } from "./box";
import { Position } from "./position";
import { Movable } from "../abstract/movable";

export interface Monkey extends Movable, Position {
  height: number;
  setBanana(banana: Banana): void;
  getBanana(): Banana;
  setBox(box: Box): void;
  getBox(): Box;
  climbOnBox(): Box;
  jumpFromBox(): void;
}
export class MonkeyImplementation extends Position implements Monkey {
  private banana: Banana;
  private box: Box;
  height: number;

  constructor(limitX, limitY) {
    super(limitX, limitY);
    this.generateRandomPosition();
    this.height = 1;
  }
  move(x, y): void {
    this.setCoords(x, y);
  }

  getBanana(): Banana {
    return this.banana;
  }

  getBox(): Box {
    return this.box;
  }

  setBanana(banana: Banana): void {
    this.banana = banana;
  }

  setBox(box: Box): void {
    this.box = box;
  }
  climbOnBox(): Box {
    if (!this.box) throw new Error("Can't climb w/o a box");
    if (this.height != 1) throw new Error("Can't climb this height");
    this.height = 2;
    const box = this.box;
    delete this.box;
    return box;
  }
  jumpFromBox(): void {
    if (this.height != 2) throw new Error("Can't jump w/o standing on box");
    this.height = 1;
  }
}
