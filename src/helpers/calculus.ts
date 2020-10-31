export class Calculus {
  static calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
  static getValuableCoords(
    idx: number,
    x: number,
    y: number
  ): { x: number; y: number } {
    switch (idx) {
      case 0:
        x += 1;
        break;
      case 1:
        x -= 1;
        break;
      case 2:
        y += 1;
        break;
      case 3:
        y -= 1;
        break;
    }
    return { x, y };
  }
}
