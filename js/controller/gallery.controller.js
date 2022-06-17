'use strict'

function renderImagesGallery() {
    var images = getImages()
    var strHtmls = images.map((image) =>
        `<article class="cat-${(image.category).toLowerCase()} meme-gallery">
        <img onclick="onMemeGalleryClick(${image.id})" class="image-gallery"src="${image.src}" alt="">
        <span>${image.category}</span>
    </article>`
    )

    strHtmls.unshift(`
    <div class="main-img-gallery main-layout">`
    )
    document.querySelector('.main-content').innerHTML = strHtmls.join('')
    setActiveSideBar('gellery-page')
}





function getImgById(id) {
    return gImages.find(img => +img.id === id)
}

function onSetFilterByTxt(input) {
    console.log(input)
    setImagesFillter(input)
    renderImagesGallery()

}



/* <div class="hero-content ">
<h2>What meme will you design?</h2>
<div class="search-input">
    <input oninput="onSetFilterByTxt(this.value)" type="search" placeholder="Search your kewwords or meme's" value="" name="search-meme"
        class="search-meme-input">
    <span><span aria-hidden="true" class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                </path>
            </svg></span></span>
</div>
<div class="popular-searches">
    <span class="funny">Funny</span>
    <span class="animals">Animals</span>
    <span class="peoples">Peoples</span>
    <span class="akward">Akward</span>
    <span class="tv-show">TV Show</span>
</div>

</div> */
