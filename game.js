let COLS = 26, ROWS = 26
let EMPTY = 0, SNAKE = 1, FRUIT = 2
let LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3
let KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40

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

let canvas, ctx, keystate = {}, frames

function main() {
    canvas = document.createElement("canvas")
    canvas.width = COLS * 20
    canvas.height = ROWS * 20
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    frames = 0

    document.addEventListener("keydown", function(e) {
        for (var i = 0; i < Object.keys(keystate).length; i++) {
            keystate[Object.keys(keystate)[i]] = false
        }
        keystate[e.keyCode] = true
    })

    init()
    loop()
}

function init() {
    grid.init(EMPTY, COLS, ROWS)
    let startPosition = {x: Math.floor(COLS / 2), y: ROWS - 1}
    snake.init(UP, startPosition.x, startPosition.y)
    grid.set(SNAKE, startPosition.x, startPosition.y)

    setFood();
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop, canvas)
}

function update() {
    frames++

    console.log(keystate)

    if (keystate[KEY_LEFT]) snake.direction = LEFT
    if (keystate[KEY_UP]) snake.direction = UP
    if (keystate[KEY_RIGHT]) snake.direction = RIGHT
    if (keystate[KEY_DOWN]) snake.direction = DOWN

    if (frames % 5 === 0) {
        let nx = snake.last.x
        let ny = snake.last.y

        switch (snake.direction) {
            case LEFT:
                nx--
                break;
            case UP:
                ny--
                break;
            case RIGHT:
                nx++
                break;
            case DOWN:
                ny++
                break;
        }

        if (0 > nx || nx > grid.width - 1 || 0 > ny || ny > grid.height - 1) {
            return init()
        }

        let tail = snake.remove()
        grid.set(EMPTY, snake.last.x, snake.last.y)
        grid.set(SNAKE, nx, ny)

        snake.insert(nx, ny)
    }
}

function draw() {
    let tw = canvas.width / grid.width
    let th = canvas.height / grid.height

    for (var x = 0; x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            switch (grid.get(x, y)) {
                case EMPTY:
                    ctx.fillStyle = "#fff"
                    break;
                case SNAKE:
                    ctx.fillStyle = "#0ff"
                    break;
                case FRUIT:
                    ctx.fillStyle = "#f00"
                    break;
            }
            ctx.fillRect(x * tw, y * th, tw, th)
        }
    }
}

main();
