'use strict';

function back() {
    window.history.back();
}

//历史数据，包含所有的死亡数据
var history1 = JSON.parse(sessionStorage.getItem("myHistory"));
console.log(history1);

//清除法官按钮按下的数据
sessionStorage.removeItem("god");

function gameBox() {
    return (
        "<div class='box-process'>\n" +
        "<div class='days'>\n" +
        "<p class='dayNum'>\n" + "第" + classDay[i] + "天" + "</p>\n" +
        "<div>" + "</div>" +
        "</div>" +
        "<div class='process'>\n" +
        "<div class='box-day box-day-w1'>\n" +
        "<button class='behavior' id='killer' type='button'>\n" + '杀手杀人' + "</button>" +
        "</div>" +
        "<p class='kill-message'>\n" + "</p>" +
        "<div class='box-day box-day-w2'>\n" +
        "<button class='behavior' id='ghost' type='button'>\n" + "亡灵发表遗言" + "</button>" +
        "</div>" +
        "<div class='box-day'>\n" +
        "<button class='behavior' id='player' type='button'>\n" + "玩家依次发言" + "</button>" +
        "</div>" +
        "<div class='box-day'>\n" +
        "<button class='behavior' id='vote' type='button'>\n" + "全民投票" + "</button>" +
        "</div>" +
        "<p class='kill-message'>\n" + "</p>" +
        "</div>" +
        "</div>"
    )
}

if (history1 === null) {
    history1 = [];
    var obj = {
        deadKill: "",
        voteKill: "",
        killNum: "",
        voteNum: "",
        myDay: "0",
        look: "",
        count: "",
        godLook: "",
        state: "step1",
        controlDay: "-1"
    };
    history1.push(obj);
    //将死亡状态存入历史记录数组,方便流程页历史记录引用
    //control的作用是在按下投票按钮后数值+1，进行结果页的人数判断
}

//状态机
//杀手人数大于水民，或者杀手人数为0时，游戏结束。最多进行9天.
var day = new StateMachine({
    init: history1[0].myDay,
    transitions: [
        {name: "date", from: "0", to: "1"},
        {name: "date", from: "1", to: "2"},
        {name: "date", from: "2", to: "3"},
        {name: "date", from: "3", to: "4"},
        {name: "date", from: "4", to: "5"},
        {name: "date", from: "5", to: "6"},
        {name: "date", from: "6", to: "7"},
        {name: "date", from: "7", to: "8"},
        {name: "date", from: "8", to: "9"}
    ]
});


var fsm = new StateMachine({
    init: history1[0].state,
    transitions: [
        {name: "kill", from: "step1", to: "step2"},
        {name: "ghost", from: "step2", to: "step3"},
        {name: "speak", from: "step3", to: "step4"},
        {name: "vote", from: "step4", to: "step1"}
    ]
});

//按天数出现盒子
for (var i = 0; i <= history1[0].myDay; i++) {
    var classDay = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    // boxProcess.eq(0).clone().appendTo("main");
    $(".process").eq(i - 1).hide();
    var o = $(gameBox());
    $("main").append(o);
    // $(o.find(".behavior").get(0)).addClass("over");
}

var behavior = $(".behavior");

// 给按钮添加灰色背景
for (i = 0; i < history1[0].count; i++) {
    behavior.eq(i).addClass("over behavior-1");
}

var killMessage = $(".kill-message");

//出现杀人死亡文字
for (i = 0; i < history1[0].count; i = i + 4) {
    killMessage.eq(i / 2).show().text(history1[i].deadKill);
}

//出现投票死亡文字
for (i = 0; i < history1[0].myDay; i++) {
    killMessage.eq(i * 2 + 1).show().text(history1[i * 4 + 3].voteKill);

//点击展开和收缩
    $(".days").eq(i).click(function () {
        var x = $(".days").index(this);
        $(".process").eq(x).slideToggle();
    });
}

//杀人按钮
behavior.eq(history1[0].myDay * 4).click(function () {
    if (history1[0].state === "step1") {
        fsm.kill();

        var objAll = {
            // deadKill: "",
            // voteKill: ""
            // state: "",
            // myDay:"",
        };
        history1[0].controlDay++;
        history1[0].look = 1;
        history1[0].count = history1[0].myDay * 4 + 1;
        history1[0].godLook = 0;
        history1.push(objAll);
        history1[0].state = fsm.state;
        // sessionStorage.setItem("getState", state);

        // sessionStorage.setItem("see", JSON.stringify(look));
        sessionStorage.setItem("myHistory", JSON.stringify(history1));
        window.location.href = "../html/js-2-6.html";
    } else {
        alert("请按照顺序进行");
    }
});

//亡灵按钮
behavior.eq(history1[0].myDay * 4 + 1).click(function () {
    if (history1[0].state === "step2") {
        alert("亡灵发表遗言");
        fsm.ghost();

        behavior.eq(history1[0].myDay * 4 + 1).addClass("over");

        var objAll = {
            // deadKill: "",
            // voteKill: "",
            // state: "",
            // myDay:"",
            // look: "",
            // count:""
        };
        history1[0].count = history1[0].myDay * 4 + 2;
        behavior.eq(history1[0].count - 1).addClass("behavior-1");
        history1.push(objAll);
        history1[0].state = fsm.state;
        console.log(history1);
        sessionStorage.setItem("myHistory", JSON.stringify(history1));

        // sessionStorage.setItem("myHistory", JSON.stringify(history1));
        // sessionStorage.setItem("getState", state);
    } else {
        alert("请按照顺序进行");
    }
});

//玩家按钮
behavior.eq(history1[0].myDay * 4 + 2).click(function () {
    if (history1[0].state === "step3") {
        alert("玩家依次发言");
        fsm.speak();
        behavior.eq(history1[0].myDay * 4 + 2).addClass("over");

        var objAll = {
            // deadKill: "",
            // voteKill: "",
            // state: "",
            // myDay:"",
            // look: "",
            // count:""
        };
        history1[0].count = history1[0].myDay * 4 + 3;
        behavior.eq(history1[0].count - 1).addClass("behavior-1");
        history1.push(objAll);
        history1[0].state = fsm.state;
        console.log(history1);
        sessionStorage.setItem("myHistory", JSON.stringify(history1));

    } else {
        alert("请按照顺序进行");
    }
});

//投票按钮
behavior.eq(history1[0].myDay * 4 + 3).click(function () {
    if (history1[0].state === "step4") {
        day.date();//天数刷新
        fsm.vote();
        var objAll = {
            // deadKill: "",
            // voteKill: ""
            // state: "",
            // myDay:"",
        };
        history1[0].count = history1[0].myDay * 4 + 4;
        history1[0].look = 4;
        history1[0].godLook = 0;
        history1[0].myDay = day.state;
        history1[0].state = fsm.state;
        history1.push(objAll);

        sessionStorage.setItem("myHistory", JSON.stringify(history1));
        // sessionStorage.setItem("getDay", JSON.stringify(history1[0].myDay));


        // sessionStorage.setItem("getState", state);
        // sessionStorage.setItem("see", JSON.stringify(look));

        // var look = 4;
        // sessionStorage.setItem("see", JSON.stringify(look));

        window.location.href = "../html/js-2-6.html";
    } else {
        alert("请按照顺序进行");
    }
});

//关闭按钮
$(".close").click(function () {
    var close = confirm("确定结束游戏?");
    if (close === true) {
        sessionStorage.clear();
        window.location.href = "../html/js-2-2.html";
    }
});


//法官日志按钮
$("#diary").click(function () {
    history1[0].godLook = 1;
    sessionStorage.setItem("myHistory", JSON.stringify(history1));
    window.location.href = "../html/js-2-6.html";
});

//结束游戏按钮
$("#gameOver").click(function () {
    var game = confirm("结束本轮游戏?");
    if (game === true) {
        window.location.href = "../html/js-2-7.html";
    }
});





