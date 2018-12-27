var onChangeCheckbjkl8 = onChangeCheckbjkl8 || {};
var onChangeCheckbjkl8 = {
    check_1: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount;
    },
    check_2: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) / 2;
    },
    check_3: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) * (betCount - 2) / 6;
    },
    check_4: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) * (betCount - 2) * (betCount - 3) / 24;
    },
    check_5: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) * (betCount - 2) * (betCount - 3) * (betCount - 4) / 120;
    },
    check_6: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) * (betCount - 2) * (betCount - 3) * (betCount - 4) * (betCount - 5) / 720;
    },
    check_7: function(betData) {
        var betCount = 0;
        for (var i = 0; i < betData.length; i++) {
            var betDataI = betData[i];
            betCount = betCount + betDataI.length;
        }
        return betCount * (betCount - 1) * (betCount - 2) * (betCount - 3) * (betCount - 4) * (betCount - 5) * (betCount - 6) / 5040;
    },
    check_8: function(betData) {
        var betCount = 0;
        var betData0 = betData[0];
        for (var i = 0; i < betData0.length; i++) {
            if (betData[0][i] == 1) {
                betCount++;
            }
        }
        return betCount;
    },
    check_9: function(betData) {
        var betCount = 0;
        var betData0 = betData[0];
        for (var i = 0; i < betData0.length; i++) {
            if (betData[0][i] == 1) {
                betCount++;
            }
        }
        return betCount;
    },
    check_10: function(betData) {
        var betCount = 0;
        var betData0 = betData[0];
        for (var i = 0; i < betData0.length; i++) {
            if (betData[0][i] == 1) {
                betCount++;
            }
        }
        return betCount;
    }
}
