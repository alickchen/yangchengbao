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


            var level = 0;
            var record =0;
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


            var linshidata= {"level0":{"time":120,"questions":[{"img":"image/level0/level0-1.png","answer":"拜神唔見雞","words":"看拜火甲是郎哮地新雉唔仙買年神好聚我見吉封才生雞"},{"img":"image/level0/level0-2.png","answer":"包二奶","words":"喜心溝包瘦厲女有罩黑成勁嘟二竹人一粉愛胸了好意奶"},{"img":"image/level0/level0-3.png","answer":"畀心機","words":"了嘢二心冇笑雞得飛加炸穀畀買機翅形天口空惗千叻要"},{"img":"image/level0/level0-4.png","answer":"賣剩蔗","words":"個買咁佬雇節碌了賣背心剩下杆甘一蔗男斷囧竹食咗成"},{"img":"image/level0/level0-5.png","answer":"三腳貓功夫","words":"三手尾利踢腳貓打大做想公功是夫片喵動大犀飛肥我毛"},{"img":"image/level0/level0-6.png","answer":"銷魂","words":"消雨人高站魂情及快東夾光頂銷暈處已心雲新蘊安燦下"},{"img":"image/level0/level0-7.png","answer":"笑騎騎","words":"容地騎方發裡謝口笑碼芒啊花騎發哥咁點馬系仨毛飛飲"},{"img":"image/level0/level0-8.png","answer":"一手一脚","words":"好穿柱一木霖千是人手门男一心怀才脚望好冻指东姐人"}]},"level1":{"time":110,"questions":[{"img":"image/level1/level1-1.png","answer":"車大炮","words":"馬頂樹炮憨唔吹斑水雞佬婆唔車頭硬大神賀上拜線見壽"},{"img":"image/level1/level1-2.png","answer":"打斧頭","words":"七賭氣打二輸客著罩皇宜便未頭房為一家家有兩十意斧"},{"img":"image/level1/level1-3.png","answer":"放飛機","words":"有嘢二放先啦信風我加拜講飛買機箏山扯留吖返你唔信"},{"img":"image/level1/level1-4.png","answer":"冇口齒","words":"冇眼咁佬講嘴定面冇背大口下大話定齒男見囧竹食木人"},{"img":"image/level1/level1-5.png","answer":"食自己","words":"不足己蛇人咬貓象尾做心狗食是自片利狗蛇犀吞肥我貪"},{"img":"image/level1/level1-6.png","answer":"士巴拿","words":"維士汽交站修情及拿暗夾車打器暈處已利員新巴器理人"},{"img":"image/level1/level1-7.png","answer":"物似主人形","words":"及狗殺生特主男丑愛抱人烏馬狗小丑擁似物屋形死小日"},{"img":"image/level1/level1-8.png","answer":"周身蟻","words":"驚鯨手窿遢身屎邋上周大鯨攤木板嚇無拿身謂嘴眼蟻所"}]},"level2":{"time":100,"questions":[{"img":"image/level2/level2-1.png","answer":"車大炮","words":"馬頂樹炮憨唔吹斑水雞佬婆唔車頭硬大神賀上拜線見壽"},{"img":"image/level2/level2-2.png","answer":"打斧頭","words":"七賭氣打二輸客著罩皇宜便未頭房為一家家有兩十意斧"},{"img":"image/level2/level2-3.png","answer":"放飛機","words":"有嘢二放先啦信風我加拜講飛買機箏山扯留吖返你唔信"},{"img":"image/level2/level2-4.png","answer":"冇口齒","words":"冇眼咁佬講嘴定面冇背大口下大話定齒男見囧竹食木人"},{"img":"image/level2/level2-5.png","answer":"食自己","words":"不足己蛇人咬貓象尾做心狗食是自片利狗蛇犀吞肥我貪"},{"img":"image/level2/level2-6.png","answer":"士巴拿","words":"維士汽交站修情及拿暗夾車打器暈處已利員新巴器理人"},{"img":"image/level2/level2-7.png","answer":"物似主人形","words":"及狗殺生特主男丑愛抱人烏馬狗小丑擁似物屋形死小日"},{"img":"image/level2/level2-8.png","answer":"周身蟻","words":"驚鯨手窿遢身屎邋上周大鯨攤木板嚇無拿身謂嘴眼蟻所"}]},"level3":{"time":100,"questions":[{"img":"image/level2/level2-1.png","answer":"車大炮","words":"馬頂樹炮憨唔吹斑水雞佬婆唔車頭硬大神賀上拜線見壽"},{"img":"image/level2/level2-2.png","answer":"打斧頭","words":"七賭氣打二輸客著罩皇宜便未頭房為一家家有兩十意斧"},{"img":"image/level2/level2-3.png","answer":"放飛機","words":"有嘢二放先啦信風我加拜講飛買機箏山扯留吖返你唔信"},{"img":"image/level2/level2-4.png","answer":"冇口齒","words":"冇眼咁佬講嘴定面冇背大口下大話定齒男見囧竹食木人"},{"img":"image/level2/level2-5.png","answer":"食自己","words":"不足己蛇人咬貓象尾做心狗食是自片利狗蛇犀吞肥我貪"},{"img":"image/level2/level2-6.png","answer":"士巴拿","words":"維士汽交站修情及拿暗夾車打器暈處已利員新巴器理人"},{"img":"image/level2/level2-7.png","answer":"物似主人形","words":"及狗殺生特主男丑愛抱人烏馬狗小丑擁似物屋形死小日"},{"img":"image/level2/level2-8.png","answer":"周身蟻","words":"驚鯨手窿遢身屎邋上周大鯨攤木板嚇無拿身謂嘴眼蟻所"}]},"level4":{"time":100,"questions":[{"img":"image/level2/level2-1.png","answer":"車大炮","words":"馬頂樹炮憨唔吹斑水雞佬婆唔車頭硬大神賀上拜線見壽"},{"img":"image/level2/level2-2.png","answer":"打斧頭","words":"七賭氣打二輸客著罩皇宜便未頭房為一家家有兩十意斧"},{"img":"image/level2/level2-3.png","answer":"放飛機","words":"有嘢二放先啦信風我加拜講飛買機箏山扯留吖返你唔信"},{"img":"image/level2/level2-4.png","answer":"冇口齒","words":"冇眼咁佬講嘴定面冇背大口下大話定齒男見囧竹食木人"},{"img":"image/level2/level2-5.png","answer":"食自己","words":"不足己蛇人咬貓象尾做心狗食是自片利狗蛇犀吞肥我貪"},{"img":"image/level2/level2-6.png","answer":"士巴拿","words":"維士汽交站修情及拿暗夾車打器暈處已利員新巴器理人"},{"img":"image/level2/level2-7.png","answer":"物似主人形","words":"及狗殺生特主男丑愛抱人烏馬狗小丑擁似物屋形死小日"},{"img":"image/level2/level2-8.png","answer":"周身蟻","words":"驚鯨手窿遢身屎邋上周大鯨攤木板嚇無拿身謂嘴眼蟻所"}]},"level5":{"time":100,"questions":[{"img":"image/level2/level2-1.png","answer":"車大炮","words":"馬頂樹炮憨唔吹斑水雞佬婆唔車頭硬大神賀上拜線見壽"},{"img":"image/level2/level2-2.png","answer":"打斧頭","words":"七賭氣打二輸客著罩皇宜便未頭房為一家家有兩十意斧"},{"img":"image/level2/level2-3.png","answer":"放飛機","words":"有嘢二放先啦信風我加拜講飛買機箏山扯留吖返你唔信"},{"img":"image/level2/level2-4.png","answer":"冇口齒","words":"冇眼咁佬講嘴定面冇背大口下大話定齒男見囧竹食木人"},{"img":"image/level2/level2-5.png","answer":"食自己","words":"不足己蛇人咬貓象尾做心狗食是自片利狗蛇犀吞肥我貪"},{"img":"image/level2/level2-6.png","answer":"士巴拿","words":"維士汽交站修情及拿暗夾車打器暈處已利員新巴器理人"},{"img":"image/level2/level2-7.png","answer":"物似主人形","words":"及狗殺生特主男丑愛抱人烏馬狗小丑擁似物屋形死小日"},{"img":"image/level2/level2-8.png","answer":"周身蟻","words":"驚鯨手窿遢身屎邋上周大鯨攤木板嚇無拿身謂嘴眼蟻所"}]}};

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


            function init() {
                 initsize();
                if (localStorage.getItem("level")){
                    console.log();
                    level = parseInt(localStorage.getItem("level"));
                    record =localStorage.getItem("record");
                }

                // $.getJSON("data.json",function (data) {
                //     questionbase = data;
                // });
              questionbase=  linshidata;
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
