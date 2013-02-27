共有 <?=$recordCount?> 条记录,
每页显示 <?=$pageSize?> 条,
当前 <?=$pageCount==0?0:$pageNum?>/<?=$pageCount?> 页:
<? 
if($panelCur==1)
{
	if($pageCount<$pageShowRange)
	{
		$loopCount = $pageCount-1;
	}
	else
	{
		$loopCount = $pageShowRange-1;
	}
	
	$pageOfPanelCur = 2;
	$nextBtnPage = $pageShowRange+1;	
}
else if($panelCur==$panelTotal)
{
	$m = $pageCount%$pageShowRange;
	$loopCount = $m==0?$pageShowRange:$pageCount%$pageShowRange;
	$pageOfPanelCur = $pageCount-$loopCount;
	$preBtnPage = $pageOfPanelCur-1;
}
else
{
	$loopCount = $pageShowRange;
	$loopCount = $pageCount>$loopCount?$loopCount:$pageCount;
	$pageOfPanelCur = ($panelCur-1)*$pageShowRange+1;
	
	$preBtnPage = $pageOfPanelCur-1;
	$nextBtnPage = $loopCount+$pageOfPanelCur;
}
?>
<? if($pageCount>0){ ?>
<span class="multi_page">
<a class="page_btn<?=($pageNum==1?' cur':'')?>" href="?page=1">1</a>
	<? if($panelCur>1){ ?>
<a class="page_btn<?=($pageNum==$preBtnPage?' cur':'')?>" href="?page=<?=$preBtnPage?>">&lt;&lt;</a>
	<? } ?>
	<?
	for($i=0;$i<$loopCount;$i++){ 
	?>
<a class="page_btn<?=($pageNum==($pageOfPanelCur+$i)?' cur':'')?>" href="?page=<?=$pageOfPanelCur+$i?>"><?=$pageOfPanelCur+$i?></a>
	<? 
	} 
	?>

	<? if($panelCur<$panelTotal && $pageCount>$panelCur*$pageShowRange+1){ ?>
<a class="page_btn<?=($pageNum==$nextBtnPage?' cur':'')?>" href="?page=<?=$nextBtnPage?>">&gt;&gt;</a>
	<? } ?>

	<? if($pageCount>$pageShowRange){ ?>
<a class="page_btn<?=($pageNum==$pageCount?' cur':'')?>" href="?page=<?=$pageCount?>"><?=$pageCount?></a>
	<? } ?>
</span>
<? } ?>