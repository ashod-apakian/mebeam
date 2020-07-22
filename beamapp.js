/* MeBeam, by Ashod Apakian */


 function mbMsgSendHello               ()
 {
 var obj;

 obj={"cmd":"hello"};
 wockCallWrite(mb.wock_idx,JSON.stringify(obj));
 }





 function mbMsgRcveWelcome             (obj)
 {
 var p,ci,call,dind;

 mbLog("i am  "+obj.hancock+"   "+obj.uuid);
 mb.my_room=obj.room;
 mb.my_uuid=obj.uuid;
 mb.my_hancock=obj.hancock;
 for(p=0;p<obj.peerCount;p++)
  {
  if(obj.peerList[p].uuid==mb.my_uuid) { continue; }
  ci=mbCallCreate();
  call=mbCallGet(ci,0);
  call.room=obj.room;
  call.uuid=obj.peerList[p].uuid;
  call.hancock=obj.peerList[p].hancock;
  call.id_dif=call.uuid.localeCompare(mb.my_uuid);
  mbLog("welcome has peer "+obj.peerList[p].hancock+"  "+obj.peerList[p].uuid+"   "+call.id_dif);
  dind=viewWindGet(call.self_index+1,0);
  dind.loc_stream.getTracks().forEach(function(track)    {       call.pc.addTrack(track,dind.loc_stream);       });
  }
 return true;
 }



 function mbMsgRcveUserJoined          (obj)
 {
 var ci,call,dind;

 call=mbCallFind(obj.room,obj.uuid);
 if(call!=null) { alert("call exists"); }
 ci=mbCallCreate();
 call=mbCallGet(ci,0);
 call.room=obj.room;
 call.uuid=obj.uuid;
 call.hancock=obj.hancock;
 call.id_dif=call.uuid.localeCompare(mb.my_uuid);
 mbLog("userjoined "+call.hancock+"  "+call.uuid+"  "+call.id_dif);
 dind=viewWindGet(call.self_index+1,0);
 dind.loc_stream.getTracks().forEach(function(track)    {       call.pc.addTrack(track,dind.loc_stream);       });
 }



 function mbMsgRcveUserLeft            (obj)
 {
 var ci,call,dind,ss;

 call=mbCallFind(obj.room,obj.uuid);
 if(call==null) {  mbLog("!!!!!!!!!!user left not found a "+obj.hancock); return; }
  mbLog("userleft "+call.hancock);
 dind=viewWindGet(call.self_index+1,0);
 if(dind!=null)
  {
  ss=call.pc.getSenders();
  ss.forEach((sender)=>call.pc.removeTrack(sender));
  dind.dom.srcObject=null;
  dind.loc_stream.getTracks().forEach(function(track)    {       call.pc.addTrack(track,dind.loc_stream);       });
  }
 mbCallDestroy(call.self_index);
 }



 function mbMsgRcveIceOffer            (obj)
 {
 var ci,call;

 call=mbCallFind(obj.room,obj.uuid);
 if(call==null) { alert("call not exists b"); }
 if(call.stage!=600) { return; }//alert("Wrong stage on ice offer "+call.stage); }
 mbLog("got ice offer ");//"+JSON.stringify(obj,0,2));
 call.offer_desc=new RTCSessionDescription(obj.data);
 call.pc.setRemoteDescription(call.offer_desc);
 call.stage=650;
 }



 function mbMsgRcveIceAnswer           (obj)
 {
 var ci,call;
 mbLog("got ice abswer");
 call=mbCallFind(obj.room,obj.uuid);
 if(call==null) { alert("call not exists c"); }
 if(call.stage!=340&&call.stage!=360) { return; }
 call.answer_desc=new RTCSessionDescription(obj.data);
 call.pc.setRemoteDescription(call.answer_desc);
 call.stage=800;
 }



 function mbMsgRcveIceCandidate        (obj)
 {
 var ci,call,candi;

 call=mbCallFind(obj.room,obj.uuid);
 if(call==null) { alert("call not exists d"); }
 candi=new RTCIceCandidate({sdpMLineIndex:obj.data.label,candidate:obj.data.candidate});
 call.pc.addIceCandidate(candi)
 .then((stream)=>
  {
  //mbLog("addic ok");
  })
 .catch((err)=>
  {
  mbLog("addic err "+err.name);
  });
/// mbLog("got "+JSON.stringify(obj,0,2));
 }


/*-----------------------------------------------------------------------*/






 function mbMsgIceCandidatePop         (ci)
 {
 var call,candi,data,ctype,obj;

 call=mb.call_array[ci];
 if(call.loc_ice_candidate.length<=0) { return false; }
 candi=call.loc_ice_candidate.shift();
 ctype=candi.candidate.split(" ")[7];
 data={type:'candidate',label:candi.sdpMLineIndex,id:candi.sdpMid,candidate:candi.candidate};
 obj={"cmd":"myIceCandidate","uuid":call.uuid,"data":data};
 wockCallWrite(mb.wock_idx,JSON.stringify(obj));
 return true;
 }





 function mbProcessCalls               ()
 {
 var call,obj,el;
 var wi,wind,dind;
 var candi,ctype,data;

 if((call=mbCallIterator())==null) { return; }
 switch(call.stage)
  {
  case 0:
  if(call.id_dif<0) { call.stage=300; }
  else              { call.stage=600; }
  break;

  case 300:
  mbCallCreateOffer(call.self_index);
  call.stage=320;
  break;

  case 320:
  if(call.offer_desc==null||call.offer_desc==-1) { break; }
  call.pc.setLocalDescription(call.offer_desc);
  //sdpLog(call.offer_desc);
   call.offer_desc.sdp=sdpCodecOrderSet(call.offer_desc.sdp,"video");
   call.offer_desc.sdp=sdpBitRatesSet(call.offer_desc.sdp,1256,64);
  call.offer_attempt=0;
  call.offer_ms=msRunning();
  call.answer_timeout=500;
  call.stage=360;
  break;

  case 340:
  obj={"cmd":"myIceOffer","uuid":call.uuid,"data":call.offer_desc};
  wockCallWrite(mb.wock_idx,JSON.stringify(obj));
  //mbLog("send my iceoffer");
  call.offer_attempt++;
  call.offer_ms=msRunning();
  call.answer_timeout+=200;
  call.stage=360;
  break;


  case 360:
  el=msRunning()-call.offer_ms;
  if(el<call.answer_timeout) { break; }
  call.stage=340;
  break;


  case 600:
  break;




  case 650:
  mbCallCreateAnswer(call.self_index);
  call.stage=700;
  break;




  case 700:
  if(call.answer_desc==null||call.answer_desc==-1) { break; }
  call.pc.setLocalDescription(call.answer_desc);
  //sdpLog(call.answer_desc);
   call.answer_desc.sdp=sdpCodecOrderSet(call.answer_desc.sdp,"video");
   call.answer_desc.sdp=sdpBitRatesSet(call.answer_desc.sdp,256,64);
  obj={"cmd":"myIceAnswer","uuid":call.uuid,"data":call.answer_desc};
  wockCallWrite(mb.wock_idx,JSON.stringify(obj));
  mbLog("sent my ice answer");
  call.stage=750;
  break;




  case 750:
  call.stage=800;
  break;



  case 800:
  while(1)   {   if(mbMsgIceCandidatePop(call.self_index)==false) { break; }   }
  wind=viewWindGet(0,0);
  wind.loc_stream.getTracks().forEach(function(track)    {    call.pc.addTrack(track,wind.loc_stream);      mbLog("call "+call.self_index+" added"); });
  call.stage=850;
  break;


  case 850:
  if(call.rem_stream==0) { break; }
  dind=viewWindGet(call.self_index+1,0);
  dind.rem_stream=call.rem_stream;
  dind.dom.srcObject=dind.rem_stream;
  call.stage=870;
  break;

  case 870:
  if(call.is_connected!=true) { break; }
  call.stage=1000;
  break;

  case 1000:
  while(1)   {   if(mbMsgIceCandidatePop(call.self_index)==false) { break; }   }
  if(call.is_eoc!=true) { break; }
  mbLog("call "+call.hancock+" connected properly");
  call.stage=1100;
  break;

  case 1100:
  break;
  }
 }








 function updateView                   ()
 {
 var disp,land,x,y,w,h,sx,wi,wind,dom;
 var sdw,sdh;

 mobileZoomOut(1,200,200,"no");
 disp=displayGet();
 if(disp.scr_wid>disp.scr_hit) { land=true;  }
 else                          { land=false; }
 x=1;
 y=0;
 w=disp.win_wid;
 h=disp.win_hit;
 h=parseInt(h)-30;
 sdh=parseInt(h);
 y=parseInt(y)+7;
 if(land==true)
  {
  if(view.uvars.side_state==true) { w=parseInt(w)-240; }
  w/=3;
  h/=2;
  w=parseInt(w)-7;
  if(view.uvars.side_state==true) { x=parseInt(x)+240; }
  sdw=parseInt(x);
  }
 else
  {
  if(view.uvars.side_state==true) { w=parseInt(w)-240; }
  w/=2;
  h/=3;
  h=parseInt(h)-7;
  if(view.uvars.side_state==true) { x=parseInt(x)+240; }
  sdw=parseInt(x);
  }

 w=numFixed(w,0);
 h=numFixed(h,0);
 sx=x;
 for(j=0;j<6;j++)
  {
  wi=j;
  wind=viewWindGet(wi,0);
  guiDomAreaSet(wind.dom,"ltwh",x+"px",y+"px",w+"px",h+"px");
  x+=parseInt(w);
  if(land==true&&((j%3)==2)) { x=sx; y+=parseInt(h); }   else
  if(land==false&&((j%2)==1)) { x=sx; y+=parseInt(h); }
  }

 if(view.uvars.side_state==true)
  {
  dom=guiDomByIdGet("sidediv");
  guiDomAreaSet(dom,"ltwh","0px","0px",sdw+"px",sdh+"px");
  dom.style.borderRight="1px solid red";
  dom.style.opacity=0.4;
  guiDomByIdGet("sidebutton").style.left=(sdw+10)+"px";
  }
 else
  {
  dom=guiDomByIdGet("sidediv");
  guiDomAreaSet(dom,"ltwh","0px","0px","0px","0px");
  guiDomByIdGet("sidebutton").style.left="5px";
  }
  guiDomByIdGet("sidebutton").style.width="25px";



 }







 window.addEventListener('orientationchange',function()
 {
 var afterOrientationChange=function()
  {
  if(main.stage>0)  {   updateView();   }
  window.removeEventListener('resize',afterOrientationChange);
  };
 window.addEventListener('resize',afterOrientationChange);
 });

 window.addEventListener('resize',function()
 {
 var afterResizeChange=function()
  {
  if(main.stage>0)  {   updateView();   }
  window.removeEventListener('resize',afterResizeChange);
  };
 window.addEventListener('resize',afterResizeChange);
 });






 function onDomClick                   (event)
 {
 var id=event.target.id;
 if(id=="sidebutton")
  {
  if(view.uvars.side_state==false) { view.uvars.side_state=true;  }
  else                             { view.uvars.side_state=false; }
  updateView();
  }
 }


/*
062948 20768572
 var pc1=0;
 let lastResult;


 window.setInterval(()=>
 {
 if(!pc1)    {    return;  }
 const sender=pc1.getSenders()[0];
 if(!sender) {    return;  }
 const recver=pc1.getReceivers()[0];
 if(!recver) {    return;  }
 sender.getStats().then(res =>
  {
  res.forEach(report =>
   {
   let bytes,headerBytes,packets;
   if(report.type==='outbound-rtp')
    {
    if(report.isRemote) {      return;        }
    const now = report.timestamp;
    bytes = report.bytesSent;
    headerBytes = report.headerBytesSent;
    packets = report.packetsSent;
    if (lastResult && lastResult.has(report.id))
     {
     const bitrate = 8 * (bytes - lastResult.get(report.id).bytesSent) /   (now - lastResult.get(report.id).timestamp);
     const headerrate = 8 * (headerBytes - lastResult.get(report.id).headerBytesSent) /    (now - lastResult.get(report.id).timestamp);
     mbLog(bitrate+"  "+headerrate);
        }
      }
    });
    lastResult = res;
  });
 },1000);

*/



var all_good;

 function mainThread                   ()
 {
 var bi,go,obj,msg,j,k,dom,wi,wind,dind,disp,land,room,coll;


 switch(main.stage)
  {
  case 0:
  mobileZoomOut(1,200,200,"no");
  mbLog("version="+main.version);
  room=window.location.href.substring(19);
  if(room=="") { window.location="https://mebeam.com/lobby"; }
  mbLog(room);
  bi=browserInfo();
  for(var i=0;i<bi.length;i++) { mbLog(bi[i]); }
  view.uvars.side_state=false;
  for(j=0;j<6;j++)
   {
   wi=viewWindCreate();
   wind=viewWindGet(wi,0);
   wind.dom=guiDomElementCreate("video","viddy"+j,null,2000);
  // wind.dom.style.objectFit="scale-down";
   //wind.dom.style.objectFit="contain";
   wind.dom.style.objectFit="cover";
   guiDomAreaSet(wind.dom,"ltwh","0px","0px","10px","10px");
   guiDomColorSet(wind.dom,"#222267","#002020");
   wind.dom.style.border="1px solid #111001";
   wind.dom.style.padding="1px";
   }
  dom=guiDomElementCreate("div","sidediv",null,9999);
  guiDomAreaSet(dom,"ltwh","0px","0px","0px","0px");
  guiDomColorSet(dom,"#f02029","#002020");
  dom.style.borderRight="1px solid red";
  dom.style.overflowY="auto";
  //dom.style.opacity=0.1;

  for(k=0;k<40;k++)
  {
  dom=guiDomElementCreate("div","sidediv"+k,"sidediv",99199);
  guiDomAreaSet(dom,"ltwh","0px",(k*35)+"px","100%","29px");
  guiDomColorSet(dom,"#ffffff","#000020");
  dom.style.borderBottom="1px solid blue";
  dom.style.opacity=1.0;
  dom.style.paddingTop="5px";
  guiDomFontSet(dom,"arial","18px",600);
  dom.innerHTML="<center>MeBeam v"+main.version+"</center>";
  }


  dom=guiDomElementCreate("div","sidebutton",null,9999);
  guiDomAreaSet(dom,"ltwh","5px","5px","64px","64px");
  guiDomColorSet(dom,"none","#002020");
  dom.style.border="none";
  dom.style.opacity=0.6;
  dom.onclick=function(event){ onDomClick(event);};
  dom.innerHTML="<img id=\"sidelogo\" width=\"100%\" src=\"favicon.png\">";
  guiDomByIdGet("sidelogo").style.pointerEvents="none";
  updateView();
  mainStageSet(50);
  break;


  case 50:
  navigator.mediaDevices.getUserMedia({  audio: true,  video: true,})
  .then((stream)=>
   {
   stream.getTracks().forEach(function(track) {  track.stop();  });
   all_good=1;
   })
  .catch(function(error)
   {
   alert('getUserMedia() error: '+ error);
   all_good=0;
   });
  mainStageSet(77);
  break;


  case 77:
  if(all_good==undefined) { break; }
  if(all_good==0)         { break; }
  alert("All good");
  mainStageSet(100);
  break;



  case 100:
  room=window.location.href.substring(19);
  mbInit("/"+room,view.wind_slots-1);
  devoGather();
  mainStageSet(150);
  break;


  case 150:
  if(mb.wock.in_use!=1)     break;
  if(mb.wock.is_open!=true) break;
  if(devo.is_gathering)     break;
  if(0) { devoDumpDevices(); }
  mainStageSet(200);
  break;



  case 200:
  wind=viewWindGet(0,0);
  wind.avc[0]=devoConstraints(0,0,-1);
  wind.avc[0]=devoConstraintsVideoSet(wind.avc[0],640,640,640,480,480,480);
  wind.avc_stream[0]=0;
  devoUserMediaGet(wind.avc[0],0,0,function(pa,pb,code,stream)
   {
   wind=viewWindGet(pa,0);
   if(code==1) { wind.avc_stream[pb]=stream }
   else        { wind.avc_stream[pb]=-1;    }
   });
  mainStageSet(250);
  break;


  case 250:
  wind=viewWindGet(0,0);
  if(wind.avc_stream[0]<=0) { break; }
  wind.loc_stream=wind.avc_stream[0];
  wind.dom.srcObject=wind.avc_stream[0];
  mainStageSet(260);
  break;



  case 260:
  wind=viewWindGet(0,0);
  for(j=1;j<view.wind_slots;j++)
   {
   dind=viewWindGet(j,0);
   if(dind.loc_stream==0)
    {
    dind.loc_stream=wind.avc_stream[0].clone();
    break;
    }
   }
  if(j!=view.wind_slots) { break; }
  mbMsgSendHello();
  mainStageSet(300);
  break;




  case 300:
  if((msg=wockCallPeek(mb.wock_idx,0))==null) { break; }
  obj=JSON.parse(msg);
  if(obj.cmd=="welcome") { mbMsgRcveWelcome(obj);  mainStageSet(400); }
  wockCallDiscard(mb.wock_idx);
  break;


  case 400:
  mainStageSet(500);
  if((msg=wockCallPeek(mb.wock_idx,0))==null) { break; }
  obj=JSON.parse(msg);
  switch(obj.cmd)
   {
   default:             mbLog("* got "+obj.cmd+"  "+obj.uuid+"  "+obj.hancock);   break;
   ///case "welcome":      mbMsgRcveWelcome(obj);  break;
   case "userJoined":   mbMsgRcveUserJoined(obj);   break;
   case "userLeft":     mbMsgRcveUserLeft(obj);     break;
   case "iceOffer":     mbMsgRcveIceOffer(obj);     break;
   case "iceAnswer":    mbMsgRcveIceAnswer(obj);    break;
   case "iceCandidate": mbMsgRcveIceCandidate(obj); break;
   }
  wockCallDiscard(mb.wock_idx);
  break;

  case 500:
  mainStageSet(400);
  /*
  if(pc1==0)
   {
   coll=mb.call_array[0];
   if(coll.is_connected==true)    {    pc1=coll.pc;    }
   }
   */

  mbProcessCalls();
  break;
  }


 if((main.cycle%100)==99) { mobileZoomOut(1,200,200,"no"); }
 //if(main.cycle==900)  {  inviteOthers();  }
// if((main.cycle%4)==0) { updateView(); }
 }






