
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

