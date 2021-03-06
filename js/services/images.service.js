'use strict'

var gImages =
    [
        {
            "id": "77163",
            "src": "images/galleryMemes/1.jpg",
            "category": "Most Popular",
            "keyword": ""
        },
        {
            "id": "72086",
            "src": "images/galleryMemes/2.jpg",
            "category": "Animals",
            "keyword": "Dog"
        },
        {
            "id": "09515",
            "src": "images/galleryMemes/3.jpg",
            "category": "Funny",
            "keyword": ""
        },
        {
            "id": "08094",
            "src": "images/galleryMemes/4.jpg",
            "category": "Animals",
            "keyword": ""
        },
        {
            "id": "75365",
            "src": "images/galleryMemes/5.jpg",
            "category": "Peoples",
            "keyword": "",
        },
        {
            "id": "03522",
            "src": "images/galleryMemes/6.jpg",
            "category": "Peoples",
            "keyword": "",
        },
        {
            "id": "48436",
            "src": "images/galleryMemes/7.jpg",
            "category": "Peoples",
            "keyword": "Akward"
        },
        {
            "id": "11991",
            "src": "images/galleryMemes/8.jpg",
            "category": "Peoples",
            "keyword": "Akward"
        },
        {
            "id": "83682",
            "src": "images/galleryMemes/9.jpg",
            "category": "Peoples",
            "keyword": ""
        },
        {
            "id": "95459",
            "src": "images/galleryMemes/10.jpg",
            "category": "Peoples",
            "keyword": ""
        },
        {
            "id": "98630",
            "src": "images/galleryMemes/11.jpg",
            "category": "Most Popular",
            "keyword": ""
        },
        {
            "id": "78755",
            "src": "images/galleryMemes/12.jpg",
            "category": "Most Popular",
            "keyword": ""
        },
        {
            "id": "69985",
            "src": "images/galleryMemes/13.jpg",
            "category": "Peoples",
            "keyword": ""
        },
        {
            "id": "78374",
            "src": "images/galleryMemes/14.jpg",
            "category": "Most Popular",
            "keyword": ""
        },
        {
            "id": "32070",
            "src": "images/galleryMemes/15.jpg",
            "category": "Peoples",
            "keyword": ""
        },
        {
            "id": "99923",
            "src": "images/galleryMemes/16.jpg",
            "category": "Funny",
            "keyword": "TV Show"
        },
        {
            "id": "27186",
            "src": "images/galleryMemes/17.jpg",
            "category": "Funny",
            "keyword": "TV Show"
        },
        {
            "id": "68136",
            "src": "images/galleryMemes/18.jpg",
            "category": "Funny",
            "keyword": "TV Show"
        }
    ]

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
            image.category.toLowerCase().includes(gFilterBy.keyword.toLowerCase()) || image.keyword.toLowerCase().includes(gFilterBy.keyword.toLowerCase())
    )
    const startIdx = gPageIdx * PAGE_SIZE
    return images
}



function addImage(imgSrc) {
    const img = _createImagesfromUpload(imgSrc)
    gImages.unshift(img)
    _saveImageToStorage()  
    return(img);
}



function setSearchKeyWord(keyWord) {
    let elSearchInput = document.querySelector('.search-meme-input')
    elSearchInput.value = keyWord
    onSetFilterByTxt(keyWord)


}
function _createImagesfromUpload(imgSrc, category='Upload',keyword=''){

    return {
        id: makeId(5),
        src: imgSrc,
        category,
        keyword
    }

}

function _ctrateImage(category, idImg) {
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
            images.push(_ctrateImage(category, i + 1))
        }
    }
    _saveImageToStorage()
}

function setImagesFillter(input) {
    gFilterBy.keyword = input

    return gFilterBy
}



function _saveImageToStorage() {
    saveToStorage(STORAGE_KEY, gImages)
}
