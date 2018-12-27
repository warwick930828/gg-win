var onChangeCheckgd11x5 = onChangeCheckgd11x5 || {};
var onChangeCheckgd11x5 = {
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
    check_1: function(betData) {
        gd11x5.init(betData);
        var betCount = gd11x5.getData(3);
        return betCount;
    },
    check_2: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            if (value.length == 3) {
                betCount++;
            }
        });
        return betCount;
    },
    check_3: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 3);
        return betCount;
    },
    check_4: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            if (value.length == 3) {
                betCount++;
            }
        });
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
            return bottomCount * (bottomCount - 1) / 2;
            break;
        case 2:
            return bottomCount;
            break;
        default:
            return 0;
        }
    },
    check_6: function(betData) {
        gd11x5.init(betData);
        var betCount = gd11x5.getData(2);
        return betCount;
    },
    check_7: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            if (value.length == 2) {
                betCount++;
            }
        });
        return betCount;
    },
    check_8: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_9: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            if (value.length == 2) {
                betCount++;
            }
        });
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
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount += betDataI.length;
        }
        return betCount;
    },
    check_13: function(betData) {
        var betCount = 0;
        var betData0 = betData[0];
        for (var i = 0; i < betData0.length; i++) {
            if (betData[0][i] == 1) {
                betCount++;
            }
        }
        return betCount;
    },
    check_14: function(betData) {
        var betData0 = betData[0];
        return betData0.length;
    },
    check_15: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 1);
        return betCount;
    },
    check_16: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_17: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 3);
        return betCount;
    },
    check_18: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 4);
        return betCount;
    },
    check_19: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 5);
        return betCount;
    },
    check_20: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 6);
        return betCount;
    },
    check_21: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 7);
        return betCount;
    },
    check_22: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckgd11x5.getBetsCount(betData0.length, 8);
        return betCount;
    },
    check_23: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            if (value.length == 1) {
                betCount++;
            }
        });
        return betCount;
    },
    check_24: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 2 && valueKeys == 2) {
                betCount++;
            }
        });
        return betCount;
    },
    check_25: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 3 && valueKeys == 3) {
                betCount++;
            }
        });
        return betCount;
    },
    check_26: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 4 && valueKeys == 4) {
                betCount++;
            }
        });
        return betCount;
    },
    check_27: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 5 && valueKeys == 5) {
                betCount++;
            }
        });
        return betCount;
    },
    check_28: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 6 && valueKeys == 6) {
                betCount++;
            }
        });
        return betCount;
    },
    check_29: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 7 && valueKeys == 7) {
                betCount++;
            }
        });
        return betCount;
    },
    check_30: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 1 || parseInt(value[i]) > 11) {
                    return true;
                }
            }
            var valueCount = array_count_values(value);
            var valueKeys = 0;
            $.each(valueCount, function(key, value) {
                if (value !== undefined) {
                    valueKeys++;
                }
            });
            if (value.length == 8 && valueKeys == 8) {
                betCount++;
            }
        });
        return betCount;
    },
    check_31: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 2;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_32: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 3;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_33: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 4;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_34: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 5;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_35: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 6;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_36: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 7;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
    },
    check_37: function(betData) {
        var betData0 = betData[0];
        var topCount = betData0.length;
        var betData1 = betData[1];
        var bottomCount = betData1.length;
        var totalNeed = 8;
        if (topCount == 0 || bottomCount == 0 || (topCount + bottomCount) < totalNeed) {
            return 0;
        } else {
            return onChangeCheckgd11x5.getBetsCount(bottomCount, totalNeed - topCount);
        }
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
