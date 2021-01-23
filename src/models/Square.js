export class Square {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.mine = false
    }

    plantMine() {
        this.mine = true
    }

    hasMine() {
        return this.mine
    }
}