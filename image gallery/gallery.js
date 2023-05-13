// get the list of images in gallery
let galleryImgs = document.querySelectorAll("[class^='img'][class$='0'], [class^='img'][class$='1'], [class^='img'][class$='2'], [class^='img'][class$='3'], [class^='img'][class$='4'], [class^='img'][class$='5'], [class^='img'][class$='6'], [class^='img'][class$='7'], [class^='img'][class$='8'], [class^='img'][class$='9']");
let CurrentDisplayImg; // index for current displayed image
// get full window width
let thisWindowWidth = window.innerWidth;

if (galleryImgs){
    galleryImgs.forEach(function(image, index){
        image.onclick = function(){
            // display the full image in full view

            // get the image css full address
            let getElement = window.getComputedStyle(image);
            let getFullUrl = getElement.getPropertyValue("background-image"); // url("http://127.0.0.1:3000/gallery_img/thumbnail/img1_tn.png")
            
            // get the image name(imgx.png) from the url
            let getImgDir = getFullUrl.split("/gallery_img/thumbnail/");
            let NewImgDir = getImgDir[1].replace('")', '').replace("_tn.png", ".png"); // remove the redundancy and it becomes imgx.png
        

            // create the pop-up window
            let container = document.body;
            let newImgWin = document.createElement("div"); //create the div box
            container.appendChild(newImgWin);
            newImgWin.setAttribute("class", "new-img-window"); // full-size window
            newImgWin.setAttribute("onclick", "closeImg()"); // close the window when click outside the image
            
            // create the pop-up image
            let FullImg = document.createElement("img");
            newImgWin.appendChild(FullImg);
            FullImg.setAttribute("src", "gallery_img/" + NewImgDir);
            FullImg.setAttribute("id", "this-img");
           
            // get the last clicked image
            CurrentDisplayImg = index + 1;
            // alert(FullImg[id]);

            // set the image width and height so that we can ***position the btns***
            FullImg.onload = function(){

                // get the image width and height
                let imgWidth = this.width;
                let EdgeCalc = ((thisWindowWidth - imgWidth) / 2) - 80;

                // create the previous button
                let PrevBtn = document.createElement("a");
                let Prevtext = document.createTextNode("<");
                // append text to the anchor tag 
                PrevBtn.appendChild(Prevtext);
                container.appendChild(PrevBtn); // add to the current container
                // set attributes for this btn
                PrevBtn.setAttribute("class", "prev-btn");
                PrevBtn.setAttribute("onclick", "changeImg(0)");
                
                PrevBtn.style.cssText = "left: " + EdgeCalc + "px;";

                // create the next button
                let NextBtn = document.createElement("a");
                let Nexttext = document.createTextNode(">");
                // append text to the anchor tag 
                NextBtn.appendChild(Nexttext);
                container.appendChild(NextBtn); // add to the current container
                // set attributes for this btn
                NextBtn.setAttribute("class", "next-btn");
                NextBtn.setAttribute("onclick", "changeImg(1)");

                NextBtn.style.cssText = "right: " + EdgeCalc + "px;";
            } 


        }
    });
}

// define the closeImg() function so that the window can be closed
function closeImg(){
    document.querySelector(".new-img-window").remove();
    // remove the previous and next btns when clicked outside
    document.querySelector(".prev-btn").remove();
    document.querySelector(".next-btn").remove();
}

// define the changeImg() function so that the image can be changed foward and backward
function changeImg(indicator){
    // delete the current one
    document.querySelector("#this-img").remove();

    // add the new image window
    let currentWindow = document.querySelector(".new-img-window");
    let FullImg = document.createElement("img");
    currentWindow.appendChild(FullImg);

    // get the changed image full address
    let newImgIndex;
    if (indicator == 0){
        newImgIndex = CurrentDisplayImg - 1;
        if(newImgIndex < 1){
            newImgIndex = galleryImgs.length;
        }
    }else{
        newImgIndex = CurrentDisplayImg + 1;
        if(newImgIndex > galleryImgs.length){
            newImgIndex = 1;
        }
    }

    // display the new image and put the new id backin 
    FullImg.setAttribute("src", "gallery_img/img" + newImgIndex + ".png");
    FullImg.setAttribute("id", "this-img");

    // update the new image index
    CurrentDisplayImg = newImgIndex;

    // dynamically change the btn position in case of larger image
    FullImg.onload = function(){
        let newWidth = this.width;
        let EdgeCalc = ((thisWindowWidth - imgWidth) / 2) - 80;
        
        // update the btn position
        document.querySelector(".prev-btn").style.cssText = "left: " + EdgeCalc + "px;";
        document.querySelector(".next-btn").style.cssText = "right: " + EdgeCalc + "px;";
    }
}