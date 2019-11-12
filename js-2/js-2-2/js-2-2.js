var inputNumber = document.getElementById("inputNumber");
var rangeNumber = document.getElementById("rangeNumber");
var killer = document.getElementById("killer");
var waterPeople = document.getElementById("waterPeople");


function killerOrWater() {
    killer.value = Math.floor(inputNumber.value / 3);
    waterPeople.value = Math.ceil(inputNumber.value * 2 / 3);
    killer.innerHTML = killer.value;//杀手值赋予杀手innerHTML
    waterPeople.innerHTML = waterPeople.value;
}

//输入框改变，与滑块一致
function equalNumber() {
    if (inputNumber.value >= 4 && inputNumber.value <= 18) {
        rangeNumber.value = inputNumber.value;//输入框值赋予滑块
        identity = [];//打印前清除identity数组
        killerOrWater();
        addIdentity(identity);
        var send = JSON.stringify(shuffle(identity));
        sessionStorage.setItem("allJson", send);
        console.log(identity);
    } else {
        alert("请输入正确的人数(4~18)");
        inputNumber.value = 4;
    }
}

//滚动条改变，和输入框一致
function move() {
    inputNumber.value = rangeNumber.value;
    identity = [];
    killerOrWater();
    addIdentity(identity);
    var send = JSON.stringify(shuffle(identity));
    sessionStorage.setItem("allJson", send);
    console.log(identity);
}

//减少按钮与滑块一致
function btnLeft() {
    rangeNumber.value--;
    inputNumber.value = rangeNumber.value;
    identity = [];
    killerOrWater();
    addIdentity(identity);
    var send = JSON.stringify(shuffle(identity));
    sessionStorage.setItem("allJson", send);
    console.log(identity);
}

//增加按钮与滑块一致
function btnRight() {
    rangeNumber.value++;
    inputNumber.value = rangeNumber.value;
    identity = [];
    killerOrWater();
    addIdentity(identity);
    var send = JSON.stringify(shuffle(identity));
    sessionStorage.setItem("allJson", send);
    console.log(identity);
}

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
function back() {
    window.history.back();
}

//去发牌
function Licensing() {
    if (inputNumber.value >= 4 && inputNumber.value <= 18) {
        window.location.href = ("../js-2-3/js-2-3.html");
    }else {
        alert("请输入正确的人数(4~18)");
    }//输入正确人数后才能跳转
}


