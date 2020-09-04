
 var gui=(function() {
 var is_init=false;
 var handef;
 var is_update_requested;
 var update_tik;
 var vars={};
 var bundle_array=[];




 function Init () { //var i,obj,bundle; var xa,ya,xx,yy,ww,hh;
 if(is_init==true) { return; }
 handef=new HandleDefine("gui",256,false);
 is_init=true;
 UpdateRequest();
 window.addEventListener('resize',function() { UpdateRequest(); },false);
 }


 Init();


 function UpdateRequest () {
 if(is_update_requested==true) { return; }
 is_update_requested=true;
 update_tik=timer.TikNow(false);
 }



 function UpdateCheck () {
 if(is_update_requested==false) { return false; }
 if(timer.TikElapsed(false,update_tik)<20) { return false; }
 return true;
 }


 function UpdateClear () {
 is_update_requested=false;
 }



 function DisplayGet () { var i,obj,bundle; var xa,ya,xx,yy,ww,hh;
 if(bundle_array.length==0)
  {
  for(i=0;i<max_windows;i++)
   {
   bundle={};
   bundle.stage=100;
   xa=160; ya=120; ww=160; hh=120;
   xx=parseInt(i%3,0);
   yy=parseInt(i/3,0);
   xx=xx*320; yy=yy*240;
   xx+=0; yy+=0;   bundle.vidi_handle=PeerElemCreate("vidi",i,xx,yy,ww,hh);
   xx+=xa; yy+=0;  bundle.cani_handle=PeerElemCreate("cani",i,xx,yy,ww,hh);
   xx-=xa; yy+=ya; bundle.vido_handle=PeerElemCreate("vido",i,xx,yy,ww,hh);
   xx+=xa; yy+=0;  bundle.cano_handle=PeerElemCreate("cano",i,xx,yy,ww,hh);
   bundle_array[i]=bundle;
   }
  }

 var win,doc,docelem,body,disp={};
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
 if(document.fullscreenElement) { disp.is_fse=true;  }
 else                           { disp.is_fse=false; }
 if(disp.scr_wid>disp.scr_hit) { disp.is_landscape=true;  }
 else                          { disp.is_landscape=false; }
 return disp;
 }





 function Create (type) {
 var s,h,obj;
 for(s=0;s<handef.slots;s++)
  {
  obj=handef.array[s];
  if(obj.in_use!=false) { continue; }
  obj.u={};
  obj.u.type=type;
  obj.u.is_animating=false;
  obj.u.dom=document.createElement(type);
  obj.u.id=null;
  obj.u.vars={};
  if(type=="video")
   {
   obj.u.dom.setAttribute("autoplay","");
   obj.u.dom.setAttribute("muted","");
   obj.u.dom.setAttribute("playsinline","");
   obj.u.dom.muted=true;
   obj.u.dom.autoplay=true;
   obj.u.dom.controls=false;
   obj.u.dom.style.objectFit="cover"; // contain scale-down
   //obj.u.dom.srcObject=null;
   //obj.u.dom.src=null;
   }
  obj.u.dom.style.position="absolute";
  obj.u.dom.style.zIndex=1000;
//  obj.u.dom.style.border="1px solid red";

  h=HandleAdd(handef,s);
  return h;
  }
 return 0;
 }



 function Destroy (handle) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 HandleRemove(handef,handle);
 return true;
 }





 function IdFind (id) {
 var i,obj;
 for(i=0;i<handef.slots;i++)
  {
  obj=handef.array[i];
  if(obj.in_use!=true)  { continue; }
  if(obj.u.id!=id) { continue; }
  return obj.self_handle;
  }
 return 0;
 }





 function IdSet (handle,id) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 obj.u.id=id;
 obj.u.dom.setAttribute("id",obj.u.id);
 return true;
 }



 function Get (handle) {
 return(HandleCheck(handef,handle));
 }





 function AreaSet (handle,astring,sufix,p1,p2,p3,p4) {
 var obj,len,l,ch,pa;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 len=astring.length;
 if(len<=0) { return false; }
 len=4;
 pa=[];
 pa[0]=p1;
 pa[1]=p2;
 pa[2]=p3;
 pa[3]=p4;
 if(sufix!=null&&sufix!="")
  {
  for(l=0;l<len;l++) { pa[l]+=sufix;  }
  }
 for(l=0;l<len;l++)
  {
  ch=astring.substring(l,l+1);
  if(ch=="l") { if(pa[l]!=null) obj.u.dom.style.left=pa[l]; } else
  if(ch=="t") { if(pa[l]!=null) obj.u.dom.style.top=pa[l]; } else
  if(ch=="r") { if(pa[l]!=null) obj.u.dom.style.right=pa[l]; } else
  if(ch=="b") { if(pa[l]!=null) obj.u.dom.style.bottom=pa[l]; } else
  if(ch=="w") { if(pa[l]!=null) obj.u.dom.style.width=pa[l]; } else
  if(ch=="h") { if(pa[l]!=null) obj.u.dom.style.height=pa[l]; } else { return false; }
  }
 return true;
 }




 function FontSet (handle,fam,siz,wey) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 if(fam!=null) obj.u.dom.style.fontFamily=fam;
 if(siz!=null) obj.u.dom.style.fontSize=siz;
 if(wey!=null) obj.u.dom.style.fontWeight=wey;
 return true;
 }






 function ParentSet (handle,phandle) {
 var obj,pobj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 if(phandle!=null&&phandle>0)
  {
  if((pobj=HandleCheck(handef,phandle))==null) { return false; }
  pobj.u.dom.appendChild(obj.u.dom);
  obj.u.parent_handle=pobj.self_handle;
  }
 else
  {
  document.body.appendChild(obj.u.dom);
  obj.u.parent_handle=0;
  }
 return true;
 }



 function Rgba(r,g,b,a) {
 var str="rgba(";
 str+=r+",";
 str+=g+",";
 str+=b+",";
 str+=a+")";
 return str;
 }




 function Status () {
 var info;
 info={};
 info.is_update_requested=is_update_requested;
 return info;
 }



 /*
 function WidgetVideo () {  var han,idx,xx,yy;
 idx=main.vars.gh_array.length;
 xx=50+((idx%4)*180);
 yy=360;
 han=gui.Create("video");
 gui.IdSet(han,"viddiv"+idx);
 gui.AreaSet(han,"ltwh","px",xx,yy,80,60);
 gui.ParentSet(han);
 gui.Get(han).dom.style.background=gui.Rgba(155,225,225,1.0);
 return han;
 }



 function WidgetCanvas () {  var han,idx,xx,yy;
 idx=main.vars.gh_array.length;
 xx=50+((idx%4)*180);
 yy=360;
 han=gui.Create("canvas");
 gui.IdSet(han,"candiv"+idx);
 gui.AreaSet(han,"ltwh","px",xx,yy,80,60);
 gui.ParentSet(han);
 gui.Get(han).dom.style.background=gui.Rgba(155,5,225,1.0);
 return han;
 }
*/


 function PeerElemCreate (type,index,xx,yy,ww,hh){ var gh=0;
 switch(type)
  {
  case "vidi":
  case "vido":
  gh=Create("video");
  if(type=="vidi") { Get(gh).u.dom.style.background=Rgba(255,0,0,1.0); }
  else             { Get(gh).u.dom.style.background=Rgba(0,255,0,1.0); }
  break;
  case "cani":
  case "cano":
  gh=Create("canvas");
  if(type=="cani") { Get(gh).u.dom.style.background=Rgba(0,0,255,1.0); }
  else             { Get(gh).u.dom.style.background=Rgba(0,200,200,1.0); }
  break;
  }
 IdSet(gh,type+index);
 ParentSet(gh,null);
 AreaSet(gh,"ltwh","px",xx,yy,ww,hh);
 Get(gh).u.dom.style.zIndex=100;
 return gh;
 }




 return{
 is_init:is_init,
 handef:handef,
 vars:vars,
 bundle_array:bundle_array,
 UpdateRequest:UpdateRequest,
 UpdateCheck:UpdateCheck,
 UpdateClear:UpdateClear,
 DisplayGet:DisplayGet,
 Create:Create,
 Destroy:Destroy,
 IdSet:IdSet,
 IdFind:IdFind,
 Get:Get,
 AreaSet:AreaSet,
 FontSet:FontSet,
 ParentSet:ParentSet,
 Rgba:Rgba,
 Status:Status
 //WidgetCanvas:WidgetCanvas,
 //WidgetVideo:WidgetVideo
 }


})();




