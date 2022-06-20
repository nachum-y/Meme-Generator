'use strict'
var gCanvas
var gColor
var gCtx
var gCurrLineIdx
var gImg
var gStartPos

function setCanvas(meme) {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    let windowWidth = window.innerWidth
    if (windowWidth < 750) document.querySelector('.sidebar-navigation-content').classList.add('minimize-side-bar')
    // if (windowWidth <= 1100) tabTogalText()
    if (meme.lines[0].pos.x === -100) {
        var skipLines = true
    }
    const image = getImgById(meme.selectedImgId)
    gImg = new Image()//create a new html img element
    gImg.src = image.src//send a network req to get that image, define the img src
    gImg.onload = () => {
        let { offsetWidth, offsetHeight } = getOffsetSize()
        console.log(offsetHeight)
        console.log('offsetWidth:', offsetWidth)
        console.log(offsetWidth / offsetHeight)
        if ((windowWidth) / offsetHeight <= 1.3) {
            console.log(1)
            gCanvas.width = windowWidth - 480
            // gCanvas.width = offsetWidth
            gCanvas.height = gCanvas.width
            if ((offsetWidth) < 850) {
                gCanvas.width = windowWidth - 100

                gCanvas.height = gCanvas.width
            }

        } else {
            console.log(2)
            gCanvas.width = offsetHeight - 100
            gCanvas.height = gCanvas.width

        }
        setCanvasSize(gCanvas.width, gCanvas.height)
        if (skipLines) {
            meme.lines[0].pos.x = gCanvas.width / 2
            meme.lines[0].pos.y = gCanvas.height / 2
        }
        renderCanvas(gImg)
    }
    addListeners()
}


function renderCanvas(img = gImg) {
    var meme = getMeme()
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    meme.lines.forEach(meme => {
        gCtx.textAlign = 'center'
        drawText(meme)
    })

    meme.elements.forEach(meme => {
        if (meme.img) {
            gCtx.textAlign = 'center'
            gCtx.drawImage(meme.img, meme.pos.x - (meme.size / 2), meme.pos.y - (meme.size / 2), meme.size, meme.size)
        }
    })
    gCtx.save()

}









function onDown(ev) {
    const pos = getEvPos(ev)
    var meme = getMeme()
    hideBorderElement()
    // meme.lines.forEach(meme => meme.isSelected = false)
    var isDrag = false
    var { isDrag, idLine } = isMouseOnElement(pos)
    if (!isDrag) return
    // document.body.style.cursor = 'text'


}

function onMove(ev) {
    const meme = getMeme()
    // var curMeme = meme.lines.find(meme =>
    //     meme.isDrag === true
    // )
    let selectedMeme = getSelectedMeme()
    let windowWidth = window.innerWidth
    if (!selectedMeme.isDrag) return
    if (windowWidth < 750) {
        document.querySelector('.sidebar-navigation-content').classList.add('minimize-side-bar')
        document.querySelector('.main-container').classList.add('minimize-side-bar')

    }
    const pos = getEvPos(ev)
    const dx = pos.x
    const dy = pos.y
    if (selectedMeme.isScaled) {
        resizeDrageElement(selectedMeme, dx, dy)
        renderCanvas()
        return
    }

    if (selectedMeme) {
        setSquareAroundElement(selectedMeme)


        moveShape(selectedMeme, dx, dy)

        var gStartPos = pos
    }
}

function onUp() {
    // setLineDrag(false)
    clearAllDragElements()

    document.body.style.cursor = 'default'
}


function isMouseOnElement({ x, y }) {
    var meme = getMeme()
    var isDrag = false
    var idLine = null
    clearAllSelectedElements()
    let elTxtInput = document.querySelector('.input-txt')
    elTxtInput.value = ''
    meme.lines.forEach((meme, idx) => {
        var shapeLeft = meme.pos.x - meme.pos.width / 2
        var shapeRight = shapeLeft + meme.pos.width
        var shapTop = meme.pos.y - meme.pos.height
        var shapBottom = meme.pos.y
        meme.isScaled = false
        if (x > shapeLeft && x < shapeRight + meme.size && y > shapTop && y < shapBottom + meme.size) {
            // meme.isDrag = true

            isDrag = true
            idLine = idx
            meme.isDrag = true
            setSquareAroundElement(meme)
            setTextinput(meme, elTxtInput)
            meme.isSelected = true
            if (shapeRight <= x && shapBottom <= y) {
                meme.isScaled = true

            }
        }

    })




    meme.elements.forEach((meme, idx) => {
        var shapeLeft = meme.pos.x - meme.size
        var shapeRight = shapeLeft + meme.size
        var shapTop = meme.pos.y - meme.size / 2
        var shapBottom = meme.pos.y + meme.size / 2
        meme.isScaled = false
        if (x > shapeLeft && x < shapeRight + meme.size / 1.3 && y > shapTop && y < shapBottom + meme.size / 1.3) {
            // meme.isDrag = true
            // isDrag = true
            idLine = idx
            meme.isDrag = true
            setSquareAroundElement(meme)
            meme.isSelected = true
            if (shapeRight <= x && shapBottom <= y) {
                meme.isScaled = true

            }
        }

    })




    return ({ isDrag, idLine })

}



function onTextChange(el) {
    let selectedMeme = getSelectedMeme()
    if (!selectedMeme) return
    selectedMeme.txt = el.value
    setSquareAroundElement(selectedMeme)
    renderCanvas()

}


function onChangeSize(key) {
    let selectedMeme = getSelectedMeme()
    if (!selectedMeme) return
    let val = parseInt(key.dataset.val)
    let elKey = key.dataset.key
    selectedMeme[elKey] += val
    updateTopEditPanel(selectedMeme)
    setSquareAroundElement(selectedMeme)
    renderCanvas()
}


function onRemoveElement(el) {
    let selectedMeme = getSelectedMeme()
    if (!selectedMeme) return
    selectedMeme.txt = ''
    selectedMeme.img = ''
    setSquareAroundElement(selectedMeme)
    renderCanvas()
}


function onSetLineELement(key) {
    let selectedMeme = getSelectedMeme()
    if (!selectedMeme) return
    let dir = key.dataset.direction
    let elKey = key.dataset.key
    SetLineELement(selectedMeme, elKey, dir)
    setSquareAroundElement(selectedMeme)
    renderCanvas()
}



function onPropElement(key) {
    let selectedMeme = getSelectedMeme()
    if (!selectedMeme) return
    let val = key.value
    let elKey = key.dataset.key
    setPropElement(selectedMeme, elKey, val)
    renderCanvas()



}


function onAddElement(el, size, stroke) {
    let selectedMeme = getSelectedMeme()
    if (selectedMeme) {
        selectedMeme.isSelected = false
        setSquareAroundElement(selectedMeme)
    }

    let txt = el.innerText
    let newLine = setNewElementLine(txt, size, stroke)
    newLine.isSelected = true
    updateTopEditPanel(newLine)
    // setSquareAroundElement(newLine)
    renderCanvas()



}


function onAddSticker(el) {

    var image
    image = new Image()
    image.src = el.src
    image.onload = () => {


        setNewElementSticker(el, gCanvas.width / 2, gCanvas.height / 2)
        renderCanvas()
    }



}





function onTxtStroke() {
    let selectedMeme = getSelectedMeme()
    if (selectedMeme) {
        selectedMeme.stroke = selectedMeme.stroke === 1 ? 2 : 1
        setSquareAroundElement(selectedMeme)
    }
    renderCanvas()

}


function getCanvas() {
    return gCanvas
}

