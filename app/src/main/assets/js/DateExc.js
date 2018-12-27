var DateObj = function(){
	
	return {
		
		/**
		 * 初始化传入参数说明
		 * 
		 * @param  {[date]}      [设置日期]
		 * @param  {[theme]}     [主题设置：目前白蓝两种主题，默认白色主题]
		 * @param  {[onSelect]}  [日期选中后回调函数 参数date为选中日期]
		 */
		openDateChoose : function(_date, _index, _handle){
			date.init({
				date : _date, //'2016-01-07',
				theme : 'blue',
				onSelect : function(date)
				{
					_handle.args = [_index, date];
					_handle.run();
				}
			})
		}
		
	}
	
}();