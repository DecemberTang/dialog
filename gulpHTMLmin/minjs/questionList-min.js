define(function(t,e,i){"use strict";var o,n=t("../../util/request-conf.js"),a=t("./question-list.html"),s=t("../../util/date.js"),l=1,d=[],r=function(t,e,i,r){var u=t.find(".global-question-list-w");!function(){_.isUndefined(r)&&(l=1,u.empty(),console.log("初始化")),console.log(!_.isUndefined(r))}();var f=function(t,i){if(200===t.code){i.addClass("active");var o=i.closest(".global-question-list-item").find(".global-question-list-itembodyrightleft-num"),n=parseInt(o.text());o.text(++n),e.util.toast("想知道成功！","top","50%")}else e.util.toast("网络开小差O(∩_∩)O","top","50%")},c=function(){t.find(".global-question-list-item").off("tap").on("tap",function(t){t.stopPropagation();var i=$(this),o=i.data("id");e.router.go("questionDetail",{q_id:o})}),t.find(".global-question-list-item-avatar").off("tap").on("tap",function(t){t.stopPropagation();var i=$(this),o=i.closest(".global-question-list-item");o.removeClass("global-tap-element-highlight");var n=i.data("id");e.router.go("profile",{u_id:n})}),t.find(".global-question-list-itembodyrightright-button").off("tap").on("tap",function(t){t.stopPropagation();var e=$(this),i=e.closest(".global-question-list-item");i.removeClass("global-tap-element-highlight");var o=i.data("id");$(window).trigger("loginCheck",["normal",function(){e.hasClass("active")||(e.css("pointer-events","none"),$.ajax({type:"POST",url:n.wantToKnowPath(o),dataType:"json",timeout:1e3,cache:!1,success:function(t){f(t,e)},error:function(){f({code:500,msg:"请求错误"},e)}}))}])})};if(!_.isUndefined(o)&&u.find(".global-question-list-item").length>=o&&0!=o)return void r("没有更多问题了");var g=function(n){if(2e4==n.code){console.log(n),t.find(".question .downUpdate").hide(),n.data.q_len=0;var u=velocityjs.render(a,n.data);return void t.find(".global-question-list-w").append(u)}if(200==n.code&&n.data&&n.data.q_list){o=n.data.q_len,d=n.data,0===o||o<=5?t.find(".question .downUpdate").hide():t.find(".question .downUpdate").show();for(var f=0;f<n.data.q_list.length;f++)d.q_list[f].restTime=s.getListShowTime(d.q_list[f].ctime);var u=velocityjs.render(a,d);t.find(".global-question-list-w").append(u),l++,c(),i.refresh()}else if(0==n.data.length){console.log(n),t.find(".question .downUpdate").hide(),d=n.data;var u=velocityjs.render(a,d);t.find(".global-question-list-w").append(u)}else e.util.toast("网络开小差O(∩_∩)O","top","50%");_.isFunction(r)&&r()};$.ajax({url:n.getFocusQuestionsPath(1,l,5),type:"GET",dataType:"json",timeout:1e3,cache:!1,success:function(t){g(t)},error:function(t){g({code:500,msg:"error"})}})};i.exports=r});