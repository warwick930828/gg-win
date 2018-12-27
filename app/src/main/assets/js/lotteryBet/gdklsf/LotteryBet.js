var onChangeCheckgdklsf = onChangeCheckgdklsf || {};
var onChangeCheckgdklsf = {
	getBetsCount : function (betCount, codeAmount) {
		
		// 判斷中獎號碼是否大於等於碼數
		if (betCount < codeAmount) {
			return 0;
		}
		if (codeAmount <= 0) {
		    return 0;
		}
		if (betCount < codeAmount) {
			return 0;
		}
		var betCountA = betCount;
		for (var i=1; i<codeAmount; i++) {
			betCountA *= betCount - i;
		}
		var betCountB = codeAmount;
		for (var i=1; i<codeAmount; i++) {
			betCountB *= codeAmount - i;
		}
		return betCountA / betCountB;
	},
	
	// 选一_选一数投
	check_1 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 18) {
					return true;
				}
			}
			betCount = value.length;
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选一_选一红投
	check_2 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) > 20 || 
					parseInt(value[i]) < 19) {
					return true;
				}
			}
			betCount = value.length;
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选一_任选一
	check_3 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = value.length;
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选二_选二任选
	check_4 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 2);
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选二_任选胆拖
	check_5 : function(betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 2;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 选二_选二连组
	check_6 : function(betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 2);
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选二_连组胆拖
	check_7 : function(betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 2;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 选二_选二连直
	check_8 : function(betData) {

		// 判斷注數
		gd11x5.init(betData);
		var betCount = gd11x5.getData(2);
		
		// 回傳注數
		return betCount;
	},
	
	// 选三_选三任选
	check_9 : function(betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 3);
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选三_任选胆拖
	check_10 : function (betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 3;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 选三_选三连组
	check_11 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 3);
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选三_连组胆拖
	check_12 : function (betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 3;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 选三_选三连直
	check_13 : function (betData) {

		// 判斷注數
		gd11x5.init(betData);
		var betCount = gd11x5.getData(3);
		
		// 回傳注數
		return betCount;
	},
	
	// 选四_选四任选
	check_14 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 4);
		});

		// 回傳注數
		return betCount; 
	},
	
	// 选四_胆拖投注
	check_15 : function (betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 4;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 选五_选五任选
	check_16 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 數字範圍判斷
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 1 || 
					parseInt(value[i]) > 20) {
					return true;
				}
			}
			betCount = onChangeCheckgdklsf.getBetsCount(value.length, 5);
		});

		// 回傳注數
		return betCount; 
	},

	// 选五_胆拖投注
	check_17 : function (betData) {
		
		// 胆
		var betData0 = betData[0];
		var topCount = betData0.length;
		// 拖
		var betData1 = betData[1];
		var bottomCount = betData1.length;
		
		// 總需
		var totalNeed = 5;

		// 無效判斷
		if (bottomCount <= 0 || topCount <= 0 || topCount + bottomCount < totalNeed) {
			return 0;
		}
		return onChangeCheckgdklsf.getBetsCount(bottomCount, totalNeed - topCount);
	},
	
	// 趣味玩法_龙虎
	check_18 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			betCount = value.length;
		});

		// 回傳注數
		return betCount; 
	},

	// 趣味玩法_方位
	check_19 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			betCount += value.length;
		});

		// 回傳注數
		return betCount; 
	},
	
	// 趣味玩法_中发白
	check_20 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			betCount += value.length;
		});

		// 回傳注數
		return betCount; 
	},
	
	// 趣味玩法_五行
	check_21 : function (betData) {
		
		// 判斷注數
		var betCount = 0;
		$.each(betData, function(key, value) {
			betCount += value.length;
		});

		// 回傳注數
		return betCount; 
	}
}

var gd11x5 = {
		args 		: [],
		arr 		: [],
		str 		: '',
		size 		: [],
		gameresult  : [],
		
		// init 
		init : function(betinfo) {
			this.args = betinfo;
			this.str = '';
			this.arr = [];
			this.str = '';
			this.size = [];
			this.gameresult = [];
		},
		comb : function(str , index) {
			var temp_arr = this.args[index];

			index++;
			if (Array.isArray(temp_arr)) {
				for(var i=0;i<temp_arr.length;i++) {
					this.str = str + "," + temp_arr[i];
					this.comb(this.str,index);
				}
			} else {
				this.arr[this.arr.length] = this.str;
				this.str = "";
			}
		},
		
		getData : function(mode) {
			this.comb("",0);
			// 列出所有组合 并扣除重覆组合
			this.arr = array_count_values(this.arr);

			var t = new Array();
			var tmpT = 0;
			var tmpArr = new Array();
	        var count = 0;
	        
			for(var prop in this.arr) {
		        if(this.arr.hasOwnProperty(prop)) {
		            t = prop.split(",");
		            t.shift();

			        tmpT = array_count_values(t);

			        count = 0;
			        for (var k in tmpT) {
			            if (tmpT.hasOwnProperty(k)) {
			               ++count;
			            }
			        }
					if (count == mode) {
						tmpArr[tmpArr.length] = t;
					} 
		        }
		    }
			return tmpArr.length;
		},
		array_count_values : function(CurrentArray) {
			var counts = {};

			for(var i=0;i< CurrentArray.length;i++) {
			  var key = CurrentArray[i];
			  counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			return counts;
		}
}

var array_count_values = function(CurrentArray) {
	var counts = {};

	for(var i=0;i< CurrentArray.length;i++) {
	  var key = CurrentArray[i];
	  counts[key] = (counts[key])? counts[key] + 1 : 1 ;
	}
	return counts;
}

