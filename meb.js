

 const max_windows=8;

 var handle_base=1000000;
 var handef_array=[];

 navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||window.RTCPeerConnection;

 const bl_constraints=window.constraints={audio:true,video:true};
 const pc_configurate={'iceServers':[{'urls':'stun:mebeam.com:3478'}]};
 const pc_constraints={'optional':  [{'DtlsSrtpKeyAgreement':true}]};


/**************************************************************************/
/**************************************************************************/
/**************************************************************************/


 function oof (txt) { var v,bias,e,stack,frame,frameRE;
 e=new Error();
 if(!e.stack)
 try       { throw e;  }
 catch(e)  { if(!e.stack) {  return false;  } }
 stack=e.stack.toString().split(/\r\n|\n/);
 frameRE=/:(\d+):(?:\d+)[^\d]*$/;
 do { frame=stack.shift();  } while (!frameRE.exec(frame)&&stack.length);
 v=parseInt(frameRE.exec(stack.shift())[1]);
 txt+="\n";
 txt+="line: ";
 txt+=v;
 txt+="\n";
 txt+="msrunning: ";
 txt+=timer.MsRunning();
 txt+="\n";
 txt+="stage: ";
 txt+=main.vars.stage;
 alert(txt);
 return true;
 }





 function Logger (msg,ify)
 {
 if(arguments.length<2)
  {
  hud.Log(num.Pad(num.Fixed(timer.TikNow(true),2),10,'0')+": "+msg)
  }
 else
  {
  if(ify==true)   {   hud.Log(num.Pad(num.Fixed(timer.TikNow(true),2),10,'0')+": "+JSON.stringify(msg,0,0))   }
  else            {   hud.Log(num.Pad(num.Fixed(timer.TikNow(true),2),10,'0')+": "+msg)   }
  }
 }



/**************************************************************************/
/**************************************************************************/
/**************************************************************************/



 function ObjectIsEmpty(obj) { var key;
 for(key in obj){ if(obj.hasOwnProperty(key)) { return false; } }
 return true;
 }












//   ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄   ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░▌ ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌          
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌▐░▌       ▐░▌▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌       ▐░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌   ▐░▌ ▐░▌▐░▌       ▐░▌▐░▌          ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀█░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌    ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌                    ▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄█░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌      ▐░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//   ▀         ▀  ▀         ▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 



 function HandleDefine (type,slots,useall)  {  var i,obj;
// if(arguments.length!=3)  alert("HandleDefine needs 2 arguments, not "+arguments.length);
 this.base=handle_base;
 this.type=type;
 this.slots=slots;
 this.count=0;
 this.use_all=useall;
 this.pf=0;
 this.array=[];
 for(i=0;i<this.slots;i++)
  {
  obj={};
  if(useall==true) { obj.in_use=true;   }
  else             { obj.in_use=false;  }
  obj.u={};
  obj.self_index=i;
  obj.self_handle=obj.self_index+this.base;
  this.array[i]=obj;
  }
 if(useall==true) { this.count=this.slots; }
 handef_array.push(this);
 handle_base+=1000000;
 }





 function HandleCheck (handef,handle)  {  var obj;
 if(handle<handef.base)   { return null; }
 handle=handle-handef.base;
 if(handle>=handef.slots) { return null; }
 obj=handef.array[handle];
 if(obj.in_use!=true) { return null; }
 return obj;
 }



 function HandleGet (handef,index) { var obj,han;
 if(index<0||index>=handef.slots) { return 0; }
 obj=handef.array[index];
 if(obj.in_use!=true) { return 0; }
 han=index+handef.base;
 return han;
 }




 function HandleSlotUnused (handef) { var i,obj;
 for(i=0;i<handef.slots;i++)
  {
  obj=handef.array[i];
  if(obj.in_use!=false) { continue; }
  return i;
  }
 return -1;
 }



 function HandleAdd (handef,index) { var obj,han;
 if(index<0||index>=handef.slots) { return 0; }
 obj=handef.array[index];
 if(obj.in_use!=false) { return 0; }
 obj.in_use=true;
 handef.array[index]=obj;
 handef.count++;
 han=index+handef.base;
 return han;
 }



 function HandleRemove (handef,handle) { var obj,idx;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 idx=obj.self_index;
 if(handef.use_all==true) { alert("handleremvove for use_all==true"); }
 obj.in_use=false;
 handef.array[idx]=obj;
 handef.count--;
 return true;
 }



 function HandleNext (handef) { var idx;
 handef.pf++;
 if(handef.pf>=handef.slots) { handef.pf=0; }
 idx=handef.pf;
 return(HandleGet(handef,idx));
 }




 function HandleGetCheck (handef,index) { var han;
 if((han=HandleGet(handef,index))==0) { return null; }
 return(HandleCheck(handef,han));
 }




 function HandleAddCheck (handef,index) { var han;
 if((han=HandleAdd(handef,index))==0) { return null; }
 return(HandleCheck(handef,han));
 }




 function HandleNextCheck (handef) { var han;
 if((han=HandleNext(handef))==0) { return null; }
 return(HandleCheck(handef,han));
 }




 function HandleText (handle) { var i,hd,str,ix,obj;
 for(i=0;i<handef_array.length;i++)
  {
  hd=handef_array[i];
  if(handle>=hd.base&&handle<(hd.base+hd.slots))
   {
   ix=handle-hd.base;
   obj=hd.array[ix];
   str=hd.type+" index="+ix+" in_use="+obj.in_use;
   return str;
   }
  }
 return null;
 }



















//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//   ▀▀▀▀█░█▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
//       ▐░▌          ▐░▌     ▐░▌▐░▌ ▐░▌▐░▌▐░▌          ▐░▌       ▐░▌▐░▌          
//       ▐░▌          ▐░▌     ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ 
//       ▐░▌          ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//       ▐░▌          ▐░▌     ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀  ▀▀▀▀▀▀▀▀▀█░▌
//       ▐░▌          ▐░▌     ▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌            ▐░▌
//       ▐░▌      ▄▄▄▄█░█▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌  ▄▄▄▄▄▄▄▄▄█░▌
//       ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//        ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀ 



 var timer=(function() {
 var is_init=false;
 var msec_base;
 var perf_base;

 function Init () {
 if(is_init==true) { return; }
 msec_base=new Date().valueOf();
 perf_base=performance.now();
 is_init=true;
 }


 Init();



 function TikNow (perf) {
 var t;
 if(perf) { t=performance.now()-perf_base;  }
 else     { t=new Date().valueOf()-msec_base; }
 return t;
 }


 function TikElapsed (perf,tik) {
 return(TikNow(perf)-tik);
 }



 function MsRunning () {
 return(TikNow(false));
 }


 return{
 is_init:is_init,
 TikNow:TikNow,
 TikElapsed:TikElapsed,
 MsRunning:MsRunning
 }


})();





                                                                                












//   ▄▄        ▄  ▄         ▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄           
//  ▐░░▌      ▐░▌▐░▌       ▐░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          
//  ▐░▌░▌     ▐░▌▐░▌       ▐░▌▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌          
//  ▐░▌▐░▌    ▐░▌▐░▌       ▐░▌▐░▌▐░▌ ▐░▌▐░▌▐░▌          ▐░▌       ▐░▌     ▐░▌     ▐░▌          ▐░▌       ▐░▌▐░▌          
//  ▐░▌ ▐░▌   ▐░▌▐░▌       ▐░▌▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░▌          
//  ▐░▌  ▐░▌  ▐░▌▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌          ▐░░░░░░░░░░░▌▐░▌          
//  ▐░▌   ▐░▌ ▐░▌▐░▌       ▐░▌▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░▌          
//  ▐░▌    ▐░▌▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌     ▐░▌       ▐░▌     ▐░▌          ▐░▌       ▐░▌▐░▌          
//  ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌  ▄▄▄▄█░█▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
//  ▐░▌      ▐░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//   ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀ 



 var num=(function() {
 var is_init=false;

 function Init () {
 if(is_init==true) { return; }
 is_init=true;
 }

 Init();


 function Rand (max) {
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


 function Pad(numb,width,z) {
 z=z||'0';
 numb=numb+'';
 return numb.length>=width?numb:new Array(width-numb.length +1).join(z)+numb;
 }



 return{
 is_init:is_init,
 Rand:Rand,
 Fixed:Fixed,
 PercentOf:PercentOf,
 PercentIs:PercentIs,
 Pad:Pad
 }

})();




















//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄               ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░▌             ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌     ▐░▌ ▐░▌           ▐░▌  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌     ▐░▌ ▀▀▀▀█░█▀▀▀▀ 
//  ▐░▌          ▐░▌▐░▌    ▐░▌  ▐░▌         ▐░▌       ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌▐░▌ ▐░▌▐░▌▐░▌          ▐░▌▐░▌    ▐░▌     ▐░▌     
//  ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌   ▐░▌   ▐░▌       ▐░▌        ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌   ▐░▌     ▐░▌     
//  ▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌    ▐░▌     ▐░▌         ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌     ▐░▌     
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▐░▌ ▐░▌     ▐░▌   ▐░▌          ▐░▌     ▐░▌       ▐░▌▐░█▀▀▀▀█░█▀▀ ▐░▌   ▐░▌ ▐░▌▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▐░▌ ▐░▌     ▐░▌     
//  ▐░▌          ▐░▌    ▐░▌▐░▌      ▐░▌ ▐░▌           ▐░▌     ▐░▌       ▐░▌▐░▌     ▐░▌  ▐░▌    ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌    ▐░▌▐░▌     ▐░▌     
//  ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌     ▐░▐░▌       ▐░▐░▌        ▄▄▄▄█░█▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░▌      ▐░▌ ▐░▌     ▐░▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌     ▐░▐░▌     ▐░▌     
//  ▐░░░░░░░░░░░▌▐░▌      ▐░░▌        ▐░▌        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌      ▐░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌     ▐░▌     
//   ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀          ▀          ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀        ▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀       ▀      
//                                                                                                                                                       
                                                                                                                                          



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














//   ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀ 
//  ▐░▌          ▐░▌       ▐░▌     ▐░▌     
//  ▐░▌ ▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌     ▐░▌     
//  ▐░▌▐░░░░░░░░▌▐░▌       ▐░▌     ▐░▌     
//  ▐░▌ ▀▀▀▀▀▀█░▌▐░▌       ▐░▌     ▐░▌     
//  ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄█░█▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
                                         



 var gui=(function() {
 var is_init=false;
 var handef;
 var is_update_requested;
 var update_tik;
 var vars={};
 ///var bundle_array=[];




 function Init () { 
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



 function DisplayGet () { //var i,obj,bundle; var xa,ya,xx,yy,ww,hh;
 /*
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
 */
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
 //if(type=="cano")
  {
 /// Get(gh).u.dom.style.display="none";
  }
 ParentSet(gh,null);
 AreaSet(gh,"ltwh","px",xx,yy,ww,hh);
 Get(gh).u.dom.style.zIndex=100;

 return gh;
 }




 return{
 is_init:is_init,
 handef:handef,
 vars:vars,
 //bundle_array:bundle_array,
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













//   ▄         ▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄  
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░▌ 
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ 
//   ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀  




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
 for(i=0;i<15;i++)
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
 gui.AreaSet(vars.gui_handle,"ltrh","px",50,200,50,1200);
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
 elm.u.dom.innerHTML+="<br>";
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













//   ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ 
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌          
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ 
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌          
//   ▀▀▀▀▀▀█░█▀▀ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ 
//          ▐░▌  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//           ▀    ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 



 var que=(function() {
 var is_init=false;
 var handef;


 function Init () {
 var i,obj;
 if(is_init==true) { return; }
 handef=new HandleDefine("que",32,false);
 is_init=true;
 }



 Init();


 function Create () {
 var i,h,obj;
 for(i=0;i<handef.slots;i++)
  {
  obj=handef.array[i];
  if(obj.in_use!=false) { continue; }
  obj.u={};
  obj.u.ms_start=timer.MsRunning();
  obj.u.msgs_total=0;
  obj.u.msgs_qued=0;
  obj.u.msgs_que=[];
  h=HandleAdd(handef,i)
  return h;
  }
 return 0;
 }




 function Destroy (handle) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 obj.u.msgs_que=[];
 HandleRemove(handef,handle);
 return true;
 }




 function Write (handle,msg) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 obj.u.msgs_qued++;
 obj.u.msgs_que.push(msg);
 return true;
 }



 function Peek (handle,ofs) {
 var msg,obj;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 if(ofs<0) { return null; }
 if(ofs>=obj.u.msgs_qued) { return null; }
 msg=obj.u.msgs_que[ofs];
 return msg;
 }



 function Read (handle) {
 var msg,obj;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 if(obj.u.msgs_qued==0) {  return null; }
 msg=obj.u.msgs_que.shift();
 obj.u.msgs_qued--;
 obj.u.msgs_total++;
 return msg;
 }




 function Discard (handle) {
 var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 if(obj.u.msgs_qued==0) {  return false; }
 obj.u.msgs_que.shift();
 obj.u.msgs_qued--;
 obj.u.msgs_total++;
 return true;
 }



 function Status (handle) {
 var obj,info;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 info={};
 info.msgs_qued=obj.u.msgs_qued;
 info.msgs_total=obj.u.msgs_total;
 return info;
 }




 return{
 is_init:is_init,
 handef:handef,
 Create:Create,
 Destroy:Destroy,
 Write:Write,
 Peek:Peek,
 Read:Read,
 Discard:Discard,
 Status:Status
 }


})();















//   ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄    ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌ ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
//  ▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌               ▐░▌     ▐░▌          
//  ▐░▌   ▄   ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░▌          ▐░▌░▌   ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ 
//  ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌          ▐░░▌    ▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//  ▐░▌ ▐░▌░▌ ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░▌          ▐░▌░▌   ▐░█▀▀▀▀▀▀▀▀▀      ▐░▌      ▀▀▀▀▀▀▀▀▀█░▌
//  ▐░▌▐░▌ ▐░▌▐░▌▐░▌          ▐░▌       ▐░▌          ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌               ▐░▌               ▐░▌
//  ▐░▌░▌   ▐░▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌      ▄▄▄▄▄▄▄▄▄█░▌
//  ▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
//   ▀▀       ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀    ▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀ 




                                                                   

 var wock=(function() {
 var is_init=false;
 var handef;


 function Init () { var i,obj;
 if(is_init==true) { return; }
 handef=new HandleDefine("wock",32,false);
 is_init=true;
 }


 Init();


 function Call (url) { var s,h,obj;
 for(s=0;s<handef.slots;s++)
  {
  obj=handef.array[s];
  if(obj.in_use!=false) { continue; }
  obj.u.stage=0;
  obj.u.ms_start=timer.MsRunning();
  obj.u.rcve_que_handle=que.Create();
  obj.u.xmit_que_handle=que.Create();
  obj.u.url=url;
  obj.u.is_open=false;
  obj.u.is_closed=false;
  obj.u.socket=new WebSocket(obj.u.url);
  obj.u.socket.binaryType='arraybuffer';
  obj.u.socket.onopen=function()  {  obj.u.is_open=true;   }
  obj.u.socket.onclose=function() {  obj.u.is_closed=true; }
  obj.u.socket.onmessage=function(data)   {   que.Write(obj.u.rcve_que_handle,data.data);   }
  h=HandleAdd(handef,s)
  return h;
  }
 return 0;
 }




 function Destroy (handle) { var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 que.Destroy(obj.u.xmit_que_handle);
 obj.u.xmit_que_handle=0;
 que.Destroy(obj.u.rcve_que_handle);
 obj.u.rcve_que_handle=0;
 obj.u.socket=null;
 HandleRemove(handef,handle);
 return true;
 }




 function Write (handle,msg) { var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 que.Write(obj.u.xmit_que_handle,msg);
 return true;
 }



 function Peek (handle,ofs) { var msg,obj;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 msg=que.Peek(obj.u.rcve_que_handle,ofs);
 return msg;
 }



 function Read (handle) { var msg,obj;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 msg=que.Read(obj.u.rcve_que_handle);
 return msg;
 }




 function Discard (handle) { var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 return(que.Discard(obj.u.rcve_que_handle));
 }



 function Process (handle) { var obj,info;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 info=wock.Status(handle);
 if(info.xmit_que_status.msgs_qued>0)
  {
  msg=que.Read(obj.u.xmit_que_handle);
  obj.u.socket.send(msg);
  }
 return true;
 }




 function Status (handle) { var obj,info;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 info={};
 info.url=obj.u.url;
 info.is_open=obj.u.is_open;
 info.is_closed=obj.u.is_closed;
 info.rcve_que_status=que.Status(obj.u.rcve_que_handle);
 info.xmit_que_status=que.Status(obj.u.xmit_que_handle);
 return info;
 }





 function Yield ()  { var go,h;
 if(handef.count==0) { return false; }
 for(go=0;go<handef.slots;go++)
  {
  if((h=HandleNext(handef))==0) { continue; }
  wock.Process(h);
  wock.Status(h);
  return true;
  }
 return false;
 }




 return{
 is_init:is_init,
 handef:handef,
 Call:Call,
 Destroy:Destroy,
 Write:Write,
 Peek:Peek,
 Read:Read,
 Discard:Discard,
 Process:Process,
 Status:Status,
 Yield:Yield
 }


})();

















//   ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄               ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌             ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀  ▐░▌           ▐░▌  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
//  ▐░▌       ▐░▌▐░▌            ▐░▌         ▐░▌       ▐░▌     ▐░▌          ▐░▌          ▐░▌          
//  ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄    ▐░▌       ▐░▌        ▐░▌     ▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌    ▐░▌     ▐░▌         ▐░▌     ▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//  ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌   ▐░▌          ▐░▌     ▐░▌          ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀█░▌
//  ▐░▌       ▐░▌▐░▌                ▐░▌ ▐░▌           ▐░▌     ▐░▌          ▐░▌                    ▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄        ▐░▐░▌        ▄▄▄▄█░█▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄█░▌
//  ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌        ▐░▌        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
//   ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀          ▀          ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 



 var devices=(function() {
 var is_init=false;
 var state={};



 function Init () { var i,obj;
 if(is_init==true) { return; }
 state={};
 state.is_detecting=false;
 state.is_detected=false;
 state.is_updated=false;
 state.channel_handef=new HandleDefine("channel",max_windows,false);
 is_init=true;
 }



 Init();





 function Detect () {
 if(devices.state.is_detecting!=false) { return false; }
 if(devices.state.is_detected!=false)  { return false; }
 //devices.state={};
 devices.state.is_good=null;
 devices.state.is_error=null;
 devices.state.error_name=null;
 devices.state.error_message=null;
 devices.state.time=Date.now();
 devices.state.elapsed=0;
 devices.state.audio_inp_count=0;
 devices.state.video_inp_count=0;
 devices.state.audio_out_count=0;
 devices.state.video_out_count=0;
 devices.state.audio_inp_idxoff=0;
 devices.state.video_inp_idxoff=0;
 devices.state.audio_out_idxoff=0;
 devices.state.video_out_idxoff=0;
 devices.state.device_array=[];
 devices.state.stage="device_detect_baseline";
 devices.state.is_detecting=true;
 devices.state.is_detected=false;
 devices.state.is_updated=false;
 navigator.mediaDevices.ondevicechange=function(event)
  {
  devices.state.is_updated=true;
  }
 return true;
 }






 function Yield () {  var i,j,avc,elm,dev;
 if(devices.state.is_detecting!=true) { return false; }
 switch(devices.state.stage)
  {
  case "device_detect_baseline":
  navigator.mediaDevices.getUserMedia(bl_constraints)
  .then((stream)=>
   {
   stream.getTracks().forEach(function(track) {  track.stop();  });
   devices.state.elapsed=(Date.now()-devices.state.time);
   devices.state.error_name=null;
   devices.state.error_message=null;
   devices.state.is_good=true;
   devices.state.is_error=false;
   })
  .catch(function(error)
   {
   if((error.name=='NotAllowedError')||(error.name=='PermissionDismissedError'))    {      }
   devices.state.is_error=true;
   devices.state.error_name=error.name;
   devices.state.error_message=error.message;
   devices.state.elapsed=(Date.now()-devices.state.time);
   devices.state.is_good=false;
   });
  devices.state.stage="device_detect_baseline_wait";
  break;


  case "device_detect_baseline_fail":
  break;


  case "device_detect_baseline_wait":
  if(devices.state.is_good==true)  { devices.state.stage="device_gather"; break; }
  if(devices.state.is_error==true) { devices.state.stage="device_detect_baseline_fail"; break; }
  break;


  case "device_gather":
  navigator.mediaDevices.enumerateDevices().then(function(devs)
   {
   devs.forEach(function(device)
    {
    while(1)
     {
     if(device.kind=="audioinput")      {
      if(devices.state.audio_inp_count==0) { devices.state.audio_inp_idxoff=devices.state.device_array.length; }
      devices.state.audio_inp_count++;
      break;
      }
     if(device.kind=="videoinput")      {
      if(devices.state.video_inp_count==0) { devices.state.video_inp_idxoff=devices.state.device_array.length; }
      devices.state.video_inp_count++;
      break;
      }
     if(device.kind=="audiooutput")      {
      if(devices.state.audio_out_count==0) { devices.state.audio_out_idxoff=devices.state.device_array.length; }
      devices.state.audio_out_count++;
      break;
      }
     if(device.kind=="videooutput")      {
      if(devices.state.video_out_count==0) { devices.state.video_out_idxoff=devices.state.device_array.length; }
      devices.state.video_out_count++;
      break;
      }
     break;
     }
    devices.state.device_array.push(device);
    })
   })
  .catch(function(err)
   {
   hud.Log("eee="+err.name + ": " + err.message);
   devices.state.stage="device_gather_fail";
   })
  .finally(function()
   {
   devices.state.stage="device_gather_success";
   });
  devices.state.stage="device_gather_wait";
  break;

  case "device_gather_wait":
  break;

  case "device_gather_fail":
  break;

  case "device_gather_success":
  devices.state.is_detecting=false;
  devices.state.is_detected=true;
  devices.state.stage="device_gather_finished";
  break;

  case "device_gather_finished":
  break;
  }
 return true;
 }









 function VideoConfig (dix) { var conf={};
 if(devices.state.is_detecting==true) { return null; }
 if(devices.state.is_detected!=true) { return null; }
 if(dix<0||dix>=devices.state.video_inp_count) { return null; }
 dix=devices.state.video_inp_idxoff+dix;
 conf.type="video";
 conf.video={};
 conf.video.frameRate=30;
 conf.video.width={};
 conf.video.width.min=160;
 conf.video.width.ideal=320;
 conf.video.width.max=640;
 conf.video.height={};
 conf.video.height.min=160;
 conf.video.height.ideal=320;
 conf.video.height.max=640;
 conf.video.deviceId={};
 conf.video.deviceId.exact=devices.state.device_array[dix].deviceId;
 //console.log(JSON.stringify(conf,0,2));
 return conf;
 }




 function AudioConfig (dix) { var conf={};
 if(devices.state.is_detecting==true) { return null; }
 if(devices.state.is_detected!=true) { return null; }
 if(dix<0||dix>=devices.state.audio_inp_count) { return null; }
 dix=devices.state.audio_inp_idxoff+dix;
 conf.type="audio";
 conf.audio={};
 conf.audio.deviceId={};
 conf.audio.deviceId.exact=devices.state.device_array[dix].deviceId;
 return conf;
 }





 function CanvasConfig (han) { var conf={};
 if(devices.state.is_detecting==true) { return null; }
 if(devices.state.is_detected!=true) { return null; }
 conf.type="canvas";
 conf.canvas={};
 conf.canvas_handle=han;
 return conf;
 }




 function ChannelCreate () { var i,obj,dev;  var xx,yy,ww,hh,xa,ya,gh;
 if((i=HandleSlotUnused(state.channel_handef))<0) {  return 0; }
 if((obj=HandleAddCheck(state.channel_handef,i))==null) { alert("crea"); return 0; }
 obj.u={};
 obj.u.stage=0;
 obj.u.attachment_count=0;
 obj.u.attachment_success=0;
 obj.u.attach_array=[];
 obj.u.combined_stream=null;
 obj.u.is_connect=false;
 for(j=0;j<10;j++)
  {
  dev={};
  dev.in_use=false;
  dev.index=j;
  dev.stream=null;
  dev.type=null;
  dev.avc={};
  obj.u.attach_array[j]=dev;
  }
 obj.u.config=pc_configurate;
 obj.u.constraints=pc_constraints;
 obj.u.negotiation_needed=false;
 obj.u.role=null;
 obj.u.loc_offer_desc=null;
 obj.u.loc_answer_desc=null;
 obj.u.rem_offer_desc=null;
 obj.u.rem_answer_desc=null;
 //obj.u.bundle_index=obj.self_index;
 obj.u.pc={};
 try
  {
  obj.u.pc=new RTCPeerConnection(obj.u.config,obj.u.constraints);
  obj.u.pc.onconnectionstatechange=function(e)    { ChannelOn(obj.self_handle,"onconnectionstatechange",e);   };
  obj.u.pc.onicecandidate=function(e)             { ChannelOn(obj.self_handle,"onicecandidate",e);   };
  obj.u.pc.oniceconnectionstatechange=function(e) { ChannelOn(obj.self_handle,"oniceconnectionstatechange",e);   };
  obj.u.pc.onicegatheringstatechange=function(e)  { ChannelOn(obj.self_handle,"onicegatheringstatechange",e);   };
  obj.u.pc.onsignalingstatechange=function(e)     { ChannelOn(obj.self_handle,"onsignalingstatechange",e);   };
  obj.u.pc.onnegotiationneeded=function(e)        { ChannelOn(obj.self_handle,"onnegotiationneeded",e);   };
  obj.u.pc.ontrack=function(e)                    { ChannelOn(obj.self_handle,"ontrack",e);   };
  obj.u.pc.onaddstream=function(e)                { ChannelOn(obj.self_handle,"onaddstream",e);   };
  obj.u.pc.onremovestream=function(e)             { ChannelOn(obj.self_handle,"onremovestream",e);   };
  }
 catch(e)  {  alert('RTCPeerConnection object. exception: '+e.message+' loc_stream='+call.loc_stream);  return;   }
 h=obj.self_handle;
 return h;
 }




 function ChannelDestroy (handle) { var obj;
 if((obj=HandleCheck(state.channel_handef,handle))==null) { return false; }
 alert("device destroy todo");
 if((HandleRemove(state.channel_handef,handle))!=true) { oof(""); return false; }
 return true;
 }




 function ChannelGet (handle) {
 return(HandleCheck(state.channel_handef,handle));
 }




 function ChannelByIndexGet (index) { var h;
 if((h=HandleGet(state.channel_handef,index))<=0) { return null; }
 return(HandleCheck(state.channel_handef,h));
 }





 function ChannelAttach (handle,config) { var obj,dev,i; var can,gbj,elm;
 if((obj=HandleCheck(state.channel_handef,handle))==null) { return false; }
 for(i=0;i<10;i++)
  {
  dev=obj.u.attach_array[i];
  if(dev.in_use==false) { break; }
  }
 if(i==10) { alert("attach6"); }
 dev.in_use=true;
 dev.index=i;
 dev.avc={};
 dev.stream=null;
 dev.type=config.type;
 Object.assign(dev.avc,config);
 obj.u.attach_array[i]=dev;
 obj.u.attachment_count++;
 if(dev.type=="video")
  {
  navigator.mediaDevices.getUserMedia(dev.avc).then(function(stream)
   {
   dev.stream=stream;
   obj.u.attach_array[i]=dev;
   obj.u.attachment_success++;
   })
  .catch(function(error)   { hud.Log(error); });
  }
 else
 if(dev.type=="audio")
  {
  navigator.mediaDevices.getUserMedia(dev.avc).then(function(stream)
   {
   dev.stream=stream;
   obj.u.attach_array[i]=dev;
   obj.u.attachment_success++;
   })
  .catch(function(error)   { hud.Log(error); });
  }
 else
 if(dev.type=="canvas")
  {
  can=gui.Get(config.canvas_handle);
  elm=document.getElementById(can.u.id);
  dev.stream=elm.captureStream(30);
  obj.u.attach_array[i]=dev;
  obj.u.attachment_success++;
  }
 return true;
 }




 function ChannelCombine (handle) { var obj,i,j;
 if((obj=HandleCheck(state.channel_handef,handle))==null)       { return false; }
 if(obj.u.attachment_success!=obj.u.attachment_count) { return false; }
 if(obj.u.attachment_count==0)                      { return false; }
 if(obj.u.combined_stream!=null)                    { return true; }
 obj.u.combined_stream=new MediaStream();
 j=0;
 for(i=0;i<obj.u.attachment_count;i++)
  {
  dev=obj.u.attach_array[i];
  if(dev.stream==null) { continue; }
  j++;
  obj.u.combined_stream.addTrack(dev.stream.getTracks()[0]);
  }
 if(i!=j) { oof(""); }
 return true;
 }




 function ChannelConnect (handle) { var obj;
 if((obj=devices.ChannelGet(handle))==null) { return false; }
 if(obj.u.combined_stream==undefined||obj.u.combined_stream==null) { return false; }
 if(obj.u.is_connect!=false) { return false; }
 obj.u.is_connect=true;
 obj.u.combined_stream.getTracks().forEach(function(track)
  {
  obj.u.pc.addTrack(track,obj.u.combined_stream);
  });
 return true;
 }





 function ChannelRoleSet (handle,role) { var obj;
 if((obj=devices.ChannelGet(handle))==null) { return false; }
 if(obj.u.role!=null) { return false; }
 obj.u.role=role;
 return true;
 }





 function ChannelCreateOffer (handle) { var obj;
 if((obj=devices.ChannelGet(handle))==null) { return false; }
 if(ObjectIsEmpty(obj.u.pc)==false) { oof(""); }
 if(obj.u.combined_stream==undefined||obj.u.combined_stream==null) { return false; }
 if(obj.u.loc_offer_desc!=null) { return false; }
 obj.u.loc_offer_desc=null;
 obj.u.pc.createOffer()
 .then((offer)=>
  {
  obj.u.pc.setLocalDescription(offer);
  obj.u.loc_offer_desc=offer;
  })
 .catch((error)=>
  {
  obj.u.loc_offer_desc=-1;
  });
 return true;
 }




 function ChannelCreateAnswer (handle) { var obj;
 if((obj=devices.ChannelGet(handle))==null) { return false; }
 if(ObjectIsEmpty(obj.u.pc)==false) { oof(""); }
 if(obj.u.combined_stream==undefined||obj.u.combined_stream==null) { return false; }
 if(obj.u.loc_answer_desc!=null) { return false; }
 obj.u.loc_answer_desc=null;
 obj.u.pc.createAnswer()
 .then((answer)=>
  {
  obj.u.pc.setLocalDescription(answer);
  obj.u.loc_answer_desc=answer;
  })
 .catch((error)=>
  {
  obj.u.loc_answer_desc=-1;
  });
 return true;
 }






 function ChannelOn (handle,msg,data) { var obj,msg,ok;
 if((obj=HandleCheck(state.channel_handef,handle))==null) { oof(""); return; }
 ok=false;
 switch(msg)
  {
  case "onconnectionstatechange":
  break;

  case "onicecandidate":
  break;

  case "oniceconnectionstatechange":
  break;

  case "onicegatheringstatechange":
  break;

  case "onsignalingstatechange":
  break;

  case "onnegotiationneeded":
  obj.u.negotiation_needed=true;
  ok=true;
  break;

  case "ontrack":
  break;

  case "onaddstream":
  break;

  case "onremovestream":
  break;
  }

 if(ok==true) { return; }
 Logger("on "+msg);
 }






 function ChannelNext () { var go,obj;
 if(state.channel_handef.count==0) { return null; }
 for(go=0;go<state.channel_handef.slots;go++)
  {
  if((obj=HandleNextCheck(state.channel_handef))!=null) { break; }
  }
 if(go==state.channel_handef.slots) { return null; }
 return obj;
 }










 return{
 is_init:is_init,
 state:state,
 Detect:Detect,
 Yield:Yield,
 VideoConfig:VideoConfig,
 AudioConfig:AudioConfig,
 CanvasConfig:CanvasConfig,
 ChannelCreate:ChannelCreate,
 ChannelDestroy:ChannelDestroy,
 ChannelNext:ChannelNext,
 ChannelGet:ChannelGet,
 ChannelByIndexGet:ChannelByIndexGet,
 ChannelAttach:ChannelAttach,
 ChannelCombine:ChannelCombine,
 ChannelConnect:ChannelConnect,
 ChannelRoleSet:ChannelRoleSet,
 ChannelCreateOffer:ChannelCreateOffer,
 ChannelCreateAnswer:ChannelCreateAnswer,
 }


})();








//   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄ 
//  ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌
//  ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌   ▐░▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌▐░▌ ▐░▌▐░▌
//  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌ ▐░▐░▌ ▐░▌
//  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌
//  ▐░█▀▀▀▀█░█▀▀ ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌   ▀   ▐░▌
//  ▐░▌     ▐░▌  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌
//  ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌
//   ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀ 
//                                                      





 var room=(function() {
 var is_init=false;
 var handef;


 function Init () { var i,obj;
 if(is_init==true) { return; }
 handef=new HandleDefine("room",32,false);
 is_init=true;
 }


 Init();


 function Create (name,maxpeers) { var s,h,obj,peer,i;
 for(s=0;s<handef.slots;s++)
  {
  obj=handef.array[s];
  if(obj.in_use!=false) { continue; }
  obj.u={};
  obj.u.name=name;
  obj.u.my_uuid=null;
  obj.u.my_hancock=null;
  obj.u.peer_slots=maxpeers;
  obj.u.peer_count=0;
  obj.u.peer_pf=0;
  obj.u.peer_array=[];
  for(i=0;i<obj.u.peer_slots;i++)
   {
   peer={};
   peer.in_use=false;
   peer.self_index=i;
   peer.phaze=0;
   peer.uuid=null;
   peer.hancock=null;
   peer.id_dif=0;
   obj.u.peer_array[i]=peer;
   }
  h=HandleAdd(handef,s)
  return h;
  }
 return 0;
 }




 function Destroy (handle) { var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 HandleRemove(handef,handle);
 return true;
 }



 function Get (handle) { 
 return(HandleCheck(handef,handle));
 }



 function MySet (handle,uuid,hancock) { var obj;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 obj.u.my_uuid=uuid;
 obj.u.my_hancock=hancock;
 return true;
 }



 function PeerByIndexGet (handle,index) { var obj,peer;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 if(index<0||index>=obj.u.peer_slots) { return null; } 
 peer=obj.u.peer_array[index];
 return peer;
 }






 function PeerFind (handle,uuid) {  var obj,i,peer;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 for(i=0;i<obj.u.peer_slots;i++) 
  {
  peer=obj.u.peer_array[i];
  if(peer.in_use==false) { continue; } 
  if(peer.uuid!=uuid) { continue; }
  return peer;
  }
 return null;
 }



 function PeerAdd (handle,uuid,hancock) { var obj,i,peer;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 for(i=0;i<obj.u.peer_slots;i++) 
  {
  peer=obj.u.peer_array[i];
  if(peer.in_use!=false) { continue; } 
  peer={};
  peer.in_use=true;
  peer.self_index=i;
  peer.phaze=0;
  peer.uuid=uuid;
  peer.hancock=hancock;
  peer.id_dif=peer.uuid.localeCompare(obj.u.my_uuid);
  obj.u.peer_array[i]=peer;
  obj.u.peer_count++;
  return peer;
  }
 return null;
 }


 function PeerRemove (handle,uuid) { var obj,i,peer;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 for(i=0;i<obj.u.peer_slots;i++) 
  {
  peer=obj.u.peer_array[i];
  if(peer.in_use!=true) { continue; } 
  if(peer.uuid!=uuid) { continue; } 
  peer.in_use=false;
  peer.self_index=i;
  peer.phaze=0;
  peer.uuid=null;
  peer.hancock=null;
  obj.u.peer_array[i]=peer;
  obj.u.peer_count--;
  return true;
  }
 return false;
 }


 

 function PeerNext (handle) { var go,obj,peer;
 if((obj=HandleCheck(handef,handle))==null) { return null; }
 if(obj.u.peer_count==0) { return null; } 
 for(go=0;go<obj.u.peer_slots;go++)
  {
  obj.u.peer_pf++;
  if(obj.u.peer_pf>=obj.u.peer_slots) { obj.u.peer_pf=0; } 
  peer=obj.u.peer_array[obj.u.peer_pf];
  if(peer.in_use!=true) { continue; } 
  return peer;
  }
 return null;
 }





 function Process (handle) { var obj,info;
 if((obj=HandleCheck(handef,handle))==null) { return false; }
 return true;
 }





 function Yield ()  { var go,h;
 if(handef.count==0) { return false; }
 for(go=0;go<handef.slots;go++)
  {
  if((h=HandleNext(handef))==0) { continue; }
  return true;
  }
 return false;
 }




 return{
 is_init:is_init,
 handef:handef,
 Create:Create,
 Destroy:Destroy,
 Get:Get,
 MySet:MySet,
 PeerByIndexGet:PeerByIndexGet,
 PeerFind:PeerFind,
 PeerAdd:PeerAdd,
 PeerRemove:PeerRemove,
 PeerNext:PeerNext,
 Process:Process,
 Yield:Yield
 }


})();














//   ▄    ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄  
//  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ 
//  ▐░▌ ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌
//  ▐░▌▐░▌  ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌
//  ▐░▌░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌
//  ▐░░▌    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌
//  ▐░▌░▌   ▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀█░█▀▀ ▐░▌       ▐░▌
//  ▐░▌▐░▌  ▐░▌               ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌     ▐░▌  ▐░▌       ▐░▌
//  ▐░▌ ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄█░▌
//  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░▌ 
//   ▀    ▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀  






 var keyboard=(function() {
 var is_init=false;
 var hit_map=[];

 function Init () { var i;
 if(is_init==true) { return; }
 for(i=0;i<256;i++) { hit_map[i]=0; }
 is_init=true;
 }


 Init();






 
 function Start () {  
 document.addEventListener('keyup',function(event) { 
 OnEvent("keyup",event);
 });
 document.addEventListener('keydown',function(event) { 
 OnEvent("keydown",event);
 });
 document.addEventListener('keypress',function(event) { 
 OnEvent("keypress",event);
 });
 }




 function Stop () { 
 }





 function OnEvent (name,ev) { var key;
 if(ev.defaultPrevented) { return;  }
 key=ev.keyCode||ev.key;
 if(isNaN(key))  {  oof();  }
 while(1)
  {
  if(key==8)            { break; }  // backspace
  if(key==9)            { break; }  // tab
  if(key==13)           { break; }  // enter
  if(key==16)           { break; }  // shift
  if(key==17)           { break; }  // ctrl
  if(key==18)           { break; }  // alt
  if(key==19)           { break; }  // pause
  if(key==27)           { break; }  // esc
  if(key==32)           { break; }  // space
  if(key==33)           { break; }  // pgup
  if(key==34)           { break; }  // pgdown
  if(key==35)           { break; }  // end
  if(key==36)           { break; }  // home
  if(key==44)           { break; }  // printscr
  if(key==45)           { break; }  // insert
  if(key==46)           { break; }  // delete
  if(key>=48&&key<=57)  { break; }  // digits
  if(key>=65&&key<=90)  { break; }  // upper case
  if(key>=97&&key<=122) { break; }  // lower case
  Logger(key+" "+name) 
  break;
  }
 if(name=="keydown")
  {
  hit_map[key]=1;
  }
 else
 if(name=="keyup")
  {
  hit_map[key]=0;
  }
 else
 if(name=="keypress")
  {

  }
 }




 return{
 is_init:is_init,
 hit_map:hit_map,
 Start:Start,
 Stop:Stop,
 }


})();














//   ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄ 
//  ▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌
//  ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌
//  ▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌▐░▌    ▐░▌
//  ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌ ▐░▌   ▐░▌
//  ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░▌  ▐░▌  ▐░▌
//  ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░▌   ▐░▌ ▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌    ▐░▌▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌ ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌
//  ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌
//   ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀ 
                                                      





 var main=(function() {
 var is_init=false;
 var state={};
 var vars={};



 function Init () {
 if(is_init==true) { return; }
 state.is_running=false;
 state.version=0;
 state.speed=0;
 state.funcProc=null;
 state.thread_id=0;
 state.worker_array=[];
 vars={};
 vars.u={};
 is_init=true;
 }


 Init();


 function Start (ver,spd,proc,dorun) { var work;
 if(main.state.is_running!=false) { return false; }
 main.state.version=ver;
 main.vars={};
 main.vars.cycle=-1;
 main.state.thread_id=0;
 main.state.speed=spd;
 main.state.funcProc=proc;
 main.state.is_running=true;
 main.vars.stage=0;
 WorkerAdd(wock.Yield,19);
 WorkerAdd(env.Yield,19);
 WorkerAdd(devices.Yield,19);
 if(dorun==true) { Run(); }
 return true;
 }



 function WorkerAdd (proc,step) { var work;
 if(arguments.length!=2)  alert("workeradd 2 arguments, not "+arguments.length);
 work={};
 work.proc=proc;
 work.step=step;
 main.state.worker_array.push(work);
 return true;
 }



 function Clear () {
 clearTimeout(main.state.thread_id);
 main.state.thread_id=0;
 return true;
 }



 function Run () { var i; var work;
 main.vars.cycle++;
 if(main.state.worker_array.length>=1)
  {
  for(i=0;i<main.state.worker_array.length;i++)
   {
   work=main.state.worker_array[i];
   if(work.proc==undefined||work.proc==null) { continue; }
   if(work.step<1) { continue; }
   if(((main.vars.cycle%work.step)==(work.step-1))||(main.vars.cycle==1)) {   work.proc(); }
   }
  }
 main.state.thread_id=window.setTimeout(function()
  {
  main.Clear();
  main.state.funcProc();
  main.Run();
  },main.state.speed);
 return true;
 }




 function StageSet (stage) {
 main.vars.stage=stage;
 }




 return{
 is_init:is_init,
 state:state,
 vars:vars,
 Start:Start,
 WorkerAdd:WorkerAdd,
 Run:Run,
 Clear:Clear,
 StageSet:StageSet,
 };


})();








