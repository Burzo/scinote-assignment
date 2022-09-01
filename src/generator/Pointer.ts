export class Pointer {
  x: number
  y: number

  constructor(x?: number, y?: number) {
    this.x = x ?? 0
    this.y = y ?? 0
  }

  addX() {
    this.x++
  }

  addY() {
    this.y++
  }

  setY(y: number) {
    this.y = y
  }

  setX(x: number) {
    this.x = x
  }

  set(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get() {
    return [this.x, this.y]
  }
}
