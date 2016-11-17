//数组随机排序
Array.prototype.randomSort=function() {
    var arr = [].concat(this);
    var _arr = [];
    var length = arr.length;
    for(var i=0; i<length; i++)
    {
        var random = Math.floor(Math.random() * arr.length);
        _arr = _arr.concat(arr.splice(random, 1));
    }
    return _arr;
};


        $(function () {
            var $coverbg = $(".cover-bg");

            var $readypage = $(".ready-page");
            var $stagetext = $(".ready-page .stage-text");
            var $stagepanel = $(".ready-page .stage-panel");
            var $stageimg = $(".ready-page .stage-panel .stage-box img");
            var $rules = $(".ready-page .rules");
            var $rulepanel = $(".ready-page .rule-panel");
            var $ruletext = $(".ready-page  .rule-panel .rule-text");
            var $start = $(".ready-page .rule-panel .start");

            var $answerpage = $(".answer-page");
            var $questionpic = $(".answer-page .question-pic img");
            var $questionnum = $(".answer-page .question-pic .quenum");
            var $answerbox = $(".answer-page .answer-area .answer-box");
            var $wordsbox = $(".answer-page .answer-area .words-box");
            var $restart = $(".answer-page .top-bar .restart");
            var $timer = $(".answer-page .top-bar .timer");
            var $skip = $(".answer-page .top-bar .skip");

            var $finishpage= $(".finish-page");
            var $record= $(".finish-page .record");
            var $finishlink= $(".finish-page .finish-link");
            var $sharecover= $(".finish-page .share-cover");



            var level = 0;
            var record =0;
            var currentlevel=0;
            var questionbase={};
            var stagequestions=[];
            var time = 120;
            var quenumtext =["第一题","第二题","第三题","第四题","第五题","第六题","第七题","第八题","第九题","第十题"];
            var syssecond;
            var intervalobj;
            var queindex = 0;
            var daan = "";
            var rightnum = 0;



            init();

            $start.click(function () {
                initquestion(queindex);
                $readypage.hide();
                $answerpage.show();
                startCounting(time);
                //恢复readypage
                $stagepanel.show();
                $stagetext.show();
                $rulepanel.hide();
                $rules.hide();
            });

            $restart.click(function () {
                    // var r= confirm("确定要重新開始？");
                    // if (r==true) {
                     window.clearInterval(intervalobj);
                      $answerpage.hide();
                      $readypage.show();
                      queindex = 0;
                      rightnum =0;
                    // }
            });

            $skip.click(function () {
                    queindex++;
                    setTimeout(function(){
                    initquestion(queindex)
                    },300)
            });
            $sharecover.click(function () {
                $(this).hide();
            });



            function init() {
                 initsize();
                if (localStorage.getItem("level")){
                    console.log();
                    level = parseInt(localStorage.getItem("level"));
                    record =localStorage.getItem("record");
                }

                $.getJSON("data.json",function (data) {
                    questionbase = data;
                });
              // questionbase=  linshidata;
                initStagepanel(level);
                setTimeout(function () {$coverbg.fadeOut(500)}, 3000 )
            }
            function initsize(){

                var height = $(window).height();
                var width = $(window).width();
                $questionpic.css("max-height",height-0.85*width);
            }


            function startChallenge (i){
                stagequestions = questionbase["level"+i].questions.randomSort();
                stagequestions = stagequestions.randomSort();
                time = questionbase["level"+i].time;
                $ruletext.text("在"+time+"秒内完成"+stagequestions.length+"题挑戰");
                $stagepanel.hide();
                $stagetext.hide();
                $rulepanel.show();
                $rules.show();
            }


            function initStagepanel(n) {
                 for (var i=0; i<=n;i++) {
                     $stageimg.eq(i).addClass("active").click(function () {
                      currentlevel = $(this).data("level");
                         startChallenge (currentlevel);
                     })
                 }
            }

            function initquestion(index) {

                var item = stagequestions[index];
                  if(item){
                      $questionpic.attr("src",item.img);
                      $questionnum.text(quenumtext[index]);
                      daan = item.answer;
                      $answerbox.attr({"data-answer":item.answer, "class":"answer-box"}).addClass("answer"+item.answer.length);
                      $answerbox.empty();
                      $wordsbox.empty();
                      var n = item.answer.length;
                      for (var i=0; i<n ;i++) {
                          $("<span class='anser-word'></span>").click(answerclick).appendTo($answerbox);
                      }
                      $.each(item.words.split("").randomSort(),function (index,word){
                          $("<span class='word'></span>").text(word).click(wordclick).appendTo($wordsbox);
                      })
                  }else {
                     sumup();
                  }

            }
            function answerclick() {
                if ($(this).text()){
                    var word = $(this).text();
                    $(this).empty();
                    var $selectedword = $wordsbox.find(".selected");
                    var n = $selectedword.size();
                    for (var i=0; i<n ;i++) {
                         if ($selectedword.eq(i).text()==word){
                             $selectedword.eq(i).removeClass("selected");
                            break;
                        }
                    }
                }
            }
            
            function wordclick() {
                var word = $(this).text();
                var $answerword = $answerbox.find(".anser-word");
                var n = $answerword.size();
                if($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                   for (var i=0; i< n ;i++) {
                       if (  $answerword.eq(i).text()==word){
                             $answerword.eq(i).empty();
                            break;
                        }
                    }
                }else {
                    for (var i=0; i< n ;i++) {
                        if (!$answerword.eq(i).text()) {
                            $answerword.eq(i).text(word);
                            $(this).addClass("selected");
                            break;
                        }
                    }
                    checkanswer();
                }
            }
            function checkanswer() {
                var answer ="";
                $answerbox.find(".anser-word").each(function () {
                    answer= answer + $(this).text();
                });

                if (answer == daan){
                    queindex++;
                     rightnum++;
                    setTimeout(function(){
                    initquestion(queindex)
                    },300)
                }
            }
            function sumup() {
                window.clearInterval(intervalobj);
                 if ( rightnum/stagequestions.length >0.6){

                        switch(currentlevel)
                        {
                        case 0:
                        record = randomNum(500,1000);
                        $record.html(" <div class='record-text'><h2>第一關完成</h2><p>恭喜你叻過"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>醒水童生</div>");
                        $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                        if (currentlevel==level){level+=1};
                        break;
                        case 1:
                         record = randomNum(1000,2000);
                         $record.html(" <div class='record-text'><h2>第二關完成</h2><p>恭喜你叻過"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>得戚秀才</div>");
                         $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                        case 2:
                          record = randomNum(2000,3000);
                          $record.html(" <div class='record-text'><h2>第三關完成</h2><p>恭喜你叻過"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>招積舉人</div>");
                        $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                        case 3:
                          record = randomNum(3000,4000);
                          $record.html(" <div class='record-text'><h2>第四關完成</h2><p>恭喜你叻過"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>巴閉貢士</div>");
                          $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                         case 4:
                          record = randomNum(4000,5000);
                          $record.html(" <div class='record-text'><h2>第五關完成</h2><p>恭喜你叻過"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>威水進士</div>");
                          $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                          default:
                          record = randomNum(5000,6000);
                          $record.html(" <div class='record-text'><h2>第六關完成</h2><p>恭喜你揮低曬"+record+"位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>鳩屎狀元</div> <h2 class='more-text'>巧犀利啊!</h2>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                          break;
                        }

                 } else {

                  switch(currentlevel)
                        {
                        case 0:
                        $record.html(" <div class='record-text'><h2>一關不過...</h2><p>恭喜你做包尾友，</p><p>獲得提名：</p> </div><div class='record-title'>弱雞書僮</div>");
                        $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                        break;
                        case 1:
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>"+record+"位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                        $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                        break;
                        case 2:
                          $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>"+record+"位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                          break;
                        case 3:
                         $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>"+record+"位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          break;
                         case 4:
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>"+record+"位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          break;
                         default:
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>"+record+"位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback retry' ></span>  <span class='f-link share'></span>");
                          break;
                        }
                 }
               $finishlink.find(".goback").click(function(){
                  $finishpage.hide();
                  $readypage.show();
               });
                $finishlink.find(".share").click(function () {
                    $sharecover.show();
                });




                 $answerpage.hide();
                 $finishpage.show();
                  rightnum =0;
                  queindex = 0;
                  initStagepanel(level);
                  localRecord(level,record);
            };
            function startCounting(second) {
                syssecond = second;
                setRemainTime();
                intervalobj = window.setInterval(setRemainTime, 1000);
            }

            function setRemainTime() {
                if (syssecond > 0) {
                    syssecond = syssecond - 1;
                    var second = Math.floor(syssecond % 60);
                    var minite = Math.floor((syssecond / 60) % 60);
                    $timer.text( minite + "’" + second + "”");
                } else {
                    sumup();
                }
            }
            function randomNum(Min,Max){
                var Range = Max - Min;
                var Rand = Math.random();
                var num = Min + Math.round(Rand * Range);
                return num;
            }
            function localRecord(l,r) {
                if(window.localStorage){
                    localStorage.setItem("level", l);
                    localStorage.setItem("record", r);
                }
            }

        });
