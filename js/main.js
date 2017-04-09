/**
 * Created by WO on 2017/4/2.
 */
require.config({
    paths: {
        jquery: 'jquery-3.2.0.min',
        jqueryUI:'jquery-ui-1.10.3.min'
    }
});
require(['jquery', 'window'], function ($, w) {
    $("#btn").click(function () {
        var win = new w.Window();
        win.alert({
            width: 300,
            height: 200,
            y:30,
            title:"我是弹框",
            contant:"你是羊羊猫",
            okBtnText: 'OK',
            hasModal:true,
            isDraggable: true,
            hasAlertHandler: function(){alert('男神确定要关闭吗？')},
            hasCloseBtn: true,
            hasCloseHandler: function(){alert('不要关闭我啊？')}
            //hasClassName: 'window_skin_a'
        }).on("alert",function(){
            alert('我是第二个弹框');
        }).on("close",function(){alert('我就要关闭你，哼！');})
    });
    $("#btn2").click(function () {
        var win = new w.Window();
        win.confirm({
            width: 300,
            height: 200,
            y:30,
            title:"我是弹框",
            contant:"你是羊羊猫",
            confirmBtnText:"confirm",
            cancelBtnText: "cancel",
            hasModal:true,
            isDraggable: true,
            hasConfirmHandler: function(){alert('男神确定要关闭吗？')},
            //hasCloseBtn: true,
            hasCancelHandler: function(){alert('不要关闭我啊？')}
            //hasClassName: 'window_skin_a'
        }).on("alert",function(){
            alert('我是第二个弹框');
        }).on("close",function(){alert('我就要关闭你，哼！');})
    });
    $("#btn3").click(function () {
        var win = new w.Window();
        win.prompt({
            width: 300,
            height: 200,
            y:30,
            title:"请输入你的信息",
            contant:"请输入",
            promptBtntext:"prompt",
            cancelBtnText: "cancel",
            hasModal:true,
            //ispromptInputPassword:true,
            defaultPromptInputText:"羊羊猫",
            maxLengthPromptInput:8,
            isDraggable: true,
            haspromptBtnHandler: function(inputVal){alert('您输入的内容是'+inputVal)},
            //hasCloseBtn: true,
            hasCancelHandler: function(){alert('不要关闭我啊？')}
            //hasClassName: 'window_skin_a'
        })
    });
    $("#btn4").click(function () {
        var win = new w.Window();
        win.common({
            width: 300,
            height: 200,
            y:30,
            hasCloseBtn:true,
            hasModal:true,
            contant:"为什么我这么简陋，我不甘心啊！！"
        })
    })

});
