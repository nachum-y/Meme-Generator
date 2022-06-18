'use strict'


function onSideNavTabClick(el) {
    console.log(el);


    let elSideBarContent = document.querySelector('.sidebar-navigation-content')
    let elMainContainer = document.querySelector('.main-container')
    let elSideBar = document.querySelector('.sidebar-nav')
    document.querySelector('.tooltiptext').classList.remove('showTollTip')

    // let elMainContainer = document.querySelector('.main-container')
    // let elTopNavEdit = document.querySelector('.top-nav-edit')

    if (el.classList.contains('active')) {
        elSideBarContent.classList.add('minimize-side-bar')
        elMainContainer.classList.add('minimize-side-bar')
        elSideBar.querySelector('.active').classList.remove('active')
    } else {
        let existActive = elSideBar.querySelector('.active')
        if (existActive) existActive.classList.remove('active')
        el.classList.add('active')
        elSideBarContent.classList.remove('minimize-side-bar')
        elMainContainer.classList.remove('minimize-side-bar')
    }
    let activeEl = elSideBar.querySelector('.active')
    if (activeEl) renderSideNavContent(activeEl)

}

function renderSideNavContent(el) {
    let strHtmls
    let elContentMain = document.querySelector('.tab-content')
    let elContent = document.querySelector('.tab-content-others')
    if (el.innerText === 'Text') {
        elContentMain.classList.remove('hide')
        elContent.classList.add('hide')
    }
    if (el.innerText === 'Share') {
        elContentMain.classList.add('hide')
        elContent.classList.remove('hide')
        strHtmls = getHtmls('Share')
    }
    if (el.innerText === 'Elements') {
        elContentMain.classList.add('hide')
        elContent.classList.remove('hide')
        strHtmls = getHtmls('Elements')
    }



    elContent.innerHTML = strHtmls

}

