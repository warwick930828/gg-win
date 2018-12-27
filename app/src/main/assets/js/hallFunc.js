function loadOtherJs()
{
	//loadJs('js/lotteryBet/jsApiaf6b9275.js?v=10000');
	///loadJs('js/lotteryBet/cqssc/LotteryBet567a7017.js?v=10000');
	//loadJs('js/lotteryBet/gd11x5/LotteryBetd8134a20.js?v=10000');
	//loadJs('js/lotteryBet/fc3d/LotteryBet37d5a881.js?v=10000');
	//loadJs('js/lotteryBet/bjkl8/LotteryBet73a31ce7.js?v=10000');
	//loadJs('js/lotteryBet/bjpk10/LotteryBetd5180560.js?v=10000');
	//loadJs('js/lotteryBet/hk6/LotteryBet51220db1.js?v=10000');
	//loadJs('js/lotteryBet/jsk3/LotteryBetfbe66588.js?v=10000');
	//loadJs('js/lotteryBet/gdklsf/LotteryBet721a8cad.js?v=10000');
	//loadJs('js/md5c37a6ec6.js?v=10000');
	//loadJs('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js?v=10000');
}


// 添加事件监听
addEventListener('load', function(){
    changeDirection();
    window.onorientationchange = changeDirection;
});

var changeDirectionBol;
function changeDirection()
{
	 var closeBtn = document.getElementById("closeBtnId");
	 if(closeBtn)
		closeBtn.style.right = 0;
	if(!changeDirectionBol)
		return;
   var iframe = document.getElementById('iframeId');
   if(!iframe)
   	return;
   iframe.style.width = "100%";
   iframe.style.height = "100%";
}

function loadJs(_url)
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = _url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

var URL;
var PARAMTERS;


function openInWebview () 
{
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
        return false
    } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
        return false
    } else if (ua.match(/WeiBo/i) == "weibo") {
        return false
    } else {
        if (ua.match(/Android/i) != null) {
            return ua.match(/browser/i) == null
        } else if (ua.match(/iPhone/i) != null) {
            return ua.match(/safari/i) == null
        } else {
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
        }
    }
}

function setPostUrlData(url, para)
{
  URL = url;
  PARAMTERS = para;
}

var removeHandle;
function setRemoveFormDivHandle(_removeHandle)
{
	removeHandle = _removeHandle;
}

function PostUrl() 
{
	if(!removeHandle)
		return;			
    //创建form表单
    //var temp_form = document.createElement("form");
    //temp_form.action = URL;//Yii中为'Controller名/函数名称'
    //如需打开新窗口，form的target属性要设置为'_blank'
    //temp_form.target = "_blank";
    //temp_form.method = "post";
    //temp_form.style.display = "none";
    //添加参数
    //for (var key in PARAMTERS) {
    //    var opt = document.createElement("textarea");
    //    opt.name = key;
    //    opt.value = PARAMTERS[key];
    //    temp_form.appendChild(opt);
    //}
    //document.body.appendChild(temp_form);
    //提交数据
    //temp_form.submit();
    //document.body.removeChild(temp_form); 
    
	var target = "";
   	if(openInWebview())
   	{
   		target = "";
   	}
   	else
   	{
   		target = "_blank"
   	}
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", URL);
    form.setAttribute("target", target);

    for(var key in PARAMTERS) 
    {
        var opt = document.createElement("input");
        opt.name = key;
        opt.value = PARAMTERS[key];

        form.appendChild(opt);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form); 
    
    removeHandle.run();
    removeHandle = null;
}