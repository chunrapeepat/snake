let COLS = 26, ROWS = 26
let EMPTY = 0, SNAKE = 1, FRUIT = 2

var grid = {
    width: null,
    height: null,
    _grid: null,

    init: function(d, c, r) {
        this.width = c
        this.height = r
        this._grid = [...new Array(c)].map(x => [...new Array(r)].map(x => d))
    },

    set: function(val, x, y) {
        this._grid[x][y] = val
    },

    get: function(x, y) {
        return this._grid[x][y]
    },
}

var snake = {
    direction: null,
    last: null,
    _queue: null,

    init: function(d, x, y) {
        this.direction = d

        this._queue = []
        this.insert(x, y)
    },

    insert: function(x, y) {
        this._queue.unshift({ x, y })
        this.last = this._queue[0]
    },

    remove: function() {
        this._queue.pop()
    },
}

function setFood() {
    let empty = []
    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            if (grid.get(x, y) === EMPTY) empty.push({ x, y })
        }
    }
    let randpos = empty[Math.floor(Math.random() * empty.length)]
    grid.set(FRUIT, randpos.x, randpos.y)
}

function main() {

}

function init() {

}

function loop() {

}

function update() {

}

function draw() {

}

main();
