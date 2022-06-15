'use strict'

function renderImagesGallery() {
    var images = getImages()
    var strHtmls = images.map((image) =>
        `<article class="cat-${(image.category).toLowerCase()} meme-gallery">
        <img onclick="onMemeGalleryClick(${image.id})" class="image-gallery"src="${image.src}" alt="">
        <span>${image.category}</span>
    </article>`
    )

    strHtmls.unshift('<div class="main-img-gallery main-layout">')
    document.querySelector('.main-content').innerHTML = strHtmls.join('')
}


function onImgSelect() {

    setImgMeme()

}


function getImgById(id) {
    return gImages.find(img => +img.id === id)
}

