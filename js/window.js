/**
 * Created by WO on 2017/4/2.
 */
define(['jquery','jqueryUI','widget'], function ($,$UI,widget) {
    function Window() {
        this.CFG = {
            width:400,
            height:200,
            title: '我是大神',
            content:'羊羊猫',
            hasCloseBtn:false,
            hasClassName :null,
            okBtnText:'确定',
            hasAlertHandler:null,
            hasCloseHandler:null,
            hasModal: false,
            isDraggable: false,
            isClickModal:true,
            //实现confirm方法参数
            confirmBtnText:'确定',
            cancelBtnText:'取消',
            hasConfirmHandler:null,
            hasCancelHandler:null,
            //实现prompt方法参数
            promptBtntext:'确定',
            //promptCancelBtntext:'取消',
            haspromptBtnHandler:null,
            //haspromptCancelBtnHandler:null,
            ispromptInputPassword:false,
            defaultPromptInputText: '',
            maxLengthPromptInput: 10
            };
    }

    Window.prototype = $.extend({},new widget.Widget(),{
        alert: function (cfg) {
             $.extend(this.CFG,cfg,{winType:"alert"});
            this.render();
            return this;
        },
        confirm: function(cfg){
            $.extend(this.CFG,cfg,{winType:"confirm"});
            this.render();
            return this;
        },
        prompt: function(cfg){
            $.extend(this.CFG,cfg,{winType:"prompt"});
            this.render();
            this._promptInput.focus();
            return this;
        },
        common: function(cfg){
            $.extend(this.CFG,cfg,{winType:"common"});
            this.render();
            return this;
        },
        renderUI: function(){
            var footerContent = {};
            switch (this.CFG.winType){
                case "alert":
                    footerContent = '<input class="window_okBtn" type="button" value="'+this.CFG.okBtnText+'">';
                    break;
                case "confirm":
                    footerContent = '<input class="window_confirmBtn" type="button" value="'+this.CFG.confirmBtnText+'">'+
                                    '<input class="window_cancelBtn" type="button" value="'+this.CFG.cancelBtnText+'">';
                    break;
                case "prompt":
                    this.CFG.content += '<p class="window_promptInputWrapper"><input type="'+ (this.CFG.ispromptInputPassword?"password":"text") + '" value="'+this.CFG.defaultPromptInputText+'" maxlength="'+this.CFG.maxLengthPromptInput+'" class="window_promptInput">'+'</p>'
                    footerContent =  '<input class="window_promptBtn" type="button" value="'+this.CFG.promptBtntext+'">'+
                                     '<input class="window_cancelBtn" type="button" value="'+this.CFG.cancelBtnText+'">';
            }
            this.Box = $('<div class="window_Box"><div class="window_body">'+this.CFG.content+'</div></div>');

            if(this.CFG.winType != "common"){
                this.Box.prepend('<div class="window_header">'+this.CFG.title+'</div>');
                this.Box.append('<div class="window_footer">'+ footerContent+'</div>');
            }

            if(this.CFG.hasModal){
                this.modal = $('<div class="modal_dialog"></div>');
                $('body').append(this.modal);
            }
            if(this.CFG.hasCloseBtn){
                var closeBtn = $('<span class="window_closeBtn" >X</span>');
                this.Box.append(closeBtn);
            }
            //$('body').append(this.Box);
           this._promptInput = this.Box.find('.window_promptInput');
        },
        bindUI: function(){
            var that = this;
            this.Box.delegate(".window_closeBtn",'click',function(){
                that.fire("close");
                that.destory();
            }).delegate(".window_okBtn","click",function(){
                that.fire('alert');
                that.destory();
            }).delegate(".window_confirmBtn",'click',function(){
                that.fire('confirm');
                that.destory();
            }).delegate(".window_cancelBtn",'click',function(){
                that.fire('cancel');
                that.destory();
            }).delegate(".window_promptBtn",'click',function(){
                that.fire('prompt', that._promptInput.val());
                that.destory();
            });
            if(this.CFG.hasAlertHandler){
                this.on("alert",this.CFG.hasAlertHandler);
            }
            if(this.CFG.hasCloseHandler){
                this.on("close",this.CFG.hasCloseHandler);
            }
            if(this.CFG.hasConfirmHandler){
                this.on('confirm',this.CFG.hasConfirmHandler);
            }
            if(this.CFG.hasCancelHandler){
                this.on('cancel',this.CFG.hasCancelHandler);
            }
            if(this.CFG.haspromptBtnHandler){
                this.on("prompt",this.CFG.haspromptBtnHandler);
            }
            if(this.CFG.isClickModal){
                $(".modal_dialog").click(function(){
                    that.destory();
                })

            }
        },
        syncUI: function(){
            this.Box.css({
                'width':this.CFG.width+'px',
                'height':this.CFG.height+'px',
                'left':(this.CFG.x || (window.innerWidth-this.CFG.width)/2)+'px',
                'top':(this.CFG.y || (window.innerHeight-this.CFG.height)/2)+'px'
            });
            if(this.CFG.hasClassName){
                this.Box.addClass(this.CFG.hasClassName)
            }
            if(this.CFG.isDraggable){
                this.Box.draggable({handle: ".window_header",cursor: "move",scroll: false});
            }
        },
        destructor: function(){
            this.modal && this.modal.remove();
        }
        });
    return {
        Window: Window
    }
});