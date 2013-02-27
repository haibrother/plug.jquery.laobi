<?php
/**
	* 分页输出
	*/
 function multi_page($recordCount,$pageSize,$pageNum,$rcName='')
	{
		$rcName=='' && $rcName='default';

		if($recordCount==-1) $recordCount=0;

		// 分页总页数
		$pageCount = ($recordCount==0||!$pageSize)?0:
			(int)($recordCount/$pageSize)+($recordCount%$pageSize==0?0:1);

		// 当前页数值合法性处理
		$pageNum = is_numeric($pageNum)?
			($pageNum>$pageCount?$pageCount
				:($pageNum<1?1
					:$pageNum)
			):1;

		// 页显示范围,如 1...12,13,14,15,16...122,则该值为5=>12,13,14,15,16共五个
		$pageShowRange = 5;
		$panelTotal = ($pageCount==0)?0:
			(int)($pageCount/$pageShowRange)+($pageCount%$pageShowRange==0?0:1);

		// 当前分页面板计数
		$panelCur = (int)($pageNum/$pageShowRange)+($pageNum%$pageShowRange==0?0:1);
		@include 'common/page.php';
	}
    
    	/*
	* 取得数据库数据分页范围
	* 如:400条记录,每页20行,当在第3页时,返回 'limit 40,20'
	*/
	 function get_records_limit_range($recordCount,$pageSize,$pageNum)
	{
		if($recordCount==0) return '';
		// 分页总页数
		$pageCount = ($recordCount==0||!$pageSize)?0:
			(int)($recordCount/$pageSize)+($recordCount%$pageSize==0?0:1);

		// 当前页数值合法性处理
		$pageNum = is_numeric($pageNum)?
			($pageNum>$pageCount?$pageCount
				:($pageNum<1?1
					:$pageNum)
			):1;

		$start = ($pageNum-1)*$pageSize;
		$end = $pageSize;
		return "limit {$start},{$end}";
	}
    
 header('Content-type:text/html;charset=utf-8');
 mysql_connect('localhost','root','');
 mysql_select_db('test');
 mysql_set_charset('utf8');
 
 $sql_count = 'select count(1) as num from records';
 $result = mysql_fetch_assoc(mysql_query($sql_count));
 $recordCount = $result['num'];
 $pageSize = 3;
 $pageNum = !empty($_GET['page'])?$_GET['page']:1;
 $limit_range = get_records_limit_range($recordCount,$pageSize,$pageNum);
ob_start(); 
 multi_page($recordCount,$pageSize,$pageNum);
 $pages_panel = ob_get_contents();
 ob_end_clean();
 $sql = "select id,message,image from records $limit_range";
 $query = mysql_query($sql);
 $rows=array();
 while($row=mysql_fetch_assoc($query)){
    $rows[]=(object)$row;
 }
 echo json_encode(array('list'=>$rows,'pages_panel'=>$pages_panel));
 //end file