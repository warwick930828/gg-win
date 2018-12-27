var onChangeCheckjsk3 = onChangeCheckjsk3 || {};
var onChangeCheckjsk3 = {
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
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value == 1) {
                betCount++;
            }
        });
        return betCount;
    },
    check_3: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
        return betCount;
    },
    check_4: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckjsk3.getBetsCount(betData0.length, 3);
        return betCount;
    },
    check_5: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        switch (topCount) {
        case 0:
            return 0;
            break;
        case 1:
            return onChangeCheckjsk3.getBetsCount(bottomCount, 2);
            break;
        case 2:
            return bottomCount;
            break;
        default:
            return 0;
        }
    },
    check_6: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value == 1) {
                betCount++;
            }
        });
        return betCount;
    },
    check_7: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
        return betCount;
    },
    check_8: function(betData) {
        gd11x5.init(betData);
        var betCount = gd11x5.getData(2);
        return betCount;
    },
    check_9: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckjsk3.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_10: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        switch (topCount) {
        case 0:
            return 0;
            break;
        case 1:
            return bottomCount;
            break;
        default:
            return 0;
        }
    },
    check_11: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
        return betCount;
    },
    check_12: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
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
