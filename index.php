<?php
$vvv=intval(intval(microtime(true))); if(0) { $vvv=212; }  if(1) { $vvv=microtime(true); }
$req=$_SERVER['REQUEST_URI'];
if(empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==="off") {
 header('HTTP/1.1 301 Moved Permanently');
 header('Location: '.'https://'.$_SERVER['HTTP_HOST'].$req);
 exit;
 }
function echoScript ($sf) { echo "<script type='text/javascript' src='".$sf."'></script>\n"; }
function echoCode   ($cd) { echo "<script type='text/javascript'>".$cd."</script>\n";        }
?>
<!doctype html>
<html lang="en">
<head>
<title>MeBeam, video conferencing</title>
<meta name='theme-color' content='#113355' />
<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
<style type="text/css">
-webkit-text-size-adjust:none;
-ms-text-size-adjust:none;
-moz-text-size-adjust:none;
text-size-adjust:none;
a:active,      a:focus      {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
button:active, button:focus {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
span:active,   span:focus   {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
div:active,    div:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
img:active,    img:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
</style>
<?php
echoScript("/lib/lib_globals.js?".$vvv);
echoScript("/lib/lib_num.js?".$vvv);
echoScript("/lib/lib_timer.js?".$vvv);
echoScript("/lib/lib_env.js?".$vvv);
echoScript("/lib/lib_gui.js?".$vvv);
echoScript("/lib/lib_hud.js?".$vvv);
echoScript("/lib/lib_que.js?".$vvv);
echoScript("/lib/lib_wock.js?".$vvv);
echoScript("/lib/lib_devices.js?".$vvv);
echoScript("/lib/lib_main.js?".$vvv);
echoScript("/app_16.js?".$vvv);
echoCode("window.onload=function(){ mainEntry(); };");
?>
</head>
<body id="bodid" style="background: #000009; margin: 0; padding: 0; overflow: hidden;">
</body>
</html>
