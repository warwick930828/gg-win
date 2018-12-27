var onChangeCheckfc3d = onChangeCheckfc3d || {};
var onChangeCheckfc3d = {
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
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_2: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 0 || parseInt(value[i]) > 9) {
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
        var betConfigArr = {
            0: 1,
            1: 3,
            2: 6,
            3: 10,
            4: 15,
            5: 21,
            6: 28,
            7: 36,
            8: 45,
            9: 55,
            10: 63,
            11: 69,
            12: 73,
            13: 75,
            14: 75,
            15: 73,
            16: 69,
            17: 63,
            18: 55,
            19: 45,
            20: 36,
            21: 28,
            22: 21,
            23: 15,
            24: 10,
            25: 6,
            26: 3,
            27: 1
        };
        var betCount = 0;
        $.each(betData[0], function(key, value) {
            if (betConfigArr[value]) {
                betCount += betConfigArr[value];
            }
        });
        return betCount;
    },
    check_4: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckfc3d.getBetsCount(betData0.length, 2) * 2;
        return betCount;
    },
    check_5: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 0 || parseInt(value[i]) > 9) {
                    return true;
                }
            }
            if (value.length != 3) {
                return false;
            }
            var valueCount = onChangeCheckfc3d.arrayCountValues(value);
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
        return betCount;
    },
    check_6: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckfc3d.getBetsCount(betData0.length, 3);
        return betCount;
    },
    check_7: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (parseInt(value[i]) < 0 || parseInt(value[i]) > 9) {
                    return true;
                }
            }
            if (value.length != 3) {
                return false;
            }
            var valueCount = onChangeCheckfc3d.arrayCountValues(value);
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
        return betCount;
    },
    check_8: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value.length != 3) {
                return false;
            }
            var valueCount = onChangeCheckfc3d.arrayCountValues(value);
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
        return betCount;
    },
    check_9: function(betData) {
        var betConfigArr = {
            1: 1,
            2: 2,
            3: 2,
            4: 4,
            5: 5,
            6: 6,
            7: 8,
            8: 10,
            9: 11,
            10: 13,
            11: 14,
            12: 14,
            13: 15,
            14: 15,
            15: 14,
            16: 14,
            17: 13,
            18: 11,
            19: 10,
            20: 8,
            21: 6,
            22: 5,
            23: 4,
            24: 2,
            25: 2,
            26: 1
        };
        var betCount = 0;
        $.each(betData[0], function(key, value) {
            if (betConfigArr[value]) {
                betCount += betConfigArr[value];
            }
        });
        return betCount;
    },
    check_10: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_11: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value.length == 2) {
                betCount++;
            }
        });
        return betCount;
    },
    check_12: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_13: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value.length == 2) {
                betCount++;
            }
        });
        return betCount;
    },
    check_14: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckfc3d.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_15: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value.length != 2) {
                return false;
            }
            var valueCount = onChangeCheckfc3d.arrayCountValues(value);
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
        return betCount;
    },
    check_16: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckfc3d.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_17: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            if (value.length != 2) {
                return false;
            }
            var valueCount = onChangeCheckfc3d.arrayCountValues(value);
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
        return betCount;
    },
    check_18: function(betData) {
        var betCount = 0;
        $.each(betData, function(key, value) {
            betCount += value.length;
        });
        return betCount;
    },
    check_19: function(betData) {
        var betData0 = betData[0];
        var betCount = betData0.length;
        return betCount;
    },
    check_20: function(betData) {
        var betData0 = betData[0];
        var betCount = onChangeCheckfc3d.getBetsCount(betData0.length, 2);
        return betCount;
    },
    check_21: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_22: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_23: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_24: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    },
    check_25: function(betData) {
        var betCount = 1;
        $.each(betData, function(key, value) {
            betCount *= value.length;
        });
        return betCount;
    }
}
