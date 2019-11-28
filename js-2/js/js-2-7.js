'use strict';

var history3 = JSON.parse(sessionStorage.getItem("myHistory"));
console.log(history3);

var myState = JSON.parse(sessionStorage.getItem("status"));
console.log(myState);

$(function () {
    function result() {
        return (
            "<div class='days'>" +
            "<div class='day'>" +
            "<div class='box-date'>" +
            "<p class='word-day1'>" + "第" + a + "天" + "</p>" +
            "</div>" +
            "<p class='word-day2'>" + "黑夜:" + history3[i * 4].deadKill + "</p>" +
            "<p class='word-day2'>" + "白天:" + "</p>" +
            "</div>" +
            "</div>"
        )
    }

    var killerNum = $(".killerNum");
    var peopleNum = $(".peopleNum");
    if (history3 === null) {
        //此处判断水民和杀手，是当流程界面直接点击结束游戏，未有杀人数据传入。故显示剩余玩家数。
        var killNum2 = 0;
        var voteNum2 = 0;
        for (i = 0; i < myState.length; i++) {
            if (myState[i].role === "水民") {
                killNum2++;
            }
            if (myState[i].role === "杀手") {
                voteNum2++;
            }
        }

        killerNum.text(voteNum2);
        peopleNum.text(killNum2);
    } else {
        killerNum.text(history3[0].voteNum);
        peopleNum.text(history3[0].killNum);
        for (var i = 0; i <= history3[0].controlDay; i++) {
            var a = i + 1;
            var o = $(result());
            $("main").append(o);
        }
        for (i = 0; i < history3[0].myDay; i++) {
            $(".word-day2").eq(i * 2 + 1).text("白天:" + history3[i * 4 + 3].voteKill);
        }
    }
    $(".btn-1").click(function () {
        sessionStorage.clear();//清空所有缓存
        window.location.href = "../html/js-2-1.html"
    });
    $(".btn-2").click(function () {
        sessionStorage.clear();//清空所有缓存
        window.location.href = "../html/js-2-2.html"
    });
    $(".btn-3").click(function () {
        var onceAgain = confirm("是否重开一局?");
        if (onceAgain === true) {
            sessionStorage.clear();//清空所有缓存
            window.location.href = "../html/js-2-2.html";
        }
    })
});