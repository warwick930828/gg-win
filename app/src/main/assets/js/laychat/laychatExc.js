var ChatObj = function(){
	
	var layaFun;
	return {
		init : function(){
			layaFun = publics.utils.GameUtil.layaFun;
		},
		
		openChat : function(app_key,mine,friendList,groupList){
			// 注册用户得到appkey
			laychat.app_key = app_key;
			// 自己的信息
			laychat.mine = mine;
			// 好友列表信息
			laychat.friendList = friendList;
			 // 群组信息
			 laychat.groupList = groupList;
			 // 开启手机面板
			 laychat.isMobile = true;
			 laychat.appName = '<i class="layui-icon layim-chat-back" id="laychat-back">&#xe603;</i> IM';
			 // 打开聊天面板
			 laychat.open();
			 
			 var _self = this;
			 _self.init();
			 layui.use('mobile', function(){
				layui.mobile.layim.on('ready', function(){
					//点击返回按钮关闭
					layui.zepto('#laychat-back').on('click', function(){
						_self.onMobileShowOrHide(false);
					});
					_self.onMobileShowOrHide(false);
				});
			});
			
		},
		
		onMobileShowOrHide : function(flag){
			if(flag) {
				layui.zepto('#layui-m-layer0').toggle();
			}else{
				layui.zepto('#layui-m-layer0').toggle();
			}
			//if(layaFun) layaFun(flag);
		}

	}
	
}();