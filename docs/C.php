<?php
$S=intval($_GET['S']);
switch($S)
{
	case 400: $T="400错误:错误的请求...";	$Z="400错误:我也不知道是哪里错了,反正就是错了...";		break;
	case 401: $T="401错误:需要授权...";		$Z="401错误:我也不知道是哪里无权,反正就是无权...";		break;
	case 403: $T="403错误:禁止...";			$Z="403错误:此处禁止无关人员入内...";					break;
	case 404: $T="404错误:无此页面...";		$Z="404错误:此处无此页面...";							break;
	case 500: $T="500错误:内部错误...";		$Z="500错误:似乎是服务器内部错误?...";					break;
	case 503: $T="503错误:无法访问...";		$Z="503错误:暂时无法访问,似乎是访问人数超标?...";		break;
}
?>
<html>
<head>
<title><?php echo $T;?></title>
<link rel="shortcut icon" href="../L.ico">
<style>
*{margin:0;padding:0;overflow:hidden;}
body{background-color: #000;text-align:center;}
span{font-size:64px;display:inline-block;color:white;text-shadow:0 0 16px #0F0,0 0 8px #0F0,0 0 4px #0F0,4px 4px 4px #0F0;"}
LZF{word-spacing:16px;font-size:32px;display:inline-block;color:white;text-shadow:0 0 16px #0F0,0 0 8px #0F0,0 0 4px #0F0,4px 4px 4px #0F0;"}
</style>
</head>
<body bgcolor=Black>
<embed src="../Y/L.mp3" autostart="true" loop="true" hidden="true"></embed>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<div style="text-align:center"><span><?php echo $Z;?></span>
</div>
</body>
</html>