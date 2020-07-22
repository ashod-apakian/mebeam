<?php
$vvv=1; if(1) { $vvv+=microtime(false); } $vvv=intVal(microtime(true))%1000;
$req=$_SERVER['REQUEST_URI'];
$pge=substr($req,1);
if(empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==="off") {
 header('HTTP/1.1 301 Moved Permanently');
 header('Location: '.'https://'.$_SERVER['HTTP_HOST'].$req);
 exit;
 }
?>
<!DOCTYPE html><head>
<title>MeBeam, video conferencing</title>
<meta name='theme-color'          content='#113355' />
<meta name='viewport'             content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
<meta http-equiv='cache-control'  content='no-cache, must-revalidate, post-check=0, pre-check=0' />
<meta http-equiv='cache-control'  content='max-age=0' />
<meta http-equiv='expires'        content='0' />
<meta http-equiv='expires'        content='Tue, 01 Jan 1980 1:00:00 GMT' />
<meta http-equiv='pragma'         content='no-cache, must-revalidate' />
<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
<style>
a:active,      a:focus      {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
button:active, button:focus {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
span:active,   span:focus   {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
div:active,    div:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
img:active,    img:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
</style>
<?php
echo "<script type='text/javascript' src='/beamer.js?v=".$vvv."'></script>\n";
echo "<script type='text/javascript' src='/beamapp.js?v=".$vvv."'></script>\n";
?>
</head>
<body id="bodid" style="background: #000009; margin: 0; padding: 0; overflow: hidden;">
</body>
<script>window.onload=(event)=> { meBeam(); }</script>
</html>

