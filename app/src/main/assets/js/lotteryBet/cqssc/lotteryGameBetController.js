$(function () {
    // 下注相關  關閉 enter 功能 func
    //dialogController.setUseEnterBtn(false);
    // 取上一期開獎
    //lotteryGameBetController.getGameResultLast(lotteryGameBetController.game_cycle_id, false);
    // 倒數計時
    //lotteryGameBetController.countDownCycle();
    // 取得历史注单
	//lotteryGameCartControll.showOrderHistory();
	// 手機玩法選擇下拉
	//$('#index-menu-select').change(lotteryGameBetController.setGameTypeAreaMobile);
	//$('#index-menu-sub-select').change(lotteryGameBetController.setBetAreaMobile);
    // 倍數框聚焦清空
    //$("#bet_multi").on('focusin', function(){
    //    $("#bet_multi").val('');
    //});
    // 倍數框失焦時，立即重新計算，若為空白則固定為1
    //$("#bet_multi").on('focusout', function(){
    //    if ( '' == $("#bet_multi").val()) {
    //        $("#bet_multi").val(1);
    //    }
    //    lotteryGameBetController.betContentOnChange();
    //});
    // 獎金模式切換
    //$("#select_mode").click(lotteryGameBetController.resetOddInfoBox);
    
    // 紀錄模式(寫入)
    //$("#bet_mode").change(function(e){
    //	$.cookie('betMode',$(e.currentTarget).val());
    //})
    
    // 紀錄模式(判斷)
    //if (typeof $.cookie('betMode') != "undefined") {
    // 	var betModeObj = $("#bet_mode").find('option');
    // 	$.each(betModeObj,function(k,v) {
    //		if ($(v).val() == $.cookie('betMode')) {
    //			$(v).attr("selected",true);
    //		}
    //	})
	//}

});

var lotteryGameBetController1 = {
	// 當前彩種apiValue
	apiValue: null,
    // 當前彩種ID
    gameId: null,
    // 當前彩種ID
    baseGame: null,
    // 當前玩法ID
    gameTypeId: null,
    // 當前玩法名稱
    gameTypeName: null,
    // 隨機下注方法
    betRandMethod: null,
    // 當前下注資料
    betData: null,
    // 獎期名稱
    cycle_value: null,
    // 獎期ID
    game_cycle_id: null,
    // 開號計時
    count_down: null,
    // 開號設定
    openNumberConfig: null,
    // 此彩種下注數字上下限
    betRangeMin: null,
    betRangeMax: null,
    // 下注倍率上限
    betMultiLimit : 9999999,
    // 如果沒抓到開獎號碼，多久更新一次  毫秒
    updateTime: 10000,
    // 禁用玩法設定
    disableGameType: null,
	// 設定預設的玩法母ID
    setDefaultGameTypeKey: null,
	// 設定預設的玩法ID
    setDefaultGameTypeId: null,
	// 判斷是否播放北京PK10動畫
    setGifStep: 0,
    // 圖片緩存   判斷幾次後直接顯示結果
    setLoadingImgCount: 0,
    // 定時取得上一期開獎號碼
    get_game_result_timer: null,
    // 寫死龍虎玩法
    dtGameTypeList: [120, 121, 122, 123, 124, 125, 126, 127, 128, 129],
    // 處理玩法設定
    setGameTypeConfig: function () {
    	
    	// 判斷如果是韓國彩 updateTime 改成5秒
    	if(lotteryGameBetController.gameId == 46 || lotteryGameBetController.gameId == 52){
    		lotteryGameBetController.updateTime = 5000;
    	}else{
    		lotteryGameBetController.updateTime = 10000;
    	}

        // 設定判斷
        if (this.gameTypeConfig === undefined || this.disableGameType === undefined) {
            return false;
        }

        // 迴圈處理玩法設定
        $.each(this.gameTypeConfig, function (key, tab_list) {
            // 刪除
            var tab_display = false;
            $.each(tab_list, function (tab_data, tab_name) {
                var row_display = false;
                $.each(tab_name, function (game_type_id, game_type_name) {
                    if ($.inArray(game_type_id + "", lotteryGameBetController.disableGameType) >= 0) {
                        lotteryGameBetController.gameTypeConfig[key][tab_data][game_type_id] = null;
                    } else {
                    	
                    	if(lotteryGameBetController.gameTypeId == game_type_id){
                    		lotteryGameBetController.setDefaultGameTypeId = game_type_id;
                    		lotteryGameBetController.setDefaultGameTypeKey = key;
                    	}
                        row_display = true;
                    }
                });
                // 如果玩法都被關閉, 關閉此玩法行
                if (row_display === false) {
                    lotteryGameBetController.gameTypeConfig[key][tab_data] = null;
                } else {
                    tab_display = true;
                }
            });
            // 如果玩法行都被關閉, 關閉此頁籤
            if (tab_display === false) {
                lotteryGameBetController.gameTypeConfig[key] = null;
            }
        });
    },
    // 玩法頁籤切換
    setGameTypeTab: function (tabType) {

        // 設定判斷
        if (this.gameTypeTabConfig === undefined) {
            return false;
        }

        // 組成頁籤HTML
        var tabHtml = '';
        var tabHtmlForMobile = '';
        if (tabType == 2) {
			$.each( this.gameTypeTabConfig, function (key, tabName){
				if (lotteryGameBetController.gameTypeConfig[key] !== null) {
					tabHtml += '<li onclick="lotteryGameBetController.setGameTypeArea(this, '+key+');" value="'+key+'"><a href="javascript:;">'+tabName+'</a></li>';
					tabHtmlForMobile += '<option value="' + key + '">' + tabName + '</option>';
				}
			});
			if (this.spTabBtn) {
				tabHtml += '<li onclick="lotteryGameBetController.setGameTypeTab(1);"><a href="javascript:;">一般玩法</a></li>';
			}
		} else {
			var tabCount = 0;
			$.each( this.gameTypeTabConfig, function (key, tabName){
				if (lotteryGameBetController.gameTypeConfig[key] !== null) {
					tabHtml += '<li onclick="lotteryGameBetController.setGameTypeArea(this, '+key+');" value="'+key+'"><a href="javascript:;">'+tabName+'</a></li>';
					tabHtmlForMobile += '<option value="' + key + '">' + tabName + '</option>';
				}
				tabCount++;
			});
			if (this.spTabBtn) {
				tabHtml += '<li onclick="lotteryGameBetController.setGameTypeTab(2);"><a href="javascript:;" class="">任选玩法</a></li>';
			}
		}
        
        // 顯示頁籤HTML
		$('#index-menu').html(tabHtml);
		$('#index-menu-select').html(tabHtmlForMobile);
		
		// 如果有預設的玩法
		if(lotteryGameBetController.setDefaultGameTypeKey != null){
			$('#index-menu li[value="'+lotteryGameBetController.setDefaultGameTypeKey+'"]').click();
			
			// 清空預設
			lotteryGameBetController.setDefaultGameTypeKey = null;
			lotteryGameBetController.setDefaultGameTypeId = null;
		}else{
			$('#index-menu :first-child')[0].click();
		}
		
    },
    // 玩法選擇頁面切換 for mobile
    setGameTypeAreaMobile: function() {
    	var tabId = $(this).val();
    	var tab = $("#index-menu li[value="+tabId+"]");
    	lotteryGameBetController.setGameTypeArea(tab, tabId);
    },
    // 玩法選擇頁面切換
    setGameTypeArea: function (tab, tabId) {

    	// 設定判斷
        if (this.gameTypeConfig === undefined) {
            return false;
        }

        // 合法判斷
        if (tabId < 1 || tabId > 17 || $(tab).hasClass('active')) {
            return false;
        }

        // 切換active css
		$('#index-menu .active').removeClass('active');
		$(tab).addClass('active');
		$('#index-menu-select option[value=' + tabId + ']').attr("selected", "selected");

        // 移動arrow
//        var first_tab = $(".st-1 a")[0];
//        var arrow_left = ($(tab).position().left - $(first_tab).position().left) + 41;
//        $(".arrow.up").animate({
//            left: arrow_left + "px"
//        });
		
		// 組成玩法頁面HTML
		var typeHtml = '<ul class="col-md-12 padding0">';
		var typeHtmlMobile = '';
		var tempTitle = '';
		$.each( this.gameTypeConfig[tabId], function (title, item){
			if (item === null) {
				return true;
			}
			
			typeHtml += '<li class="col-md-12 li_list_sytle_none">';
            if (title.indexOf('space') == 0) {
            	typeHtml += '<label class="labtitle radio-btn-' + tabId + '"></label>';
            	title = tempTitle;
            } else if (title !== '') {
            	typeHtml += '<label class="labtitle radio-btn-' + tabId + '">' + title + '：</label>';
            }
            tempTitle = title;
			$.each( item, function (typeId, name){
				if (name === null) {
					return true;
				}
				
				// 一般頁面顯示用
				typeHtml += '<label class="radio  margin0" onclick="lotteryGameBetController.setBetArea(this, '+typeId+');">';
				typeHtml += '<input id="r_'+typeId+'" type="radio" value="'+name+'" data-toggle="radio" name="radio">';
				typeHtml += '<i></i>';
				typeHtml += name;
				typeHtml += '</label>';
				
				// 手機頁面顯示用
				typeHtmlMobile += '<option value="' + typeId + '">' + title + ' - ' + name + '</option>';
			});
			typeHtml += '</li>';
		});
        
        // 顯示頁面HTML
        $('#index-menu-sub').html(typeHtml);
        $('#index-menu-sub-select').html(typeHtmlMobile);
        
        $('#index-menu-sub ul li').hide();
		$('#index-menu-sub ul li').fadeIn(400);
		
		// 如果有預設的玩法
		if(lotteryGameBetController.setDefaultGameTypeId != null){
			$('input#r_' + lotteryGameBetController.setDefaultGameTypeId).click();
		}else{
			$('#index-menu-sub input:first').click();
		}
    },
    // 下注頁面切換 for mobile
    setBetAreaMobile: function () {
    	var typeId = $(this).val();
    	var typeBtn = $("#r_" + typeId);
    	typeId = parseInt(typeId);
    	lotteryGameBetController.setBetArea(typeBtn, typeId);
    },
    // 下注頁面切換
    setBetArea: function (typeBtn, typeId) {
    	
        // 設定判斷
        if (this.gameTypeBetConfig === undefined) {
            return false;
        }
        
        // 設定
        this.gameTypeId = typeId;
        
        // 判斷是否要出現龍虎走勢連結按鈕
        if (this.baseGame == "cqssc" && $.inArray(typeId, this.dtGameTypeList) >= 0) {
        	var analysis_link = $(".dt_analysis_link").data("url") + "id/" + this.gameId + "/game_type_id/" + typeId;
        	$(".dt_analysis_link").attr("href", analysis_link).css("display", "inline-block");
        } else {
        	$(".dt_analysis_link").attr("href", analysis_link).css("display", "none");
        }
        
        // 切換active css
        $('#r_' + typeId).attr('checked', 'checked');
		$('#index-menu-sub-select option[value=' + typeId + ']').attr("selected", "selected");

        // 組成玩法頁面HTML
        var betHtmlConfig = lotteryGameBetController.gameTypeBetConfig[typeId];
        $('#index-tip > span').html(betHtmlConfig.title);
        var betContentHtml = '';

        // 下注位置選擇區塊判斷
        if (betHtmlConfig.posSelect) {
            betContentHtml +=
                "<div class='pos-select-div lottery-checkbox col-md-12'>" +
                "<input type='checkbox' id='pos_chbox1' checked>" +
                "<label for='pos_chbox1'>万位</label>" +
                "<input type='checkbox' id='pos_chbox2' checked>" +
                "<label for='pos_chbox2'>千位</label>" +
                "<input type='checkbox' id='pos_chbox3' checked>" +
                "<label for='pos_chbox3'>百位</label>" +
                "<input type='checkbox' id='pos_chbox4' checked>" +
                "<label for='pos_chbox4'>十位</label>" +
                "<input type='checkbox' id='pos_chbox5' checked>" +
                "<label for='pos_chbox5'>个位</label>" +
                "</div>";
        }

        var data = {
            game_id: lotteryGameBetController.gameId,
            game_type_id: typeId
        }
        
        // 預設數字盤 模式1元
        if (data.game_id == 35 && data.game_type_id == 14) {
        	 $('#bet_mode').val(4);
        }
        
        // 拉取玩法原始獎金
        ApiAjax.callAjaxJson('./?s=/ApiLottery/getGameBonus/', data, function (returnData) {
            var data = returnData.info;

            data = JSON.parse(data);
            betHtmlConfig.bonus = [];
            $.each(data[0].bonus, function (key, val) {
                betHtmlConfig.bonus[key] = {
                		percent : data[0].percent,
                		percent_bonus : val.percent_bonus,
                		no_percent_bonus : val.no_percent_bonus
                };
                
                if (lotteryGameBetController.gameId == 35 && typeId == 14) {
                    // 把賠率排進去
                    var percent = val.no_percent_bonus;
                    percent = percent / 2;
                    percent = publicController.formatMoney(percent);
                    // for PC
                    $('.bjpk10-bet-amount-div').text( percent );
                }
            });
            
            // 返點選擇判斷
            if (betHtmlConfig.percentSelect) {
                $('#select_mode_font').show();
                $('#select_mode').show();
                // 如果只有一个奖金组 才带入
                if (betHtmlConfig.bonus.length == 1) {

                    $percent_bonus_text = betHtmlConfig.bonus[0].percent_bonus + " - " + data[0].percent + "%";
                    $no_percent_bonus = betHtmlConfig.bonus[0].no_percent_bonus + " - 0%";

                    //  移除全部的項目
                    $("#select_mode option").remove();
                    
                    if (lotteryGameBetController.gameId == 35 && typeId == 14) {
                        $("#select_mode").append($("<option></option>").attr("value", 0).text("奖金模式"));
                        $("#select_mode").append($("<option></option>").attr("value", 1).text("返点模式"));
                    } else {
                        $("#select_mode").append($("<option></option>").attr("value", 0).text($no_percent_bonus));
                        $("#select_mode").append($("<option></option>").attr("value", 1).text($percent_bonus_text));
                    }
                    
                } else {
                    //  移除全部的項目
                    $("#select_mode option").remove();

                    $("#select_mode").append($("<option></option>").attr("value", 0).text("奖金模式"));
                    $("#select_mode").append($("<option></option>").attr("value", 1).text("返点模式"));
                }

            } else {
                $('#select_mode_font').hide();
                $('#select_mode').hide();
            }
            $('#select_mode').val(0);
            lotteryGameBetController.resetOddInfoBox();
        }, false, false);

        // 下注區塊
        switch (betHtmlConfig.betType) {
            case 'btn_line':
                var lineCount = 0;
                $.each(betHtmlConfig.betBtn, function (title, item) {
                    betContentHtml += '<div class="row col-md-12 col-xs-12 padding0 play-ball-center ball_line" id="line_' + lineCount + '">';
                    
                    if (title){
                    	if (betHtmlConfig.longBetTitle) {
                            betContentHtml += '<div class="col-md-2 col-xs-3 line-height40 ' + lotteryGameBetController.baseGame + '">' + title + '</div><div class="col-xs-9 line-unit sp-show"></div>';
                    	} else {
                            betContentHtml += '<div class="col-md-1 col-xs-3 line-height40 ' + lotteryGameBetController.baseGame + '">' + title + '</div><div class="col-xs-9 line-unit sp-show"></div>';	
                    	}
                    }
                    if(betHtmlConfig.isSpBtn == true){
                        betContentHtml += '<div class="col-md-7 col-xs-12 ball_sp first-line ' + lotteryGameBetController.baseGame + '">';
                    } else {
                    	if (betHtmlConfig.longBetTitle) {
                            betContentHtml += '<div class="col-md-6 col-xs-12 ball first-line ' + lotteryGameBetController.baseGame + '">';
                    	} else {
                            betContentHtml += '<div class="col-md-7 col-xs-12 ball first-line ' + lotteryGameBetController.baseGame + '">';	
                    	}
                    }
                    
                    $.each(item.betBtn, function (typeId, name) {
                        //betContentHtml += '<span class="" name="' + name + '">' + name + '</span>';
                        if(betHtmlConfig.isSpBtn == true){
                            betContentHtml += '<span class="btn btn-warning btn-sm margin_right_5 spbtn-blank" name="' + name + '">' + name + '</span>';
                        }else if(betHtmlConfig.isDice == true){
                            betContentHtml += '<span class=" k3-ball" name="' + name + '"><i class="demo-icon icon-dice-' + name + '"></i></span>';
                        }else if(lotteryGameBetController.baseGame == 'bjpk10'){
                        	betContentHtml += '<span class="bjpk10 bjpk10-select-font bjpk10-select-ball-' + name + '" name="' + name + '"></span>';
                        }else{
                            betContentHtml += '<span class="" name="' + name + '"><i class="demo-icon icon-c' + name + '"></i></span>';
                        }
                    });
                    
                    betContentHtml += '</div>';
                    
                    if(item.spBtn.length > 0){
                        betContentHtml += '<div class="col-md-4 col-xs-12 quan">';
                        $.each(item.spBtn, function (typeId, name) {
                            betContentHtml += '<a href="javascript:;" class="btn btn-warning btn-sm margin_right_5">' + name + '</a>';
                        });
                        betContentHtml += '</div>';
                    }
                    betContentHtml += '</div>';
                    lineCount++;
                });
                break;
            case 'btn_multi_line':
            	var chk = true;
                $.each(betHtmlConfig.betBtn, function (title, item) {
                    betContentHtml +=
                        '<div class="col-md-12 padding0">';
                    if (title){
                        betContentHtml += '<div class="col-md-1 line-height40">' + title + '</div>';
                    }

                    betContentHtml += '<div class="col-md-11 balls ball first-line kl8xh_div clearfix ' + lotteryGameBetController.baseGame + '">';    
                    $.each(item, function (key, lineItem) {
                        $.each(lineItem, function (typeId, name) {
                            betContentHtml += '<span class="" name="' + name + '">' + name + '</span>';
                        });
                    });
                    betContentHtml += '</div>';
                    betContentHtml += '</div></div>';
                    if(betHtmlConfig.hrLine == true && chk == true){
                    	chk = false;
                    	betContentHtml += '<div class="col-md-12 separator hrLine"></div>';
                    }
                });
                if(lotteryGameBetController.baseGame == 'bjkl8') {
	                betContentHtml += '<div class="col-md-12 col-xs-12 text-center bjkl8 quan">';
	                $.each(betHtmlConfig.spBtn, function (title, item) {
	                	$.each(item, function (typeId, name) {
	            			betContentHtml += '<a href="javascript:;" class="btn btn-warning btn-sm margin_right_5">' + name + '</a>';
	                	});
	                });
	                betContentHtml += '</div>';
                }
                break;
            case 'sp_btn_line':
                $.each(betHtmlConfig.betBtn, function (title, item) {
                    betContentHtml +=
                        '<div class=\"col-md-12\">' +
                        "<div class=\"wan index-operate-sprite col-md-1 padding0\">" +
                        "<span class=\"wan-title line-height40\">" + title + "</span>" +
                        "</div>";
                    if (betHtmlConfig.longerBtnSB) {
                        betContentHtml += "<div class=\"ball_sp col-md-10\">";
                    } else {
                        betContentHtml += "<div class=\"ball_sp col-md-10\">";
                    }
                        
                    $.each(item, function (key, name) {                    	
                		if (betHtmlConfig.longerBtnSB) {
//                          	betContentHtml += '<a href="javascript:;" name="' + key + '" class="code'+ name +'\"></a>';
                        	betContentHtml += '<span name="'+key+'" class="btn btn-warning btn-sm margin_right_5 spbtn-blank">'+name+'</span>';
                		} else if (betHtmlConfig.isLongerDice) {
                      	
                      	
                          	var tmp_name = name.split('');
                          	if(tmp_name.length > 1){
                          		betContentHtml += '<span name="'+key+'" class="btn btn-gray btn-sm margin_right_5">';
                          		$.each(name.split(''), function (k, v) {
                              		betContentHtml += '<span class=" k3-ball"><i class="demo-icon icon-dice-' + v + '"></i></span>';
                              	});
                          	}else{
                          		betContentHtml += '<span name="'+key+'" class=" k3-ball"><i class="demo-icon icon-dice-' + name + '"></i></span>';
                          	}
                      	
                          	betContentHtml += '</span>';
//                          	betContentHtml += '<a href="javascript:;" name="' + key + '" class="code'+ name +'\"></a>';
                          
                		} else {
//                        		betContentHtml += '<a href="javascript:;" name="' + key + '">' + name + '</a>';
                        	betContentHtml += '<span name="'+key+'" class="btn btn-warning btn-sm margin_right_5 spbtn-blank">'+name+'</span>';
                		}                                       
                    });
                    betContentHtml += '</div></div>';
                });
                break;
            case 'text':
                betContentHtml +=
                    '<div class="col-md-12">' +
                    "<textarea onkeyup=\"lotteryGameBetController.betContentOnChange();\" class=\"form-control border-input\" rows=\"5\">" +
                    "</textarea>";
//                    '<dd>' +
//                        '<!--<a href="javascript:;">删除重复号码</a>-->' +
//                        '<!-- <a href="javascript:;">导入文件</a> -->' +
//                        '<a href="javascript:;" onclick="lotteryGameBetController.cleanBetTextArea();">清空号码</a>' +
//                    "</dd>"
                if (lotteryGameBetController.baseGame == "cqssc" || lotteryGameBetController.baseGame == "fc3d") {
                    betContentHtml += 
                        '<p>注单间请使用[,] [ ]或[;]隔开。<a href="javascript:;" class="single-empty-a" onclick="lotteryGameBetController.cleanBetTextArea()"><i class="icon-minus-circled"></i>清空</a></p>' +
                        "</div>";
                } else {
                    betContentHtml += 
                        '<p>号码间请使用空白隔开，注单间请使用[,]或[;]隔开。<a href="javascript:;" class="single-empty-a" onclick="lotteryGameBetController.cleanBetTextArea()"><i class="icon-minus-circled"></i>清空</a></p>' +
                        "</div>";
                }
                break;
            case 'btn_line_input':
                var lineCount = 0;
                betContentHtml += '<div class="bjpk10-bet-input-top"><div class="bjpk10-bet-title-col"></div>';
                for(var i = 1;i < 11;i++) {
                	if(i < 10) {
                		betContentHtml += '<div class="bjpk10-bet-input-top-box"><span class="bjpk10-open-ball-0' + i + '"></span></div>';
                	} else {
                		betContentHtml += '<div class="bjpk10-bet-input-top-box"><span class="bjpk10-bet-input-top-span bjpk10-open-ball-' + i + '"></span></div>';
                	}
                }
                betContentHtml += '</div>';
                $.each(betHtmlConfig.betBtn, function (title, item) {
                    betContentHtml += '<div class="row col-md-12 col-xs-12 padding0 play-ball-center ball_line bjpk10-bet-input-row" id="line_' + lineCount + '">';
                    
                    // 單行前方標題
                    if (title){
                        betContentHtml += ' <div class="bjpk10-bet-title-col line-height40 ' + lotteryGameBetController.baseGame + '">' + title + '</div>';
                    }
            
                    $.each(item.betBtn, function (typeId, name) {
                        betContentHtml += '<div class="bjpk10-bet-input-top-box"><div class="bjpk10-bet-amount-div">9.800</div><div class="bjpk10-bet-number-div">' + name + '</div><input class="bjpk10 betInput bjpk10-bet-input" name="' + name + '" size="2" /></div>';
                    });
                    betContentHtml += '</div>';
                    lineCount++;
                });
                betContentHtml += '<div class="bjpk10-bet-input-bottom"><a href="javascript:;" class="bjpk10-trash-empty-a" onclick="lotteryGameBetController.cleanBetTextArea()"><i class="icon-minus-circled"></i>清空</a></div>';
                break;
            
        }
        
        // 儲存當下gameTypeId & 遊戲玩法名稱
        this.gameTypeId = typeId;

        // 儲存當下遊戲玩法名稱
        this.gameTypeName = $('#index-menu .active').html() + '_' + $(typeBtn).val();

        // 寫入HTML
        $('#index-operate').hide();
        $('#index-operate').html(betContentHtml);
        $('#index-operate').fadeIn(200);
        
        // 判斷龍虎和
        $("[name='dragon']").removeClass();
        $("[name='dragon']").addClass("icon-zodiac_dragon twelve-animal");
        $("[name='tiger']").removeClass();
        $("[name='tiger']").addClass("icon-zodiac_tiger twelve-animal");
        $("[name='tie']").removeClass();
        $("[name='tie']").addClass("icon-and twelve-animal");

        // 判斷龍虎和的大小單雙
        $(".ball_line [name='big']").removeClass();
        $(".ball_line [name='big']").addClass("icon-font-big");
        $(".ball_line [name='small']").removeClass();
        $(".ball_line [name='small']").addClass("icon-font-small");
        $(".ball_line [name='single']").removeClass();
        $(".ball_line [name='single']").addClass("icon-font-single");
        $(".ball_line [name='double']").removeClass();
        $(".ball_line [name='double']").addClass("icon-font-double");

        // 把按鈕變~~大
        if (betHtmlConfig.longerBtn) {
        	$('#index-operate .ball').removeClass('balls');
            $('#index-operate .ball').addClass('balls-long');
        }

        // 把按鈕變~~小
        if (betHtmlConfig.smallBtn) {
            $('#index-operate .ball').addClass('balls-sm');
            $('#cycle-open-content').removeClass('open_number_9');
            $('#cycle-open-content').addClass('smball');
        }

        // 清除
        $('#index-operate-kuai').html('');

        // 綁定事件
//        $('#index-operate .ball > a').click(this.betItemOnClick);
//        $('#index-operate .quan a').click(this.betSpItemOnClick);
//        $('#index-operate input').change(this.betContentOnChange);
        $('#index-operate .ball > span').click(this.betItemOnClick);
        $('#index-operate .ball_sp > span').click(this.betItemOnClick);
		$('#index-operate .quan > a').click(this.betSpItemOnClick);
		$('#index-operate input').change(this.betContentOnChange);
        // 輸入完成也觸發計算，延後 等限制輸入清好
        $('#index-operate input').on('keyup', function(){
            setTimeout(function() {
                lotteryGameBetController.betContentOnChange();
            }, 100);
            
        });
        // 限制輸入數字
        publicController.onlyInputNumber($('#index-operate input'));
        
		// 針對輸入框的貼上和輸入做下注資料統計
		$('#index-operate textarea')
		.on('paste', function(){
			setTimeout(function() {
				lotteryGameBetController.betContentOnChange();
			}, 100);
			
		})
		.on('cut', function(){
			setTimeout(function() {
				lotteryGameBetController.betContentOnChange();
			}, 100);
			
		})
		.on('keyup', lotteryGameBetController.betContentOnChange);

        lotteryGameBetController.betContentOnChange();
        
        
        // 組成玩法頁面HTML
        var betHtmlConfig = this.gameTypeBetConfig[typeId];
     	var bet_desc = "<div class='col-md-12' style='padding-top:8px;padding-bottom:0px;'><div style='font-size:12px'>";
        if (betHtmlConfig.help !== undefined) {
            bet_desc += betHtmlConfig.help;
            
            if(betHtmlConfig.sample !== undefined){
               bet_desc += "投注方案：" + betHtmlConfig.sample;
            }
            if(betHtmlConfig.reward !== undefined){
               bet_desc += "，开奖号码：" + betHtmlConfig.reward;
            }
            
        } else {
            bet_desc += betHtmlConfig.title;
        }
        
        // 奖金說明
        if( 'undefined' != typeof betHtmlConfig.odds && '' !== betHtmlConfig.odds ){
        	if (betHtmlConfig.onPlayStyle == 2) {
        		 bet_desc += ' <br class="br-animal"/>'
        	}
            bet_desc += '<a href="javascript:;" id="odds_direction" class="odds-direction">奖金说明<i class="icon-down-dir"></i></a>';
            bet_desc += '<div class="odds-direction-content"><div id="odd_info_list" class="row">';
            $.each(betHtmlConfig.odds, function(k, v){
                bet_desc += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 odds-fonts no-padding">';
                bet_desc += k + ' : <span class="odd-info">取得中...</span>';
                bet_desc += '</div>';
            });
            
            bet_desc += '</div></div>';
        }
 		bet_desc += "</div></div>";
        $('.intro-how').html(bet_desc);
    },
    // 清除手动下注区块
    cleanBetTextArea: function () {
    	$(".setnumber textarea").val("");
    	$("#index-operate textarea").val("");
    	$("#index-operate .betInput").val("");
    	lotteryGameBetController.betContentOnChange();
    },
    // 下注按鈕操作事件
    betItemOnClick: function () {
        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[lotteryGameBetController.gameTypeId];

        // 切換開關
        if ($(this).hasClass('sel')) {
            $(this).removeClass('sel');
        } else {

            // 單選按鈕模式
            if (gameBetConfig.uniSelect) {
                $(this).parent().children('span').removeClass('sel');
            }
            
            // 注单数量限制
            if (gameBetConfig.amountLimit) {
                var count = 0;
                $.each($('#index-operate div'), function (key, line) {
                    $.each($(line).children('.ball'), function (key, multiline) {
                        $.each($(multiline).children('.sel'), function (key, item) {
                            count++;
                        });
                    });
                });
                if (count >= gameBetConfig.amountLimit) {
                    var title = '温馨提示';
                    var msg = '对不起，当前玩法最多选择' + gameBetConfig.amountLimit + '个号码';
                    dialogController.windowMessage(msg, "warning");
                    return false;
                }
            }
            $(this).addClass('sel');
        }

        // 膽拖模式
        if (gameBetConfig.dantuoSelect) {
            // 膽碼
            if ($(this).parent().parent().attr('id') == 'line_0') {
                // 膽碼數量限制
                var count = $(this).parent().children('.sel').length;
                if (count > gameBetConfig.dantuoSelect) {
                    if ($(this).is('#line_0 .ball .sel:first')) {
                        $(this).parent().children('.sel:last').removeClass('sel');
                    } else {
                        $(this).parent().children('.sel:first').removeClass('sel');
                    }
                }
                // 去除相同號碼的拖號
                var code = $(this).html();
                $.each($('#line_1 .sel'), function (key, item) {
                    if ($(item).html() == code) {
                        $(item).removeClass('sel');
                    }
                });
                // 拖碼
            } else if ($(this).parent().parent().attr('id') == 'line_1') {
                // 去除相同號碼的膽碼
                var code = $(this).html();
                $.each($('#line_0 .sel'), function (key, item) {
                    if ($(item).html() == code) {
                        $(item).removeClass('sel');
                    }
                });
            }
        }

        // 觸發change事件
        lotteryGameBetController.betContentOnChange();
    },
    // 特殊按鈕操作事件
    betSpItemOnClick: function () {
        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[lotteryGameBetController.gameTypeId];

        // 抓出該行所有按鈕
        if (lotteryGameBetController.baseGame === "bjkl8") {
        	 // 北京快樂八專用
            var items = $(this).parent().parent().children('.col-md-12.padding0').children('.bjkl8.ball').children('span');
        } else {
            var items = $(this).parent().parent().children('.ball').children('span');
        }
       
        // 判斷按鈕類型觸發相對應效果
        switch ($(this).html()) {
            // 全: 開啟該行所有按鈕
            case '全':

				if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * items.length);
						if ($.inArray(rand_key, key_arr) === -1) {
							key_arr.push(rand_key);
							item_arr.push(items[rand_key]);
						}
					}
					$(item_arr).addClass('sel');
				} else {
                	items.addClass('sel');
				}                
				// 拖膽反向設定
                if (gameBetConfig.dantuoSelect) {
                	$.each($('#line_0 .ball span'), function (key, item) {
                        if ($(item).hasClass('sel')) {
                        	$('#line_1 .ball span').eq(key).removeClass('sel');
                        }
                    });
                }
                break;
                // 大: 開啟該行大於等於長度/2的按鈕
            case '大':
            	if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor((Math.random() * items.length / 2) + items.length / 2);
						if ($.inArray(rand_key, key_arr) === -1) {
							key_arr.push(rand_key);
							item_arr.push(items[rand_key]);
						}
					}
					
					$(item_arr).addClass('sel');
				} else {
	                $.each(items, function (key, item) {
	                	if ((lotteryGameBetController.baseGame == 'cqssc') || (lotteryGameBetController.baseGame == 'fc3d')) {
	                		
	                        if ($(item).attr('name') > ($(items).length / 2) - 1) {
	                            $(item).addClass('sel');
	                        } else {
	                            $(item).removeClass('sel');
	                        }
	                	} else {
	
	                        if ($(item).attr('name') > ($(items).length / 2)) {
	                            $(item).addClass('sel');
	                        } else {
	                            $(item).removeClass('sel');
	                        }
	                	}
	                });
				}
                // 拖膽反向設定
                if (gameBetConfig.dantuoSelect) {
                	$.each($('#line_0 .ball span'), function (key, item) {
                        if ($(item).hasClass('sel')) {
                        	$('#line_1 .ball span').eq(key).removeClass('sel');
                        }
                    });
                }
               
                break;
                // 小: 開啟該行小於五的按鈕
            case '小':
            	if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * (items.length / 2));
						if ($.inArray(rand_key, key_arr) === -1) {
							key_arr.push(rand_key);
							item_arr.push(items[rand_key]);
						}
					}
					
					$(item_arr).addClass('sel');
				} else {
	                $.each(items, function (key, item) {
	                	
	                	if ((lotteryGameBetController.baseGame == 'cqssc') || (lotteryGameBetController.baseGame == 'fc3d')) {
	                        if ($(item).attr('name') <= ($(items).length / 2) - 1) {
	                            $(item).addClass('sel');
	                        } else {
	                            $(item).removeClass('sel');
	                        }
	                	} else {
	                        if ($(item).attr('name') <= ($(items).length / 2)) {
	                            $(item).addClass('sel');
	                        } else {
	                            $(item).removeClass('sel');
	                        }
	                	}
	                });
				}
                // 拖膽反向設定
                if (gameBetConfig.dantuoSelect) {
                	$.each($('#line_0 .ball span'), function (key, item) {
                        if ($(item).hasClass('sel')) {
                        	$('#line_1 .ball span').eq(key).removeClass('sel');
                        }
                    });
                }
                break;
                // 奇: 開啟該行奇數按鈕
            case '奇':
            	if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * items.length);
						if ($.inArray(rand_key, key_arr) === -1 && rand_key % 2 == 0) {
							//因為抽取的隨機數是數組的位置    並非數字本身
							key_arr.push(rand_key);
							item_arr.push(items[rand_key]);
						}
					}
					$(item_arr).addClass('sel');
				} else {
	                $.each(items, function (key, item) {
	                    if ($(item).attr('name') % 2 == 1) {
	                        $(item).addClass('sel');
	                    } else {
	                        $(item).removeClass('sel');
	                    }
	                });
				}
                // 拖膽反向設定
                if (gameBetConfig.dantuoSelect) {
                	$.each($('#line_0 .ball span'), function (key, item) {
                        if ($(item).hasClass('sel')) {
                        	$('#line_1 .ball span').eq(key).removeClass('sel');
                        }
                    });
                }
                
                
                break;
                // 偶: 開啟該行偶數按鈕
            case '偶':
            	if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * items.length);
						if ($.inArray(rand_key, key_arr) === -1 && rand_key % 2 == 1) {
							//因為抽取的隨機數是數組的位置    並非數字本身
							key_arr.push(rand_key);
							item_arr.push(items[rand_key]);
						}
					}
					$(item_arr).addClass('sel');
				} else {
	                $.each(items, function (key, item) {
	                    if ($(item).attr('name') % 2 == 0) {
	                        $(item).addClass('sel');
	                    } else {
	                        $(item).removeClass('sel');
	                    }
	                });
				}
                // 拖膽反向設定
                if (gameBetConfig.dantuoSelect) {
                	$.each($('#line_0 .ball span'), function (key, item) {
                        if ($(item).hasClass('sel')) {
                        	$('#line_1 .ball span').eq(key).removeClass('sel');
                        }
                    });
                }
               
                break;
                // 质: 北京快樂八  專用   從 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 隨機抽八個數
            case '质':
            	//先取消選中的號碼
            	items.removeClass('sel');
            	//確認數組
                var arr_random = new Array("2","3","5","7","11","13","17","19","23","29",
											"31","37","41","43","47","53","59","61","67","71","73","79");
                if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * arr_random.length);
						if ($.inArray(rand_key, key_arr) === -1) {
							//因為抽取的隨機數是數組的位置    並非數字本身
							key_arr.push(rand_key);
							item_arr.push(items[arr_random[rand_key] - 1]);
						}
					}
					$(item_arr).addClass('sel');
				} else {
					var item_arr = [];
					for(var i = 0; i < arr_random.length; i++) {
						item_arr.push(items[arr_random[i] - 1]);
					}
					$(item_arr).addClass('sel');
				}
            	
				break;
                // 合: 北京快樂八  專用   從 4 6 8 9 10 12 14 15 16 18 20 21 22 24 25 26 27 28 30 32 33 34 35 36 38 39 40 
				//42 44 45 46 48 49 50 51 52 54 55 56 57 58 60 62 63 64 65 66 68 69 70 72 74 75 76 77 78 80 隨機抽八個數
            case '合':
            	//先取消選中的號碼
            	items.removeClass('sel');
            	//確認數組
                var arr_random = new Array("04","06","08","09","10","12","14","15","16","18","20","21","22","24","25","26","27","28","30","32",
                							"33","34","35","36","38","39","40","42","44","45","46","48","49","50","51","52","54","55","56","57",
                							"58","60","62","63","64","65","66","68","69","70","72","74","75","76","77","78","80");
                if (typeof gameBetConfig.amountLimit !== "undefined") {
                	items.removeClass('sel');
					var item_arr = [];
					var key_arr = [];
					while (item_arr.length < gameBetConfig.amountLimit) {
						var rand_key = Math.floor(Math.random() * arr_random.length);
						if ($.inArray(rand_key, key_arr) === -1) {
							//因為抽取的隨機數是數組的位置    並非數字本身
							key_arr.push(rand_key);
							item_arr.push(items[arr_random[rand_key] - 1]);
						}
					}
					$(item_arr).addClass('sel');
				} else {
					var item_arr = [];
					for (var i = 0; i < arr_random.length; i++) {
						item_arr.push(items[arr_random[i] - 1]);
					}
					$(item_arr).addClass('sel');
				}
				break;
                // 清: 關閉該行所有按鈕
            case '清':
                items.removeClass('sel');
                break;
        }
        // 觸發change事件
        lotteryGameBetController.betContentOnChange();
    },
    // 下注change事件
    betContentOnChange: function () {
        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[lotteryGameBetController.gameTypeId];
        var betData = [];
        
        // 取得下注資料
        switch (gameBetConfig.betType) {
            case 'btn_line':
            case 'sp_btn_line':
            	if ($('#index-operate div .ball').length > 0) {
            		 $.each($('#index-operate div .ball'), function (key, items) {
                         var betLineList = [];
                         $.each($(items).children('span'), function (key, item) {
                             if (gameBetConfig.booleanData) {
                                 if ($(item).hasClass('sel')) {
                                     betLineList.push("1");
                                 } else {
                                     betLineList.push("0");
                                 }
                             } else {
                                 if ($(item).hasClass('sel')) {
                                     betLineList.push($(item).attr('name'));
                                 }
                             }
                         });
                         betData.push(betLineList);
                     });
            	} else {
            		 $.each($('#index-operate div .ball_sp'), function (key, items) {
                         var betLineList = [];
                         $.each($(items).children('span'), function (key, item) {
                             if (gameBetConfig.booleanData) {
                                 if ($(item).hasClass('sel')) {
                                     betLineList.push("1");
                                 } else {
                                     betLineList.push("0");
                                 }
                             } else {
                                 if ($(item).hasClass('sel')) {
                                     betLineList.push($(item).attr('name'));
                                 }
                             }
                         });
                         betData.push(betLineList);
                     });
            	}
                break;
            case 'btn_multi_line':
	                $.each($('#index-operate div .ball'), function (key, line) {
	                   var betLineList = [];
                        $.each($(line).children('.sel'), function (key, item) {
                            betLineList.push($(item).attr('name'));
                        });
	                    betData.push(betLineList);
	                });
                break;
            case 'text':
                var tmpBetData = [];
                var betDataText = $('#index-operate textarea').val();
                if (lotteryGameBetController.baseGame == "cqssc" || lotteryGameBetController.baseGame == "fc3d") {
                    // 取出單式內容並以[ ]分割
                    betDataText = betDataText.replace(/\D/gi, " ");
                    betDataText = betDataText.split(" ");
                } else {
                    // 取出單式內容並以[,]分割
                    betDataText = betDataText.replace(/\;/gi, ",");
                    betDataText = betDataText.replace(/\n/g, ",");
                    betDataText = betDataText.split(",");
                }
                // 處理個別注單
                $.each(betDataText, function (key, oneBet) {
                    oneBetData = [];
                    if (lotteryGameBetController.baseGame == "cqssc" || lotteryGameBetController.baseGame == "fc3d") {
                        // 將非數字清除並分割字串
                        oneBet = oneBet.replace(/\D/gi, "");
                        oneBet = oneBet.split("");
                    } else {
                        // 將非數字轉成空白並以空白分割字串
                        oneBet = oneBet.replace(/\D/gi, " ");
                        oneBet = oneBet.split(" ");
                    }
                    $.each(oneBet, function (key, value) {
                        if (value.length > 0) {
                            oneBetData.push(value);
                        }
                    });
                    // 判斷是否需要排序 (不限制順序玩法)
                    if (typeof gameBetConfig.setSort !== "undefined" && gameBetConfig.setSort === true) {
                    	oneBetData.sort(function(a, b) { return a - b; });
                    }
                    
                    if (oneBetData.length != 0) {
                    	betData.push(oneBetData);
                    }
                });
                break;
            case 'btn_line_input':
                $.each($('.ball_line'), function (key, line) {
                    str = '{'
                    $.each($(line).children().children('.betInput'), function (key, item) {
                        if($(item).val() != '' && $(item).val() > 0) {
                            if('{' != str) {
                                str += ','
                            }
                            str += '"' + $(item).attr('name') + '":' + $(item).val() + ''
                        }
                    });
                    str += '}'
                    betData.push(str);
                });
                break;
        }

        // 單行下注判斷
        if (gameBetConfig.allSameLine) {
            var betItemTemp = [];
            $.each(betData, function (key, value) {
                $.each(value, function (key, value) {
                    betItemTemp.push(value);
                });
            });
            betData = [betItemTemp];
        }

        // 下注位置選擇區塊判斷
        if (gameBetConfig.posSelect) {
            var posSelect = [
            $('#pos_chbox1').get(0).checked ? "1" : "0",
            $('#pos_chbox2').get(0).checked ? "1" : "0",
            $('#pos_chbox3').get(0).checked ? "1" : "0",
            $('#pos_chbox4').get(0).checked ? "1" : "0",
            $('#pos_chbox5').get(0).checked ? "1" : "0"];
            betData = [posSelect, betData];
        }
        

        // 計算注數
        var checkMethod = 'check_' + lotteryGameBetController.gameTypeId;
        var betCount = onChangeCheck[checkMethod](betData);

        // 計算下注金額
        var betMode = $("#bet_mode").val();
        var betMulti = $("#bet_multi").val();
        
        // 檢查數字
        if (betMulti !== '') {
        	if (isNaN(betMulti) || betMulti <= 0) {
            	$("#bet_multi").val(1);
            	betMulti = 1;
            }
		} else {
			// 空值设为1
			//$("#bet_multi").val(1);
			//betMulti = 1;
		}
        
        // 禁止输入小数点 
        if (betMulti.indexOf('.') > -1) {
        	bet_multi_value = betMulti.replace(".", "");
        	$("#bet_multi").val(bet_multi_value);
        	betMulti = bet_multi_value;
        }
        
        // 判断是否超出int上限
        if (betMulti > 2147483647) {
        	$("#bet_multi").val(1);
        	lotteryGameBetController.betContentOnChange();
        	dialogController.windowMessage("倍数超出上限！", "warning");
        } else {
        	if(isNaN(betMulti) || betMulti < 0){
                $('#bet_amount').html("0");
            }else{
                betMode = LotteryCommon.getBetMode(betMode);
                $('#bet_count').html(betCount);
                $('#bet_amount').html(lotteryGameCartControll.formatMoney(betCount * betMulti * betMode * 2));
                lotteryGameBetController.betData = JSON.stringify(betData);
            }
        }
        // 当投注数量发生变更时抛出自定义事件 count.change 可根据需求全局捕获
        $('#bet_count').trigger('count.change', {
            count: betCount
        })
    },
    // 隨機選號
    betRand: function (betRandAmount) {
        if (lotteryGameBetController.betRandMethod == null) {
            dialogController.windowMessage("抱歉，此玩法尚不支持随机选号！", "warning");
        }
        if (lotteryGameBetController.betRandMethod[lotteryGameBetController.gameTypeId] != null) {
            lotteryGameBetController.betRandMethod[lotteryGameBetController.gameTypeId](betRandAmount);
        } else {
            var firstGameTypeRadio = $("#index-menu-sub input[type=radio]")[0];
            var firstGameTypeId = $(firstGameTypeRadio).attr("id").replace(/r_/gi, "");
            if (lotteryGameBetController.betRandMethod[firstGameTypeId] != null) {
                lotteryGameBetController.betRandMethod[firstGameTypeId](betRandAmount);
            } else {
                dialogController.windowMessage("抱歉，此玩法尚不支持随机选号！", "warning");
            }
        }
    },
    // 產生隨機注單
    getRandBetData: function (rand_config) {

        // 設定回圈上限
        var max_for = 200;
        // 設定回圈起始值
        var for_ini = 0;
        // 設定隨機注數計數
        var rand_bet_count = 0;
        // 設定隨機注單陣列
        var rand_bet_array = [];
        // 取出玩法數字上下限
        var max = rand_config.range_max ? rand_config.range_max : parseInt(lotteryGameBetController.betRangeMax);
        var min = rand_config.range_min ? rand_config.range_min : parseInt(lotteryGameBetController.betRangeMin);
        // 跑迴圈直到取得足夠注數
        while (rand_bet_count < rand_config.amount) {
            var rand_bet = [];
            // 行數迴圈
            for (var i = 0; i < rand_config.array_length; i++) {
                var rand_bet_row = [];
                // 內容迴圈
                for (var j = 0; j < rand_config.num_length; j++) {
                    // 隨機數, 判斷可否重複
                    if (rand_config.num_double === true) {
                        var rand_bet_num = Math.floor(Math.random() * (max - min + 1) + min);
                    } else {
                        // 迴圈產生不重複數字
                        var rand_bet_num = false;
                        while (rand_bet_num === false) {
                            var rand = Math.floor(Math.random() * (max - min + 1) + min);
                            var rand_double = false;
                            $.each(rand_bet, function (key, value) {
                                if ($.inArray(rand, value) != -1) {
                                    rand_double = true;
                                    return false;
                                }
                            })
                            if (rand_double === false) {
                                var rand_bet_num = rand;
                            }
                        }
                    }
                    // 依設定放入隨機數
                    rand_bet_row.push(rand_bet_num);
                }
                rand_bet.push(rand_bet_row);
            }
            // 補0
            if (rand_config.digi_len) {
                $.each(rand_bet, function (key1, value1) {
                    $.each(value1, function (key2, value2) {
                        value2 = value2 + '';
                        if (value2.length < rand_config.digi_len) {
                            value2 = new Array(rand_config.digi_len - value2.length + 1).join("0") + value2;
                        }
                        rand_bet[key1][key2] = value2;
                    });
                });
            }
            // 判斷是否已有此注單, 否則塞入隨機注單陣列
            if (lotteryGameBetController.checkBetRepeated(rand_bet, rand_config.game_type_id, rand_bet_array) === false) {
                rand_bet_array.push(rand_bet);
                rand_bet_count++;
            }

            for_ini++;

            // 如果回圈超出上限 则跳出
            if (for_ini > max_for) {
                dialogController.windowMessage("随机号码已无重复", "warning");
                break;
            }
        }
        return rand_bet_array;
    },
    // 產生隨機注單(任選多行)
    getRandBetDataCustomRows: function (rand_config) {

        // 設定回圈上限
        var max_for = 200;
        // 設定回圈起始值
        var for_ini = 0;
        // 設定隨機注數計數
        var rand_bet_count = 0;
        // 設定隨機注單陣列
        var rand_bet_array = [];
        // 取出玩法數字上下限
        var max = rand_config.range_max ? rand_config.range_max : parseInt(lotteryGameBetController.betRangeMax);
        var min = rand_config.range_min ? rand_config.range_min : parseInt(lotteryGameBetController.betRangeMin);
        // 跑迴圈直到取得足夠注數
        while (rand_bet_count < rand_config.amount) {
            var rand_bet = [];
            while (rand_bet.length < rand_config.rand_bet_rows) {
                rand_bet.push([]);
            }
            var rand_num_count = 0;
            while (rand_num_count < rand_config.min_bet_num) {
                // 在隨機行數加入隨機數字
                var rand_bet_row = Math.floor(Math.random() * rand_config.rand_bet_rows);
                // 判斷該行是否已有數字
                if (rand_bet[rand_bet_row].length != 0) {
                    continue;
                }
                var rand_bet_num = Math.floor(Math.random() * (max - min + 1) + min);
                rand_bet[rand_bet_row].push(rand_bet_num);
                rand_num_count++;
            }
            // 補0
            if (rand_config.digi_len) {
                $.each(rand_bet, function (key1, value1) {
                    $.each(value1, function (key2, value2) {
                        value2 = value2 + '';
                        if (value2.length < rand_config.digi_len) {
                            value2 = new Array(rand_config.digi_len - value2.length + 1).join("0") + value2;
                        }
                        rand_bet[key1][key2] = value2;
                    });
                });
            }
            // 判斷是否已有此注單, 否則塞入隨機注單陣列
            if (lotteryGameBetController.checkBetRepeated(rand_bet, rand_config.game_type_id, rand_bet_array) === false) {
                rand_bet_array.push(rand_bet);
                rand_bet_count++;
            }

            for_ini++;

            // 如果回圈超出上限 则跳出
            if (for_ini > max_for) {
                dialogController.windowMessage("随机号码已无重复", "warning");
                break;
            }
        }
        return rand_bet_array;
    },
    // 判斷下注資料是否有重複
    checkBetRepeated: function (bet_data, game_type_id, bet_array) {

        // 判斷有無重複
        var is_repeated = false;
        // 判斷購物車資料有無重複
        $.each(lotteryGameCartControll.cartData, function (key, value) {
            if (value.game_id != lotteryGameBetController.gameId || value.game_type_id != game_type_id) {
                return true;
            }
            if (JSON.stringify(bet_data).replace(/\"/gi, "") == value.bet_info.replace(/\"/gi, "")) {
                is_repeated = true;
            }
        });
        // 判斷已產生數據有無重複
        if (bet_array != undefined) {
            $.each(bet_array, function (key, value) {
                if (JSON.stringify(bet_data) == JSON.stringify(value)) {
                    is_repeated = true;
                }
            });
        }
        return is_repeated;
    },
    // 新增物件到下注清單
    betAddBetToCart: function (gameTypeId, betData) {

        // 判斷是否有玩法及下注內容參數, 否則使用控制器儲存的資料
        var isUseParam = true;
        if (gameTypeId === undefined || betData === undefined) {
            gameTypeId = lotteryGameBetController.gameTypeId;
            betData = lotteryGameBetController.betData;
            isUseParam = false;
        }

        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[gameTypeId];

        // 單式下注自動過濾
        if (gameBetConfig.betType == 'text') {
            // 下注資料json decode
            var betTextData = JSON.parse(betData);
            // 錯誤注單
            var failBetArray = [];
            var failBetHtml = '';
            // 判斷是否有選擇位置
            if (gameBetConfig.posSelect) {
                var checkPos = betTextData[0];
                var checkBet = betTextData[1];
            } else {
                var checkBet = betTextData;
            }
            // 計算注數
            var checkMethod = 'check_' + gameTypeId;
            // 判斷各個注單是否正確
            $.each(checkBet, function (key, value) {
                if (checkPos) {
                    value = [checkPos, [value]];
                } else {
                    value = [value];
                }
                if (!onChangeCheck[checkMethod](value)) {
                    failBetArray.unshift(key);
                }
            });
            
            // 去除錯誤注單
            $.each(failBetArray, function (key, value) {
                if (gameBetConfig.posSelect) {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[1][value]).replace(/\"/g, "");
                    betTextData[1].splice(value, 1);
                } else {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[value]).replace(/\"/g, "");
                    betTextData.splice(value, 1);
                }
            });
            
            // 判斷是否有錯誤, 並彈出提示視窗
            if (failBetArray.length != 0) {
            	dialogController.windowMessage('以下注单内容错误，已进行自动过滤：' + failBetHtml, "error");
            }
            
            // 壓縮
            if (!gameBetConfig.posSelect) {
	            var data_arr = {};
	            var check_arr_exist = function(item, list) {
	        		var key = list.shift();
	            	if (list.length == 0 && typeof item[key] === "undefined") item[key] = 1;
	            	else if (list.length == 0) item[key] += 1;
	            	else if (typeof item[key] === "undefined") item[key] = check_arr_exist({}, list);
	            	else item[key] = check_arr_exist(item[key], list);
	            	return item;
	            }
	            $.each(betTextData, function(key, value) {
	            	data_arr = check_arr_exist(data_arr, value);
	            });
	            
	            // 寫入當前下注
	            betData = "betarr:" + JSON.stringify(data_arr);
            } else {
    			// 寫入當前下注
    			betData = JSON.stringify(betTextData);
            }
        }
        
        // 下注单位
        var betMode = $("#bet_mode").val();
        
        // 取得參數
        var betData = {
            game_id: this.gameId,
            game_type_id: gameTypeId,
            game_cycle_id: this.game_cycle_id,
            bet_info: betData,
            bet_mode: betMode,
            bet_multiple: $("#bet_multi").val(),
            bet_percent_type: $("#select_mode").val()
        };
        
        // 判斷是否有注數
        if ($("#bet_amount").html() == '0.00' && isUseParam == false) {
            dialogController.windowMessage('号码选择不完整，请重新选择！', "error");
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
            return false;
        }

        // 加入清單
        lotteryGameCartControll.addItemToCart(betData, function() {
            // 判斷是否成功, 並清空下注頁面
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
            
            //刷新购彩篮 注单资料
            lotteryGameCartControll.showCartData();
        });
        
    },
    // 直接撤單
    deleteBetToOrderNow: function (id,seekNumber) {
    	var data =id;
        //判断是一般注单还是追号注单
    	if (seekNumber === undefined) {
    		var url = './?s=/Lottery/confirmDeleteOrder';
    		//測單的id
    		dialogController.useAjaxGetHtmlShowDialog(
                '系统提示－请确认以下撤單内容', url, data, ['提 交', '取 消'], false, '', '',
                function() {
                	//測單API
                	ApiLottery.callCancelOrderHistoryApi(data);
                }, '', '', 700, 400
            );
        } else {
    	    var url = './?s=/Lottery/confirmDeleteSeekPlanOrder';
    	   	//撤單的id
    	   	dialogController.useAjaxGetHtmlShowDialog(
    	   		'系统提示－请确认以下撤單内容', url, data, ['提 交', '取 消'], false, '', '',
    	   		function() {
    	   		    //測單API
    	   		    ApiLottery.callCancelOrderHistoryApi(id, seekNumber);
    	   		}, '', '', 700, 400
    	   	);
        }
    },
    // 直接下注
    addBetToOrderNow: function (gameTypeId, betData) {

        // 判斷是否有玩法及下注內容參數, 否則使用控制器儲存的資料
        var isUseParam = true;
        if (gameTypeId === undefined || betData === undefined) {
            gameTypeId = lotteryGameBetController.gameTypeId;
            betData = lotteryGameBetController.betData;
            isUseParam = false;
        }

        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[gameTypeId];

        // 單式下注自動過濾
        if (gameBetConfig.betType == 'text') {
            // 下注資料json decode
            var betTextData = JSON.parse(betData);
            // 錯誤注單
            var failBetArray = [];
            var failBetHtml = '';
            // 判斷是否有選擇位置
            if (gameBetConfig.posSelect) {
                var checkPos = betTextData[0];
                var checkBet = betTextData[1];
            } else {
                var checkBet = betTextData;
            }
            // 計算注數
            var checkMethod = 'check_' + gameTypeId;
            // 判斷各個注單是否正確
            $.each(checkBet, function (key, value) {
                if (checkPos) {
                    value = [checkPos, [value]];
                } else {
                    value = [value];
                }
                if (!onChangeCheck[checkMethod](value)) {
                    failBetArray.unshift(key);
                }
            });
            // 去除錯誤注單
            $.each(failBetArray, function (key, value) {
                if (gameBetConfig.posSelect) {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[1][value]).replace(/\"/g, "");
                    betTextData[1].splice(value, 1);
                } else {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[value]).replace(/\"/g, "");
                    betTextData.splice(value, 1);
                }
            });
//            // 判斷是否有錯誤, 並彈出提示視窗，直接下注不提醒被濾掉的提示
//            if (failBetArray.length != 0) {
//                dialogController.windowMessage('以下注单内容错误，已进行自动过滤：' + failBetHtml, "warning");
//            }
            // 壓縮
            if (!gameBetConfig.posSelect) {
	            var data_arr = {};
	            var check_arr_exist = function(item, list) {
	        		var key = list.shift();
	            	if (list.length == 0 && typeof item[key] === "undefined") item[key] = 1;
	            	else if (list.length == 0) item[key] += 1;
	            	else if (typeof item[key] === "undefined") item[key] = check_arr_exist({}, list);
	            	else item[key] = check_arr_exist(item[key], list);
	            	return item;
	            }
	            $.each(betTextData, function(key, value) {
	            	data_arr = check_arr_exist(data_arr, value);
	            });
	            
	            // 寫入當前下注
	            betData = "betarr:" + JSON.stringify(data_arr);
            } else {
    			// 寫入當前下注
    			betData = JSON.stringify(betTextData);
            }
        }
        
        // 下注单位
        var betMode = $("#bet_mode").val();
        
        // 取得參數
        var betData = {
            game_id: this.gameId,
            game_type_id: gameTypeId,
            game_cycle_id: this.game_cycle_id,
            bet_info: betData,
            bet_mode: betMode,
            bet_multiple: $("#bet_multi").val(),
            bet_percent_type: $("#select_mode").val()
        };
        
        // 判斷是否有注數
        if ($("#bet_amount").html() == '0.00' && isUseParam == false) {
            dialogController.windowMessage('号码选择不完整，请重新选择！', "error");
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
            return false;
        }
        // 加入清單
        var addItem = lotteryGameCartControll.windowAddOrderCart(betData);
        
        // 判斷是否成功, 並清空下注頁面
//        if (addItem == true) {
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            //$("#index-operate .betInput").val("");
            lotteryGameBetController.betContentOnChange();
//        }

    },
    // 直接追號
    addBetToSeekOrderNow: function (gameTypeId, betData) {

    	// 判斷是否有玩法及下注內容參數, 否則使用控制器儲存的資料
        var isUseParam = true;
        if (gameTypeId === undefined || betData === undefined) {
            gameTypeId = lotteryGameBetController.gameTypeId;
            betData = lotteryGameBetController.betData;
            isUseParam = false;
        }

        // 取出相對應注單控制設定
        var gameBetConfig = lotteryGameBetController.gameTypeBetConfig[gameTypeId];

        // 單式下注自動過濾
        if (gameBetConfig.betType == 'text') {
            // 下注資料json decode
            var betTextData = JSON.parse(betData);
            // 錯誤注單
            var failBetArray = [];
            var failBetHtml = '';
            // 判斷是否有選擇位置
            if (gameBetConfig.posSelect) {
                var checkPos = betTextData[0];
                var checkBet = betTextData[1];
            } else {
                var checkBet = betTextData;
            }
            // 計算注數
            var checkMethod = 'check_' + gameTypeId;
            // 判斷各個注單是否正確
            $.each(checkBet, function (key, value) {
                if (checkPos) {
                    value = [checkPos, [value]];
                } else {
                    value = [value];
                }
                if (!onChangeCheck[checkMethod](value)) {
                    failBetArray.unshift(key);
                }
            });
            // 去除錯誤注單
            $.each(failBetArray, function (key, value) {
                if (gameBetConfig.posSelect) {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[1][value]).replace(/\"/g, "");
                    betTextData[1].splice(value, 1);
                } else {
                    failBetHtml += "<br />" + JSON.stringify(betTextData[value]).replace(/\"/g, "");
                    betTextData.splice(value, 1);
                }
            });
//            // 判斷是否有錯誤, 並彈出提示視窗，直接下注不提醒被濾掉的提示
//            if (failBetArray.length != 0) {
//                dialogController.windowMessage('以下注单内容错误，已进行自动过滤：' + failBetHtml, "warning");
//            }
            // 壓縮
            if (!gameBetConfig.posSelect) {
	            var data_arr = {};
	            var check_arr_exist = function(item, list) {
	        		var key = list.shift();
	            	if (list.length == 0 && typeof item[key] === "undefined") item[key] = 1;
	            	else if (list.length == 0) item[key] += 1;
	            	else if (typeof item[key] === "undefined") item[key] = check_arr_exist({}, list);
	            	else item[key] = check_arr_exist(item[key], list);
	            	return item;
	            }
	            $.each(betTextData, function(key, value) {
	            	data_arr = check_arr_exist(data_arr, value);
	            });
	            
	            // 寫入當前下注
	            betData = "betarr:" + JSON.stringify(data_arr);
            } else {
    			// 寫入當前下注
    			betData = JSON.stringify(betTextData);
            }
        }
        
        // 下注单位
        var betMode = $("#bet_mode").val();
        
        // 取得參數
        var betData = {
            game_id: this.gameId,
            game_type_id: gameTypeId,
            game_cycle_id: this.game_cycle_id,
            bet_info: betData,
            bet_mode: betMode,
            bet_multiple: 1,
            bet_percent_type: $("#select_mode").val()
        };
        
        // 判斷是否有注數
        if ($("#bet_amount").html() == '0.00' && isUseParam == false) {
            dialogController.windowMessage('号码选择不完整，请重新选择！', "error");
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
            return false;
        }

        // 加入清單
        var addItem = lotteryGameCartControll.windowAddSeekOrderCart(betData);

        // 判斷是否成功, 並清空下注頁面
//        if (addItem == true) {
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
//        }
    },
    // 直接追號
    addCartToSeekOrderNow: function (cart_data_id) {

		var url = './?s=/Lottery/confirmAddSeekOrder';
		var data = {
				cart_data_id : cart_data_id
		};
		
		// 切回預設值
        dialogController.setCustomize(true);
		dialogController.useAjaxGetHtmlShowDialog(
            '', url, data, [], false, '','' ,
            function() {},'' ,'' , 700, 400
        );
    },
    // 新增物件到追号清單
    betAddBetToSeekCart: function (id) {
    	
    	lotteryGameCartControll.addItemToSeekCart(id);
    },
    // 取得上一期開獎號
    getGameResultLast: function (game_cycle_id, get_cycle) {
    
        
        var _this = this;
        var isK3 = false;
        if (get_cycle != false) {
        	get_cycle = true;
        }
     
        if (lotteryGameBetController.openNumberConfig.openNumberCount >= 10) {
            var ball_class = " small";
        } else if (lotteryGameBetController.openNumberConfig.openNumberCount == 7) {
            var ball_class = " hk6-ball";
    	} else if (isK3 = lotteryGameBetController.baseGame.indexOf('k3') > -1) {
            var ball_class = " k3-ball";        
        } else {
            var ball_class = "";
        }
        
        var data = {
            game_cycle_id: game_cycle_id
        }
        ApiAjax.callAjaxJson('./?s=/ApiLottery/getGameResultLast/', data, function (returnData) {
            var data = returnData.info[0];
            var htmlstr = '';
            var htmlimg = '';
           
            
            if (data.game_result != '' && data.game_result != null) {

                //有抓到奖期 也有开奖
                var game_result = JSON.parse(data.game_result);
                
                //對北京PK10進行開獎判斷
                if(lotteryGameBetController.baseGame == 'bjpk10')
                {
                	// 是北京PK10進這裡
                	// 依照遊戲id帶入class
                    $('#cycle-open-content').addClass("open_number_" + lotteryGameBetController.gameId);
                	
                    //是否播放動畫
                	if(lotteryGameBetController.setGifStep == 1 && document.getElementById("bjpk10-run-gif").complete == true) {
                		//隱藏準備圖    顯示動畫
                        $('#bjpk10-ready').hide();
                        $('#bjpk10-run').show();
                        
                        //每次重新放圖    讓gif每次都從第一偵開始
                        document.getElementById("bjpk10-run-gif").src=lotteryGameBetController.imgUrl+"Comm/Image/bjpk10.gif";
                        	
                        //動畫15秒  轉為   結果圖
                        $('#bjpk10-run').delay(15000).hide(0); 
                    	$('#bjpk10-over').delay(15000).show(0);
                    	
                    	//播放開獎動畫   進入第2步
                    	lotteryGameBetController.setGifStep = 2;
                    	//默認為0   若之前有等待過圖片   現在開始播放圖片   則等待次數歸零
                    	lotteryGameBetController.setLoadingImgCount = 0;
                    	
                    	
            			
                	} else if(lotteryGameBetController.setGifStep == 1 && document.getElementById("bjpk10-run-gif").complete == false) {
                		//每次進入等待緩存圖片時   等待次數+1
                		lotteryGameBetController.setLoadingImgCount = lotteryGameBetController.setLoadingImgCount + 1;
                		
                		//如果圖片沒出來   維持原本畫面  等待下一次抓獎期
                		//setLoadingImgCount != 0  代表緩存圖片中     若超過3次抓取獎期都未緩存成功  setLoadingImgCount == 0  則不跑動畫秀出結果 
                		if(lotteryGameBetController.setLoadingImgCount >= 3) {
                			//若超過3次抓取獎期都未緩存成功  setLoadingImgCount == 0  則不跑動畫秀出結果 
                			$('#bjpk10-ready').hide();
                    		$('#bjpk10-over').show();
                			lotteryGameBetController.setLoadingImgCount = 0;
                		}
                		
                	} else {
                		$('#bjpk10-ready').hide();
                		$('#bjpk10-over').show();
                	}
                	
                	htmlimg += '<img class="bjpk10-open-img" src="' + lotteryGameBetController.imgUrl + 'Comm/Image/bjpk10_race_bg.jpg?v={$system_version}" title="">';
                	htmlimg += '<span class="bjpk10-car-place-cycle">第<span class="bjpk10-car-place-cycle-color">' + data.cycle_value + '</span>期开奖结果</span>';
                	//紀錄開獎號碼     用於播放聲音   北京pk10
                	var openball = new Array();
                	$.each(game_result, function (key, value) {
                		
                		var carPlace = 0;
                		carPlace = key + 1;
                        value = _this.padLeft(String(value), lotteryGameBetController.openNumberConfig.openNumberDigits);
                        if (value == 10) {
                        	htmlstr += '<span class="bjpk10-open-ball bjpk10-open-font bjpk10-show-slow-' + carPlace + ' bjpk10-open-ball-' + value + '"></span>'
                        } else {
                        	htmlstr += '<span class="bjpk10-open-ball bjpk10-open-font bjpk10-show-slow-' + carPlace + ' bjpk10-open-ball-' + value + '"></span>'
                        }
                        if (key < 3) {
                        	htmlimg += '<span class="bjpk10-car-place-' + carPlace + ' bjpk10-show-slow-' + carPlace + '">第' + carPlace + '名</span>';
                        	htmlimg += '<img class="bjpk10-car-img-' + key + ' bjpk10-show-slow-' + carPlace + '" src="' + lotteryGameBetController.imgUrl + 'Comm/Image/car' + value + '.png?v={$system_version}" title="">';
                        }
                        //紀錄開獎號碼     用於播放聲音   PK10 需要將 01~09 改成 1~9
                        openball[key] = value * 1;
                        
                    });
                	//調用播放聲音   function   北京pk10有開獎動畫   所以延遲15秒
                	if(lotteryGameBetController.checkVoice(data) === false) {
                		setTimeout(function() {
                    		lotteryGameBetController.openVoice(openball);
                    	}, 15000);
                    }
                	
                	          
                    
                } else {
                	// 不是北京PK10 進這裡
                	// 依照遊戲id帶入class
                    $('#cycle-open-content').addClass("open_number_" + lotteryGameBetController.gameId);
                    //紀錄開獎號碼     用於播放聲音  
                    var openball = new Array();
                	var game_result_sum = 0;
                    $.each(game_result, function (key, value) {
                    	game_result_sum += (value * 1);
                        value = _this.padLeft(String(value), lotteryGameBetController.openNumberConfig.openNumberDigits);
                        if (isK3 == true) {
                            htmlstr += '<span class="' + ball_class + '"><i class="demo-icon  icon-dice-' + value + '"></i></span>';
                        } else {
                            htmlstr += '<span class="color' + ball_class + '"><i class="demo-icon icon-c' + value + '"></i></span>';
                        }
                        //紀錄開獎號碼     用於播放聲音
                        openball[key] = value * 1;
                    });
                    
                    // 如果是福彩3d系列, 特殊排列
                    if (lotteryGameBetController.baseGame == "fc3d") {
                    	htmlstr = '<span class="color' + ball_class + '"><i class="demo-icon icon-c' + game_result[0] + '"></i></span>' +
            					'<i class="demo-icon icon-plus-2"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-c' + game_result[1] + '"></i></span>' +
                    			'<i class="demo-icon icon-plus-2"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-c' + game_result[2] + '"></i></span>' +
                    			'<i class="demo-icon icon-eq"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-c' + game_result_sum + '"></i></span>';
                    }
                    //調用播放聲音   function   快樂8 超過11 不報號
                    if (lotteryGameBetController.checkVoice(data) === false && lotteryGameBetController.baseGame != "bjkl8") {
                    	lotteryGameBetController.openVoice(openball);
                    }
                    
                }
                
                
                // 更新最後五期資料
                _this.updateLastFiveCycData(data);
                
                // 更新历史注单
                lotteryGameCartControll.showOrderHistory();
                
            } else {
                // 如果有抓到奖期 却没有开奖
            	
            	// 北京PK10的步驟
            	lotteryGameBetController.setGifStep = 1;
            	
            	// 依照遊戲id帶入class
                $('#cycle-open-content').addClass("open_number_" + lotteryGameBetController.gameId);
            	
            	//對北京PK10進行開獎判斷
                if(lotteryGameBetController.baseGame == 'bjpk10')
                {
	            	// 北京PK10走這一條    
	            	$('#bjpk10-run').hide();
	            	$('#bjpk10-over').hide();
	                $('#bjpk10-ready').show();
	                
	                var htmlstr = '';
	                for (var i = 0; i < lotteryGameBetController.openNumberConfig.openNumberCount; i++) {
	                    
	                    htmlstr += '<span class="bjpk10-open-ball"><i class="demo-icon icon-help-1"></i></span>';
	                }
	                lotteryGameBetController.get_game_result_timer = setTimeout(function () {
	                    _this.getGameResultLast(game_cycle_id, false);
	                }, lotteryGameBetController.updateTime);
	                
                }
                
                else {
                	// 其他彩種走這一條
	                var htmlstr = '';
	                for (var i = 0; i < lotteryGameBetController.openNumberConfig.openNumberCount; i++) {
	                    
	                    htmlstr += '<span class="' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>';
	                }
                    // 如果是福彩3d系列, 特殊排列
                    if (lotteryGameBetController.baseGame == "fc3d") {
                    	htmlstr = '<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
            					'<i class="demo-icon icon-plus-2"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
                    			'<i class="demo-icon icon-plus-2"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
                    			'<i class="demo-icon icon-eq"></i>' +
		                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>';
                    }
	
                    lotteryGameBetController.get_game_result_timer = setTimeout(function () {
	                    _this.getGameResultLast(game_cycle_id, false);
	                }, lotteryGameBetController.updateTime);
                }

            }
            // show畫面的時候   setGifStep==2要跑動畫   setLoadingImgCount == 0代表可以秀出結果
            if(lotteryGameBetController.setGifStep == 2 && lotteryGameBetController.setLoadingImgCount == 0) {
            	setTimeout(function() {
            		lotteryGameBetController.setGifStep = 0;
            		$('#bjpk10-over').html(htmlimg);
                    $('#last-cycle').html(data.cycle_value);
                    $('#cycle-open-content').html(htmlstr);
                    
                    //北京PK10最大畫面用的開獎
                    $('#cycle-open-content-bjpk10').html(htmlstr);
                    //北京PK10開獎號碼上一期
                    $('#last-cycle-bjpk10').html(data.cycle_value);
                    //北京PK10動畫區開獎號碼上一期
                    $('#last-cycle-bjpk10-gif').html(data.cycle_value);
                  
                    //北京PK10的開獎顯示   這個是 一個一個 顯示
                    for(var i = 1; i <= 10; i++) {
                    	$('.bjpk10-show-slow-' + i + '').delay(i*500).show(500,function(){
                            $(this).css("display","inline-block");
                            });
                    }

                	//把動畫拿掉    下次播放再放回來
                	document.getElementById("bjpk10-run-gif").src=" ";
                	
                	
    			}, 15000);
      
            	
            } else if(lotteryGameBetController.setLoadingImgCount == 0) {
             // show畫面的時候    setLoadingImgCount == 0代表可以秀出結果 
            	$('#bjpk10-over').html(htmlimg);
                $('#last-cycle').html(data.cycle_value);
                $('#cycle-open-content').html(htmlstr);
                
                //北京PK10最大畫面用的開獎
                $('#cycle-open-content-bjpk10').html(htmlstr);
                //北京PK10開獎號碼上一期
                $('#last-cycle-bjpk10').html(data.cycle_value);
                //北京PK10動畫區開獎號碼上一期
                $('#last-cycle-bjpk10-gif').html(data.cycle_value);
                
                //北京PK10的開獎顯示   這個是瞬間顯示     需要inline-block
                for(var i = 1; i <= 10; i++) {
                	$('.bjpk10-show-slow-' + i + '').css("display","inline-block");
                }
            
            	
            } else {
            	// show畫面的時候    setLoadingImgCount != 0  代表緩存圖片中     若超過3次抓取獎期都未緩存成功  setLoadingImgCount == 0  則不跑動畫秀出結果 
            	//等待緩存圖片    
            	//甚麼都不做等待下一次抓獎期    抓滿三次就會直接秀出結果
            	
     
               
            }
            
            
            
            if (get_cycle == true) {
                _this.getGameCycle();
            }
        }, function (returnData) {
            // 没有抓到奖期
            $('#last-cycle').html('???????????');
            //北京PK10開獎號碼上一期
            $('#last-cycle-bjpk10').html('???????????');
            //北京PK10動畫區開獎號碼上一期
            $('#last-cycle-bjpk10-gif').html('???????????');
            // 依照遊戲id帶入class
            $('#cycle-open-content').addClass("open_number_" + lotteryGameBetController.gameId);
            var htmlstr = '';
            for (var i = 0; i < lotteryGameBetController.openNumberConfig.openNumberCount; i++) {
            	
                htmlstr += '<span class="' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>';
            }
            // 如果是福彩3d系列, 特殊排列
            if (lotteryGameBetController.baseGame == "fc3d") {
            	htmlstr = '<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
    					'<i class="demo-icon icon-plus-2"></i>' +
                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
            			'<i class="demo-icon icon-plus-2"></i>' +
                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>' +
            			'<i class="demo-icon icon-eq"></i>' +
                    	'<span class="color' + ball_class + '"><i class="demo-icon icon-help-1"></i></span>';
            }

            $('#cycle-open-content').html(htmlstr);
        }, false);
    },
    // 開獎號碼補0
    padLeft: function (str, lenght) {
        if (str.length >= lenght) {
            return str;
        } else {
            return this.padLeft("0" + str, lenght);
        }
    },
    // 開獎號碼補?
    padLeftMark: function (str, lenght) {
        if (str.length >= lenght) {
            return str;
        } else {
            return this.padLeft("?" + str, lenght);
        }
    },
    // 取得這期獎期
    getGameCycle: function () {
        var _this = this;
        var data = {
            game_id: this.gameId
        }
        ApiAjax.callAjaxJson('./?s=/ApiLottery/getGameCycle/', data, function (returnData) {
            var data = returnData.info;
            var htmlstr = '';

            $('#now-cycle').html(data.cycle_value);
            $('#now-cycle-bjpk10').html(data.cycle_value);
            _this.cycle_value = data.cycle_value;
            _this.game_cycle_id = data.id;
            _this.count_down = data.count_down;

            // 倒數計時更新
            $('.countdown').countdown('option', {
                until: parseInt(_this.count_down)
            });

        }, false, false);
    },
    // 取得當期獎期id
    getGameCycleId: function () {

        var _this = this;
        var data = {
            game_id: this.gameId
        }
        ApiAjax.callAjaxJson('./?s=/ApiLottery/getGameCycle/', data, function (returnData) {
            var data = returnData.info;
            var htmlstr = '';
            clearTimeout(lotteryGameBetController.get_game_result_timer);
            _this.getGameResultLast(data.id);

        }, false, false);
    },
    // 下追号单
    betSeekOrder: function () {

        var seekOrder = {
            ids: [],
            seek_mode: null,
            seek_multiple: null,
            seek_cycle: null,
            seek_auto_stop: null
        };

        // 判斷同倍或翻倍
        if (document.getElementById('same_multi_btn').className == "on zhui-btn zhui-btn-sel") {
            // 同倍追号
            seekOrder.seek_mode = "0";
            seekOrder.seek_multiple = $('#same_multiple').val();
            seekOrder.seek_cycle = $('#same_cycle').val();
        } else {
            // 翻倍追号
            seekOrder.seek_mode = "1";
            seekOrder.seek_multiple = $('#double_multiple').val();
            seekOrder.seek_cycle = $('#double_cycle').val();
        }

        $('input:checkbox:checked[name="seekOrder"]').each(function (i) {

            var cart_id = this.value;
            seekOrder.ids.push(cart_id);
            seekOrder.seek_auto_stop = (document.getElementById('seek_order_auto_stop').checked ? '1' : '0');
        });
        
        ApiLottery.callAddSeekOrderApi(seekOrder);
    },
    // 下追号单
    betSeekOrderData: function () {

        var seekOrder = {
            ids: [],
            seek_mode: null,
            seek_multiple: null,
            seek_cycle: null,
            seek_auto_stop: null
        };

        // 判斷同倍或翻倍
        if ( 
        	$('#same_multi_btn').hasClass('on')
        ) {
            // 同倍追号
            seekOrder.seek_mode = "0";
            seekOrder.seek_multiple = $('#same_multiple').val();
            seekOrder.seek_cycle = $('#same_cycle').val();
        } else {
            // 翻倍追号
            seekOrder.seek_mode = "1";
            seekOrder.seek_multiple = $('#double_multiple').val();
            seekOrder.seek_cycle = $('#double_cycle').val();
        }

        $('input:checkbox:checked[name="seekOrder"]').each(function (i) {

            var cart_id = this.value;
            seekOrder.ids.push(cart_id);
            seekOrder.seek_auto_stop = (document.getElementById('seek_order_auto_stop').checked ? '1' : '0');
        });
        
        return seekOrder;
    },
    // 送出一般注單跟追號注單
    betOrderAndSeek: function () {

        var seekOrder = {
            ids: [],
            seek_mode: null,
            seek_multiple: null,
            seek_cycle: null,
            seek_auto_stop: null,
            seek_block_id: lotteryGameCartControll.seekCartData,
            now_bet_id: lotteryGameCartControll.isNowBetId
        };

        // 判斷同倍或翻倍
        if (
        	$('#same_multi_btn').hasClass('on')
        ) {
            // 同倍追号
            seekOrder.seek_mode = "0";
            seekOrder.seek_multiple = $('#same_multiple').val();
            seekOrder.seek_cycle = $('#same_cycle').val();
        } else {
            // 翻倍追号
            seekOrder.seek_mode = "1";
            seekOrder.seek_multiple = $('#double_multiple').val();
            seekOrder.seek_cycle = $('#double_cycle').val();
        }

        $('input:checkbox:checked[name="seekOrder"]').each(function (i) {

            var cart_id = this.value;
            seekOrder.ids.push(cart_id);
            seekOrder.seek_auto_stop = (document.getElementById('seek_order_auto_stop').checked ? '1' : '0');
        });
        
        ApiLottery.callAddOrderAndSeekApi(seekOrder);
    },
    // 倒數計時    
    countDownCycle: function () {
    	
    	var _this = this;
    	var time = parseInt(_this.count_down);

        $(".countdown").countdown({
            until: time, 
            format: 'dHMS',
            compact: true,
            onTick: showPauseTime,
            onExpiry: liftOff
        });

        function showPauseTime(periods) {
        	periods[4] += periods[3] * 24;
            var hour = (periods[4] < 10) ? "0" + periods[4] : periods[4];
            var minute = (periods[5] < 10) ? "0" + periods[5] : periods[5];
            var second = (periods[6] < 10) ? "0" + periods[6] : periods[6];

            $('.countdown').html('<h1>'+ hour +' : ' + minute + ' : ' + second + '</h1>');
        }
    	
    	function liftOff() {
    	    //檢查購物車資料內容
    	    lotteryGameCartControll.checkCartData();
    	    //取得當期獎期id
    	    _this.getGameCycleId();
    	    //封單聲音     
    	    lotteryGameBetController.stopVoice();
    	}
        
    },
    // 倒數計時声音开关    
    countDownVoice: function () {
    	
    	if($(".countdown .lot-num a:first").hasClass("icon-volume-up")) {
    		$(".countdown .lot-num a:first").removeClass("icon-volume-up");
    		$(".countdown .lot-num a:first").addClass("icon-volume-off");
    	} else if ($(".countdown .lot-num a:first").hasClass("icon-volume-off")) {
    		$(".countdown .lot-num a:first").removeClass("icon-volume-off");
    		$(".countdown .lot-num a:first").addClass("icon-volume-up");
    	}
        
    },
    // all in
    betAllIn : function () {
    	
        // 判斷是否有注數
        if ($("#bet_amount").html() == '0.00') {
            dialogController.windowMessage('号码选择不完整，请重新选择！', "error");
            $("#index-operate .sel").removeClass("sel");
            $("#index-operate textarea").val("");
            lotteryGameBetController.betContentOnChange();
            return false;
        }
        
        var balance = $("#menu_user_balance").html().replace(/\,/gi, "");
        
        // 計算下注金額
        var betMode = $("#bet_mode").val();
        
        var bet_count = $('#bet_count').html();
		
		switch(bet_mode){
            case '0': // 2 元
                bet_mode = 1;
                break;
            case '1': // 2 角
                bet_mode = 0.1;
                break;
            case '2': // 2 分
                bet_mode = 0.01;
                break;
            case '3': // 2 厘
                bet_mode = 0.001;
                break;
            case '4': // 1 元
                bet_mode = 0.5;
                break;
			case '5': // 1 角
                bet_mode = 0.05;
                break;
			case '6': // 1 分
                bet_mode = 0.005;
                break;
			case '7': // 1 厘
                bet_mode = 0.0005;
                break;
        }
		
        var bet_balance = bet_count * bet_mode * 2;
        var bet_multi = balance / bet_balance;
        $("#bet_multi").val(parseInt(bet_multi));
        
        // 觸發change事件
        lotteryGameBetController.betContentOnChange();
    },
    // 更新最近十期 資料
    updateLastFiveCycData : function(data){
    	
        var open_list = $(".five-ball-pc");
        var open_list_mobile = $(".five-ball-mobile");
        
        //北京PK10最大畫面版
        var open_list_bjpk10 = $(".five-ball-pc-bjpk10");
        
        var chk = false;
        
        // 檢查重複
        $.each(open_list, function(key, value) {
            if(data.cycle_value == $(value).find('.text-left').text()){
                // 有，那就不用更新啦
                chk = true;
            }
        });
   
    
        if(chk == false){
            // 最近十期沒有新的，把最新一期放進去
            
        	if (10 <= open_list.length) {
        		// 已經十個了 删掉最后一笔
        		
	        	// 删掉最后一笔  for pc
	            var last_row = open_list.length - 1;
	            $(open_list[last_row]).remove();
	            // 删掉最后一笔  for mobile
	            var last_row_mobile = open_list_mobile.length - 1;
	            $(open_list_mobile[last_row_mobile]).remove();
	            // 刪掉最後一筆  for 北京PK10 最大畫面版
	            var last_row_bjpk10 = open_list_bjpk10.length - 1;
	            $(open_list_bjpk10[last_row_bjpk10]).remove();
	            
        	}
            //區分  北京PK10最大畫面    所有的PC畫面    所有的手機畫面  
        	//原因是 有三個class在畫面上分別判斷這三個最近10期來進行刪除跟增加     five-ball-pc-bjpk10  five-ball-pc  five-ball-mobile  
        	//省略將會導致 最近10期在打入後破版
        	
            // 組合要放入開頭的 html  for   北京PK10最大畫面    
            var html_bjpk10 = '';
            html_bjpk10 += '<div class="row five-ball-open five-ball-pc-bjpk10">';
            html_bjpk10 += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding text-left">' + data.cycle_value + '</div>';
            html_bjpk10 += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding five-ball-pd">';
            $.each(JSON.parse(data.game_result), function(key, value) {
            	html_bjpk10 += '       <span class="ball-base-five ball03">' + value + '</span>';
            });
            html_bjpk10 += '   </div>';
            html_bjpk10 += '</div>';
            
            // 計算總和
            var game_result_sum = 0;
            $.each(JSON.parse(data.game_result), function(key, value) {
            	game_result_sum += (value * 1);
            });
            
            // 組合要放入開頭的 html   for   所有 PC 畫面    
            var html_pc = '';
            html_pc += '<div class="row five-ball-open five-ball-pc">';
            html_pc += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding text-left">' + data.cycle_value + '</div>';
            html_pc += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding five-ball-pd">';
            if (lotteryGameBetController.baseGame == "fc3d") {
            	var game_result = JSON.parse(data.game_result);
            	html_pc += '<span class="ball-base-five ball03">' + game_result[0] + '</span>' +
		    			'<span class="fc3d-symbol">+</span>' +
		    			'<span class="ball-base-five ball03">' + game_result[1] + '</span>' +
		    			'<span class="fc3d-symbol">+</span>' +
		    			'<span class="ball-base-five ball03">' + game_result[2] + '</span>' +
		    			'<span class="fc3d-symbol">=</span>' +
		    			'<span class="ball-base-five ball03">' + game_result_sum + '</span>';
            } else {
                $.each(JSON.parse(data.game_result), function(key, value) {
                	html_pc += '       <span class="ball-base-five ball03">' + value + '</span>';
                });
            }
            html_pc += '   </div>';
            html_pc += '</div>';
            
            // 組合要放入開頭的 html   for    所有 手機     畫面    
            var html_mobile = '';
            html_mobile += '<div class="row five-ball-open five-ball-mobile">';
            html_mobile += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding text-left">' + data.cycle_value + '</div>';
            html_mobile += '   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding five-ball-pd">';
            if (lotteryGameBetController.baseGame == "fc3d") {
            	var game_result = JSON.parse(data.game_result);
            	html_mobile += '<span class="ball-base-five ball03">' + game_result[0] + '</span>' +
		    			'<span class="fc3d-symbol">+</span>' +
		    			'<span class="ball-base-five ball03">' + game_result[1] + '</span>' +
		    			'<span class="fc3d-symbol">+</span>' +
		    			'<span class="ball-base-five ball03">' + game_result[2] + '</span>' +
		    			'<span class="fc3d-symbol">=</span>' +
		    			'<span class="ball-base-five ball03">' + game_result_sum + '</span>';
            } else {
                $.each(JSON.parse(data.game_result), function(key, value) {
                	html_mobile += '       <span class="ball-base-five ball03">' + value + '</span>';
                });
            }
            html_mobile += '   </div>';
            html_mobile += '</div>';
            
            // 放入開頭 for pc
            open_list.eq(0).before(html_pc);
            // 放入開頭 for mobile
            open_list_mobile.eq(0).before(html_mobile);
            
            var cycle_list = $(".five-ball-open"); 
            var ball_list = $(".five-ball-pd .ball-base-five");
            
            //判斷北京PK10
            if (lotteryGameBetController.baseGame == 'bjpk10') {
	            // 放入開頭  for 北京PK10 最大畫面版
	            open_list_bjpk10.eq(0).before(html_bjpk10);
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
            }
            
           
            //判斷是北京快樂8的20顆球   還是快3的3顆球   給予對應的樣式
            if (cycle_list.length == 2 && ball_list.length == 6) {
                    $('.five-ball-pd').addClass("three-ball-pd");
                    $('.text-left').addClass("cycle-center");
            } if (cycle_list.length == 4 && ball_list.length == 12) {
                $('.five-ball-pd').addClass("three-ball-pd");
                $('.text-left').addClass("cycle-center");
            } if (cycle_list.length == 6 && ball_list.length == 18) {
                $('.five-ball-pd').addClass("three-ball-pd");
                $('.text-left').addClass("cycle-center");
            } if (cycle_list.length == 8 && ball_list.length == 24) {
                $('.five-ball-pd').addClass("three-ball-pd");
                $('.text-left').addClass("cycle-center");
            } if (cycle_list.length == 10 && ball_list.length == 30) {
                $('.five-ball-pd').addClass("three-ball-pd");
                $('.text-left').addClass("cycle-center");
           	} if (cycle_list.length == 2 && ball_list.length >= 40 ) {
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
        	} if (cycle_list.length == 4 && ball_list.length >= 80) {
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
            } if (cycle_list.length == 6 && ball_list.length >= 120) {
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
            } if (cycle_list.length == 8 && ball_list.length >= 160) {
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
            } if (cycle_list.length == 10 && ball_list.length >= 200) {
                $('.five-ball-pd').addClass("ten-up-ball");
                $('.text-left').addClass("ten-up-cycle");
            } 
       
        }
        
    },
    // 更新獎金說明
    resetOddInfoBox : function() {
    	
    	// 取得玩法設定
        var betHtmlConfig = lotteryGameBetController.gameTypeBetConfig[lotteryGameBetController.gameTypeId];

    	// 判斷是否已取得返點
    	if (typeof betHtmlConfig.bonus === "undefined") {
    		return false;
    	}

        // 取得目前被選擇的返點類型
        var nowPercentSelected = $("#select_mode").val();
        
        // 判斷有無獎金說明
        if (betHtmlConfig.odds) {
        	
        	// 取得賠率說明內容列表
        	var odd_info_span_list = $(".intro-how .odd-info");
        	
        	// 依序塞入說明
        	$.each(betHtmlConfig.bonus, function(k, val) {
        		if (nowPercentSelected == 1) {
        			if (typeof val.percent_bonus !== "undefined") {
            			var percent_info = val.percent_bonus + " - " + val.percent + "%";
        			}
        		} else {
        			if (typeof val.no_percent_bonus !== "undefined") {
        				var percent_info = val.no_percent_bonus + " - 0%";
        			}
        		}
        		$(odd_info_span_list[k]).text(percent_info);
        		$(odd_info_span_list[k + betHtmlConfig.bonus.length]).text(percent_info);
        	});

            // 綁定事件
            $('.select-for-mobile .odds-direction').click(function() {
            	if ($(".odds-direction-content").is(":visible")) {
            		$(".odds-direction-content").hide();
            	} else {
            		$(".odds-direction-content").show();
            	}
       	 	}).hover(function() {}, function() {
        		$(".odds-direction-content").hide();
       	 	});
        }
    },
    //判斷是否需要報號
    checkVoice : function(data) {
    	 var open_list = $(".five-ball-pc");     
         var check = false;
         
         // 檢查是否需要報號
         $.each(open_list, function(key, value) {
             if(data.cycle_value == $(value).find('.text-left').text()){
                 // 已經在最近10期內,不需要報號
                 check = true;
             }
         });
         return check;
    },
    //開獎聲音  
    openVoice : function(openball) {
    	var path = "Comm/sound/open.wav";
    	var audio = $('#openball').get(0);
    	var i = 0;
    	audio.src = lotteryGameBetController.imgUrl + path;
		audio.play();
		audio.onended = function() {
			lotteryGameBetController.openBallVoice(openball, openball.length, i);
		};
    },
    //開獎球號
    openBallVoice : function(openball, length, i) {
    	var path = "Comm/sound/m_";
    	var type = ".wav";
    	var audio = $('#openball').get(0);
    	audio.src = lotteryGameBetController.imgUrl + path + openball[i] + type;
		audio.play();
		i++;
		audio.onended = function() {
			if(i < length) {
	    		lotteryGameBetController.openBallVoice(openball, length, i);
			}
		};	
    },
  	//封單聲音
    stopVoice : function() {
    	var path = "Comm/sound/guoan.mp3";
    	var audio = $('#openball').get(0);
    	audio.src = lotteryGameBetController.imgUrl + path;
		audio.play();
    }
}