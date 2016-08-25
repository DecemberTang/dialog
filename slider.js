define(function(require, exports, module){
    'use strict';

    var slider = {
        slider: function(id,options){
            var wrap = document.getElementById(id);
            var num = $('#'+id+' li').length;
            var navtpl = '';
            // for(var i=0; i<num; i++){
            //     navtpl+='<li></li>';
            // }
            // $('.nav').html($(navtpl));
            $('.img-ul').width(num * $('#'+id+' li').width());
            var iscroll = new IScroll(wrap, {
                disableMouse: false,
                disablePointer: false,
                scrollX: true,
                momentum: false,
                snap: 'li'
            });
            var i=0;//当前显示的li
            var nav = $('.nav');
            var scroll=function(){
                //nav.eq(i).removeClass(options.activeClass);
                i++;
                if (i == num) {
                    iscroll.goToPage(0, 0, 300);  
                    i = 0;  
                } else {  
                    iscroll.next(); //滚到下一页 
                } 
                //nav.eq(i).addClass(options.activeClass);
            };
            setInterval(scroll,options.interval);
        }
    };
    module.exports = slider;
});
