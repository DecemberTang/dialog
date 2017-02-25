define(function(require, exports, module){
    'use strict';
    var $$url = require('../../util/request-conf.js');
    var $$questionList = require('./question-list.html');
    var $$time = require('../../util/date.js');
    var pageNo = 1;
    var listLength;
    var n_questions = [];

    var question = function($dom,api,scroller,fn){
        var questionWrapper = $dom.find('.global-question-list-w');
        (function () {
            // 初始化
            if(_.isUndefined(fn)){
                pageNo = 1;
                questionWrapper.empty();
                console.log('初始化');
            }
            console.log(!_.isUndefined(fn));
            
        }());
        var wantToKnow = function(data, $this){
            if(data.code === 200){
                $this.addClass('active');
                var $num = $this.closest('.global-question-list-item').find('.global-question-list-itembodyrightleft-num'),
                    num = parseInt($num.text());
                $num.text(++num);
                api.util.toast('想知道成功！','top','50%');
            }else{
                api.util.toast('网络开小差O(∩_∩)O', 'top', '50%');
                //$this.css('pointer-events', 'initial');
            }
            //$this.css('pointer-events', 'initial');
        };
        var eventBind = function(){
            $dom.find('.global-question-list-item').off('tap').on('tap',function(e){
                e.stopPropagation();
                var $this = $(this);
                var qID = $this.data('id');
                api.router.go('questionDetail',{q_id: qID});
            });
            $dom.find('.global-question-list-item-avatar').off('tap').on('tap',function(e){
                e.stopPropagation();
                var $this = $(this);
                var $item = $this.closest('.global-question-list-item');
                $item.removeClass('global-tap-element-highlight');
                var userID = $this.data('id');
                api.router.go('profile',{u_id: userID});
            });
            $dom.find('.global-question-list-itembodyrightright-button').off('tap').on('tap',function(e){
                e.stopPropagation();
                var $this = $(this);
                var $item = $this.closest('.global-question-list-item');
                $item.removeClass('global-tap-element-highlight');
                var qID = $item.data('id');
                $(window).trigger('loginCheck',['normal',function(){
                    if($this.hasClass('active')){
                        return;
                    }
                    else{
                        $this.css('pointer-events','none');
                        $.ajax({
                            type: "POST",
                            url: $$url.wantToKnowPath(qID),
                            dataType: 'json',
                            timeout: 1000,
                            cache: false,
                            success: function(data){
                                wantToKnow(data,$this);
                            },
                            error: function(){
                                wantToKnow({code: 500,msg: '请求错误'},$this);
                            }
                        });    
                    }     
                }]);                
            });
        };

        if (!_.isUndefined(listLength) && questionWrapper.find('.global-question-list-item').length >=listLength && listLength != 0){
            fn('没有更多问题了');
            return;
        }
        
        var getQuestions = function(data){
            if (data.code == 20000){
                console.log(data);
                $dom.find('.question .downUpdate').hide();
                data.data.q_len = 0;
                var html = velocityjs.render($$questionList, data.data);
                $dom.find('.global-question-list-w').append(html);
                return;
            }
            if (data.code == 200 && data.data && data.data.q_list){
                listLength = data.data.q_len;
                n_questions = data.data;
                if (listLength === 0 || listLength <= 5) {
                    $dom.find('.question .downUpdate').hide();
                } else {
                    $dom.find('.question .downUpdate').show();
                }
                for(var i=0; i<data.data.q_list.length; i++){
                    n_questions.q_list[i].restTime = $$time.getListShowTime(n_questions.q_list[i].ctime);
                }
                var html = velocityjs.render($$questionList, n_questions);
                $dom.find('.global-question-list-w').append(html);
                pageNo++;
                eventBind();
                scroller.refresh();
            }else if(data.data.length == 0){
                console.log(data);
                $dom.find('.question .downUpdate').hide();
                n_questions = data.data;
                var html = velocityjs.render($$questionList, n_questions);
                $dom.find('.global-question-list-w').append(html);
            }
            else{
                api.util.toast('网络开小差O(∩_∩)O', 'top', '50%');
            }
            if (_.isFunction(fn)) {
                fn();
            }
        };

        $.ajax({
            url: $$url.getFocusQuestionsPath(1,pageNo,5),
            type: "GET",
            dataType: "json",
            timeout: 1000,
            cache: false,
            success: function(data){
                getQuestions(data);
            },
            error: function(data){
                getQuestions({code: 500, msg: 'error'});
            }
        });

    };
    module.exports = question;
});