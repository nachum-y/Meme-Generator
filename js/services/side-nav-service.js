'use strict'

function getHtmls(el) {

    switch (el) {
        case 'Text':
            return `
            
            <label class="text-input-container" for="text-input">
            <strong class="tab-content-title">Edit text</strong>
            <!-- <input class="text-input" type="text"> -->
            <input type="text" placeholder="Text Here" class="input-txt" id="input-txt-selected"
                oninput="onTextChange(this)">
        </label>
        <strong class="tab-content-title">Click text to add to page</strong>
        <div onclick="onAddElement(this,60,2)" class="add-a-heading">Add a heading</div>
        <div onclick="onAddElement(this,40,1)" class="add-a-subheading">Add a subheading</div>
        <div onclick="onAddElement(this,20,1)" class="add-a-little-text">Add a little bit of body text</div>
            
            
            
            
            
            `

            break
        case 'Share':
            return `
                
                
                
                <div class="shareMeme">
                <strong class="tab-content-title">Share Your Meme</strong>
                <a class="share-to-facebook" href="#" title="Facebook" target="_blank"
                    style="font-size:32px!important;box-shadow:none;display:inline-block;vertical-align:middle"><span
                        class="heateor_sss_svg"
                        style="background-color:#3c589a;width:70px;height:35px;display:inline-block;opacity:1;float:left;font-size:32px;box-shadow:none;display:inline-block;font-size:16px;padding:0 4px;vertical-align:middle;background-repeat:repeat;overflow:hidden;padding:0;cursor:pointer;box-sizing:content-box"><svg
                            style="display:block;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                            viewBox="-5 -5 42 42">
                            <path
                                d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z"
                                fill="#fff"></path>
                        </svg></span></a>
                
                `
        case 'Elements':
            return `
        <div class="elements">
        <strong class="tab-content-title">Click on elements to add to page</strong>
        <img onclick="onAddSticker(this)" src="/images/Stickers/1.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/2.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/3.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/4.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/5.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/6.png" alt="sticker">
        <img onclick="onAddSticker(this)" src="/images/Stickers/7.png" alt="sticker">
    </div>
        
        
        `
        default:
            break
    }



}