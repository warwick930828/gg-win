

var onChangeCheckcqssc = onChangeCheckcqssc || {};
var onChangeCheckcqssc = {
	// 字段倍数配置
	betPositionMultiPer2 : [0, 0, 1, 3, 6, 10],
	betPositionMultiPer3 : [0, 0, 0, 1, 4, 10],
	betPositionMultiPer4 : [0, 0, 0, 0, 1, 5],
	
	getBetsCount : function (betCount, codeAmount) {
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
	
	arrayCountValues : function (arr) {
	    var v, freqs = [];

	    for (var i = arr.length; i--; ) { 
	        v = arr[i];
	        if (freqs[v]) freqs[v] += 1;
	        else freqs[v] = 1;
	    }

	    return freqs;
	},
	
	// 任选直选递回方法
	getAllBetsFromCustomPos : function (betData, betAmount) {

		// 检查阵列第二维下注量
		var betDataCount = 0
		$.each(betData, function(key, value) {
			if (value[0] !== undefined) {
				betDataCount++;
			}
		});
		if (betDataCount < betAmount) {
			return 0;
		}
		
		// 进行递回
		var betCount = 0;
		if (betAmount == 1) {
			$.each(betData, function(key, value) {
				betCount += value.length;
			});
		} else {
			var betTemp = $.extend(true, [], betData);
			var loopLength = betTemp.length
			for (var i = 0; i < loopLength; i++) {
				var betTemp0 = betTemp[0];
				var len = betTemp0.length;
				betTemp.splice(0, 1);
				betCount += len * onChangeCheckcqssc.getAllBetsFromCustomPos(betTemp, betAmount - 1);
			}
		}
		
		// 返回运算结果
		return betCount;
	},
	
	// 五星_直选复式
	check_1 : function (betData) {
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_直选单式
	check_2 : function (betData) {
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 5) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_五星组合
	check_3 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 5;
		
		// 回传注数
		return betCount;
	},
	
	// 五星_五星和值
	check_130 : function (betData) {
		
	 // 和值配置
		var betConfigArr = {
			0:1,1:5,2:15,3:35,4:70,5:126,6:210,7:330,8:495,9:715,
			10:996,11:1340,12:1745,13:2205,14:2710,15:3246,16:3795,
			17:4335,18:4840,19:5280,20:5631,21:5875,22:6000,23:6000,
			24:5875,25:5631,26:5280,27:4840,28:4335,29:3795,30:3246,
			31:2710,32:2205,33:1745,34:1340,35:996,36:715,37:495,38:330,
			39:210,40:126,41:70,42:35,43:15,44:5,45:1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_组选120
	check_4 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 5);
		
		// 回传注数
		return betCount;
	},

	// 五星_组选60
	check_5 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 3);
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_组选30
	check_6 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key1, value1) {
			
			// 去除第一阵列相同的数字
			var betData_1 = betData[0];
			var checkArr1 = betData_1.slice(0);
			var index = checkArr1.indexOf(value1);
			if (index > -1) {
				checkArr1.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr1.length, 2);
			
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_组选20
	check_7 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 2);
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_组选10
	check_8 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 1);
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_组选5
	check_9 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 1);
		});
		
		// 回传注数
		return betCount;
	},

	// 五星_一帆风顺
	check_10 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 五星_好事成双
	check_11 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 五星_三星报喜
	check_12 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 五星_四季发财
	check_13 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},
	
	// 四星_直选复式
	check_14 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 四星_直选单式
	check_15 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 4) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 四星_四星组合
	check_16 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 4;
		
		// 回传注数
		return betCount;
	},

	// 四星_组选24
	check_17 : function (betData) {
		
		// 判断注数
		var betData_0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData_0.length, 4);
		
		// 回传注数
		return betCount;
	},

	// 四星_组选12
	check_18 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 2);
		});
		
		// 回传注数
		return betCount;
	},

	// 四星_组选6
	check_19 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},

	// 四星_组选4
	check_20 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 1);
		});
		
		// 回传注数
		return betCount;
	},
	
	// 前四_直选复式
	check_99 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 前四_直选单式
	check_100 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 4) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前四_四星组合
	check_101 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 4;
		
		// 回传注数
		return betCount;
	},

	// 前四_组选24
	check_102 : function (betData) {
		
		// 判断注数
		var betData_0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData_0.length, 4);
		
		// 回传注数
		return betCount;
	},

	// 前四_组选12
	check_103 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 2);
		});
		
		// 回传注数
		return betCount;
	},

	// 前四_组选6
	check_104 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},

	// 前四_组选4
	check_105 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData_1 = betData[1];
			var checkArr = betData_1.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 1);
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_直选复式
	check_21 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_直选单式
	check_22 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_后三组合
	check_23 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 3;
		
		// 回传注数
		return betCount;
	},

	// 后三_直选和值
	check_24 : function (betData) {
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 3, 2 : 6, 3 : 10, 4 : 15, 5 : 21, 6 : 28, 7 : 36,
				8 : 45, 9 : 55, 10 : 63, 11 : 69, 12 : 73, 13 : 75, 14 : 75,
				15 : 73, 16 : 69, 17 : 63, 18 : 55, 19 : 45, 20 : 36, 21 : 28,
				22 : 21, 23 : 15, 24 : 10, 25 : 6, 26 : 3, 27 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_直选跨度
	check_25 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 10, 1 : 54, 2 : 96, 3 : 126, 4 : 144, 5 : 150,
				6 : 144, 7 : 126, 8 : 96, 9 : 54 
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_组三复式
	check_26 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2) * 2;
		
		// 回传注数
		return betCount;
	},

	// 后三_组三单式
	check_27 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_组六复式
	check_28 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 3);
		
		// 回传注数
		return betCount;
	},

	// 后三_组六单式
	check_29 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_混合组选
	check_30 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3 || valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_组选和值
	check_31 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 2, 3 : 2, 4 : 4, 5 : 5, 6 : 6, 7 : 8,
				8 : 10, 9 : 11, 10 : 13, 11 : 14, 12 : 14, 13 : 15, 14 : 15,
				15 : 14, 16 : 14, 17 : 13, 18 : 11, 19 : 10, 20 : 8, 21 : 6,
				22 : 5, 23 : 4, 24 : 2, 25 : 2, 26 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后三_组选包胆
	check_32 : function (betData) {
	    
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length ? 54 : 0;
		
		// 回传注数
		return betCount;
	},

	// 后三_和值尾数
	check_33 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 后三_特殊号
	check_34 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},
	
	// 中三_直选复式
	check_106 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_直选单式
	check_107 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_后三组合
	check_108 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 3;
		
		// 回传注数
		return betCount;
	},

	// 中三_直选和值
	check_109 : function (betData) {
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 3, 2 : 6, 3 : 10, 4 : 15, 5 : 21, 6 : 28, 7 : 36,
				8 : 45, 9 : 55, 10 : 63, 11 : 69, 12 : 73, 13 : 75, 14 : 75,
				15 : 73, 16 : 69, 17 : 63, 18 : 55, 19 : 45, 20 : 36, 21 : 28,
				22 : 21, 23 : 15, 24 : 10, 25 : 6, 26 : 3, 27 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_直选跨度
	check_110 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 10, 1 : 54, 2 : 96, 3 : 126, 4 : 144, 5 : 150,
				6 : 144, 7 : 126, 8 : 96, 9 : 54 
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_组三复式
	check_111 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2) * 2;
		
		// 回传注数
		return betCount;
	},

	// 中三_组三单式
	check_112 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_组六复式
	check_113 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 3);
		
		// 回传注数
		return betCount;
	},

	// 中三_组六单式
	check_114 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_混合组选
	check_115 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3 || valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_组选和值
	check_116 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 2, 3 : 2, 4 : 4, 5 : 5, 6 : 6, 7 : 8,
				8 : 10, 9 : 11, 10 : 13, 11 : 14, 12 : 14, 13 : 15, 14 : 15,
				15 : 14, 16 : 14, 17 : 13, 18 : 11, 19 : 10, 20 : 8, 21 : 6,
				22 : 5, 23 : 4, 24 : 2, 25 : 2, 26 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 中三_组选包胆
	check_117 : function (betData) {
	    
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length ? 54 : 0;
		
		// 回传注数
		return betCount;
	},

	// 中三_和值尾数
	check_118 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 中三_特殊号
	check_119 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 前三_直选复式
	check_35 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_直选单式
	check_36 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_后三组合
	check_37 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		betCount *= 3;
		
		// 回传注数
		return betCount;
	},

	// 前三_直选和值
	check_38 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 3, 2 : 6, 3 : 10, 4 : 15, 5 : 21, 6 : 28, 7 : 36,
				8 : 45, 9 : 55, 10 : 63, 11 : 69, 12 : 73, 13 : 75, 14 : 75,
				15 : 73, 16 : 69, 17 : 63, 18 : 55, 19 : 45, 20 : 36, 21 : 28,
				22 : 21, 23 : 15, 24 : 10, 25 : 6, 26 : 3, 27 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_直选跨度
	check_39 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 10, 1 : 54, 2 : 96, 3 : 126, 4 : 144, 5 : 150,
				6 : 144, 7 : 126, 8 : 96, 9 : 54 
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_组三复式
	check_40 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2) * 2;
		
		// 回传注数
		return betCount;
	},

	// 前三_组三单式
	check_41 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_组六复式
	check_42 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 3);
		
		// 回传注数
		return betCount;
	},

	// 前三_组六单式
	check_43 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_混合组选
	check_44 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3 || valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_组选和值
	check_45 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 2, 3 : 2, 4 : 4, 5 : 5, 6 : 6, 7 : 8,
				8 : 10, 9 : 11, 10 : 13, 11 : 14, 12 : 14, 13 : 15, 14 : 15,
				15 : 14, 16 : 14, 17 : 13, 18 : 11, 19 : 10, 20 : 8, 21 : 6,
				22 : 5, 23 : 4, 24 : 2, 25 : 2, 26 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前三_组选包胆
	check_46 : function (betData) {
		
	    	// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length ? 54 : 0;
		
		// 回传注数
		return betCount;
	},

	// 前三_和值尾数
	check_47 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 前三_特殊号
	check_48 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},

	// 后二_直选复式
	check_49 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_直选单式
	check_50 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_直选和值
	check_51 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 2, 2 : 3, 3 : 4, 4 : 5, 5 : 6, 6 : 7, 7 : 8,
				8 : 9, 9 : 10, 10 : 9, 11 : 8, 12 : 7, 13 : 6, 14 : 5,
				15 : 4, 16 : 3, 17 : 2, 18 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_直选跨度
	check_52 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 10, 1 : 18, 2 : 16, 3 : 14, 4 : 12, 5 : 10,
				6 : 8, 7 : 6, 8 : 4, 9 : 2 
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_组选复式
	check_53 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},

	// 后二_组选单式
	check_54 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 2) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_组选和值
	check_55 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 1, 3 : 2, 4 : 2, 5 : 3, 6 : 3, 7 : 4,
				8 : 4, 9 : 5, 10 : 4, 11 : 4, 12 : 3, 13 : 3, 14 : 2,
				15 : 2, 16 : 1, 17 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 后二_组选包胆
	check_56 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length ? 9 : 0;
		
		// 回传注数
		return betCount;
	},

	// 前二_直选复式
	check_57 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_直选单式
	check_58 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_直选和值
	check_59 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 2, 2 : 3, 3 : 4, 4 : 5, 5 : 6, 6 : 7, 7 : 8,
				8 : 9, 9 : 10, 10 : 9, 11 : 8, 12 : 7, 13 : 6, 14 : 5,
				15 : 4, 16 : 3, 17 : 2, 18 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_直选跨度
	check_60 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				0 : 10, 1 : 18, 2 : 16, 3 : 14, 4 : 12, 5 : 10,
				6 : 8, 7 : 6, 8 : 4, 9 : 2 
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_组选复式
	check_61 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},

	// 前二_组选单式
	check_62 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 2) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_组选和值
	check_63 : function (betData) {
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 1, 3 : 2, 4 : 2, 5 : 3, 6 : 3, 7 : 4,
				8 : 4, 9 : 5, 10 : 4, 11 : 4, 12 : 3, 13 : 3, 14 : 2,
				15 : 2, 16 : 1, 17 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 回传注数
		return betCount;
	},

	// 前二_组选包胆
	check_64 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length ? 9 : 0;
		
		// 回传注数
		return betCount;
	},
	
	// 定位胆_定位胆
	check_65 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
	    	betCount += value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_后三一码
	check_66 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_前三一码
	check_67 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_后三二码
	check_68 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_前三二码
	check_69 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_四星一码
	check_70 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = betData0.length;
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_四星二码
	check_71 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_五星二码
	check_72 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 2);
		
		// 回传注数
		return betCount;
	},
	
	// 不定位_五星三码
	check_73 : function (betData) {
		
		// 判断注数
		var betData0 = betData[0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData0.length, 3);
		
		// 回传注数
		return betCount;
	},
	
	// 大小单双_前二大小单双
	check_74 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 大小单双_后二大小单双
	check_75 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 大小单双_前三大小单双
	check_76 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 大小单双_后三大小单双
	check_77 : function (betData) {
		
		// 判断注数
		var betCount = 1;
		$.each(betData, function(key, value) {
	    	betCount *= value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 五星_总和大小单双
	check_144 : function (betData) {
		
		// 判断注数
		var betCount = 0;
		$.each(betData, function(key, value) {
	    	betCount += value.length;
		});
		
		// 回传注数
		return betCount;
	},
	
	// 龙虎_万千
    check_120 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_万百
    check_121 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_万十
    check_122 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_万个
    check_123 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_千百
    check_124 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_千十
    check_125 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_千个
    check_126 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_百十
    check_127 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_百个
    check_128 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },
    
    // 龙虎_十个
    check_129 : function (betData) {
        // 判断注数
        var betCount = 1;
        betCount *= (betData[0].length + betData[1].length);
        
        // 回传注数
        return betCount;
    },

	// 任选二_直选复式
	check_78 : function (betData) {

		// 判断注数
		var betCount = onChangeCheckcqssc.getAllBetsFromCustomPos(betData, 2);
		
		// 回传注数
		return betCount;
	},

	// 任选二_直选单式
	check_79 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			// 数字长度判断
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 2) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer2[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选二_直选和值
	check_80 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});

		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 2, 2 : 3, 3 : 4, 4 : 5, 5 : 6, 6 : 7, 7 : 8,
				8 : 9, 9 : 10, 10 : 9, 11 : 8, 12 : 7, 13 : 6, 14 : 5,
				15 : 4, 16 : 3, 17 : 2, 18 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer2[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选二_组选复式
	check_81 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betData10 = betData[1][0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData10.length, 2);
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer2[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选二_组选单式
	check_82 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			// 数字长度判断
			if (value == 1) {
				betPosCount++;
			}
		});

		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 2) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer2[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选二_组选和值
	check_83 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 1, 3 : 2, 4 : 2, 5 : 3, 6 : 3, 7 : 4,
				8 : 4, 9 : 5, 10 : 4, 11 : 4, 12 : 3, 13 : 3, 14 : 2,
				15 : 2, 16 : 1, 17 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer2[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_直选复式
	check_84 : function (betData) {

		// 判断注数
		var betCount = onChangeCheckcqssc.getAllBetsFromCustomPos(betData, 3);
		
		// 回传注数
		return betCount;
	},

	// 任选三_直选单式
	check_85 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			// 数字长度判断
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length == 3) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_直选和值
	check_86 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 和值配置
		var betConfigArr = {
				0 : 1, 1 : 3, 2 : 6, 3 : 10, 4 : 15, 5 : 21, 6 : 28, 7 : 36,
				8 : 45, 9 : 55, 10 : 63, 11 : 69, 12 : 73, 13 : 75, 14 : 75,
				15 : 73, 16 : 69, 17 : 63, 18 : 55, 19 : 45, 20 : 36, 21 : 28,
				22 : 21, 23 : 15, 24 : 10, 25 : 6, 26 : 3, 27 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_组三复式
	check_87 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betData10 = betData[1][0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData10.length, 2) * 2;
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_组三单式
	check_88 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			// 数字长度判断
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 2) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_组六复式
	check_89 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betData10 = betData[1][0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData10.length, 3);
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_组六单式
	check_90 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			// 数字长度判断
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_混合组选
	check_91 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			// 数字范围判断
			for (var i = 0; i < value.length; i++) {
				if (parseInt(value[i]) < 0 || 
					parseInt(value[i]) > 9) {
					return true;
				}
			}
			// 数字长度判断
			if (value.length != 3) {
				return;
			}
			// 判断组成数字量
			var valueCount = onChangeCheckcqssc.arrayCountValues(value);
			var valueKeys = 0;
			$.each(valueCount, function(key, value) {
				if (value !== undefined) {
					valueKeys++;
				}
			});
			if (valueKeys == 3 || valueKeys == 2) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选三_组选和值
	check_92 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 和值配置
		var betConfigArr = {
				1 : 1, 2 : 2, 3 : 2, 4 : 4, 5 : 5, 6 : 6, 7 : 8,
				8 : 10, 9 : 11, 10 : 13, 11 : 14, 12 : 14, 13 : 15, 14 : 15,
				15 : 14, 16 : 14, 17 : 13, 18 : 11, 19 : 10, 20 : 8, 21 : 6,
				22 : 5, 23 : 4, 24 : 2, 25 : 2, 26 : 1
		};
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			if (betConfigArr[value]) {
				betCount += betConfigArr[value];
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer3[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选四_直选复式
	check_93 : function (betData) {

		// 判断注数
		var betCount = onChangeCheckcqssc.getAllBetsFromCustomPos(betData, 4);
		
		// 回传注数
		return betCount;
	},

	// 任选四_直选复式
	check_94 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1], function(key, value) {
			if (value.length == 4) {
				betCount++;
			}
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer4[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选四_组选24
	check_95 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betData10 = betData[1][0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData10.length, 4);
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer4[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选四_组选12
	check_96 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData11 = betData[1][1];
			var checkArr = betData11.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 2);
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer4[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选四_组选6
	check_97 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betData10 = betData[1][0];
		var betCount = onChangeCheckcqssc.getBetsCount(betData10.length, 2);
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer4[betPosCount];
		
		// 回传注数
		return betCount;
	},

	// 任选四_组选4
	check_98 : function (betData) {

		// 字段判断
		var betPosCount = 0;
		$.each(betData[0], function(key, value) {
			if (value == 1) {
				betPosCount++;
			}
		});
		
		// 判断注数
		var betCount = 0;
		$.each(betData[1][0], function(key, value) {
			
			// 去除第二阵列相同的数字
			var betData11 = betData[1][1];
			var checkArr = betData11.slice(0);
			var index = checkArr.indexOf(value);
			if (index > -1) {
				checkArr.splice(index, 1);
			}
			
			// 计算组合注数
			betCount += onChangeCheckcqssc.getBetsCount(checkArr.length, 1);
		});
		
		// 乘上字段倍数
		betCount *= onChangeCheckcqssc.betPositionMultiPer4[betPosCount];
		
		// 回传注数
		return betCount;
	},
	
	// 百家乐_庄闲和
    check_131 : function (betData) {
        // 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
	
	// 百家乐_庄闲对
    check_132 : function (betData) {
        // 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
	
	// 百家乐_庄闲大小单双质合
    check_133 : function (betData) {
        // 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
	
	// 牛牛_牛牛
    check_134 : function (betData) {
        // 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
	
	// 牛牛_大小单双
    check_135 : function (betData) {
        // 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
    
    // 德州扑克
    check_136 : function (betData) {
    	// 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
    
    // 三公_左右和
    check_137 : function (betData) {
    	// 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    },
    
    // 三公_大小单双质合
    check_138 : function (betData) {
    	// 判断注数
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        
        // 回传注数
        return betCount;
    }
}