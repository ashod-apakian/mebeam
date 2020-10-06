
//'  ######   ##       ##     ## ########
//  ##    ##  ##       ##     ## ##
//  ##        ##       ##     ## ##
//  ##   #### ##       ##     ## ######
//  ##    ##  ##       ##     ## ##
//  ##    ##  ##       ##     ## ##
//   ######   ########  #######  ########




//  ##     ## ##     ##
//  ##     ##  ##   ##
//  ##     ##   ## ##
//  ##     ##    ###
//  ##     ##   ## ##
//  ##     ##  ##   ##
//   #######  ##     ##



 var ux=(function() {
 var is_init=false;
 var state={};



 function Init () { var i,obj;
 if(is_init==true) { return; }
 state={};
 is_init=true;
 }



 Init();



 function Begin () { var han,i;
 for(i=0;i<max_windows;i++)
  {
  han=gui.Create("video");
  gui.IdSet(han,"remvideoid"+i,0);
  gui.WidthHeightSet(han,320,240);
  gui.BackgroundBorderSet(han,"#040","0px solid "+gui.Rgba(255,5,5,1.0));
  gui.Get(han).dom.style.outline="1px solid red";
  gui.Get(han).dom.style.outlineOffset="-1px";
  }
 han=gui.Create("video");
 gui.IdSet(han,"selfvideo",0);
 gui.WidthHeightSet(han,320,240);
 gui.BackgroundBorderSet(han,"#400","0px solid "+gui.Rgba(5,5,255,1.0));
 gui.Get(han).dom.style.outline="1px solid red";
 gui.Get(han).dom.style.outlineOffset="-1px";
 gui.UpdateRequest();
 }







 function DecideLandscape (disp,count) { var xx,yy,ww,hh,i,han,obj,cc; var dw,dh;
 cc=max_windows;
 cc=count;
 xx=yy=0;
 dw=disp.win_wid;
 dh=disp.win_hit;
 while(1)
  {
  ww=(dw)/(cc);
  hh=ww*0.75;
  if(hh<dh) { break; }
  dw--;
  }
 xx=ww;
 for(i=0;i<max_windows;i++)
  {
  han=gui.IdFind("remvideoid"+i);
  if((obj=gui.Get(han))==null) { continue; }
  gui.AreaSet(han,"ltwh","px",xx,yy,ww,hh);
  if(obj.dom.srcObject==null) { obj.dom.style.display="none"; continue; }
  xx+=ww;
  }
 xx=0;
 han=gui.IdFind("selfvideo");
 gui.AreaSet(han,"ltwh","px",xx,yy,ww,hh);

 }



 function DecidePortrait (disp,count) { var xx,yy,ww,hh,i,han,obj,cc; var dw,dh;
 cc=max_windows;
 cc=count;
 xx=yy=0;
 dw=disp.win_wid;
 dh=disp.win_hit;
 while(1)
  {
  hh=(dh)/(cc);
  ww=hh*1.33;
  if(ww<dw) { break; }
  dh--;
  }
 yy=hh;
 for(i=0;i<max_windows;i++)
  {
  han=gui.IdFind("remvideoid"+i);
  if((obj=gui.Get(han))==null) { continue; }
  gui.AreaSet(han,"ltwh","px",xx,yy,ww,hh);
  if(obj.dom.srcObject==null) { obj.dom.style.display="none"; continue; }
  yy+=hh;
  }
 yy=0;
 han=gui.IdFind("selfvideo");
 gui.AreaSet(han,"ltwh","px",xx,yy,ww,hh);
 }




 function Decide (disp,count) {
 if(disp.win_ratio>=1.3)
  {
  Logger(40," LANDSCAPE ratio="+disp.win_ratio+" count="+count);
  DecideLandscape(disp,count);
  }
 else
  {
   Logger(40," PORTRAIT ratio="+disp.win_ratio+" count="+count);
  DecidePortrait(disp,count);
  }
 }



 function Update () { var disp,res; var i,r,c; var xx,yy,ww,hh; var han,obj; var count,best,done; var deg;
 if(gui.UpdateCheck()!=true) { return; }
 disp=env.DisplayGet();
 count=1;
 for(i=0;i<max_windows;i++)
  {
  han=gui.IdFind("remvideoid"+i);
  if((obj=gui.Get(han))==null) { continue; }
  if(obj.dom.srcObject!=null)  { obj.dom.style.display="inline";  count++; }
  }
 Decide(disp,count);
 gui.UpdateClear();
 }




 return{
 is_init:is_init,
 state:state,
 Begin:Begin,
 Update:Update,
 }


})();

