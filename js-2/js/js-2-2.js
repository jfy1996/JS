'use strict';
var inputNumber = $("#inputNumber")[0];
var rangeNumber = $("#rangeNumber")[0];
var killer = $("#killer")[0];
var waterPeople = $("#waterPeople")[0];

//jquery返回的是一个数组，byId返回的是对象。故数组要加下标

function killerOrWater() {
    killer.value = Math.floor(inputNumber.value / 3);
    waterPeople.value = Math.ceil(inputNumber.value * 2 / 3);
    killer.innerHTML = killer.value;//杀手值赋予杀手innerHTML
    waterPeople.innerHTML = waterPeople.value;
}

//初始值为4
if(inputNumber.value==="") {
    inputNumber.value=4;
}

//输入框改变，与滑块一致
function equalNumber() {
    inputNumber.value = inputNumber.value.replace(/\D/g, "");//正则表达式，只能输入数字
    rangeNumber.value = inputNumber.value;//输入框值赋予滑块
    killerOrWater();
}

//滚动条改变，和输入框一致
function move() {
    inputNumber.value = rangeNumber.value;
    killerOrWater();
}

//减少按钮与滑块一致
$(".reduce").click(function () {
    rangeNumber.value--;
    inputNumber.value = rangeNumber.value;
    killerOrWater();
});

//增加按钮与滑块一致
$(".plus").click(function () {
    rangeNumber.value++;
    inputNumber.value = rangeNumber.value;
    killerOrWater();
});

//将玩家放进数组里
var identity = [];

function addIdentity() {
    for (var i = 0; i < killer.value; i++) {
        identity.push("杀手");
    }
    for (var j = 0; j < waterPeople.value; j++) {
        identity.push("水民");
    }
    return identity;
}

//数组乱序
function shuffle(identity) {
    var m = identity.length,
        i,
        t;
    //定义m为数组arr的长度
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = identity[m];//最后一位赋值给t
        identity[m] = identity[i];//前面和最后一位换位置
        identity[i] = t;
    }
    return identity;
}

//返回
$(".box-back").click(function () {
    window.location.href="../html/js-2-1.html";
});

//去发牌
$(".btn-licensing").click(function () {
    if (inputNumber.value >= 4 && inputNumber.value <= 18) {
        killerOrWater();
        addIdentity(identity);
        var send = JSON.stringify(shuffle(identity));
        sessionStorage.setItem("allJson", send);
        window.location.href = ("../html/js-2-3.html");
    } else {
        inputNumber.value = 4;
        alert("请输入正确的人数(4~18)");
    }//输入正确人数后才能跳转
});


