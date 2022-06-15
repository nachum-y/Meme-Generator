'use strict'

var gImages = []
const STORAGE_KEY = 'imagesDB'
const PAGE_SIZE = 12
var gPageIdx = 0
var gCategory = ['Most Popular', 'Funny', 'Animals', 'Peoples']
var gFilterBy = {
    category: '',
    keyword: ''
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gImages.length) {
        gPageIdx = 0
    }
}


function getImages() {
    var images = gImages.filter(
        (image) =>
            image.category.includes(gFilterBy.category)
    )
    const startIdx = gPageIdx * PAGE_SIZE
    // images = images.slice(startIdx, startIdx + PAGE_SIZE)
    return images
}



function addImage(imgSrc, category) {
    const img = _createImages(imgSrc, category)
    gImages.unshift(img)
    _saveImageToStorage()
    return img
}





function _ctrateImage(category,idImg) {
    return {
        id: makeId(5),
        src: `images/galleryMemes/${idImg}.jpg`,
        category
    }
}

function _createImages() {
    var images = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!images || !images.length) {
        images = []

        for (let i = 0; i < 18; i++) {
            var category = gCategory[getRandomIntInclusive(0, gCategory.length - 1)]
            images.push(_ctrateImage(category,i+1))
        }
    }
    gImages = images
    // _saveImageToStorage()
}

function setImagesFillter(filterBy = {}) {
    if (filterBy.category !== undefined) gFilterBy.category = filterBy.category
    if (filterBy.keyword !== undefined) gFilterBy.keyword = filterBy.keyword
    return gFilterBy
}



function _saveImageToStorage() {
    saveToStorage(STORAGE_KEY, gImages)
}
