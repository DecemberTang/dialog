define(function(require, exports, module){
    'use strict';
    var tpl = null;
    var initDialog = function(title, fn){
        var count = count || 2;
        if(tpl == null){
            tpl = $('<div id="dialog" class="global-dialog">'+
                      '<div class="global-dialog-title">'+title+'</div>'+
                      '<div class="global-dialog-btn-wrap flex">'+
                        '<div class="global-dialog-btn cell">确定</div>'+
                        '<div class="global-dialog-btn cell">取消</div>'+
                      '</div>'+                    
                  '</div>');
            $('body').append(tpl);
            //点击确定
            $('.global-dialog-btn').eq(0).on('click',function(){
                var $this = $(this);
                $this.addClass('active');
                fn(1);
            });
            //点击取消
            $('.global-dialog-btn').eq(1).on('click',function(){
                var $this = $(this);
                $this.addClass('active');
                dialog.hide();
                fn(0);
            });
        }
    };
    var removeDialog = function(){
        if(tpl != null){
            tpl.remove();
            tpl = null;
        }
    };
    var dialog = {
        show: function(title, fn){
            initDialog(title, fn);
        },
        hide: function(){
            removeDialog();
        }
        
    };
    module.exports = dialog;
});