'use strict'

const MEMESTORAGEKEY = 'memeDB'
var currId
var gMeme = [{
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Sample text',
        size: 30,
        align: 'left',
        color: 'red',
        pos: { x: 500, y: 500 },
        isDrag: false,
        isSelected: true,
        font: 'impact'
    },
    {
        txt: 'TAP ',
        size: 15,
        align: 'left',
        color: 'red',
        pos: { x: 20, y: 20 },
        isDrag: false,
        isSelected: false,
        font: 'impact'
    }
    ]
}]


function setImgMemeId(memeId) {
    currId = memeId
    _crateNewMeme(memeId)
}

function getMeme() {
    let currMeme = gMeme.find(meme => meme.selectedImgId === currId)

    return currMeme
}


function _crateNewMeme(memeId) {
    let isMemeExist = gMeme.find(meme => meme.selectedImgId === memeId)
    if (isMemeExist) return
    let newMeme = {

        selectedImgId: memeId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Sample text',
            size: 30,
            align: 'left',
            color: 'white',
            stroke: 1,
            pos: { x: -100, y: 500 },
            isDrag: false,
            isSelected: true,
            isScaled: false,
            font: 'Impact'
        }],
        elements: [
            {
                img: '',
                size: 50,
                pos: {
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50
                },
                isDrag: false,
                isSelected: false
            }
        ]

    }

    gMeme.push(newMeme)


}


