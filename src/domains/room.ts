import { Banana, BananaImplementation } from "./banana";
import { Box, BoxImplementation } from "./box";
import { Monkey, MonkeyImplementation } from "./monkey";
import { Calculus } from "../helpers/calculus";
import { Position } from "./position";

export interface Room {
  sizeX: number;
  sizeY: number;
  init(): void;
}

export class RoomImplementation implements Room {
  readonly sizeX: number;
  readonly sizeY: number;
  private _banana: Banana;
  private _box: Box;
  private monkey: Monkey;

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  get box(): Box {
    return this._box;
  }

  set box(value: Box) {
    this._box = value;
  }
  get banana(): Banana {
    return this._banana;
  }

  set banana(value: Banana) {
    this._banana = value;
  }
  init(): void {
    this._box = new BoxImplementation(this.sizeX, this.sizeY);
    this.monkey = new MonkeyImplementation(this.sizeX, this.sizeY);
    this._banana = new BananaImplementation(this.sizeX, this.sizeY);
    const { x: monkeyX, y: monkeyY } = this.monkey.getCoords();
    const { x: boxX, y: boxY } = this._box.getCoords();
    const { x: bananaX, y: bananaY } = this._banana.getCoords();
  }
  giveMonkeyABanana() {
    const { x: monkeyX, y: monkeyY } = this.monkey.getCoords();
    const { x: bananaX, y: bananaY } = this._banana.getCoords();
    if (bananaX !== monkeyX || monkeyY !== bananaY) {
      throw new Error("Monkey cant grab banana on this coords");
    }
    this.monkey.setBanana(this._banana);
    delete this._banana;
  }
  giveMonkeyABox() {
    const { x: monkeyX, y: monkeyY } = this.monkey.getCoords();
    const { x: boxX, y: boxY } = this._box.getCoords();
    if (boxX !== monkeyX || monkeyY !== boxY) {
      throw new Error("Monkey cant grab box on this coords");
    }
    this.monkey.setBox(this._box);
    delete this._box;
  }
  letMonkeyClimb() {
    this._box = this.monkey.climbOnBox();
  }
  letMonkeyJumpFromBox() {
    this.monkey.jumpFromBox();
  }
  letMonkeyFind(position: Position) {
    console.log("Box COORDS X Y: ", JSON.stringify(position.getCoords()));

    const { x: monkeyX, y: monkeyY } = this.monkey.getCoords();
    const { x: positionX, y: positionY } = position.getCoords();
    let distanceToPosition = Calculus.calculateDistance(
      monkeyX,
      monkeyY,
      positionX,
      positionY
    );

    if (distanceToPosition === 0) {
      console.log("ALREADY FOUND A BOX");
      return;
    }
    while (true) {
      const { x: monkeyX, y: monkeyY } = this.monkey.getCoords();
      const { x: positionX, y: positionY } = position.getCoords();
      console.log("MONKEY COORDS X Y: ", monkeyX, monkeyY);
      const newDistances = [
        Calculus.calculateDistance(monkeyX + 1, monkeyY, positionX, positionY),
        Calculus.calculateDistance(monkeyX - 1, monkeyY, positionX, positionY),
        Calculus.calculateDistance(monkeyX, monkeyY + 1, positionX, positionY),
        Calculus.calculateDistance(monkeyX, monkeyY - 1, positionX, positionY),
      ];
      for (const idx in newDistances) {
        const newDistance = newDistances[idx];
        if (newDistance <= distanceToPosition) {
          const { x, y } = Calculus.getValuableCoords(+idx, monkeyX, monkeyY);
          this.monkey.move(x, y);
          distanceToPosition = newDistance;
          if (distanceToPosition === 0) {
            return;
          }
          break;
        }
      }
    }
  }
}
