'use strict';
var killerWaterNum = JSON.parse(sessionStorage.getItem("allJson"));
console.log(killerWaterNum);

function back() {
    window.history.back();
}

$(function () {
    /**
     * @return {string}
     */
    function Player(role, number) {
        return ("<div class='box-up'>\n" +
            "<div class='word'>\n" + role +
            "</div>\n" +
            "<p class='number'>\n" + (number + 1) + "号" +
            "</p>\n" +
            "</div>")
        //模板字符串
    }

    var diary = [];
    for (var i = 0; i < killerWaterNum.length; i++) {
        $("header").append(Player(killerWaterNum[i], i));
        var obj1 = {
            role: killerWaterNum[i],
            state: "alive",
            num: i + 1
        };
        diary.push(obj1);
    }
    console.log(diary);


    // function $player(role, state) {
    //     this.role = role;
    //     this.state = state;
    // }
    //
    // for (var i = 0; i < (killerWaterNum.length); i++) {
    //     killerWaterNum[i] = new $player(killerWaterNum[i], "alive");
    //
    // }
    //    $(".box-people").first().clone(true).appendTo("header");
    //    var word= $(".word");
    //    var number=$(".number");
    //     word[0].innerText=(killerWaterNum[0]);
    //     number[0].innerText=(1 + "号");//先赋予1号盒子文字和编号
    //
    //     word[i+1].innerText=(killerWaterNum[i+1]);
    //     number[i+1].innerText=((i + 2) + "号");//再赋予剩余盒子文字和编号
    // }
    // $(".box-people").eq(0).clone(false).appendTo("header");克隆第二种写法，eq表示第几

    // }
    // for (var j = 0; j < (killerWaterNum.length); j++) {
    //     $(".word")[j].append(killerWaterNum[j]);
    //     $(".number")[j].append((j + 1)+"号");
    // }
    $(".start").click(function () {
        window.sessionStorage.setItem("status", JSON.stringify(diary));
        window.location.href = "../html/js-2-5.html";
    });
});
