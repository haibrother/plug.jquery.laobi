##jQuery plug

The jQuery plug are 'js/common.plug.js|paging.js'
这个插件目前实现了
ajax 分页功能
单任务批量同步/异步请求
队列式批量异步请求


##jQuery common.plug.js
使用方法

    obj = {};
    obj.sync = false;
    obj.num = 100;
    obj.maxNum = 10;
    obj.data = 'username=laobi&type=ss';
    obj.url = 'ajax.test.php';
    jQuery.mostAjax.runAjax(obj);
    function addEvent(num){
		if(typeof(num)!== undefined){
			$("#num").html(num);
		}
	}
    
##
	

