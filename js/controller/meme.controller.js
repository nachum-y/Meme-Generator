'use strict'

function onMemeGalleryClick(memeId) {
    setImgMemeId(memeId)
    renderMeme(memeId)
}

function renderMeme(memeId) {
    const meme = getMeme(memeId)
    var strHtmls = `
    <div class="main-meme">
                <div class="canva-container">
                    <canvas id="canvas" height="500px" width="500px">
                    </canvas>
                </div>
                <div class="meme-controller">
                    <div class="top-controller">
                        <button>Back to gallery</button>
                    </div>
                    <div class="controller">
                        <input type="text" placeholder="Text Here" class="input-txt">
                        <div class="btn-controller line-up"><i class="fa-solid fa-up-long"></i></div>
                        <div class="btn-controller line-down"><i class="fa-solid fa-arrow-down-long"></i></div>
                        <div class="btn-controller add-txt"><i class="fa-solid fa-plus"></i></div>
                        <div class="btn-controller remove-element"><i class="fa-solid fa-trash-can"></i></div>
                        <div class="btn-controller enlarge-element"><i class="fa-solid fa-font"></i></div>
                        <div class="btn-controller reduce-element"><i class="fa-solid fa-font"></i></div>
                        <div class="btn-controller txt-align-right"><i class="fa-solid fa-align-right"></i></div>
                        <div class="btn-controller txt-align-center"><i class="fa-solid fa-align-justify"></i></div>
                        <div class="btn-controller txt-align-left"><i class="fa-solid fa-align-left"></i></div>
                        <input type="color" id="pick-color" name="pick-color" value="#e66465">
                        <div class="btn-controller txt-stroke"><i class="fa-solid fa-s"></i></div>
                    </div>
                </div>
            </div> 
`
    
    // strHtmls.unshift('<div class="main-img-gallery main-layout">')
    document.querySelector('.main-content').innerHTML = strHtmls
    setCanvas(meme)




}

function onTextClick() {


}

function onTextEdit() {

}

function onAddText() {

    setLineTxt()

}

