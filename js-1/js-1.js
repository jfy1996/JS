function getColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb" + "(" + r + "," + g + "," + b + ")";
}//获取随机颜色

var box = document.getElementsByTagName("li");

//抓取所有“li"标签，赋值数组box

function cle() {
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = "rgb(235,147,22)";
    }
}//历遍所有li标签，改变backgroundColor

var b;

function myNum() {
    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    b = [];
    for (var i = 0; i < 3; i++) {
        var num = Math.floor(Math.random() * a.length);
        b.push(a[num]);
        a.splice(num, 1);
    }
    return b;
}//获得3个不同随机数

function changeColor() {
    var colorOne = getColor();
    var colorTwo = getColor();
    var colorThree = getColor();
    myNum();
    box[b[0]].style.backgroundColor = colorOne;
    console.log(b[0]);
    box[b[1]].style.backgroundColor = colorTwo;
    console.log(b[1]);
    box[b[2]].style.backgroundColor = colorThree;
    console.log(b[2]);

    while (colorOne === colorTwo || colorTwo === colorThree || colorThree === colorOne) {
        if (colorOne === colorTwo) {
            colorOne = getColor();
        } else if (colorTwo === colorThree) {
            colorTwo = getColor();
        } else if (colorThree === colorOne) {
            colorThree = getColor();
        }
    }

}//判断3个颜色，保证3个颜色都不同

var int;

function begin() {
    cle();
    changeColor();
    window.clearInterval(int);
    int = setInterval(begin, 1000);
}

function end() {
    window.clearInterval(int);
    cle();
}

