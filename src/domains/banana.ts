import { Position } from "./position";

export interface Banana extends Position {}
export class BananaImplementation extends Position implements Banana {
  constructor(limitX, limitY) {
    super(limitX, limitY);
    this.generateRandomPosition();
  }
}
