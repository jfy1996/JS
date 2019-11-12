function back() {
    window.history.back();
}

var peopleState = JSON.parse(sessionStorage.getItem("myStatus"));
console.log(peopleState);
var myNumber = JSON.parse(sessionStorage.getItem("number"));
console.log(myNumber);
// for (var i = 0; i < peopleState.length; i++) {

// var boxDay = $(".box-day");
// for (i = 0; i < myNumber.length; i++) {
//     if (myNumber[i] === 1) {
//         var text1 =
//             "<p class='kill-message'>\n" + peopleState.num + "号被杀手杀死，真实身份是" + peopleState.role + "</p>";
//         boxDay.eq(0).after(text1);
//
//         // $(".kill-message").eq(0).show();
//
//     } else if (myNumber[i] === 2) {
//         var text2 =
//             "<p class='kill-message'>\n" + peopleState.num + "号被投票投死，真实身份是" + peopleState.role + "</p>";
//         boxDay.eq(3).after(text2);
//         // $(".kill-message").eq(1).show();
//     }
// }

// }
var kill = $("#killer");
var state = sessionStorage.getItem("state");
if (state === null) {
    state = "step1";
} else if (state === "step2") {
    kill.addClass("over");
}

//状态机
var fsm = new StateMachine({
    init: state,
    transitions: [
        {name: "kill", from: "step1", to: "step2"},
        {name: "ghost", from: "step2", to: "step3"},
        {name: "speak", from: "step3", to: "step4"},
        {name: "vote", from: "step4", to: "step1"}
    ]

    // methods: {
    // onInvalidTransition: function (transition, from, to) {
    //     switch (from) {
    //         case "step1":
    //             alert("按照顺序，请杀手杀人");
    //             break;
    //
    //         case "step2":
    //             alert("按照顺序，请亡灵发言");
    //             break;
    //
    //         case "step3":
    //             alert("按照顺序，请玩家发言");
    //             break;
    //
    //         case "step4":
    //             alert("按照顺序，请投票");
    //             break;
    //     }
    // },

    // onKill: function () {
    //     console.log(fsm.state);
    //     $("#killer").addClass("over");
    // },
    //
    // onGhost: function () {
    //     console.log(fsm.state);
    //     $("#ghost").addClass("over");
    // },
    //
    // onSpeak: function () {
    //     console.log(fsm.state);
    //     $("#player").addClass("over");
    // },
    //
    // onVote: function () {
    //     console.log(fsm.state);
    //     $("#vote").addClass("over");
    // }
    // }
});

var killOrVote = [];
kill.click(function () {
    if (fsm.state === "step1") {
        var look = 1;
        sessionStorage.setItem("see", JSON.stringify(look));
        fsm.kill();
        state = fsm.state;
        console.log(state);
        $("#killer").addClass("over");
        var num = 1;
        killOrVote.push(num);
        sessionStorage.setItem("number", JSON.stringify(killOrVote));
        sessionStorage.setItem("state", state);
        window.location.href = "../js-2-6/js-2-6.html";
    } else {
        alert("请按照顺序进行");
    }

});

$("#ghost").click(function () {
    var look = 1;
    sessionStorage.setItem("see", JSON.stringify(look));
    if (fsm.state === "step2") {
        alert("亡灵发表遗言");
        fsm.ghost();
        state = fsm.state;
        console.log(state);
        $("#ghost").addClass("over");
        sessionStorage.setItem("state", state);
    } else {
        alert("请按照顺序进行");

    }

});

$("#player").click(function () {
    var look = 1;
    sessionStorage.setItem("see", JSON.stringify(look));
    if (fsm.state === "step3") {
        alert("玩家依次发言");
        fsm.speak();
        state = fsm.state;
        console.log(state);
        $("#player").addClass("over");
        sessionStorage.setItem("state", state);
    } else {
        alert("请按照顺序进行");
    }

});

$("#vote").click(function () {
    // var look = 1;
    // sessionStorage.setItem("see", JSON.stringify(look));
    if (fsm.state === "step4") {
        fsm.vote();
        var num = 2;
        killOrVote.push(num);
        state = fsm.state;
        console.log(state);
        $("#vote").addClass("over");
        sessionStorage.setItem("number", JSON.stringify(killOrVote));
        sessionStorage.setItem("state", state);
        window.location.href = "../js-2-6/js-2-6.html";
    } else {
        alert("请按照顺序进行");
    }

});

$("#diary").click(function () {
    var look = 2;
    sessionStorage.setItem("see", JSON.stringify(look));
    window.location.href = "../js-2-6/js-2-6.html";
});




