function getColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return  "rgb(" + r + "," + g + "," + b + ")";

}

var li = document.getElementsByTagName("li");

//抓取所有“li"标签，赋值数组li

function cle() {
    for (var i = 0; i < li.length; i++) {
        li[i].style.backgroundColor = "rgb(235,147,22)";
    }
}//历遍所有li标签，改变backgroundColor


var int;

function getBox() {
    var colorOne;
    var colorTwo;
    var colorThree;
    var one = Math.floor(Math.random() * 9);
    var two = Math.floor(Math.random() * 9);
    var three = Math.floor(Math.random() * 9);
    if (one !== two && two !== three && three !== one) {
        li[one].style.backgroundColor = colorOne;
        li[two].style.backgroundColor = colorTwo;
        li[three].style.backgroundColor = colorThree;
    } else getBox();

    colorOne = getColor();
    console.log(colorOne);
    colorTwo = getColor();
    console.log(colorTwo);
    colorThree = getColor();
    console.log(colorThree);
    while (colorOne === colorTwo || colorTwo === colorThree || colorThree === colorOne) {
        if (colorOne === colorTwo) {
            colorOne = getColor();
        } else if (colorTwo === colorThree) {
            colorTwo = getColor();
        } else if (colorThree === colorOne) {
            colorThree = getColor();
        }
    }

}


function begin() {
    console.log(getBox());
    cle();
    getBox();

}

function end() {
    window.clearInterval(int);
    cle();
}

