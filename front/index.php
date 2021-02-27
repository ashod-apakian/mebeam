<?php
if(0) { $vvv=14; }  else { $vvv=microtime(true); }
$req=$_SERVER['REQUEST_URI'];
if(empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==="off") { header('HTTP/1.1 301 Moved Permanently'); header('Location: '.'https://'.$_SERVER['HTTP_HOST'].$req); exit; }
function echoScript ($sf) { echo "<script type='text/javascript' src='".$sf."'></script>\n"; }
function echoCode   ($cd) { echo "<script type='text/javascript'>".$cd."</script>\n";        }
?>
<!doctype html>
<html lang="en">
<head>
<title>MeBeam - You see what I'm saying!</title>
<meta name='theme-color' content='#2F4F7F' />
<meta name='Description' content='You see what I am saying'>
<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' id='favicon' />
<link rel='manifest'      id='manifestId'>
<style type="text/css">
*                           {  margin:0;    padding:0;   }
html,body                   {  width:100%;  height:100%; background: #000009; margin: 0; padding: 0; overflow: hidden; }
canvas                      {  display:block; }
a:active,      a:focus      {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
button:active, button:focus {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
span:active,   span:focus   {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
div:active,    div:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
img:active,    img:focus    {  outline: 0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
-webkit-text-size-adjust:none;
    -ms-text-size-adjust:none;
   -moz-text-size-adjust:none;
        text-size-adjust:none;
</style>
<?php
echoScript("/mb_base.js?".$vvv);
echoScript("/mb_clik.js?".$vvv);
echoScript("/mb_vars.js?".$vvv);
echoScript("/mb_beam.js?".$vvv);
echoScript("/mb_done.js?".$vvv);
echoScript("/mb_xtra.js?".$vvv);
echoCode("window.onload=function(){ ChatMain(); };");
?>
</head><body id="bodid"></body>
</html>
