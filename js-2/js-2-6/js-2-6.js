'use strict';


$(function () {
    var deadPeople = JSON.parse(sessionStorage.getItem("status"));
    console.log(deadPeople);
    var myNumber = JSON.parse(sessionStorage.getItem("number"));
    console.log(myNumber);

    var watch = JSON.parse(sessionStorage.getItem("see"));
    console.log(watch);

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
    for (var i = 0; i < deadPeople.length; i++) {
        $("main").append(Player(deadPeople[i].role, i));
        statePeople = $(".box-people");

        if (deadPeople[i].state === "dead"&&watch === 1) {
            statePeople.eq(i).css("pointer-events", "none");//让点击事件失效
            $(".word").eq(i).css("backgroundColor", "#C9C9C9");
        } else if (deadPeople[i].state === "dead"&&watch === 2) {
            statePeople.eq(i).css("pointer-events", "none");//让点击事件失效
            $(".word").eq(i).css("backgroundColor", "#C9C9C9");
        }
    }
    var myClick = "杀个人再走嘛";

    var dieNum;
    statePeople.click(function () {
        myClick = true;
        var word = $(".word");
        word.removeClass("death");//每次点击前清除背景颜色
        $(".box-hidden").hide();//点击前先隐藏掉刀子，避免点击另一个盒子后，前一个盒子一直显示.
        $(this).children(".box-hidden").show();//获取当前对象下所有子元素.box-hidden并显示
        dieNum = $(this).index();//获取下标

        //按下确定按钮后添加death样式，人物框变色。
        if (deadPeople[dieNum].role === "杀手" && myNumber[0] === 1) {
            myClick = "杀个人再走嘛";
            alert("自己人，大哥!")
        } else {
            word.eq(dieNum).addClass("death");
            console.log(deadPeople[dieNum]);
        }
    });

    $("#sure").click(function () {
        if (myClick === true) {
            //存储死亡状态
            deadPeople[dieNum].state = "dead";
            sessionStorage.setItem("status", JSON.stringify(deadPeople));
            sessionStorage.setItem("myStatus", JSON.stringify(deadPeople[dieNum]));
            console.log(deadPeople[dieNum]);
            window.history.back();
        }
        else if (watch===2) {
            window.history.back();
        }else {
            alert(myClick);
        }//判断是否点击了人物框

    })

});