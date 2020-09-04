
 const max_windows=16;

 var handle_base=1000000;
 var handef_array=[];

 navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||window.RTCPeerConnection;

 const detect_constraints=window.constraints={audio:true,video:true};
 var pc_configurate={'iceServers':[{'urls':'stun:mebeam.com:3478'}]};
 var pc_constraints={'optional':  [{'DtlsSrtpKeyAgreement':true}]};




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




 function ObjectIsEmpty(obj) { var key;
 for(key in obj){ if(obj.hasOwnProperty(key)) { return false; } }
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
  if(ify==true)   {   hud.Log(num.Pad(num.Fixed(timer.TikNow(true),2),10,'0')+": "+JSON.stringify(msg,0,2))   }
  else            {   hud.Log(num.Pad(num.Fixed(timer.TikNow(true),2),10,'0')+": "+msg)   }
  }
 }




 function HandleDefine (type,slots,useall) { var i,obj;
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





 function HandleCheck (handef,handle) { var obj;
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





