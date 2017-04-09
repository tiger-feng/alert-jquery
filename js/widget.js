/**
 * Created by WO on 2017/4/3.
 */
define(['jquery'],function ($) {
    var Widget = function () {
        this.Box = null;//���ԣ����������
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
        renderUI: function(){},//�ӿڣ�����dom�ڵ�
        bindUI: function(){},//�ӿڣ������¼�
        syncUI: function(){},//�ӿڣ���ʼ���������
        destructor:function(){}//�ӿڣ�����ǰ�Ĵ�����
    };
    return {
        Widget: Widget
    }
});