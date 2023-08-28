//Made by StarshipCode

//Pause game
let pause = true
//Gui element
const gui = document.getElementById("gui")
const static = document.getElementById("static")
//Audio elements
const audio = document.getElementById("audio")
const audio2 = document.getElementById("audio2")
const audio3 = document.getElementById("audio3")
//Setting audios configurations
audio.muted = true
audio.src = "music-box.mp3"
audio.muted = false

//Canvas and graphic context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d", { alpha: true })

//Size of the tiles
const tileSize = 64
//Field of view
const fov = 60
//Wall width
const wallSize = tileSize * 10
//Colors constants
const SKY_COLOR = "#373"
const FLOOR_COLOR = "#464a4d"

//Speeds
let speed = 4
let angleSpeed = 5

let flashlight = true
//Render the blocks or map view
let render = true
//Text wich shows when pointing something
let showTakeNote = ""
//Block wich player is pointing
let blockSpotted = { x: 0, y: 0 }
//Notes
let notes = 0
//Map array
const map = [
    [1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 4, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [4, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 4],
    [1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 4, 1, 0, 1, 4, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 4, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1],
]
//Total number of notes in map
let totalNotes = 0
for (let i = 0; i < map.length; i++) {
    for (let x = 0; x < map[i].length; x++) {
        if (map[i][x] == 4)
            totalNotes++
    }
}
//Resize canvas
canvas.width = 700
canvas.height = 700

//Textures
let wallTexture = new Image()
wallTexture.src = "./textures/wall.png"

let handTexture = new Image()
handTexture.src = "textures/hands.png"

let skyTexture = new Image()
skyTexture.src = "textures/sky.jpg"

let skyX = 0

//Enemies
const enemy = { x: canvas.width / 2, y: canvas.height / 2, angle: 0 }
const enemy2 = { x: canvas.width / 2, y: canvas.height / 2, angle: 0 }
//Draw the map only when redering == false
function drawMap() {
    ctx.fillStyle = "#333"
    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] == 1)
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
        }
    }
}
//keeping the angle between 0 and 360
function normalizeAngle(angle) {
    if (angle > 360)
        return angle % 360
    else if (angle < 0)
        return 360 + angle

    return angle
}
//Convert to radians
function toRadians(angle) {
    return Math.PI / 180 * angle
}
//Calculate distance between two points
function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

//Player
function Player() {
    //Player coords
    this.x = tileSize * 2.4
    this.y = tileSize * 2.5

    //Moves
    this.down = false
    this.up = false
    this.right = false
    this.left = false
    //Player angle
    this.angle = 270

    this.rays = []
    //Start
    this.start = () => {
        let angle = toRadians(fov) / canvas.width
        for (let i = 0; i < canvas.width; i++) {
            this.rays.push(new Ray(this.angle + i * angle, this.x, this.y, i))
        }
    }

    //Draw
    this.draw = () => {
        //Moves
        if (this.up) {
            let x = Math.floor((this.x + Math.cos(toRadians(this.angle)) * 2) / tileSize)
            let y = Math.floor((this.y + Math.sin(toRadians(this.angle)) * 2) / tileSize)
            if (map[y][x] == 0) {
                this.y += Math.sin(toRadians(this.angle)) * 2
                this.x += Math.cos(toRadians(this.angle)) * 2
            }
        }
        else if (this.down) {
            let x = Math.floor((this.x - Math.cos(toRadians(this.angle)) * 2) / tileSize)
            let y = Math.floor((this.y - Math.sin(toRadians(this.angle)) * 2) / tileSize)
            if (map[y][x] == 0) {
                this.y -= Math.sin(toRadians(this.angle)) * 2
                this.x -= Math.cos(toRadians(this.angle)) * 2
            }
        }
        //Rotations
        if (this.left) {
            this.angle -= angleSpeed
            if (skyX - 1 >= 0) {
                skyX -= 43
            }
            else {
                skyX = 1400
            }
        }
        else if (this.right) {
            this.angle += angleSpeed
            if (skyX + 1 <= 1400) {
                skyX += 43
            }
            else {
                skyX = 0
            }
        }
        if (!render) {
            //Draw pointer
            ctx.beginPath()
            ctx.strokeStyle = "red"
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + Math.cos(toRadians(this.angle)) * 17, this.y + Math.sin(toRadians(this.angle)) * 17)
            ctx.stroke()
            ctx.closePath()
        }
        //Normalize angle
        this.angle = normalizeAngle(this.angle)
        //If render is false, just draw the player
        if (!render) {
            //Draw player
            ctx.beginPath()
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        }

        this.angle = normalizeAngle(this.angle)
        //Making a cone of rays
        let angle = fov / canvas.width
        let x = -fov / 2
        for (let i = 0; i < canvas.width; i++) {
            this.rays[i].angle = toRadians(normalizeAngle(this.angle + x))
            x += angle
            this.rays[i].x = this.x
            this.rays[i].y = this.y
            this.rays[i].draw()
        }
        //Drawing hands
        let size = 4 //Zoom of texture
        ctx.drawImage(handTexture, 0, 0, handTexture.width, handTexture.height, canvas.width / 2 - 64 / 2 * size + 150, canvas.height - 64 * size, 64 * size, 64 * size)
    }
}
//Rays
function Ray(angle, x, y, i) {
    //Coords of the player
    this.x = x
    this.y = y
    //Id of ray
    this.i = i
    //Hit of the ray
    this.wallHitX = 0
    this.wallHitY = 0

    this.wallHitHorizontalX = 0
    this.wallHitHorizontalY = 0

    this.wallHitVerticalY = 0
    this.wallHitVerticalX = 0
    //Pixel to draw from texture
    this.pixel = 0
    //Kind of texture to draw
    this.textureId = 0
    //Angle of the ray
    this.angle = toRadians(angle)

    this.draw = () => {

        this.stepX = 0
        this.stepY = 0

        let tempX = Math.floor(this.x / tileSize)
        let tempY = Math.floor(this.y / tileSize)
        this.tempX = tempX
        this.right = false
        this.down = false

        //Horizontal bounce
        if (this.angle < toRadians(90) || this.angle > toRadians(270)) {
            tempX += 1
            this.right = true
        }
        //Vertical bounce
        if (this.angle < Math.PI) {
            tempY += 1
            this.down = true
        }

        this.interceptX = 0
        this.interceptY = 0
        this.stepX = 0
        this.stepY = 0

        //Horizontal Bounce
        let horizontalBounce = false

        this.interceptY = tempY * tileSize
        let adyacent = (this.interceptY - this.y) / Math.tan(this.angle)
        this.interceptX = this.x + adyacent

        //Calculate steps
        this.stepY = tileSize
        this.stepX = tileSize / Math.tan(this.angle)

        if (!this.down)
            this.stepY *= -1

        if ((!this.right && this.stepX > 0) || (this.right && this.stepX < 0))
            this.stepX *= - 1

        let nextHorizontalX = this.interceptX
        let nextHorizontalY = this.interceptY

        if (!this.down)
            nextHorizontalY--

        while (!horizontalBounce && (nextHorizontalX >= 0 && nextHorizontalX < tileSize * map[0].length && nextHorizontalY >= 0 && nextHorizontalY < tileSize * map.length)) {
            let x = Math.floor(nextHorizontalX / tileSize)
            let y = Math.floor(nextHorizontalY / tileSize)

            if (map[y][x] != 0) {
                horizontalBounce = true
                this.wallHitHorizontalX = nextHorizontalX
                this.wallHitHorizontalY = nextHorizontalY
            }
            else {
                nextHorizontalX += this.stepX
                nextHorizontalY += this.stepY
            }
        }
        //Vertical bounce
        let verticalBounce = false

        this.interceptX = tempX * tileSize
        let opposite = Math.tan(this.angle) * (this.interceptX - this.x)
        this.interceptY = this.y + opposite
        //Calculate steps
        this.stepX = tileSize
        this.stepY = Math.tan(this.angle) * tileSize

        if (!this.right)
            this.stepX *= -1

        if ((!this.down && this.stepY > 0) || (this.down && this.stepY < 0))
            this.stepY *= -1

        let nextVerticalX = this.interceptX
        let nextVerticalY = this.interceptY

        if (!this.right)
            nextVerticalX--
        //Loop to find bounce
        while (!verticalBounce && (nextVerticalX >= 0 && nextVerticalX < tileSize * map[0].length && nextVerticalY >= 0 && nextVerticalY < tileSize * map.length)) {
            let x = Math.floor(nextVerticalX / tileSize)
            let y = Math.floor(nextVerticalY / tileSize)

            if (map[y][x] != 0) {
                verticalBounce = true
                this.wallHitVerticalX = nextVerticalX
                this.wallHitVerticalY = nextVerticalY
            }
            else {
                nextVerticalX += this.stepX
                nextVerticalY += this.stepY
            }
        }
        //Calculate first bounce
        let horizontalDistance = 9999
        let verticalDistance = 9999

        if (horizontalBounce)
            horizontalDistance = distanceBetweenPoints(this.x, this.y, this.wallHitHorizontalX, this.wallHitHorizontalY)
        if (verticalBounce)
            verticalDistance = distanceBetweenPoints(this.x, this.y, this.wallHitVerticalX, this.wallHitVerticalY)
        if (horizontalDistance < verticalDistance) {
            this.wallHitX = this.wallHitHorizontalX
            this.wallHitY = this.wallHitHorizontalY
            //Select pixel of the texture
            this.pixel = this.wallHitX % tileSize
            //Texture id
        }
        else {
            this.wallHitX = this.wallHitVerticalX
            this.wallHitY = this.wallHitVerticalY
            //Select pixel of the texture
            this.pixel = this.wallHitY % tileSize
            //Texture id
        }

        //Id of texture
        let idX = Math.floor(this.wallHitX / tileSize)
        let idY = Math.floor(this.wallHitY / tileSize)
        this.textureId = map[idY][idX]
        //Rendering map
        if (this.i == canvas.width / 2) {
            let distance = Math.cos(toRadians(player.angle) - this.angle) * distanceBetweenPoints(this.x, this.y, this.wallHitX, this.wallHitY)
            if (this.textureId == 4 && distance < 60) {
                showTakeNote = "Press F to take the note."
                blockSpotted = { x: idX, y: idY }
            }
            else {
                showTakeNote = ""
            }
        }
        if (!render) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.wallHitX, this.wallHitY)
            ctx.stroke()
            ctx.closePath()
        }
        else {
            let distance = Math.cos(toRadians(player.angle) - this.angle) * distanceBetweenPoints(this.x, this.y, this.wallHitX, this.wallHitY)
            let distanceToProjectionPlane = (canvas.width / 2) / Math.tan(fov / 2)
            let wallSizeProjected = (wallSize / distance) * distanceToProjectionPlane
            //Render texture
            let textureHeight = 64
            ctx.imageSmoothingEnabled = false
            if (render == 1) {
                ctx.drawImage(wallTexture, this.pixel, (this.textureId - 1) * textureHeight, 1, textureHeight, this.i, canvas.height / 2 - wallSizeProjected / 2, 1, wallSizeProjected)

            }
            else if (render == 2) {
                ctx.fillStyle = `rgb(${255 / distance * 4 + 70},${255 / distance * 4 + 70},${255 / distance * 4 + 70})`
                ctx.fillRect(i, Math.floor(canvas.height / 2) - Math.floor(wallSizeProjected / 2), 1, wallSizeProjected)
            }
        }
    }
}

let player = new Player()
//Loop function for drawing
let lightGlitchTime = new Date().getTime()
let enemyTime = new Date().getTime()
let enemyTime2 = new Date().getTime()
let enemyActivation = false
function draw() {
    if (!pause) {
        //Clear display
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        //Draw sky and floor
        ctx.drawImage(skyTexture, skyX, 0, 700, 350, 0, 0, canvas.width, canvas.height / 2)
        ctx.fillStyle = FLOOR_COLOR
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2)
        //Draw map
        if (!render)
            drawMap()
        //Draw player
        player.draw()
        //GUI elements
        ctx.fillStyle = "#fff"
        ctx.font = "20px arial"
        gui.innerHTML = "Notes " + notes + "/" + totalNotes

        ctx.fillStyle = "#fff"
        ctx.font = "20px arial"
        ctx.fillText(showTakeNote, canvas.width / 2, canvas.height / 2 - 10, 200)
        //Center
        ctx.beginPath()
        ctx.fillStyle = "#fff"
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        //Drawing enemy
        if (!render) {
            ctx.fillStyle = "#fff"
            ctx.beginPath()
            ctx.arc(enemy.x, enemy.y, 5, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        }
        //Enemy behavior
        const enemyAdviceDistance = 100
        const enemyAttackDistance = 45
        let baseGlitchTime = 0
        let baseGlitchRandom = 10000
        //Distances from player to enemmies
        let distance = Math.sqrt(Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2))
        let distance2 = Math.sqrt(Math.pow(player.x - enemy2.x, 2) + Math.pow(player.y - enemy2.y, 2))
        //According to distance reproduce sound or lose
        let opacityDistance = distance < distance2 ? distance : distance2
        static.style.opacity = 0.8 - opacityDistance / 100
        if ((distance < enemyAdviceDistance && distance > enemyAttackDistance) || (distance2 < enemyAdviceDistance && distance2 > enemyAttackDistance)) {
            baseGlitchTime = 20000
            baseGlitchRandom = 3000
            audio2.muted = false
            audio2.play()
        }
        else if (distance < enemyAttackDistance || distance2 < enemyAttackDistance) {
            audio2.muted = true
            audio3.play()
            alert("You have been caught by something!")
            location.reload()
        }
        else {
            audio2.muted = true
        }
        //Enemy speed
        let enemySpeed = 0.7 // 0.7 and 0.6 recommended
        //Moving enemy
        enemy.x += Math.cos(enemy.angle) * enemySpeed
        enemy.y += Math.sin(enemy.angle) * enemySpeed
        //Changing enemy angle after 5s or by bouncing on maps borders
        if (new Date().getTime() - enemyTime > 5000 || enemy.x > 700 - enemySpeed || enemy.x < 0 + enemySpeed || enemy.y >= 700 - enemySpeed || enemy.y < 0 + enemySpeed) {
            enemy.angle = Math.floor(Math.random() * Math.PI * 2)
            enemyTime = new Date().getTime()
        }
        //Activate enemy 2 after 15s
        if (enemyActivation == false && new Date().getTime() - enemyTime2 >= 15000) {
            enemyActivation = true
        }
        //Behavior of enemy 2
        if (enemyActivation) {
            enemy2.x += Math.cos(enemy2.angle) * enemySpeed
            enemy2.y += Math.sin(enemy2.angle) * enemySpeed
            if (new Date().getTime() - enemyTime2 > 5000 || enemy2.x > 700 - enemySpeed || enemy2.x < 0 + enemySpeed || enemy2.y >= 700 - enemySpeed || enemy2.y < 0 + enemySpeed) {
                enemy2.angle = Math.floor(Math.random() * Math.PI * 2)
                enemyTime2 = new Date().getTime()
            }
        }
        //Light Glitch using random time between 20s and 30s excepting when enemies near
        if (new Date().getTime() - lightGlitchTime > Math.floor(Math.random() * baseGlitchRandom) + 20000 - baseGlitchTime) {
            //Reseting glitch time
            lightGlitchTime = new Date().getTime()
            //Setting all in black
            gui.style.background = "black"
            //Glitch effect
            setTimeout(() => {
                gui.style.background = "transparent"
            }, 300)
            setTimeout(() => {
                gui.style.background = "black"
            }, 400)
            setTimeout(() => {
                gui.style.background = "transparent"
            }, 500)
        }
    }
    requestAnimationFrame(draw)
}

player.start()
draw()

//Keys
const K_LEFT = 37
const K_RIGHT = 39
const K_UP = 38
const K_DOWN = 40
const K_F = 70

// Music event
const initGame = document.querySelector(".init")
initGame.addEventListener("click", (e) => {
    document.body.removeChild(e.target)
    audio.setAttribute("autoplay", true);
    audio.setAttribute("loop", true);
    pause = false
})

//Keyboard events
document.addEventListener("keydown", e => {
    if (!pause) {
        let x = 0
        let y = 0
        switch (e.keyCode) {
            case K_LEFT:
                player.left = true
                break;
            case K_RIGHT:
                player.right = true
                break
            case K_UP:
                player.up = true
                break;
            case K_DOWN:
                player.down = true
                break;
            case K_F:
                if (showTakeNote == "Press F to take the note.") {
                    map[blockSpotted.y][blockSpotted.x] = 1
                    notes++
                }
                if (notes == totalNotes) {
                    alert("Has ganado!")
                    location.reload()
                }
                break;
        }
    }
})

document.addEventListener("keyup", e => {
    if (!pause) {
        switch (e.keyCode) {
            case K_LEFT:
                player.left = false
                break;
            case K_RIGHT:
                player.right = false
                break;
            case K_UP:
                player.up = false
                break
            case K_DOWN:
                player.down = false
                break;
        }
    }
})
document.addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})
