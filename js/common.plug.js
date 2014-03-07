/**
*author 417@68xx.net
 *ajax同步和异步请求 推荐开发者尽量使用异步模式请求
 *递归同步请求多次，浏览器可能会假死，firefox支持较好，IE都会出现假死状态 sycn为false
 *递归异步请求多次，浏览器不会出现假死，但不好控制其请求次数 sycn为true
 **/
jQuery.moreAjax =({
	runAjax:function(obj){
		//sync  是否为同步  默认为异步，num请求次数，param请求参数
		obj.sync = obj.sync == undefined ? true : obj.sync;
		if(!obj.num || !obj.data || !obj.url){
			return false;
		}
		
		if(obj.num == $.moreAjax.moreAjaxNowNum){
			return true;
		}
		
		$.ajax({
			type:'POST',
			url:obj.url,
			data:obj.data,
			sync:obj.sync,
			beforeSend: function(XMLHttpRequest){
				//请求前的操作
			},  
			success:function(msg){
				$.moreAjax.moreAjaxNowNum++;
				$.moreAjax.eventAjax($.moreAjax.moreAjaxNowNum);
				if(obj.num > $.moreAjax.moreAjaxNowNum){
					return $.moreAjax.runAjax(obj);
				}
				
			},  
			complete: function(XMLHttpRequest, textStatus){
				//完成请求后的操作
			},  
			error:function(data){
				 if(data.status=="404"){
					alert('请求地址出错！');  
				}  
				else if(data.status=="302"){
					alert('连接网页出错');  
				} else if(data.status=="timeout"){
					alert("请求超时!");  
				}else{
					alert('请求未响应!请检查网络或VPN连接');  
				}
				return false;
			}
		});
	},
	//执行次数初始化
	moreAjaxNowNum : 0,
	//每次执行后可能会执行的事件
	eventAjax:function(num){
		if(num && typeof(eval(addEvent))=='function'){
			addEvent(num);
		}
	},	
});

/**
 *队列式异步请求
 **/

jQuery.mostAjax = ({
	runAjax:function(obj){
		//num请求次数，maxNum 每次的最大请求连接数，param请求参数
		if(!obj.maxNum || !obj.num || !obj.data || !obj.url){
			return false;
		}
		$.mostAjax.moreAjaxNowNum++;
		$.mostAjax.runningProcess++;
		$.ajax({
			type:'POST',
			data:obj.data,
			url:obj.url,
			beforeSend: function(XMLHttpRequest){
				//请求前的操作
			},
			complete: function(XMLHttpRequest, textStatus){
				//完成请求后的操作
			},  
			success:function(msg){
				$.mostAjax.runningProcess--;
				$.mostAjax.eventAjax($.mostAjax.moreAjaxNowNum);
				if(obj.num>$.mostAjax.moreAjaxNowNum){
					return $.mostAjax.runAjax(obj);
				}
			},
			error:function(data){
				 if(data.status=="404"){
					alert('请求地址出错！');  
				}  
				else if(data.status=="302"){
					alert('连接网页出错');  
				} else if(data.status=="timeout"){
					alert("请求超时!");  
				}else{
					alert('请求未响应!请检查网络或VPN连接');  
				}
				return false;
			}
		});
		if($.mostAjax.runningProcess < obj.maxNum){
			$.mostAjax.nextRun(obj);
		}
		
	},
	//执行次数初始化
	moreAjaxNowNum : 0,
	runningProcess : 0,
	nextRun:function(obj){
		return $.mostAjax.runAjax(obj);
	},
	//每次执行后可能会执行的事件
	eventAjax:function(num){
		if(num && typeof(eval(addEvent))=='function'){
			addEvent(num);
		}
	},	
});