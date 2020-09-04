
 var hud=(function() {
 var is_init=false;
 var vars={};

 function Init () {
 var i;
 if(is_init==true) { return; }
 vars.is_open=false;
 vars.log_handle=0
 vars.gui_handle=0;
 vars.label_line=[];
 for(i=0;i<7;i++)
  {
  vars.label_line[i]="";
  }
 is_init=true;
 }


 Init();



 function Open (opac) {
 var elm,disp,wid,hit;
 if(vars.is_open!=false) { return false; }
 disp=gui.DisplayGet();
 wid=parseInt((disp.win_wid),10);
 hit=parseInt((disp.win_hit),10);
 vars.opacity_wanted=opac;
 vars.log_handle=que.Create();
 vars.gui_handle=gui.Create("div");
 gui.IdSet(vars.gui_handle,"huddiv");
 elm=gui.Get(vars.gui_handle);
 elm.u.dom.style.position="absolute";
 elm.u.dom.style.zIndex=1000;
 gui.AreaSet(vars.gui_handle,"ltrh","px",50,200,50,740);
 gui.ParentSet(vars.gui_handle,null);
 elm.u.dom.style.display="inline";
 elm.u.dom.style.border="1px solid #ff0000";
 elm.u.dom.style.color=gui.Rgba(0,0,72,0.5);
 elm.u.dom.style.background=gui.Rgba(255,255,255,vars.opacity_wanted);
 gui.FontSet(vars.gui_handle,"arial","36px",700);
 vars.is_open=true;
 return true;
 }


 function Paint () {
 var elm,html,i,j,status,msg;
 if(vars.is_open!=true) { return false; }
 elm=gui.Get(vars.gui_handle);
 elm.u.dom.innerHTML="";
 html=elm.u.dom.innerHTML;
 j=vars.label_line.length;
 for(i=0;i<j;i++)
  {
  msg=vars.label_line[i];
  elm.u.dom.innerHTML+="<span style='color: #a01040;'>"+msg+"</span><br>";
  //elm.u.dom.innerHTML+=msg;
  //elm.u.dom.innerHTML+="<br>";
  }
 status=que.Status(vars.log_handle);
 j=status.msgs_qued;
 for(i=0;i<j;i++)
  {
  msg=que.Peek(vars.log_handle,i);
  elm.u.dom.innerHTML+="<span style='color: #5010c0;'>"+msg+"</span><br>";
  //elm.dom.innerHTML+=msg+"<br>";
  }
 return true;
 }


 function Log (msg) {
 var res,status;
 if(vars.is_open!=true) { return false; }
 status=que.Status(vars.log_handle);
 if(status.msgs_qued>=10)  {  que.Discard(vars.log_handle);  }
 que.Write(vars.log_handle,msg);
 console.log(msg);
 Paint();
 return true;
 }



 function Label (idx,msg) {
 if(vars.is_open!=true) { return false; }
 if(idx<0) { return false; }
 if(idx>=vars.label_line.length) { return false; }
 vars.label_line[idx]=msg;
 Paint();
 return true;
 }




 function Status () {
 var info={};
 info.is_open=vars.is_open;
 return info;
 }


 return{
 is_init:is_init,
 vars:vars,
 Open:Open,
 Paint:Paint,
 Log:Log,
 Label:Label,
 Status:Status
 }


})();



