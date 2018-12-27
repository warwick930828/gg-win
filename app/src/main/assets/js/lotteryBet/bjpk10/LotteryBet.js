var onChangeCheckbjpk10 = onChangeCheckbjpk10 || {};
var onChangeCheckbjpk10 = {
    getBetsCount: function(betCount, codeAmount) {
        if (betCount < codeAmount) {
            return 0;
        }
        var betCountA = betCount;
        for (var i = 1; i < codeAmount; i++) {
            betCountA *= betCount - i;
        }
        var betCountB = codeAmount;
        for (var i = 1; i < codeAmount; i++) {
            betCountB *= codeAmount - i;
        }
        return betCountA / betCountB;
    },
    arrayCountValues: function(arr) {
        var v, freqs = [];
        for (var i = arr.length; i--; ) {
            v = arr[i];
            if (freqs[v])
                freqs[v] += 1;
            else
                freqs[v] = 1;
        }
        return freqs;
    },
    check_1: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
        return betCount;
    },
    check_2: function(betData) {
        gd11x5.init(betData);
        var betCount = gd11x5.getData(2);
        return betCount;
    },
    check_3: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 10) {
                    return true;
                }
            }
            if (value.length == 2 && value[0] != value[1]) {
                betCount++;
            }
        });
        return betCount;
    },
    check_4: function(betData) {
        gd11x5.init(betData);
        var betCount = gd11x5.getData(3);
        return betCount;
    },
    check_5: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 10) {
                    return true;
                }
            }
            if (value.length == 3 && value[0] != value[1] && value[0] != value[2] && value[1] != value[2]) {
                betCount++;
            }
        });
        return betCount;
    },
    check_19: function(betData) {
        var betCount = 0;
        if (betData[0].length > 0 && betData[1].length > 0 && betData[2].length > 0 && betData[3].length > 0) {
            for (a = 0; a < betData[0].length; a++) {
                for (b = 0; b < betData[1].length; b++) {
                    for (c = 0; c < betData[2].length; c++) {
                        for (d = 0; d < betData[3].length; d++) {
                            var array = new Array();
                            array[0] = betData[0][a];
                            array[1] = betData[1][b];
                            array[2] = betData[2][c];
                            array[3] = betData[3][d];
                            var is_repeat = isRepeat(array);
                            if (is_repeat != true) {
                                betCount++;
                            }
                        }
                    }
                }
            }
        }
        return betCount;
    },
    check_20: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 10) {
                    return true;
                }
            }
            var is_repeat = isRepeat(value);
            if (value.length == 4 && is_repeat != true) {
                betCount++;
            }
        });
        return betCount;
    },
    check_21: function(betData) {
        var betCount = 0;
        if (betData[0].length > 0 && betData[1].length > 0 && betData[2].length > 0 && betData[3].length > 0 && betData[4].length > 0) {
            for (a = 0; a < betData[0].length; a++) {
                for (b = 0; b < betData[1].length; b++) {
                    for (c = 0; c < betData[2].length; c++) {
                        for (d = 0; d < betData[3].length; d++) {
                            for (e = 0; e < betData[4].length; e++) {
                                var array = new Array();
                                array[0] = betData[0][a];
                                array[1] = betData[1][b];
                                array[2] = betData[2][c];
                                array[3] = betData[3][d];
                                array[4] = betData[4][e];
                                var is_repeat = isRepeat(array);
                                if (is_repeat != true) {
                                    betCount++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return betCount;
    },
    check_22: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 10) {
                    return true;
                }
            }
            var is_repeat = isRepeat(value);
            if (value.length == 5 && is_repeat != true) {
                betCount++;
            }
        });
        return betCount;
    },
    check_6: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_7: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_8: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_9: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_10: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_11: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_12: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_13: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_14: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, obj) {
            value = JSON.parse(obj);
            $.each(value, function(okey, ovalue) {
                if (ovalue > 0) {
                    betCount += ovalue;
                }
            });
        });
        return betCount;
    },
    check_15: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_16: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_17: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_18: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    }
}
var gd11x5 = {
    args: [],
    arr: [],
    str: '',
    size: [],
    gameresult: [],
    init: function(betinfo) {
        this.args = betinfo;
        this.str = '';
        this.arr = [];
        this.str = '';
        this.size = [];
        this.gameresult = [];
    },
    comb: function(str, index) {
        var temp_arr = this.args[index];
        index++;
        if (Array.isArray(temp_arr)) {
            for (var i = 0; i < temp_arr.length; i++) {
                this.str = str + "," + temp_arr[i];
                this.comb(this.str, index);
            }
        } else {
            this.arr[this.arr.length] = this.str;
            this.str = "";
        }
    },
    getData: function(mode) {
        this.comb("", 0);
        this.arr = array_count_values(this.arr);
        var t = new Array();
        var tmpT = 0;
        var tmpArr = new Array();
        var count = 0;
        for (var prop in this.arr) {
            if (this.arr.hasOwnProperty(prop)) {
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
    array_count_values: function(CurrentArray) {
        var counts = {};
        for (var i = 0; i < CurrentArray.length; i++) {
            var key = CurrentArray[i];
            counts[key] = (counts[key]) ? counts[key] + 1 : 1;
        }
        return counts;
    }
}
var array_count_values = function(CurrentArray) {
    var counts = {};
    for (var i = 0; i < CurrentArray.length; i++) {
        var key = CurrentArray[i];
        counts[key] = (counts[key]) ? counts[key] + 1 : 1;
    }
    return counts;
}
var isRepeat = function(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]])
            return true;
        hash[arr[i]] = true;
    }
    return false;
}
