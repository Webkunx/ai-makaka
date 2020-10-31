import { Position } from "./position";

export interface Box extends Position {}
export class BoxImplementation extends Position implements Box {
  constructor(limitX, limitY) {
    super(limitX, limitY);
    this.generateRandomPosition();
  }
}
