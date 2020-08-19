
var num=(function(){
 var is_initialized=false;

 function Init () {
 if(is_initialized==true) { return; }
 is_initialized=true;
 }



 function Rand (max)
 {
 var val=Math.floor(Math.random()*Math.floor(max));
 return val%max;
 }



 function Fixed (numb,places) {
 return numb.toFixed(places);
 }



 function PercentOf (numb,tot) {
 return(tot/100)*numb;
 }



 function PercentIs (numb,tot) {
 return(100.0/tot)*numb;
 }



 Init();


 return{
 is_initialized:is_initialized,
 Rand:Rand,
 Fixed:Fixed,
 PercentOf:PercentOf,
 PercentIs:PercentIs

 }


})();


/*-----------------------------------------------------------------------*/


var timer=(function(){
 var is_initialized=false;
 var msec_base;
 var perf_base;


 function Init () {
 if(is_initialized==true) { return; }
 msec_base=new Date().valueOf();
 perf_base=num.Fixed((performance.now()*1),0);
 is_initialized=true;
 }




 function TikNow                       (perf) {
 var t;
 if(perf) { t=num.Fixed((performance.now()*1),0);  }
 else     { t=new Date().valueOf()-msec_base; }
 return t;
 }


 function TikElapsed                   (perf,tik) {
 return(TikNow(perf)-tik);
 }



 function MsRunning                    () {
 return(TikNow(false));
 }




 Init();


 return{
 is_initialized:is_initialized,
 TikNow:TikNow,
 TikElapsed:TikElapsed,
 MsRunning:MsRunning
 }


})();


/*-----------------------------------------------------------------------*/


var cookie=(function(){
 var is_initialized=false;


 function Init () {
 if(is_initialized==true) { return; }
 is_initialized=true;
 }


 function Set (cname,cvalue,exsecs) {
 var d=new Date();
 d.setTime(d.getTime()+(exsecs*1000));
 var expires="expires="+d.toUTCString();
 document.cookie=cname+"="+cvalue+";"+expires+";path=/";
 }


 function Remove (cname) {
 Set(cname,"",0);
 }



 function Purge () {
 var i,kookies,eqPos,name,kookie;
 kookies=document.cookie.split(";");
 for(i=0;i<kookies.length;i++)
  {
  kookie=kookies[i];
  eqPos=kookie.indexOf("=");
  name=eqPos>-1?kookie.substr(0,eqPos):kookie;
  document.cookie=name+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
 }


 function Count () {
 var kookies;
 kookies=document.cookie.split("; ");
 return(kookies.length);
 }


 function GetByIndex (index) {
 var kookies,ca,eqPos;
 kookies=document.cookie.split("; ");
 ca=kookies[index];
 if(ca==undefined) { return ca; }
 eqPos=ca.indexOf('=');
 return(ca.substr(0,eqPos));
 }




 function Get (cname) {
 var i,c,name,decodedkookie,ca;
 name=cname+"=";
 decodedkookie=decodeURIComponent(document.cookie);
 ca=decodedkookie.split(';');
 for(i=0;i<ca.length;i++)
  {
  c=ca[i];
  while(c.charAt(0)==' ') { c=c.substring(1);    }
  if(stringIndexOf(c,name)==0) { return c.substring(name.length,c.length);    }
  }
 return null;
 }

 Init();


 return{
 is_initialized:is_initialized,
 Set:Set,
 Remove:Remove,
 Purge:Purge,
 Count:Count,
 GetByIndex:GetByIndex,
 Get:Get
 }


})();


/*-----------------------------------------------------------------------*/


var que=(function(){
 var is_initialized=false;
 var handle_base;
 var handle_slots;
 var handle_count;
 var handle_pf;
 var handle_array=[];


 function Init () {
 var i,obj;
 if(is_initialized==true) { return; }
 handle_base=100000;
 handle_count=0;
 handle_slots=0;
 handle_pf=0;
 for(i=0;i<32;i++)
  {
  obj={};
  obj.self_index=i;
  obj.self_handle=obj.self_index+handle_base;
  obj.in_use=false;
  obj.ms_start=0;
  obj.msgs_total=0
  obj.msgs_qued=0;
  obj.msgs_que=[];
  handle_array[i]=obj;
  handle_slots++;
  }
 is_initialized=true;
 }


 function HandleCheck (handle) {
 var obj;
 if(handle<handle_base) { return null; }
 handle=handle-handle_base;
 if(handle>=handle_slots) { return null; }
 obj=handle_array[handle];
 if(obj.in_use!=true) { return null; }
 return obj;
 }




 function Create () {
 var s,obj;
 for(s=0;s<handle_slots;s++)
  {
  obj=handle_array[s];
  if(obj.in_use!=false) { continue; }
  obj.in_use=true;
  obj.ms_start=timer.MsRunning();
  obj.msgs_total=0;
  obj.msgs_qued=0;
  obj.msgs_que=[];
  handle_array[s]=obj;
  handle_count++;
  s=s+handle_base;
  return s;
  }
 return -1;
 }








 function Destroy (handle) {
 var obj=HandleCheck(handle);
 if(obj==null) { return false; }
 obj.msgs_que=[];
 obj.in_use=false;
 handle_array[obj.self_index]=obj;
 handle_count--;
 return true;
 }




 function Write (handle,msg)
 {
 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 obj.msgs_qued++;
 obj.msgs_que.push(msg);
 return 1;
 }



 function Peek (handle,ofs)
 {
 var msg;
 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 if(ofs<0) { return -1; }
 if(ofs>=obj.msgs_qued) { return -1; }
 msg=obj.msgs_que[ofs];
 return msg;
 }



 function Read (handle) {
 var msg,obj;

 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 if(obj.msgs_qued==0) {  return null; }
 msg=obj.msgs_que.shift();
 obj.msgs_qued--;
 obj.msgs_total++;
 return msg;
 }





 function Discard (handle) {
 var obj;

 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 if(obj.msgs_qued==0) {  return false; }
 obj.msgs_que.shift();
 obj.msgs_qued--;
 obj.msgs_total++;
 return true;
 }



 function Status (handle) {
 var obj,info;

 var obj=HandleCheck(handle);
 if(obj==null) { return null; }
 info={};
 info.msgs_qued=obj.msgs_qued;
 info.msgs_total=obj.msgs_total;
 return info;
 }






 Init();


 return{
 is_initialized:is_initialized,
 Create:Create,
 Destroy:Destroy,
 Write:Write,
 Peek:Peek,
 Read:Read,
 Discard:Discard,
 Status:Status
 }


})();


/*-----------------------------------------------------------------------*/


var wock=(function(){
 var is_initialized=false;
 var handle_base;
 var handle_slots;
 var handle_count;
 var handle_pf;
 var handle_array=[];


 function Init () {
 var i,obj;
 if(is_initialized==true) { return; }
 handle_base=200000;
 handle_count=0;
 handle_slots=0;
 handle_pf=0;
 for(i=0;i<16;i++)
  {
  obj={};
  obj.self_index=i;
  obj.self_handle=obj.self_index+handle_base;
  obj.in_use=false;
  obj.ms_start=0;
  obj.rcve_que_handle=0;
  obj.xmit_que_handle=0;
  handle_array[i]=obj;
  handle_slots++;
  }
 is_initialized=true;
 }




 function HandleCheck (handle) {
 var obj;
 if(handle<handle_base) { return null; }
 handle=handle-handle_base;
 if(handle>=handle_slots) { return null; }
 obj=handle_array[handle];
 if(obj.in_use!=true) { return null; }
 return obj;
 }




 function Call (url) {
 var s,obj;
 for(s=0;s<handle_slots;s++)
  {
  obj=handle_array[s];
  if(obj.in_use!=false) { continue; }
  obj.in_use=true;
  obj.ms_start=timer.MsRunning();
  obj.rcve_que_handle=que.Create();
  obj.xmit_que_handle=que.Create();
  obj.url=url;
  obj.socket=new WebSocket(obj.url);
  obj.socket.binaryType='arraybuffer';
  obj.socket.onopen=function()  {  obj.is_open=true;   }
  obj.socket.onclose=function() {  obj.is_closed=true; }
  obj.socket.onmessage=function(data)
   {
   que.Write(obj.rcve_que_handle,data.data);
   }
  handle_array[s]=obj;
  handle_count++;
  s=s+handle_base;
  return s;
  }
 return -1;
 }








 function Destroy (handle) {
 var obj=HandleCheck(handle);
 if(obj==null) { return false; }
 que.Destroy(obj.xmit_que_handle);
 obj.xmit_que_handle=0;
 que.Destroy(obj.rcve_que_handle);
 obj.rcve_que_handle=0;
 obj.in_use=false;
 handle_array[obj.self_index]=obj;
 handle_count--;
 return true;
 }




 function Write (handle,msg)
 {
 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 que.Write(obj.xmit_que_handle,msg);
 return 1;
 }



 function Peek (handle,ofs)
 {
 var msg;
 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 msg=que.Peek(obj.rcve_que_handle,ofs);
 return msg;
 }



 function Read (handle) {
 var msg,obj;

 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 msg=que.Read(obj.rcve_que_handle);
 return msg;
 }





 function Discard (handle) {
 var obj;

 var obj=HandleCheck(handle);
 if(obj==null) { return -1; }
 return(que.Discard(obj.rcve_que_handle));
 }


 function Process (handle) {
 var obj,info;

 var obj=HandleCheck(handle);
 if(obj==null) { return null; }
 info=Status(handle);
 if(info.xmit_que_status.msgs_qued>0)
  {
  msg=que.Read(obj.xmit_que_handle);
  obj.socket.send(msg);
  }
 return true;
 }




 function Status (handle) {
 var obj,info;

 var obj=HandleCheck(handle);
 if(obj==null) { return null; }
 info={};
 info.url=obj.url;
 info.is_open=obj.is_open;
 info.is_closed=obj.is_closed;
 info.rcve_que_status=que.Status(obj.rcve_que_handle);
 info.xmit_que_status=que.Status(obj.xmit_que_handle);
 return info;
 }





 function Yield ()  {
 var go,wos;

 if(handle_count==0) { return false; }
 for(go=0;go<handle_slots;go++)
  {
  handle_pf++;
  if(handle_pf>=handle_slots) { handle_pf=0;  }
  if(handle_array[handle_pf].in_use!=true) { continue; }
  Process(handle_base+handle_pf);
  wos=Status(handle_base+handle_pf);
  if(wos==null) { continue; }
  return true;
  }
 return false;
 }






 Init();


 return{
 is_initialized:is_initialized,
 Call:Call,
 Destroy:Destroy,
 Write:Write,
 Peek:Peek,
 Read:Read,
 Discard:Discard,
 Status:Status,
 Yield:Yield
 }


})();


/*-----------------------------------------------------------------------*/


var env=(function(){
 var is_initialized=false;
 var is_mobile;
 var browser_name;
 var browser_version;
 var browser_platform;


 function Init () {
 if(is_initialized==true) { return; }
 is_mobile=false;
 if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))  {  is_mobile=true; }
 BrowserInfo();
 is_initialized=true;
 }


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

 /*
 mob=mobileDetect();
 disp=displayGet();
 return[name,ver,platform,mob,disp.scr_wid,disp.scr_hit,disp.win_wid,disp.win_hit,disp.density,disp.orient,disp.is_landscape];
 */
 }





 Init();


 return{
 is_initialized:is_initialized,
 is_mobile:is_mobile,
 browser_name:browser_name,
 browser_version:browser_version,
 browser_platform:browser_platform

 }


})();


/*-----------------------------------------------------------------------*/


var gui=(function(){
 var is_initialized=false;
 var is_update_required;
 var update_tik;
 var handle_base;
 var handle_slots;
 var handle_count;
 var handle_pf;
 var handle_array=[];



 function Init () {
 if(is_initialized==true) { return; }
 handle_base=300000;
 handle_count=0;
 handle_slots=0;
 handle_pf=0;
 for(i=0;i<256;i++)
  {
  obj={};
  obj.self_index=i;
  obj.self_handle=obj.self_index+handle_base;
  obj.in_use=false;
  handle_array[i]=obj;
  handle_slots++;
  }
 is_initialized=true;
 is_update_required=false;
 window.addEventListener('resize',function() { UpdatePrepare(); },false);
 }



 function UpdatePrepare () {
 if(is_update_required==true) { return; }
 is_update_required=true;
 update_tik=timer.TikNow(false);
 }



 function Update () {
 var elap;
 if(is_update_required==false) { return; }
 if((elap=timer.TikElapsed(false,update_tik))<30) { return; }
 is_update_required=false;
 }





 function DisplayGet () {
 var win,doc,docelem,body;
 var disp={};

 win=window;
 doc=document;
 docelem=doc.documentElement;
 body=doc.getElementsByTagName('body')[0];
 disp.win_wid=win.innerWidth||docelem.clientWidth||body.clientWidth;
 disp.win_hit=win.innerHeight||docelem.clientHeight||body.clientHeight;
 disp.scr_wid=screen.width;
 disp.scr_hit=screen.height;
 disp.density=1.0;
 if(win.devicePixelRatio) { disp.density=win.devicePixelRatio; }
 disp.orient=win.orientation;
 if(document.fullscreenElement) disp.is_fse=true;
 else                           disp.is_fse=false;
 if(disp.scr_wid>disp.scr_hit) { disp.is_landscape=true;  }
 else                          { disp.is_landscape=false; }
 return disp;
 }




 function HandleCheck (handle) {
 var obj;
 if(handle<handle_base) { return null; }
 handle=handle-handle_base;
 if(handle>=handle_slots) { return null; }
 obj=handle_array[handle];
 if(obj.in_use!=true) { return null; }
 return obj;
 }



 function Create (type) {
 var s,obj;
 for(s=0;s<handle_slots;s++)
  {
  obj=handle_array[s];
  if(obj.in_use!=false) { continue; }
  obj.in_use=true;
  obj.type=type;
  obj.is_animating=false;
  obj.dom=document.createElement(type);
  obj.id=null;
  obj.vars={};
  if(type=="video")
   {
   obj.dom.setAttribute("autoplay","");
   obj.dom.setAttribute("muted","");
   obj.dom.setAttribute("playsinline","");
   obj.dom.muted=true;
   obj.dom.autoplay=true;
   obj.dom.controls=false;
   }
  handle_array[s]=obj;
  handle_count++;
  s=s+handle_base;
  return s;
  }
 return -1;
 }








 function Destroy (handle) {
 var obj=HandleCheck(handle);
 if(obj==null) { return false; }
 obj.in_use=false;
 handle_array[obj.self_index]=obj;
 handle_count--;
 return true;
 }



 function IdFind (id) {
 var i,obj;
 for(i=0;i<handle_slots;i++)
  {
  obj=handle_array[i];
  if(obj.in_use!=true)  { continue; }
  if(obj.id!=id) { continue; }
  return obj.self_handle;
  }
 return -1;
 }





 function IdSet (handle,id) {
 var obj=HandleCheck(handle);
 if(obj==null) { return false; }
 obj.id=id;
 obj.dom.setAttribute("id",obj.id);
 return true;
 }



 function Get (handle) {
 return(HandleCheck(handle));
 }




 function ParentSet (handle,phandle)
 {
 var obj,pobj;
 obj=HandleCheck(handle);
 if(obj==null) { return false; }
 if(phandle!=null&&phandle>0)
  {
  pobj=HandleCheck(phandle);
  if(pobj==null) { return false; }
  pobj.dom.appendChild(obj.dom);
  obj.parent_handle=pobj.self_handle;
  }
 else
  {
  document.body.appendChild(obj.dom);
  obj.parent_handle=0;
  }
 return true;
 }





 Init();


 return{
 is_initialized:is_initialized,
 DisplayGet:DisplayGet,
 Create:Create,
 Destroy:Destroy,
 IdSet:IdSet,
 IdFind:IdFind,
 Get:Get,
 ParentSet:ParentSet
 }


})();


/*-----------------------------------------------------------------------*/


var runner=(function(){
 var is_initialized=false;
 var is_running=false;
 var version;
 var speed;
 var funcProc;
 var thread_id;
 var worker_pf=0;
 var worker_array=[];
 var vars={};


 function Init () {
 if(is_initialized==true) { return; }
 is_initialized=true;
 }





 function Start (ver,spd,proc,dorun) {
 if(is_running!=false) { return false; }
 version=ver;
 vars.cycle=-1;
 thread_id=0;
 speed=spd;
 funcProc=proc;
 is_running=true;
 vars.stage=0;
 if(dorun==true) { Run(); }
 return true;
 }



 function WorkerAdd (proc) {
 if(is_running!=true) { return false; }
 worker_array.push(proc);
 return true;
 }



 function Clear                        () {
 clearTimeout(thread_id);
 thread_id=0;
 return true;
 }



 function Run () {
 var p;
 if(worker_array.length>=1)
  {
  worker_pf++;
  if(worker_pf>=worker_array.length) { worker_pf=0; }
  p=worker_array[worker_pf];
  if(p!=undefined&&p!=null)   {   p();   }
  }
 wock.Yield();
 vars.cycle++;
 thread_id=window.setTimeout(function()
  {
  Clear();
  funcProc();
  Run();
  },runner.speed);
 return true;
 }


 function Status () {
 var info;
 info={};
 info.is_running=is_running;
 info.version=version;
 info.speed=speed;
 return info;
 }





 Init();


 return{
 is_initialized:is_initialized,
 vars:vars,
 Start:Start,
 WorkerAdd:WorkerAdd,
 Run:Run,
 Status:Status
 }


})();



