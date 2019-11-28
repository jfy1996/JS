'use strict';

function back() {
    window.history.back();
}

var send = JSON.parse(sessionStorage.getItem("allJson"));//重新转换为数组
console.log(send);

$(function () {
    //定义一个初始的标记
    var n = 0;
    //把类赋予一个变量，不然会提示有重复使用的
    var mainPic2 = $(".main-pic-2");
    var viewIdentity = $(".view-identity");
    viewIdentity.click(function () {
        //如果main-pic-2是隐藏的，则:
        if (mainPic2.css("display") === "none") {
            $(".main-pic").hide();
            mainPic2.show();
            $(".main-num").text(n + 1);

            if (send[n] === "水民") {
                $(".main-pic-2 p").text("身份:水民");
            } else {
                $(".main-pic-2 p").text("身份:杀手");
            }
            if (n + 1 === send.length) {
                viewIdentity.text("法官查看");
            } else {
                viewIdentity.text("隐藏并传递给" + (n + 2) + "号");
            }

            n++;
        } else if (n === send.length) {
            //把杀手和水民的数据传递给法官界面
            sessionStorage.setItem("allJson", JSON.stringify(send));
            window.location.href = "../html/js-2-4.html";
        } else {
            viewIdentity.text("点击查看" + (n + 1) + "号身份");
            $(".main-num").text(n + 1);
            $(".main-pic").show(250);
            $(".main-pic-2").hide();
        }

    })
});

