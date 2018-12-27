//获取一级玩法的数据
function getFirstPlayType(_funcName)
{
	var func = eval(_funcName);
	return func;
}

//获取二级玩法的数据
function getSecoundPlayType(_funcName)
{
	var func = eval(_funcName);
	return func;
}

//检测当前玩法的数量
function checkCount(_funcName, _data)
{
	var func = eval(_funcName);
	return func(_data);
}

//获取二级玩法的信息
function getSecoundTypeInfo(_funcName)
{
	var func = eval(_funcName);
	return func;
}

//解析数据
function getInputArr(_inputText, baseGame, isSort)
{
	var tmpBetData = [];
	var betData = [];
    var betDataText = _inputText;
    if (baseGame == "cqssc" || baseGame == "fc3d")
	{
        // 取出單式內容並以[ ]分割
        betDataText = betDataText.replace(/\D/gi, " ");
        betDataText = betDataText.split(" ");
    } 
    else 
    {
        // 取出單式內容並以[,]分割
        betDataText = betDataText.replace(/\;/gi, ",");
        betDataText = betDataText.replace(/\n/g, ",");
        betDataText = betDataText.split(",");
    }
    // 處理個別注單
    $.each(betDataText, function (key, oneBet) 
    {
        oneBetData = [];
        if (baseGame == "cqssc" || baseGame == "fc3d") 
        {
            // 將非數字清除並分割字串
            oneBet = oneBet.replace(/\D/gi, "");
            oneBet = oneBet.split("");
        }
        else 
        {
            // 將非數字轉成空白並以空白分割字串
            oneBet = oneBet.replace(/\D/gi, " ");
            oneBet = oneBet.split(" ");
        }
        $.each(oneBet, function (key, value) 
        {
            if (value.length > 0) 
            {
                oneBetData.push(value);
            }
        });
        // 判斷是否需要排序 (不限制順序玩法)
        if (isSort) 
        {
        	oneBetData.sort(function(a, b) { return a - b; });
        }
        if (oneBetData.length != 0) 
        {
        	betData.push(oneBetData);
        }
    });
    
    return betData;
}

function addBetToOrderNow(betTextData, posSelect, _baseGameName, gameTypeId)
{
    // 錯誤注單
    var failBetArray = [];
    // 判斷是否有選擇位置
    if (posSelect) {
        var checkPos = betTextData[0];
        var checkBet = betTextData[1];
    } else {
        var checkBet = betTextData;
    }
    // 計算注數
    var checkMethod = 'onChangeCheck' +_baseGameName+ '.check_' + gameTypeId;
    // 判斷各個注單是否正確
    $.each(checkBet, function (key, value) {
        if (checkPos) {
            value = [checkPos, [value]];
        } else {
            value = [value];
        }
        if (!checkCount(checkMethod, value)) {
            failBetArray.unshift(key);
        }
    });
    // 去除錯誤注單
    $.each(failBetArray, function (key, value) {
        if (posSelect) {
            betTextData[1].splice(value, 1);
        } else {
            betTextData.splice(value, 1);
        }
    });
    return betTextData;
}