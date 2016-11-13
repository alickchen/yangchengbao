
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


            var level = 0;
            var currentlevel=0;
            var questionbase={};
            var stagequestions=[];
            var time = 120;
            var quenumtext =["第一题","第二题","第三题","第四题","第五题","第六题"];
            var syssecond;
            var intervalobj;
            var queindex = 0;
            var daan = "";
            var rightnum = 0;


            var linshidata= {"level0":{"time":120,"questions":[{"img":"image/level0/拜神唔見雞.png","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]},"level1":{"time":110,"questions":[{"img":"image/modelpic-1.jpg","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]},"level2":{"time":100,"questions":[{"img":"image/modelpic-1.jpg","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]},"level3":{"time":80,"questions":[{"img":"image/modelpic-1.jpg","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]},"level4":{"time":100,"questions":[{"img":"image/modelpic-1.jpg","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]},"level5":{"time":100,"questions":[{"img":"image/modelpic-1.jpg","answer":"恭喜发财","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发财了","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜发","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"},{"img":"image/modelpic-1.jpg","answer":"恭喜","words":"恭喜发财对的你没有看错这就是为了凑够二十四个字的"}]}};

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
             	// console.log(">>>>>>>>>>>>>");
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


            function init() {
                initsize();
                // $.getJSON("data.json",function (data) {
                //     questionbase = data;
                // });
              questionbase=  linshidata;
                initStagepanel(level);
                setTimeout(function () {$coverbg.fadeOut(500)}, 1 )
            }
            function initsize(){

                var height = $(window).height();
                var width = $(window).width();
                $questionpic.css("max-height",height-0.85*width);
            }


            function startChallenge (i){
                stagequestions = questionbase["level"+i].questions;
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
                      for (var i=0; i<item.answer.length;i++) {
                          $("<span class='anser-word'></span>").click(answerclick).appendTo($answerbox);
                      }
                      $.each(item.words.split(""),function (index,word){
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
                    for (var i=0; i<  $wordsbox.find(".selected").size();i++) {
                         if ($wordsbox.find(".selected").eq(i).text()==word){
                            $wordsbox.find(".selected").eq(i).removeClass("selected");
                            break;
                        }
                    }
                }
            }
            
            function wordclick() {
                var word = $(this).text();
                if($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                   for (var i=0; i< $answerbox.find(".anser-word").size();i++) {
                       if (  $answerbox.find(".anser-word").eq(i).text()==word){
                              $answerbox.find(".anser-word").eq(i).empty();
                            break;
                        }
                    }
                }else {
                    for (var i=0; i< $answerbox.find(".anser-word").size();i++) {
                        if (!$answerbox.find(".anser-word").eq(i).text()) {
                            $answerbox.find(".anser-word").eq(i).text(word);
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
                        $record.html(" <div class='record-text'><h2>第一關完成</h2><p>恭喜你叻過0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>醒水童生</div>");
                        $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                        if (currentlevel==level){level+=1};
                        break;
                        case 1:
                         $record.html(" <div class='record-text'><h2>第二關完成</h2><p>恭喜你叻過0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>得戚秀才</div>");
                         $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                        case 2:
                          $record.html(" <div class='record-text'><h2>第三關完成</h2><p>恭喜你叻過0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>招積舉人</div>");
                        $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                        case 3:
                          $record.html(" <div class='record-text'><h2>第四關完成</h2><p>恭喜你叻過0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>巴閉貢士</div>");
                          $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                         case 4:
                          $record.html(" <div class='record-text'><h2>第五關完成</h2><p>恭喜你叻過0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>威水進士</div>");
                          $finishlink.removeClass("retry").addClass("continue").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          if (currentlevel==level){level+=1};
                          break;
                          default:
                          $record.html(" <div class='record-text'><h2>第六關完成</h2><p>恭喜你揮低曬0000位自己友，</p><p>並獲得提名：</p> </div><div class='record-title'>鳩屎狀元</div> <h2 class='more-text'>巧犀利啊!</h2>");
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
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>0000位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                        $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                        break;
                        case 2:
                          $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>0000位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback' ></span>  <span class='f-link share'></span>");
                          break;
                        case 3:
                         $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>0000位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          break;
                         case 4:
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>0000位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback ' ></span>  <span class='f-link share'></span>");
                          break;
                         default:
                        $record.html(" <div class='record-text'><h2>挑戰失敗</h2><p>不過你已經醒過</p><p>0000位自己友！</p> </div><div class='record-title'>再戰一局</div>");
                          $finishlink.removeClass("continue").addClass("retry").html( "<a class='f-link' href='#''></a> <span  class='f-link goback retry' ></span>  <span class='f-link share'></span>");
                          break;
                        }
                 }
                   $finishlink.find(".goback").click(function(){
                     $finishpage.hide();
                      $readypage.show();
                   });
                 $answerpage.hide();
                 $finishpage.show();
                  rightnum =0;
                  queindex = 0;
                  initStagepanel(level);
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

        });
