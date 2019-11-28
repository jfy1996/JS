'use strict';
var btn = $(".btn-1");
btn.eq(0).click(function () {
    window.location.href = "../html/js-2-2.html";
//把简版按钮跳转到设置界面
});


btn.eq(1).click(function () {
    alert("开发中，敬请期待~")
//警版
});

btn.eq(2).click(function () {
    alert("开发中，敬请期待~")
//警版
});
