
 const IS_UNDEFINED=0;
 const IS_FAILURE=-1;
 const IS_DENIED=-2;

/*-----------------------------------------------------------------------*/
 navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||window.RTCPeerConnection;
/*-----------------------------------------------------------------------*/
 var pc_configurate={'iceServers':[{'url':'stun:stun.l.google.com:19302'},{'url':'turn:numb.viagenie.ca','credential':'muazkh','username':'webrtc@live.com'}]};
 //var pc_configurate={'iceServers':[{'url':'stun:35.244.109.245:3478'},{'url':'turn:numb.viagenie.ca','credential':'muazkh','username':'webrtc@live.com'}]};
 var pc_constraints={'optional':  [{'DtlsSrtpKeyAgreement':true}]};
 var av_constraints={};
/*-----------------------------------------------------------------------*/
 var main={};
 var wock={};
 var gui={};
 var devo={};
/*-----------------------------------------------------------------------*/



 function meBeam                       ()
 {
 mainInit(205,30,mainThread);
 wockInit();
 guiInit();
 devoInit();
 mainYield();
 }



/*-----------------------------------------------------------------------*/






 function mainInit                     (version,speed,proc)
 {
 main.version=version;
 main.stage=0;
 main.cycle=-1;
 main.thrid=0;
 main.speed=speed;
 main.proc=proc;
 main.tik_base=new Date().valueOf();
 main.uvars={};
 }





 function mainStageSet                 (stage)
 {
 main.stage=stage;
 return true;
 }





 function mainClear                    ()
 {
 clearTimeout(main.thrid);
 main.thrid=0;
 return true;
 }





 function mainYield                    ()
 {
 var ms,el,st;

 wockYield();
 main.cycle++;
 main.thrid=window.setTimeout(function()
  {
  mainClear();
  st=main.stage;
  ms=msRunning();
  main.proc();
  el=msRunning()-ms;
  if(el>=(main.speed)) { mbLog("stage was "+st+" now is "+main.stage+" took="+el+" instead of max="+main.speed); }
  mainYield();
  },main.speed);
 return true;
 }


/*-----------------------------------------------------------------------*/









 function msRunning                    ()
 {
 var ms;

 ms=new Date().valueOf();
 ms-=main.tik_base;
 return(ms);
 }





 function msElapsed                    (ms)
 {
 return(msRunning()-ms);
 }





 function mbPerfNow                    ()
 {
 return numFixed((performance.now()*1),0);
 }





 function mbPerfElapsed                (perf)
 {
 return(mbPerfNow()-perf);
 }



/*-----------------------------------------------------------------------*/



 function ln                           ()
 {
 var v,bias,e,stack,frame,frameRE;
 e=new Error();
 if(!e.stack)
 try { throw e;  }
 catch(e)  {  if(!e.stack) {  return 0;  } }
 stack=e.stack.toString().split(/\r\n|\n/);
 frameRE=/:(\d+):(?:\d+)[^\d]*$/;
 do { frame=stack.shift();  } while (!frameRE.exec(frame)&&stack.length);
 v=parseInt(frameRE.exec(stack.shift())[1]);
 return v;
 }




 function mbLog                        (txt)
 {
 //console.log(txt);
 console.log(msRunning()+": "+txt);
 }



 function mbRand                       (max)
 {
 var val
 val=Math.floor(Math.random()*Math.floor(max));
 return val%max;
 }



 function numRound                     (num,precision)
 {
 return Number.parseFloat(num).toPrecision(precision+1);
 }


 function numFloatFixed                (num,places)
 {
 return(Number.parseFloat(num).toFixed(places));
 }


 function numFloatMod                  (val,step)
 {
 var valDecCount=(val.toString().split('.')[1]||'').length;
 var stepDecCount=(step.toString().split('.')[1]||'').length;
 var decCount=valDecCount>stepDecCount?valDecCount:stepDecCount;
 var valInt=parseInt(val.toFixed(decCount).replace('.',''));
 var stepInt=parseInt(step.toFixed(decCount).replace('.',''));
 return(valInt % stepInt)/Math.pow(10,decCount);
 }


 function numFixed                     (num,places)
 {
 return num.toFixed(places);
 }



 function numPercentOf                 (num,tot)
 {
 return (tot/100)*num;
 }


 function numPercentIs                 (num,tot)
 {
 return (100.0/tot)*num;
 }



 function geoDistance                  (lat1,lon1,lat2,lon2)
 {
 if((lat1==lat2)&&(lon1==lon2)) { return 0; }
 var radlat1=Math.PI*lat1/180;
 var radlat2=Math.PI*lat2/180;
 var theta=lon1-lon2;
 var radtheta=Math.PI*theta/180;
 var dist=Math.sin(radlat1)*Math.sin(radlat2)+Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);
 if(dist>1) { dist=1; }
 dist=Math.acos(dist);
 dist=dist*180/Math.PI;
 dist=dist*60*1.1515;
 dist=dist*1.609344;
 dist=dist*1000.0;
 return dist;
 }




/*

 var browserInfo=
 {
 init:function()
  {
  this.browser=this.searchString(this.dataBrowser)||null;
  this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||null;
  this.OS=this.searchString(this.dataOS)||null;
  },
 searchString:function(data)
  {
  for(var i=0;i<data.length;i++)
   {
   var dataString=data[i].string;
   var dataProp=data[i].prop;
   this.versionSearchString=data[i].versionSearch||data[i].identity;
   if(dataString)    {    if(dataString.indexOf(data[i].subString)!=-1) return data[i].identity;    }
   else              {    if(dataProp) return data[i].identity; }
   }
  },
  searchVersion:function(dataString)
   {
   var index=dataString.indexOf(this.versionSearchString);
   if(index==-1) return;
   return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
   },
  dataBrowser:
   [
   {string:navigator.userAgent,subString:"Edge",identity:"Edge"},
   {string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},
   {string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},
   {string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},
   {prop:window.opera,identity:"Opera",versionSearch:"Version"},
   {string:navigator.vendor,subString:"iCab",identity:"iCab"},
   {string:navigator.vendor,subString:"KDE",identity:"Konqueror"},
   {string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},
   {string:navigator.vendor,subString:"Camino",identity:"Camino"},
   {string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},
   {string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},
   {string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},
   {string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}
   ],
  dataOS :
   [
   {string:navigator.platform,subString:"Win",identity:"Windows"},
   {string:navigator.platform,subString:"Mac",identity:"Mac"},
   {string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},
   {string:navigator.platform,subString:"Linux",identity:"Linux"}
   ]
 };

 */


 function mobileDetect                 ()
 {
 if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  {
  return true;
  }
 return false;
 }



 function browserVersionGet            (pre)
 {
 var mat,off,ver;

 ver="";
 mat=pre;//" Firefox/";
 off=navigator.userAgent.indexOf(mat);
 if(off>=0) { off+=mat.length; }
 ver=navigator.userAgent.substring(off);
 off=ver.indexOf(" ");
 if(off>=0) { ver=ver.substring(0,off); }
 return ver;
 }



 function browserInfo                  ()
 {
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
 if(isWho==1)  {  ver=browserVersionGet(" Firefox/");  }
 else
 if(isWho==6)  {  ver=browserVersionGet(" Edg/");  }
 else
 if(isWho==5)  {  ver=browserVersionGet(" Chrome/");  }
 else
 if(isWho==-1)
  {
  //alert(navigator.userAgent);
  }
 mob=mobileDetect();
 disp=displayGet();
 return[name,ver,platform,mob,disp.scr_wid,disp.scr_hit];
 }

/*
  bi=browserInfo();
  alert(bi[0]+"  "+bi[1]+" "+bi[2]+"  "+bi[3]+" "+bi[4]+" "+bi[5]);
*/


 function browserTitleSet              (title)
 {
 document.title=title;
 }



 function urlParmGet                   (parm)
 {
 let url=new URL(window.location.href);
 let prm=url.searchParams;
 var my_uprm=prm.get(parm);
 return my_uprm;
 }





 function displayGet                   ()
 {
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
 return disp;
 }


/*-----------------------------------------------------------------------*/





 function wockInit                     ()
 {
 var i,call;

 wock.call_count=0;
 wock.call_slots=0;
 wock.call_pf=0;
 wock.call_array=[];
 for(i=0;i<32;i++)
  {
  call={};
  call.self_index=i;
  call.in_use=0;
  call.is_open=false;
  call.is_closed=false;
  call.url="";
  call.socket=null;
  call.ms_start=0;
  call.rcve_msgs_queued=0;
  call.rcve_msgs_total=0
  call.rcve_msgs_queue=[];
  call.xmit_msgs_queued=0;
  call.xmit_msgs_total=0;
  call.xmit_msgs_queue=[];
  call.obb=0;
  wock.call_array[i]=call;
  wock.call_slots++;
  }
 }





 function wockYield                    ()
 {
 var call,wos,wi;

 if(wock.call_count==0) { return false; }
 for(go=0;go<wock.call_slots;go++)
  {
  wock.call_pf++;
  if(wock.call_pf>=wock.call_slots) { wock.call_pf=0;  }
  if(wock.call_array[wock.call_pf].in_use==0) { continue; }
  wockCallProcess(wock.call_pf);
  wos=wockCallStatus(wock.call_pf);
  if(wos==null) { continue; }
  if(wos.xmit_msg_queued>0) {  wockCallProcess(wock.call_pf);  }
  return true;
  }
 return false;
 }





 function wockCallCreate               (url)
 {
 var s,call;

 for(s=0;s<wock.call_slots;s++)
  {
  call=wock.call_array[s];
  if(call.in_use==0) { break; }
  }
 if(s==wock.call_slots) { return -1; }
 call.in_use=1;
 call.is_open=false;
 call.is_closed=false;
 call.url=url;
 call.socket=new WebSocket(call.url);
 call.socket.binaryType='arraybuffer';
 call.socket.onopen=function()  {  call.is_open=true;  call.ms_start=msRunning();  }
 call.socket.onclose=function() {  call.is_closed=true; }
 call.socket.onmessage=function(data)
  {
  //mbLog("msg: "+JSON.stringify(data.data));
  //data.data.marked=0;
  call.rcve_msgs_queued++;
  call.rcve_msgs_queue.push(data.data);
  }
 wock.call_array[s]=call;
 wock.call_count++;
 return s;
 }



 function wockCallGet                  (ci)
 {
 var call;
 call=wock.call_array[ci];
 return call;
 }





 function wockCallProcess              (wi)
 {
 var call,msg;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { return false; }
 if(call.is_open!=true)   { return false; }
 if(call.is_closed==true) { return false; }
 if(call.xmit_msgs_queued>0)
  {
  call.xmit_msgs_queued--;
  call.xmit_msgs_total++;
  msg=call.xmit_msgs_queue.shift();
  call.socket.send(msg);
  //mbLog("sent msg:"+JSON.stringify(msg,0,2));
  }
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return true;
 }





 function wockCallWrite                (wi,message)
 {
 var call,msg;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { return false; }
 if(call.is_open!=true)   { return false; }
 if(call.is_closed==true) { return false; }
 call.xmit_msgs_queued++;
 call.xmit_msgs_queue.push(message);
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 wockCallProcess(wi);
 return true;
 }






 function wockCallPeek                 (wi,ofs)
 {
 var call,msg;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { return null; }
 if(call.is_open!=true)   { return null; }
 if(call.is_closed==true) { return null; }
 if(call.rcve_msgs_queued==0) { return null; }
 if(ofs>=call.rcve_msgs_queued) { return null; }
 msg=call.rcve_msgs_queue[ofs];
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return msg;
 }




 function wockCallRead                 (wi)
 {
 var call,msg,obj;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { mbLog("a"); return null; }
 if(call.is_open!=true)   { mbLog("b"); return null; }
 if(call.is_closed==true) { mbLog("c"); return null; }
 if(call.rcve_msgs_queued==0) {  return null; }
 msg=call.rcve_msgs_queue.shift();
 obj=JSON.parse(msg);
 call.rcve_msgs_queued--;
 call.rcve_msgs_total++;
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return msg;
 }





 function wockCallDiscard              (wi)
 {
 var call;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { mbLog("a"); return false; }
 if(call.is_open!=true)   { mbLog("b"); return false; }
 if(call.is_closed==true) { mbLog("c"); return false; }
 if(call.rcve_msgs_queued==0) {  return false; }
 call.rcve_msgs_queue.shift();
 call.rcve_msgs_queued--;
 call.rcve_msgs_total++;
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return true;
 }




 function wockCallMark                 (wi,ofs)
 {
 var call,msg;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { return null; }
 if(call.is_open!=true)   { return null; }
 if(call.is_closed==true) { return null; }
 if(call.rcve_msgs_queued==0) { return null; }
 if(ofs>=call.rcve_msgs_queued) { return null; }
 msg=call.rcve_msgs_queue[ofs];
 if(msg.marked==0)
  {
  msg.marked=1;
  call.rcve_msgs_queue[ofs]=msg;
  }
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return msg;
 }




 function wockCallStatus               (wi)
 {
 var call,msg;

 call=wock.call_array[wi];
 if(call.in_use!=1)       { return null; }
 call.obb=call.socket.bufferedAmount;
 wock.call_array[wi]=call;
 return{
  is_open:call.is_open,
  is_closed:call.is_closed,
  url:call.url,
  xmit_msgs_total:call.xmit_msgs_total,
  rcve_msgs_total:call.rcve_msgs_total,
  xmit_msgs_queued:call.xmit_msgs_queued,
  rcve_msgs_queued:call.rcve_msgs_queued,
  ms_start:call.rcve_msgs_queued,
  obb:call.obb
  }
 }


/*-----------------------------------------------------------------------*/




 function guiInit                      ()
 {
 var col,row,v;
 var surf,i;


 gui.surf_count=0;
 gui.surf_slots=0;
 gui.surf_pf=0;
 gui.surf_array=[];
 for(i=0;i<32;i++)
  {
  surf={};
  surf.self_index=i;
  surf.in_use=0;
  surf.dom=guiDomElementCreate("canvas","surf"+i,null,2000);
  surf.dom.style.opacity=1.0;
  surf.ctx=surf.dom.getContext('2d');
  surf.cx=0;
  surf.cy=0;
  surf.uvars={};
  gui.surf_array[i]=surf;
  gui.surf_slots++;
  }
 for(i=0;i<gui.surf_slots;i++)
  {
  guiSurfSizeSet(i,320,240);
  guiSurfFillStyleSet(i,guiDomPen(20,100,100,1.0));
  guiSurfStrokeStyleSet(i,guiDomPen(220,244,255,1.0));
  guiSurfFontSet(i,"monospace","20px",800,false);
  guiSurfCordSet(i,"0px","0px");
  }
 }





 function guiDomElementCreate          (type,id,par,zi)
 {
 var dom,ele,disp,parm;
 dom=document.createElement(type);
 if(par!=null) { document.getElementById(par).appendChild(dom);  }
 else          { document.body.appendChild(dom); }
 if(id!=null)  { guiDomAttribSet(dom,"id",id); }
 if(zi!=null)  { guiDomPositionSet(dom,"absolute",zi); }
 if(type==="video")
  {
  dom.muted=true;
  dom.autoplay=true;
  dom.controls=false;
  dom.playsinline=true;
  }
 return dom;
 }





 function guiDomPen                    (r,g,b,a)
 {
 var str;

 str="rgba("+r+","+g+","+b+","+a+")";
 return str;
 }





 function guiDomColorRandom            (rmin,rmax,gmin,gmax,bmin,bmax)
 {
 var letters="0123456789ABCDEF";
 var color='#';
 var dif,ran;

 dif=rmax-rmin;
 ran=rmin+numRandomInt(dif);
 color+=ran.toString(16);
 dif=gmax-gmin;
 ran=gmin+numRandomInt(dif);
 color+=ran.toString(16);
 dif=bmax-bmin;
 ran=bmin+numRandomInt(dif);
 color+=ran.toString(16);
 return color;
 }




 function guiDomByIdGet                (elid)
 {
 var ele;
 if(typeof elid==="object")  {  ele=elid;  }
 else                        {  ele=document.getElementById(elid);  }
 return ele;
 }




 function guiDomAttribSet              (elid,atr,val)
 {
 var ele=guiDomByIdGet(elid);
 ele.setAttribute(atr,val);
 return true;
 }




 function guiDomVisibilitySet          (elid,state)
 {
 var ele=guiDomByIdGet(elid);
 if(state) { ele.style.visibility="visible"; }
 else      { ele.style.visibility="hidden";  }
 return true;
 }




 function guiDomDisplaySet             (elid,state)
 {
 var ele=guiDomByIdGet(elid);
 if(state) { ele.style.display="inline"; }
 else      { ele.style.display="none";  }
 return true;
 }



 function guiDomPositionSet            (elid,pos,zi)
 {
 var ele=guiDomByIdGet(elid);
 if(pos) ele.style.position=pos;
 if(zi)  ele.style.zIndex=zi;
 return true;
 }





 function guiDomAreaSet                (elid,as,p1,p2,p3,p4)
 {
 var len,l,ch,ele;
 var pa=[];

 ele=guiDomByIdGet(elid);
 len=as.length;
 pa[0]=p1;
 pa[1]=p2;
 pa[2]=p3;
 pa[3]=p4;
 for(l=0;l<len;l++)
  {
  ch=as.substring(l,l+1);
  if(ch=="l") { if(pa[l]!=null) ele.style.left=pa[l]; } else
  if(ch=="t") { if(pa[l]!=null) ele.style.top=pa[l]; } else
  if(ch=="r") { if(pa[l]!=null) ele.style.right=pa[l]; } else
  if(ch=="b") { if(pa[l]!=null) ele.style.bottom=pa[l]; } else
  if(ch=="w") { if(pa[l]!=null) ele.style.width=pa[l]; } else
  if(ch=="h") { if(pa[l]!=null) ele.style.height=pa[l]; } else { return false; }
  }
 return true;
 }




 function guiDomFontSet                (elid,fam,siz,wey)
 {
 var ele=guiDomByIdGet(elid);
 if(fam!=null) ele.style.fontFamily=fam;
 if(siz!=null) ele.style.fontSize=siz;
 if(wey!=null) ele.style.fontWeight=wey;
 return true;
 }



 function guiDomPaddingSet             (elid,all,top,lft,btm,rig)
 {
 var ele=guiDomByIdGet(elid);
 if(all!=null) ele.style.padding=all;
 if(top!=null) ele.style.paddingTop=top;
 if(lft!=null) ele.style.paddingLeft=lft;
 if(btm!=null) ele.style.paddingBottom=btm;
 if(rig!=null) ele.style.paddingRight=rig;
 return true;
 }


 function guiDomMarginSet              (elid,all,top,lft,btm,rig)
 {
 var ele=guiDomByIdGet(elid);
 if(all!=null) ele.style.margin=all;
 if(top!=null) ele.style.marginTop=top;
 if(lft!=null) ele.style.marginLeft=lft;
 if(btm!=null) ele.style.marginBottom=btm;
 if(rig!=null) ele.style.marginRight=rig;
 return true;
 }




 function guiDomBorderSet              (elid,all,top,lft,btm,rig)
 {
 var ele=guiDomByIdGet(elid);
 if(all!=null) ele.style.border=all;
 if(top!=null) ele.style.borderTop=top;
 if(lft!=null) ele.style.borderLeft=lft;
 if(btm!=null) ele.style.borderBottom=btm;
 if(rig!=null) ele.style.borderRight=rig;
 return true;
 }




 function guiDomColorSet               (elid,bg,fg)
 {
 var ele=guiDomByIdGet(elid);
 if(bg!=null) ele.style.background=bg;
 if(fg!=null) ele.style.color=fg;
 return true;
 }





 function guiSurfSizeSet               (si,width,height)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.dom.width=width;
 surf.dom.height=height;
 gui.surf_array[si]=surf;
 }




 function guiSurfClear                 (si)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.clearRect(0,0,surf.dom.width,surf.dom.height);
 gui.surf_array[si]=surf;
 }




 function guiSurfErase                 (si,x,y,w,h)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.clearRect(x,y,w,h);
 gui.surf_array[si]=surf;
 }


 function guiSurfStrokeStyleSet        (si,style)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.strokeStyle=style;
 gui.surf_array[si]=surf;
 }


 function guiSurfFillStyleSet          (si,style)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.fillStyle=style;
 gui.surf_array[si]=surf;
 }


 function guiSurfLineWidthSet          (si,wid)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.lineWidth=wid;
 gui.surf_array[si]=surf;
 }


 function guiSurfFontSet               (si,family,size,wey,isitalic)
 {
 var str,surf;

 surf=gui.surf_array[si];
 str='';
 wey+=100
 if(wey>1000) { wey=1000; }
 if(isitalic==true) { str+=' oblique '; }
 str+=wey+' ';
 str+=size+' '+family;
 surf.ctx.font=str;
 gui.surf_array[si]=surf;
 }



 function guiSurfFrame                 (si,x,y,w,h)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.strokeRect(x,y,w,h);
 gui.surf_array[si]=surf;
 }


 function guiSurfFill                  (si,x,y,w,h)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.fillRect(x,y,w,h);
 gui.surf_array[si]=surf;
 }


 function guiSurfText                  (si,x,y,txt)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.fillText(txt,x,y);
 surf.ctx.strokeText(txt,x,y);
 gui.surf_array[si]=surf;
 }


 function guiSurfStrokeText            (si,x,y,txt)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.strokeText(txt,x,y);
 gui.surf_array[si]=surf;
 }


 function guiSurfFillText              (si,x,y,txt)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.fillText(txt,x,y);
 gui.surf_array[si]=surf;
 }


 function guiSurfLine                  (si,x,y,x2,y2)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.ctx.beginPath();
 surf.ctx.moveTo(x,y);
 surf.ctx.lineTo(x2,y2);
 surf.ctx.stroke();
 gui.surf_array[si]=surf;
 }


 function guiSurfCordSet               (si,x,y)
 {
 var surf;

 surf=gui.surf_array[si];
 surf.dom.style.top=y;
 surf.dom.style.left=x;
 gui.surf_array[si]=surf;
 }



 function guiSurfCxSet                 (si,cx,cy)
 {
 var surf;
 surf=gui.surf_array[si];
 surf.cx=cx;
 surf.cy=cy;
 gui.surf_array[si]=surf;
 }


 function guiSurfCxAdjust              (si,cx,cy)
 {
 var surf;
 surf=gui.surf_array[si];
 surf.cx+=cx;
 surf.cy+=cy;
 gui.surf_array[si]=surf;
 }



 function guiSurfCx                    (si)
 {
 var surf;
 surf=gui.surf_array[si];
 return(surf.cx);
 }



 function guiSurfCy                    (si)
 {
 var surf;
 surf=gui.surf_array[si];
 return(surf.cy);
 }



/*-----------------------------------------------------------------------*/



 function devoInit                     ()
 {
 var device;

 devo.permission_state=0;
 devo.permission_result=0;
 devo.is_gathering=false;
 devo.group_count=0;
 devo.audio_in_count=0;
 devo.video_in_count=0;
 devo.audio_out_count=0;
 devo.device_count=0;
 devo.device_slots=0;
 devo.device_array=[];
 for(i=0;i<32;i++)
  {
  device={};
  device.self_index=i;
  device.in_use=0;
  device.kind="";
  device.label="";
  device.text="";
  device.did="";
  device.gid="";
  device.is_default=false;
  device.gindex=-1;
  devo.device_array[i]=device;
  devo.device_slots++;
  }
 }





 function devoGather                   ()
 {
 var str,mat,msl,n,s,i,c,t,g,ok,isd,dev;

 if(devo.is_gathering==true) { return false; }
 devo.is_gathering=true;
 for(s=0;s<devo.device_slots;s++)
  {
  dev=devo.device_array[s];
  dev.self_index=s;
  dev.in_use=0;
  dev.kind="";
  dev.label="";
  dev.text="";
  dev.did="";
  dev.gid="";
  dev.is_default=false;
  dev.gindex=-1;
  devo.device_array[s]=dev;
  }
 devo.group_count=0;
 devo.audio_in_count=0;
 devo.video_in_count=0;
 devo.audio_out_count=0;
 devo.device_count=0;

 navigator.mediaDevices.enumerateDevices().then(function(devices)
  {
  devices.forEach(function(device)
   {
   str=device.label;
   mat="efault - ";
   msl=mat.length;
   n=str.lastIndexOf(mat);
   isd=false;
   if(n==1)  { str=str.slice(msl+1);  isd=true;  }
   ok=false;
   for(s=0;s<devo.device_slots;s++)
    {
    if(devo.device_array[s].in_use==0) { ok=true; break; }
    }
   if(ok==false) { alert("emptygetslot = -1"); }
   dev=devo.device_array[s];
   if(dev.self_index!=s)
    {
    mbLog("zz s="+s+" self="+dev.self_index);
    }
   dev.kind=device.kind;
   dev.label=device.label;
   dev.text=str;
   dev.did=device.deviceId;
   dev.gid=device.groupId;
   dev.is_default=isd;
   devo.device_array[s]=dev;
   ok=true;
   while(1)
    {
    if(device.kind=="audioinput")  { devo.audio_in_count++; break; }
    if(device.kind=="videoinput")  { devo.video_in_count++; break; }
    if(device.kind=="audiooutput") { devo.audio_out_count++; break; }
    ok=false;
    break;
    }
   if(ok==true)
    {
    dev.in_use=1;
    devo.device_count++;
    ok=false;
    c=0;
    for(i=0;i<devo.device_slots;i++)
     {
     if(c>=devo.device_count)     { break; }
     if(devo.device_array[i].in_use==0) { continue; }
     c++;
     if(i==s) { continue; }
     if(devo.device_array[i].gid!=device.groupId) { continue; }
     ok=true;
     break;
     }
    if(ok==false) { dev.gindex=devo.group_count; devo.group_count++;     }
    else          { dev.gindex=i;   }
    devo.device_array[dev.self_index]=dev;
    }
   })
  })
 .catch(function(err) {  mbLog("eee="+err.name + ": " + err.message);})
 .finally(function()
  {
  if(devo.audio_in_count==1)
   {
   for(i=0;i<devo.device_slots;i++)
    {
    dev=devo.device_array[i];
    if(dev.in_use==0) { continue; }
    if(dev.kind!="audioinput") { continue; }
    dev.is_default=true;
    devo.device_array[i]=dev;
    break;
    }
   }
  if(devo.video_in_count==1)
   {
   for(i=0;i<devo.device_slots;i++)
    {
    dev=devo.device_array[i];
    if(dev.in_use==0) { continue; }
    if(dev.kind!="videoinput") { continue; }
    dev.is_default=true;
    devo.device_array[i]=dev;
    break;
    }
   }
  if(devo.audio_out_count==1)
   {
   for(i=0;i<devo.device_slots;i++)
    {
    dev=devo.device_array[i];
    if(dev.in_use==0) { continue; }
    if(dev.kind!="audiooutput") { continue; }
    dev.is_default=true;
    devo.device_array[i]=dev;
    break;
    }
   }

  for(i=0;i<devo.audio_in_count;i++)
   {
   dev=devo.device_array[devoIndexGet("audioinput",i)];
   if(dev.is_default) { break; }
   }
  if(i==devo.audio_in_count&&devo.audio_in_count>0)
   {
   dev=devo.device_array[devoIndexGet("audioinput",0)];
   dev.is_default=true;
   }

  for(i=0;i<devo.video_in_count;i++)
   {
   dev=devo.device_array[devoIndexGet("videoinput",i)];
   if(dev.is_default) { break; }
   }
  if(i==devo.video_in_count&&devo.video_in_count>0)
   {
   dev=devo.device_array[devoIndexGet("videoinput",0)];
   dev.is_default=true;
   }

  for(i=0;i<devo.audio_out_count;i++)
   {
   dev=devo.device_array[devoIndexGet("audiooutput",i)];
   if(dev.is_default) { break; }
   }
  if(i==devo.audio_out_count&&devo.audio_out_count>0)
   {
   dev=devo.device_array[devoIndexGet("audiooutput",0)];
   dev.is_default=true;
   }


  devo.is_gathering=false;
  });
 return true;
 }





 function devoDumpDevices              ()
 {
 var i;

 mbLog("device count="+devo.device_count);
 mbLog("group count="+devo.group_count);
 mbLog(" Audio in count="+devo.audio_in_count);
 for(i=0;i<devo.audio_in_count;i++)
  {
  dev=devo.device_array[devoIndexGet("audioinput",i)];
  mbLog((dev.is_default?">":" ")+"AI "+i+" "+dev.text);
  }
 mbLog(" Video in count="+devo.video_in_count);
 for(i=0;i<devo.video_in_count;i++)
  {
  dev=devo.device_array[devoIndexGet("videoinput",i)];
  mbLog((dev.is_default?">":" ")+"VI "+i+" "+dev.text);
  }
 mbLog(" Audio out count="+devo.audio_out_count);
 for(i=0;i<devo.audio_out_count;i++)
  {
  dev=devo.device_array[devoIndexGet("audiooutput",i)];
  mbLog((dev.is_default?">":" ")+"AO "+i+" "+dev.text);
  }
 }





 function devoIndexGet                 (kind,idx)
 {
 var i,j,c,dev,mat,ok,k,m;

 //if(objectCheck(devman,"devo.")===false) { return -1; }
 ok=true;
 while(1)
  {
  if(kind=="audioinput")  { k=0; m=devo.audio_in_count; break; }
  if(kind=="videoinput")  { k=1; m=devo.video_in_count; break; }
  if(kind=="audiooutput") { k=2; m=devo.audio_out_count; break; }
  ok=false;
  break;
  }
 if(ok==false) { return -1; }
 if(idx>=m)    { return -1; }
 c=0;
 j=0;
 for(i=0;i<devo.device_slots;i++)
  {
  if(c>=devo.device_count) { break; }
  dev=devo.device_array[i];
  if(dev.in_use==0) { continue; }
  c++;
  if(dev.kind!=kind) { continue; }
  if(j!=idx) { j++; continue; }
  return i;
  }
 return -1;
 }





 function devoPermissionsGet           ()
 {
 devo.permission_state=1; //getting=true;
 devo.permission_result=0;
 navigator.getUserMedia({audio:true,video:false},function(sss)
  {
  if(sss.getAudioTracks().length>0) {  devo.permission_result+=1;   }
  },
 function(eee)
  {
  });
 navigator.getUserMedia({audio:false,video:true},function(sss)
  {
  if(sss.getVideoTracks().length>0)
   {
   devo.permission_result+=2;
   devo.permission_state=0;//getting=false;
   }
  },
 function(eee)
  {
  devo.permission_state=0;//getting=false;
  });
 }







 function devoConstraints              (ai,vi,si)
 {
 var avc,dev;
 var adi,vdi;
 var aid,vid;

 avc={};
 if(ai>=0&&ai<devo.audio_in_count)
  {
  adi=devoIndexGet("audioinput",ai);
  dev=devo.device_array[adi];
  avc.audio=
   {
   deviceId:  { exact:dev.did},
   volume: 0.9
   };
  }

 if(vi>=0&&vi<devo.video_in_count)
  {
  vdi=devoIndexGet("videoinput",vi);
  dev=devo.device_array[vdi];
  avc.video=
   {
   deviceId: { exact:dev.did},
   width:  { min: 160, ideal: 320, max: 640},
   height: { min: 120, ideal: 240, max: 480},
   //aspectRatio: 1.333333333,
   frameRate:30
   };
  }

 if(si>=0)
  {
  avc.video=
   {
   cursor:"always",
   minWidth:640,
   maxWidth:1280,
   minHeight:480,
   maxHeight:720,
   //aspectRatio: 1.333333333,
   frameRate:30
   };
  }

 return avc;
 }




 function devoConstraintsVideoSet      (avc,wmin,wideal,wmax,hmin,hideal,hmax)
 {
 if(wmin)   { avc.video.width.min=wmin; }
 if(wideal) { avc.video.width.ideal=wideal; }
 if(wmax)   { avc.video.width.max=wmax; }
 if(hmin)   { avc.video.height.min=hmin; }
 if(hideal) { avc.video.height.ideal=hideal; }
 if(hmax)   { avc.video.height.max=hmax; }
 return avc;
 }







 function devoUserMediaGet             (avc,parma,parmb,usrproc)
 {
 navigator.mediaDevices.getUserMedia(avc)
  .then((stream)=>{ usrproc(parma,parmb,1,stream);   })
  .catch((error)=>{ usrproc(parma,parmb,2,error);    });
 }





 function devoDisplayMediaGet          (avc,parma,parmb,usrproc)
 {
 navigator.mediaDevices.getDisplayMedia(avc)
  .then((stream)=>{ usrproc(parma,parmb,1,stream);   })
  .catch((error)=>{ usrproc(parma,parmb,2,error);    });
 }


/*-----------------------------------------------------------------------*/



