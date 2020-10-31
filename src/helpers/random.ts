export class Random {
  static generateRandomNumber(max): number {
    return Math.floor(Math.random() * max);
  }
}
