/**
 * Created by WO on 2017/4/3.
 */
define(['jquery'],function ($) {
    var Widget = function () {
        this.Box = null;//属性，最外层容器
    };
    Widget.prototype = {
        on: function (type, handler) {
            if (typeof this.handlers[type] == "undefined") {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire: function (type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](data);
                }
            }
        },
        render: function(container){
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container||document.body).append(this.Box);
        },
        destory: function(){
            this.destructor();
            this.Box.off();
            this.Box.remove();
        },
        renderUI: function(){},//接口，创建dom节点
        bindUI: function(){},//接口，监听事件
        syncUI: function(){},//接口，初始化组件属性
        destructor:function(){}//接口，销毁前的处理函数
    };
    return {
        Widget: Widget
    }
});