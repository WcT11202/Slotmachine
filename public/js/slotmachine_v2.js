var startSeqs = {};
var startNum = 0;
var bettime = "";

// jQuery FN
$.fn.playSpin = function (options) {
    if (this.length) {
        if ($(this).is(':animated')) return; // Return false if this element is animating
        startSeqs['mainSeq' + (++startNum)] = {};
        $(this).attr('data-playslot', startNum);

        var total = this.length;
        var thisSeq = 0;

        // Initialize options
        if (typeof options == 'undefined') {
            options = new Object();
        }

        // Pre-define end nums
        var endNums = [];
        if (typeof options.endNum != 'undefined') {
            if ($.isArray(options.endNum)) {
                endNums = options.endNum;
            } else {
                endNums = [options.endNum];
            }
        }

        for (var i = 0; i < this.length; i++) {
            if (typeof endNums[i] == 'undefined') {
                endNums.push(0);
            }
        }

        startSeqs['mainSeq' + startNum]['totalSpinning'] = total;
        return this.each(function () {
            options.endNum = endNums[thisSeq];
            startSeqs['mainSeq' + startNum]['subSeq' + (++thisSeq)] = {};
            startSeqs['mainSeq' + startNum]['subSeq' + thisSeq]['spinning'] = true;
            var track = {
                total: total,
                mainSeq: startNum,
                subSeq: thisSeq
            };
            (new slotMachine(this, options, track));
        });
    }
};

var slotMachine = function (el, options, track) {
    var slot = this;
    slot.$el = $(el);

    slot.defaultOptions = {
        easing: 'swing', // String: easing type for final spin
        time: 1600, // Number: total time of spin animation
        loops: 4, // Number: times it will spin during the animation
        manualStop: false, // Boolean: spin until user manually click to stop
        stopSeq: 'leftToRight', // String: sequence of slot machine end animation, random, leftToRight, rightToLeft
        endNum: 0, // Number: animation end at which number/ sequence of list
        onEnd: $.noop, // Function: run on each element spin end, it is passed endNum
        onFinish: $.noop // Function: run on all element spin end, it is passed endNum
    };



    slot.init = function () {
        slot.options = $.extend({}, slot.defaultOptions, options);
        slot.setup();
        slot.startSpin();
    };

    slot.setup = function () {
        var $li = slot.$el.find('li');
        slot.liHeight = $li.innerHeight();
        slot.liCount = (slot.$el.children().length);
        slot.listHeight = slot.liHeight * slot.liCount;
        slot.spinSpeed = (slot.options.time / slot.options.loops);
        $li.clone().appendTo(slot.$el); // Clone to last row for smooth animation
        //console.log($li.clone())
        // Configure stopSeq
        if (slot.options.stopSeq == 'leftToRight') {
            if (track.subSeq != 1) {
                slot.options.manualStop = true;
            }
        } else if (slot.options.stopSeq == 'rightToLeft') {
            if (track.total != track.subSeq) {
                slot.options.manualStop = true;
            }
        }
    };

    slot.startSpin = function () {

        slot.$el
            .css('top', -slot.listHeight)
            .animate({
                'top': '230px'
            }, slot.spinSpeed, 'linear', function () {
                slot.lowerSpeed();
            });
        $('#jackpot').text(0)
            gameRA=[];
    };

    slot.lowerSpeed = function () {
        slot.loopCount++;

        if (
            (slot.options.manualStop && startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['spinning'])) {
            slot.startSpin();
        } else {
            slot.endSpin();
        }
    };

    slot.endSpin = function () {
        finCount++;

        //console.log(finCount);
        if (slot.options.endNum == 0) {
            //console.log(slot.randomRange(4,slot.liCount));
            slot.options.endNum = slot.randomRange(4, slot.liCount);
        }

        // Error handling if endNum is out of range
        if (slot.options.endNum < 0 || slot.options.endNum > slot.liCount) {
            slot.options.endNum = 1;
        }

        var finalPos = -((slot.liHeight * slot.options.endNum) - slot.liHeight) % 1380; //????????????

        var finalSpeed = fp; //????????????

        slot.$el
            .css('top', -slot.listHeight)
            .animate({
                'top': finalPos
            }, finalSpeed, slot.options.easing, function () {
                //console.log(slot.liCount)

                if (slot.liCount > 7) { //??????????????????(????????????????????????
                    for (i = 0; i < 7; i++) {
                        for (j = 0; j < 2; j++) {
                            slot.$el.find("li").last().remove();
                        }
                    }
                }
                slot.endAnimation(slot.options.endNum);
                if ($.isFunction(slot.options.onEnd)) {
                    slot.options.onEnd(slot.options.endNum);
                }
            });
        var temp = finCount % 5;
        setTimeout(function () {
            endSound.play() //??????????????? ????????????
        }, fp*2/5)

        if (temp != 0) {

            // console.log("running")
        } else {
            ingSound.pause(); //sloting????????????
            setTimeout(function () {
                winTotal = 0;
                var index = [];
                var startBal = parseFloat($("#result").text()); //???????????????
                var bet = parseFloat($('#bet').val());
                //console.log(startBal)
                for (i = 0; i < tempcss.length; i++) { //????????????????????????index
                    index[i] = Math.floor(Math.abs(parseInt(tempcss[i].style.top) / 200))
                }
                resultIndex(slotR, index); //????????????         
                bonusCacl(slotR, score);
                console.log(gameRA)
                // console.log(gameRA)
                if (winTotal != 0) {
                    winSound.play();
                    console.log("This game wins:" + winTotal)
                    $('#jackpot').text(winTotal)
                } else {
                    gameRA.push("Null")
                    console.log("This game lost:" + bet)
                }
                var endBal = parseFloat($("#result").text());
                console.log(endBal)
                console.log((bettime))
                $.ajax({ //??????????????????
                    type: "put",
                    url: "/game/user",
                    data: {
                        UserWallet: endBal
                    }
                });

                $.ajax({ //?????????????????????db
                    type: "post",
                    url: "/game/addresults",
                    data: {
                        betTime: bettime, //????????????
                        bets: bet*50, //????????????
                        moneyBefore: startBal + (bet*50), //???????????????
                        status:gameRA.toString(),//????????????
                        result: endBal - (startBal + (bet*50)), //?????????
                        moneyAfter: endBal //???????????????
                    }
                })
                setTimeout(function () { //??????canvas??????
                    ctx.clearRect(0, 0, rwdW, rwdH);
                   $("#btnStart").removeAttr("disabled");
                }, fp*2)

            }, fp*2);
            return slotR;
        }

    }

    slot.endAnimation = function (endNum) {
        if (slot.options.stopSeq == 'leftToRight' && track.total != track.subSeq) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq + 1)]['spinning'] = false;
        } else if (slot.options.stopSeq == 'rightToLeft' && track.subSeq != 1) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq - 1)]['spinning'] = false;
        }
        startSeqs['mainSeq' + track.mainSeq]['totalSpinning']--;
        startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['endNum'] = endNum;
    }

    slot.randomRange = function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    };

    this.init();

};