define(function(require, exports, module){
    'use strict';
    var $$dialog = require('dialog.js');
    var $$slider = require('slider.js');
    var index = {
        index: function(){
            $('.btn').on('click',function(){
                $$dialog.show('确定要退出？',function(data){
                    if(data == 1){
                        console.log('确定');
                    }else if(data == 0){
                        console.log('取消');
                    }
                });
            });
            
        },
        slider: function(){
            $$slider.slider('slider', {
                interval: 3000,
                activeClass: 'active'
            });
        }
    };
    module.exports = index;
});