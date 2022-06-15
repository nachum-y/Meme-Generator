'use strict'
var gCanvas
var gColor
var gCtx

function setCanvas(meme) {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    renderCanvas()
}
function renderCanvas() {
    var meme = getMeme()
    const image = getImgById(meme.selectedImgId)
    var img = new Image()//create a new html img element
    img.src = image.src//send a network req to get that image, define the img src
    // when the image ready draw it on the canvas
    img.onload = () => {
        var hieghtImg = img.height
        var widthImg = img.width
        setCanvasSize(hieghtImg, widthImg)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach(meme => {
            drawText(meme)

        })
        // drawText(meme, meme.lines[0].pos.x, meme.lines[0].pos.y)
    }

    addListeners()

    // drawImg(image, meme)
    // drawText(meme)

    let canvasWidth = gCanvas.width
    let canvasHeight = gCanvas.height

}


// function drawImg(image, meme) {

//     var img = new Image()//create a new html img element
//     img.src = image.src//send a network req to get that image, define the img src
//     //when the image ready draw it on the canvas
//     img.onload = () => {
//         var hieghtImg = img.height
//         var widthImg = img.width
//         setCanvasSize(hieghtImg, widthImg)
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
//         setElementCenter()
//         drawText(meme, hieghtImg / 2, widthImg / 2)
//     }
// }

function setCanvasSize(hieght, width) {
    gCanvas.height = hieght
    gCanvas.width = width
}


//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
    //Listen for resize ev 
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {

    const pos = getEvPos(ev)
    var meme = getMeme()
    var isDrag = false
    var { isDrag, idLine } = isMouseOnElement(pos)
    if (!isDrag) return
    console.log(idLine)
    // meme.lines[idx].isDrag = true
    console.log('meme.lines[idLine]:', meme.lines[idLine])
    meme.lines[idLine].isDrag = true
    // gCtx.beginPath()
    // gCtx.moveTo(pos.x, pos.y)

    //Get the ev pos from mouse or touch
    //Save the pos we start from 
    // gStartPos = pos
    document.body.style.cursor = 'text'
    // console.log('onDown(ev):', ev)
}
function onMove(ev) {
    const meme = getMeme()
    var curMeme = meme.lines.find(meme => 
       meme.isDrag === true
    )
    console.log(curMeme);
    if (curMeme) {
        console.log(curMeme)
        const pos = getEvPos(ev)
        // console.log(ev);
        //Calc the delta , the diff we moved
        const dx = pos.x
        const dy = pos.y
        moveShape(curMeme, dx, dy)
        // console.log(' moveShape(dx, dy):', moveShape(dx, dy))
        // drawText(shape,dx, dy)
        // drawText('HOLA!', dx,dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        var gStartPos = pos
        //The canvas is render again after every move
    }
    // console.log('onMove(ev):', ev)
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'default'
}

function setLineDrag(isDrag) {
    var meme = getMeme()
    var curMeme = meme.lines.find(meme => {
        return meme.isDrag
    })
    if (curMeme) curMeme.isDrag = isDrag

    console.log(curMeme)
    //
}
function moveShape(meme, x, y) {
    console.log(meme)
    meme.pos.x = x
    meme.pos.y = y
    renderCanvas()
    // gCtx.clearRect(shapeLeft, shapTop, meme.lines[0].pos.width, meme.lines[0].pos.height)
}



function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    // if (gTouchEvs.includes(ev.type)) {
    //     //soo we will not trigger the mouse ev
    //     ev.preventDefault()
    //     //Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}



function drawText(meme) {
    console.log(meme)
    var x = meme.pos.x
    var y = meme.pos.y
    console.log(y)
    gCtx.lineWidth = 1

    // gCtx.strokeStyle = 'brown'
    var txt = meme.txt
    var txtHeight = meme.size
    gCtx.fillStyle = meme.color
    gCtx.font = `${meme.size}px Ariel`
    var txtWidth = gCtx.measureText(txt).width
    var txtHeight = parseInt(gCtx.font)
    console.log(txtHeight, '1')
    gCtx.fillText(txt, x - txtWidth / 2, y)//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x - txtWidth / 2, y)//Draws (strokes) a given text at the given (x, y) position.
    gCtx.fillStyle = 'blue'
    gCtx.strokeStyle = 'red'
    var fillRect = false
    meme.pos.x = x - txtWidth / 2
    meme.pos.y = y - txtHeight
    meme.pos.width = txtWidth
    meme.pos.height = txtHeight

    gCtx.rect(x - txtWidth / 2 - txtHeight / 2, y - txtHeight, txtWidth + txtHeight, txtHeight * 1.4)
    if (fillRect) {
        gCtx.fill()
    }
    gCtx.stroke()

}







function isMouseOnElement({ x, y }) {
    console.log(x)
    console.log(y)
    var meme = getMeme()
    var isDrag = false
    var idLine = null

    meme.lines.forEach((meme, idx) => {
        var shapeLeft = meme.pos.x
        var shapeRight = shapeLeft + meme.pos.width
        var shapTop = meme.pos.y
        var shapBottom = shapTop + meme.pos.height

        // console.log('shapeLeft:', shapeLeft)
        // console.log('shapeRight:', shapeRight)
        // console.log('shapTop:', shapTop)
        // console.log('shapBottom:', shapBottom)
        if (x > shapeLeft && x < shapeRight && y > shapTop && y < shapBottom) {

            // meme.isDrag = true
            isDrag = true
            idLine = idx
        }

    })

    return ({ isDrag, idLine })

}