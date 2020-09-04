
 var env=(function() {
 var is_init=false;
 var is_mobile;
 var browser_name;
 var browser_version;
 var browser_platform;


 function Init () {
 if(is_init==true) { return; }
 is_mobile=false;
 if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))  {  is_mobile=true; }
 BrowserInfo();
 is_init=true;
 }


 Init();


 function StringIndexOf (str,mat) {
 if(str==undefined) { return -1; }
 var stxt=str.toLowerCase();
 var mtxt=mat.toLowerCase();
 if(arguments.length==1)  {  return -1;  }
 if(arguments.length==2)  {  return stxt.indexOf(mtxt);  }
 if(arguments.length==3)  {  return stxt.indexOf(mtxt,argument[2]);  }
 return stxt.indexOf(mtxt,argument[2],argument[3]);
 }




 function BrowserVersionGet (pre) {
 var mat,off,ver;
 ver="";
 mat=pre;//" Firefox/";
 off=StringIndexOf(navigator.userAgent,mat);
 if(off>=0) { off+=mat.length; }
 ver=navigator.userAgent.substring(off);
 off=StringIndexOf(ver," ");
 if(off>=0) { ver=ver.substring(0,off); }
 return ver;
 }



 function BrowserInfo () {
 var isWho,mob,disp;
 var version,name,platform;
 var isOpera=(!!window.opr&&!!opr.addons)||!!window.opera||navigator.userAgent.indexOf(' OPR/')>=0;
 var isFirefox=typeof InstallTrigger!=='undefined';
 var isSafari=/constructor/i.test(window.HTMLElement)||(function (p) { return p.toString()==="[object SafariRemoteNotification]"; })(!window['safari']||(typeof safari!=='undefined'&&safari.pushNotification));
 var isIE=false||!!document.documentMode;
 var isEdge=!isIE&&!!window.StyleMedia;
 var isChrome=(!!window.chrome&&navigator.userAgent.indexOf("Chrome")!=-1);
 var isEdgeChromium=isChrome&&(navigator.userAgent.indexOf("Edg")!=-1);
 var isSamsung=navigator.userAgent.match(/SamsungBrowser/i);
 isWho=-1;
 name="";
 if(isSamsung)      { isWho=7; name="Samsung"; }  else
 if(isEdgeChromium) { isWho=6; name="EdgeChromium"; }  else
 if(isChrome)       { isWho=5; name="Chrome"; }  else
 if(isEdge)         { isWho=4; name="Edge"; }  else
 if(isIE)           { isWho=3; name="IE"; }  else
 if(isSafari)       { isWho=2; name="Safari"; }  else
 if(isFirefox)      { isWho=1; name="Firefox"; }  else
 if(isOpera)        { isWho=0; name="Opera"; }
 platform=navigator.platform;
 ver="";
 if(isWho==1)  {  ver=BrowserVersionGet(" Firefox/");  }
 else
 if(isWho==6)  {  ver=BrowserVersionGet(" Edg/");  }
 else
 if(isWho==5)  {  ver=BrowserVersionGet(" Chrome/");  }
 else
 if(isWho==-1)
  {
  //alert(navigator.userAgent);
  }
 browser_name=name;
 browser_version=ver;
 browser_platform=platform;
 }




 function BrowserZoomOut () {
 if(is_mobile!==true) { return false; }
 var viewport=document.querySelector('meta[name="viewport"]');
 if(viewport===null)
  {
  viewport=document.createElement("meta");
  viewport.setAttribute("name","viewport");
  document.head.appendChild(viewport);
  viewport=document.querySelector('meta[name="viewport"]');
  }
 if(viewport)
  {
  viewport.content="initial-scale=1";
  viewport.content="width=200";//200";
  viewport.content="height=300";//200";
  viewport.content="user-scalable=no";
  return true;
  }
 return false;
 }


 function Yield () {
 if((main.vars.cycle%20)==19)
  {
  BrowserZoomOut();
  }
 }


 return{
 is_init:is_init,
 is_mobile:is_mobile,
 browser_name:browser_name,
 browser_version:browser_version,
 browser_platform:browser_platform,
 BrowserZoomOut:BrowserZoomOut,
 Yield:Yield
 }


})();


