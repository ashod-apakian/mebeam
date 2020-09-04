
 var devices=(function() {
 var is_init=false;
 var state={};



 function Init () { var i,obj;
 if(is_init==true) { return; }
 state={};
 state.is_detecting=false;
 state.is_detected=false;
 state.is_updated=false;
 state.worker_added=false;
 state.handef=new HandleDefine("devices",32,false);
 is_init=true;
 }



 Init();





 function Detect () {
 if(devices.state.is_detecting!=false) { return false; }
 if(devices.state.is_detected!=false)  { return false; }
 devices.state={};
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
  navigator.mediaDevices.getUserMedia(detect_constraints)
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




 function Create () { var i,obj,dev;  var xx,yy,ww,hh,xa,ya,gh;
 if((i=HandleSlotUnused(state.handef))<0) {  return 0; }
 if((obj=HandleAddCheck(state.handef,i))==null) { alert("crea"); return 0; }
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
 obj.u.bundle_index=obj.self_index;
 obj.u.pc={};
 try
  {
  obj.u.pc=new RTCPeerConnection(obj.u.config,obj.u.constraints);
  obj.u.pc.onconnectionstatechange=function(e)    { On(obj.self_handle,"onconnectionstatechange",e);   };
  obj.u.pc.onicecandidate=function(e)             { On(obj.self_handle,"onicecandidate",e);   };
  obj.u.pc.oniceconnectionstatechange=function(e) { On(obj.self_handle,"oniceconnectionstatechange",e);   };
  obj.u.pc.onicegatheringstatechange=function(e)  { On(obj.self_handle,"onicegatheringstatechange",e);   };
  obj.u.pc.onsignalingstatechange=function(e)     { On(obj.self_handle,"onsignalingstatechange",e);   };
  obj.u.pc.onnegotiationneeded=function(e)        { On(obj.self_handle,"onnegotiationneeded",e);   };
  obj.u.pc.ontrack=function(e)                    { On(obj.self_handle,"ontrack",e);   };
  obj.u.pc.onaddstream=function(e)                { On(obj.self_handle,"onaddstream",e);   };
  obj.u.pc.onremovestream=function(e)             { On(obj.self_handle,"onremovestream",e);   };
  }
 catch(e)  {  alert('RTCPeerConnection object. exception: '+e.message+' loc_stream='+call.loc_stream);  return;   }
 if(state.worker_added==false)
  {
  state.worker_added=true;
  main.WorkerAdd(devices.Iterator,1);
  }
 h=obj.self_handle;
 return h;
 }




 function Destroy (handle) { var obj;
 if((obj=HandleCheck(state.handef,handle))==null) { return false; }
 alert("device destroy todo");
 if((HandleRemove(state.handef,handle))!=true) { oof(""); return false; }
 return true;
 }




 function Get (handle) {
 return(HandleCheck(state.handef,handle));
 }






 function Attach (handle,config) { var obj,dev,i; var can,gbj,elm;
 if((obj=HandleCheck(state.handef,handle))==null) { return false; }
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




 function Combine (handle) { var obj,i,j;
 if((obj=HandleCheck(state.handef,handle))==null)       { return false; }
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




 function Connect (handle) { var obj;
 if((obj=devices.Get(handle))==null) { return false; }
 if(obj.u.combined_stream==undefined||obj.u.combined_stream==null) { return false; }
 if(obj.u.is_connect!=false) { return false; }
 obj.u.is_connect=true;
 obj.u.combined_stream.getTracks().forEach(function(track)
  {
  obj.u.pc.addTrack(track,obj.u.combined_stream);
  });
 return true;
 }





 function RoleSet (handle,role) { var obj;
 if((obj=devices.Get(handle))==null) { return false; }
 if(obj.u.role!=null) { return false; }
 obj.u.role=role;
 return true;
 }





 function CreateOffer (handle) { var obj;
 if((obj=devices.Get(handle))==null) { return false; }
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




 function CreateAnswer (handle) { var obj;
 if((obj=devices.Get(handle))==null) { return false; }
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






 function On (handle,msg,data) { var obj,msg,ok;
 if((obj=HandleCheck(state.handef,handle))==null) { oof(""); return; }
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






 function DeviceNext () { var go,obj;
 if(state.handef.count==0) { return null; }
 for(go=0;go<state.handef.slots;go++)
  {
  if((obj=HandleNextCheck(state.handef))!=null) { break; }
  }
 if(go==state.handef.slots) { return null; }
 return obj;
 }






 function Iterator () {  var go,obj,bund; var conf;
 if((obj=DeviceNext())==null) { return false; }
 bund=gui.bundle_array[obj.u.bundle_index];
 switch(bund.stage)
  {
  case 100:
  conf=devices.VideoConfig(2);
  if(devices.Attach(obj.self_handle,conf)!=true) { oof();  }
  conf=devices.AudioConfig(0);
  if(devices.Attach(obj.self_handle,conf)!=true) { oof(); return false; }
  conf=devices.CanvasConfig(bund.cani_handle);
  if(devices.Attach(obj.self_handle,conf)!=true) { oof(); return false; }
  bund.stage=140;
  break;

  case 140:
  if(devices.Combine(obj.self_handle)==false) { break; }
  bund.stage=200;
  break;

  case 200:
  if(devices.Connect(obj.self_handle)==false) { oof(); }
  bund.stage=250;
  break;

  case 250:
  if(obj.u.negotiation_needed!=true) { break; }
  gui.Get(bund.vidi_handle).u.dom.srcObject=obj.u.combined_stream;
  bund.stage="device_waiting_role";
  break;

  case "device_waiting_role":
  if(obj.u.role==null) { break; }
  Logger("my role = "+obj.u.role);
  break;

  case 350:
  break;
  }
 }







 return{
 is_init:is_init,
 state:state,
 Detect:Detect,
 Yield:Yield,
 VideoConfig:VideoConfig,
 AudioConfig:AudioConfig,
 CanvasConfig:CanvasConfig,
 Create:Create,
 Destroy:Destroy,
 Get:Get,
 Attach:Attach,
 Combine:Combine,
 Connect:Connect,
 RoleSet:RoleSet,
 CreateOffer:CreateOffer,
 CreateAnswer:CreateAnswer,
 Iterator:Iterator

 }


})();

