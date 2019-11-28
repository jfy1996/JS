'use strict';
$(function () {
    var deadPeople = JSON.parse(sessionStorage.getItem("status"));
    console.log(deadPeople);

    var history2 = JSON.parse(sessionStorage.getItem("myHistory"));
    console.log(history2);


    function Player(role, number) {
        return $("<div class='box-people'>\n" +
            "<div class='box-up'>\n" +
            "<div class='word'>\n" + role +
            "</div>\n" +
            "<p class='number'>\n" + (number + 1) + "号" +
            "</p>\n" +
            "</div>" +
            "<button class='box-hidden'>\n" +
            "</button>" +
            "</div>");
        //模板字符串
    }

    var statePeople;
    var main = $("main");
    var sure = $("#sure");
    for (var i = 0; i < deadPeople.length; i++) {
        main.append(Player(deadPeople[i].role, i));
        statePeople = $(".box-people");
        dieNum = $(this).index();//获取下标

        if (deadPeople[i].state === "dead" && history2[0].look === 1) {
            statePeople.eq(i).css("pointer-events", "none");/*让点击事件失效*/
            $(".word").eq(i).css("backgroundColor", "#C9C9C9");

        } else if (deadPeople[i].state === "dead" && history2[0].look === 4) {
            $("#judge-diary").text("投票");
            $(".title-2").text("发言讨论结束，大家请投票");
            $(".word-1").text("点击得票数最多的人的头像");
            statePeople.eq(i).css("pointer-events", "none");/*让点击事件失效*/
            $(".word").eq(i).css("backgroundColor", "#C9C9C9");

        } else if (deadPeople[i].state === "dead" && history2[0].godLook === 1) {
            $("#judge-diary").text("法官日记");
            $("header").remove();//移除多余文字
            sure.text("返回");
            main.css("marginTop", "4.5rem");
            statePeople.eq(i).css("pointer-events", "none");//让点击事件失效
            $(".word").eq(i).css("backgroundColor", "#C9C9C9");//点击法官按钮时改变界面文字等内容。

        } else if (history2[0].godLook === 1) {
            $("#judge-diary").text("法官日记");
            $("header").remove();//移除多余文字
            sure.text("返回");
            main.css("marginTop", "4.5rem");
            statePeople.css("pointer-events", "none");//让点击事件失效
        }
    }
    var myClick = "杀个人再走嘛";

    var dieNum;
    statePeople.click(function () {
        myClick = true;
        var word = $(".word");
        word.removeClass("death");//每次点击前清除背景颜色
        $(".box-hidden").css("opacity", "0");//点击前先隐藏掉刀子，避免点击另一个盒子后，前一个盒子一直显示.
        $(this).children(".box-hidden").css("opacity", "1");//获取当前对象下所有子元素.box-hidden并显示

        dieNum = $(this).index();//获取下标
        //按下确定按钮后添加death样式，人物框变色。
        if (deadPeople[dieNum].role === "杀手" && history2[0].look === 1) {
            myClick = "杀个人再走嘛";
            alert("自己人，大哥!")
        } else {
            word.eq(dieNum).addClass("death");
            console.log(deadPeople[dieNum]);
        }
    });

    sure.click(function () {
        if (myClick === true) {
            //存储死亡状态
            deadPeople[dieNum].state = "dead";
            sessionStorage.setItem("status", JSON.stringify(deadPeople));
            console.log(deadPeople[dieNum]);

            //将死亡状态存入历史记录数组,方便流程页历史记录引用
            var deadKill = deadPeople[dieNum].num + "号被杀手杀死，真实身份是水民";
            var voteKill = deadPeople[dieNum].num + "号被投票投死，真实身份是" + deadPeople[dieNum].role;
            history2[history2[0].count - 1].deadKill = deadKill;
            history2[history2[0].count - 1].voteKill = voteKill;
            history2[0].look = 1;

            //判断剩余人数
            var killNum = 0;
            var voteNum = 0;
            for (i = 0; i < deadPeople.length; i++) {
                if (deadPeople[i].role === "水民" && deadPeople[i].state === "alive") {
                    killNum++;
                }
                if (deadPeople[i].role === "杀手" && deadPeople[i].state === "alive") {
                    voteNum++;
                }
            }
            history2[0].killNum = killNum;
            history2[0].voteNum = voteNum;
            sessionStorage.setItem("myHistory", JSON.stringify(history2));

            if (history2[0].voteNum === 0 ||
                history2[0].killNum === 0 ) {
                history2[0].look = 1;
                // sessionStorage.setItem("myHistory", JSON.stringify(history2));
                window.location.href = "../html/js-2-7.html";
            } else {
                window.history.back();
            }
        } else if (history2[0].godLook === 1) {
            window.history.back();
        } else {
            alert(myClick);
        }//判断是否点击了人物框
    })
});