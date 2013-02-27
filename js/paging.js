/**
*paging.js 基于jQuery 1.9.1上开发的分页插件
*author 417 
*email bilehai@foxmail.com
**/
jQuery.paging=({
    //获取数据
    //url 为地址 type 为请求类型  showPageParam为存放分页栏的ID名
    getResult:function(url,page='1',type='GET',showPageParam='pages_panel'){
        if(!url)return false;
        showPageParams=showPageParam;
        $.ajax({
            type:type,
            url:url,
            data:"page="+page,
            cache:false,
            success:function(data){
                $.paging.resolve(data);
            }
        });
    },
    //拆分
    resolve:function(data){
        obj=$.parseJSON(data);
        $.paging.showList(obj.list);
        $.paging.showPage(obj.pages_panel);
    },
    //显示列表
    showList:function(param){
        if(param.length>0){
            var line_arr = $('.line');
			var line = $(line_arr[0]);
			var p = line.parent()[0];
			for(var i=1;i<line_arr.length;i++)
				$(line_arr[i]).remove();
				
			line.hide();
            for(i=0;i<param.length;i++){
                var l = line.clone(); l.addClass('new_line');
				var tds = l.find('td');
                var j=0;
                for(key in param[i]){
                    $(tds[j]).html(param[i][key]);
                    j++;
                }
                l.show();
				l.appendTo(p);
            }
        }
    },
    //显示分页栏
    showPage:function(param){
        $("#"+showPageParams).html(param);
    },
});

$.paging.getResult('http://program/plug.jquery/index.php',$.query.get('page'));
//$.paging.page();