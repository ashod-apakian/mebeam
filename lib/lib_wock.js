
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

