'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'TAP HERE FOR EDIT TEXT',
        size: 30,
        align: 'left',
        color: 'red',
        pos: {x:250,y:250},
        isDrag:false
    },
    {
        txt: 'TAP ',
        size: 10,
        align: 'left',
        color: 'red',
        pos: {x:20,y:20},
        isDrag:false
    }]
}


function setImgMemeId(memeId) {
    gMeme.selectedImgId = memeId
}
function getMeme() {
    return gMeme
}



function setLineTxt() {

}