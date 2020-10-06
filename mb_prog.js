


 function Main () { var i,obj;
 main.Start(207,15,MainProc,false);
 LoggerLevelSet(100);
 Logger(40,"started");
 main.vars.my_alias=null;
 main.vars.my_room=null;
 for(i=0;i<env.browser_args.length;i++)
  {
  kv=env.browser_args[i];
  if(text.IndexOf(kv.key,"my_alias")<0) { continue; }
  main.vars.my_alias=kv.val;
  break;
  }
 main.vars.my_room=env.browser_url.pathname.substring(1);
 if(IsEmpty(main.vars.my_room)) {  main.vars.my_room="lobby";  }
 if(IsEmpty(main.vars.my_alias))
  {
  Logger(40,"alias not set, running in normal mode @ room "+main.vars.my_room);
  main.StageSet(666);
  main.StageSet(100);
  }
 else
  {
  Logger(40,"I AM ALIAS %c"+main.vars.my_alias,"font-size:150%;color:blue");
  env.BrowserTitleSet("["+main.vars.my_alias+"]");
  if(main.vars.my_alias=="DASH") { main.StageSet(50);   }
  else                           { main.StageSet(100);  }
  remlog.Open();
  remlog.AliasSet(main.vars.my_alias);
  main.WorkerAdd("remlog.Engine",remlog.Engine,1);
  }
 main.Run();
 }











 function xxx () {
 if(remlog.vars.is_open!=true)     { return false; }
 if(remlog.vars.iam_alias!="DASH") { return false; }
 Logger(30,"Launching Nuke, restarting");
 remlog.Write("NUKE","hello");
 env.BrowserReload(true,1000);
 return true;
 }












 function RoomEngine (roomhandle,wockhandle) { var msg,i,peer,ix; var wobj,robj;
 if((wobj=wock.Get(wockhandle))==null) { Oof; }
 if((robj=room.Get(roomhandle))==null) { Oof; }
 if((msg=wock.Read(wockhandle))==null)  {   return false;   }
 msg=JSON.parse(msg);
 if(robj.my_uuid==null)
  {
  if(msg.cmd=="Full")  {  Oof("full"); return false;  }
  if(msg.cmd!="welcome") { return false; }
  room.MySet(roomhandle,msg.uuid,msg.hancock);
  for(i=0;i<msg.peerCount;i++)
   {
   if(msg.peerList[i].uuid==robj.my_uuid)  { continue; }
   if((peer=room.PeerAdd(roomhandle,true,msg.peerList[i].uuid,msg.peerList[i].hancock))==null) { Oof(""); }
   peer.vars.av_handle=av.Create(avProc);
   Logger(40,"peer.vars.av_handle=av.Create = "+peer.vars.av_handle);
   peer.vars.av_object=av.Get(peer.vars.av_handle);
   peer.vars.av_object.user_data.peer_index=peer.index;
   }
  gui.UpdateRequest();
  return true;
  }
 if(msg.uuid==robj.my_uuid)  { return false; }
 switch(msg.cmd)
  {
  case "userJoined":
  if((peer=room.PeerAdd(roomhandle,true,msg.uuid,msg.hancock))==null) { Oof(""); }
  peer.vars.av_handle=av.Create(avProc);
  Logger(40,"peer.vars.av_handle=av.Create(user joined) = "+peer.vars.av_handle);
  peer.vars.av_object=av.Get(peer.vars.av_handle);
  peer.vars.av_object.user_data.peer_index=peer.index;
  gui.UpdateRequest();
  return true;

  case "userLeft":
  if((peer=room.PeerFind(roomhandle,msg.uuid))==null) { break; }
  ix=peer.vars.av_object.user_data.peer_index;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.pause();
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.srcObject=null;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.muted=true;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.volume=0.0;
  if(peer.vars.av_handle!=0)   {   av.Destroy(peer.vars.av_handle);   peer.vars.av_handle=0;   }
  peer.vars.av_object=null;
  if((peer=room.PeerRemove(roomhandle,msg.uuid,msg.hancock))==null) { Oof(""); }
  gui.UpdateRequest();
  return true;

  case "iceOffer":
  if((peer=room.PeerFind(roomhandle,msg.uuid))==null) { break; }
  if(peer.vars.ice_offer_data!=null) { Oof(); }
  peer.vars.ice_offer_data=msg.data;
  return true;

  case "iceAnswer":
  if((peer=room.PeerFind(roomhandle,msg.uuid))==null) { break; }
  if(peer.vars.ice_answer_data!=null) { Oof(); }
  peer.vars.ice_answer_data=msg.data;
  return true;

  case "iceCandidate":
  if((peer=room.PeerFind(roomhandle,msg.uuid))==null) { break; }
  peer.vars.av_object.rem_ice_candidate.push(msg);
  return true;
  }
 return false;
 }








 function avProc (handle,msg,data) { var obj; var ix; var peer,vid,isplaying;
 obj=av.Get(handle);
 switch(msg)
  {
  default:
  Logger(40,"handle="+handle+" msg="+msg+" data="+JSON.stringify(data,null,2));
  break;

  case "onaddstream":
  ix=obj.user_data.peer_index;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.srcObject=data.stream;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.muted=false;
  gui.Get(gui.IdFind("remvideoid"+ix)).dom.volume=1.0;
  vid=gui.Get(gui.IdFind("remvideoid"+ix)).dom;
  isplaying=vid.currentTime>0&&!vid.paused&&!vid.ended&&vid.readyState>2;
  if(!isplaying) { gui.Get(gui.IdFind("remvideoid"+ix)).dom.play(); }
  gui.UpdateRequest();
  break;

  case "ontrack":
  break;

  case "onicecandidate":
  if(data.candidate) { obj.loc_ice_candidate.push(data.candidate);  }
  else               { obj.loc_ice_eoc=true; }
  break;

  case "onconnectionstatechange":
  peer=room.PeerByIndexGet(main.vars.room_handle,obj.user_data.peer_index);
  //Logger(40,peer.hancock+" >> "+obj.pc.connectionState);
  break;

  case "oniceconnectionstatechange":  //Logger(40,msg+" iceConnectionState="+obj.pc.iceConnectionState);
  break;

  case "onsignalingstatechange":  //Logger(40,msg+"     signalingState="+obj.pc.signalingState);
  break;

  case "onicegatheringstatechange":  //Logger(40,msg+"  iceGatheringState="+obj.pc.iceGatheringState);
  break;

  case "onnegotiationneeded": // Logger(40,"negotiation needed");
  break;
  }
 }












 function Torch (state) { var track,imgc,phoc;
 if(main.vars.local_av_stream==null) { return false; }
 track=main.vars.local_av_stream.getVideoTracks()[0];
 remlog.Write("","track = "+track);
 remlog.Write("","imagecapture="+typeof ImageCapture);
 remlog.Write("","sss");
 imgc=new ImageCapture(track);
 remlog.Write("","imgc = "+imgc);
 phoc=imgc.getPhotoCapabilities().then(()=>
  {
  track.applyConstraints({advanced:[{torch:state}]})
  .then(_=>{
  main.vars.local_torch_state=state;
  remlog.Write("","appplyconst=true");
  })
  .catch(function(error){
  main.vars.local_torch_state=-1;
  remlog.Write("","ez="+error);
  })
  .finally(function(){
  //main.vars.local_torch_state=state;
  remlog.Write("","apply all done "+state);
  });
 });
 return true;
 }
















 function MainProc () {  var info,acfg,vcfg; var ai,vi,ao; var avc; var vdid,adid; var obj,i,peer,msg,candi,ctype,cdata;
 ux.Update();
 switch(main.vars.stage)
  {
  default:
  break;

  case 50:
  break;


  case 100:
  remlog.Write("","main.vars.stage="+main.vars.stage+" line number="+LineNumber());
  main.vars.local_av_handle=0;
  main.vars.local_av_object=null;
  main.vars.local_av_stream=null;
  main.vars.local_torch_state=null;
  main.vars.local_torch_tik=0;
  ux.Begin();
  Logger(40,"detecting devices");
  remlog.Write("","main.vars.stage="+main.vars.stage+"detecting devices");
  devices.Detect();
  main.StageSet(110);
  break;


  case 110:
  info={};
  info.browser_name=env.browser_name;
  info.browser_version=env.browser_version;
  info.browser_platform=env.browser_platform;
  info.browser_url=env.browser_url;
  info.browser_args=env.browser_args;
  info.is_mobile=env.is_mobile;
  info.ua=navigator.userAgent;
  info.disp=env.DisplayGet();
  Logger(40,"ENVIORNMENT "+JSON.stringify(info,null,0));
  remlog.Write("ENVIORNMENT",JSON.stringify(info,null,0));
  main.StageSet(140);
  break;


  case 140:
  if(devices.state.is_detecting==true) { break; }
  if(devices.state.is_detected!=true)  { break; }
  Logger(40,"devices detected  "+devices.state.audio_inp_count+" "+devices.state.video_inp_count+" "+devices.state.audio_out_count+" "+devices.state.video_out_count);
  //Logger(50,JSON.stringify(devices.state,null,0));
  remlog.Write("DEVICELIST",JSON.stringify(devices.state,null,0));
  main.StageSet(200);
  break;


  case 200:
  //console.log(env.browser_args);
  //for(i=0;i<10;i++) console.log(num.Rand(3));
  ai=0;
  vi=0;
  ao=0;
  for(i=0;i<env.browser_args.length;i++)
   {
   if(env.browser_args[i].key=="ai") { ai=env.browser_args[i].val; }
   else
   if(env.browser_args[i].key=="vi") { vi=env.browser_args[i].val; }
   else
   if(env.browser_args[i].key=="ao") { ao=env.browser_args[i].val; }
   }
  //Logger(40,env.browser_args.key.vi);
  //Logger(40,env.browser_args[1]);
  ai%=devices.state.audio_inp_count;
  vi%=devices.state.video_inp_count;
  ao%=devices.state.audio_out_count;
  Logger(40,"ai="+ai+"  vi="+vi+"  ao="+ao);
  vcfg=devices.VideoConfig(vi);
  acfg=devices.AudioConfig(ai);
  avc=
   {
   //video:{ deviceId:{exact:vcfg.deviceId},  facingMode: "user" , width: { min: 320, ideal: 640, max: 640},  height: { min: 240, ideal: 480, max: 480 }, frameRate:30}  ,
   video:{ deviceId:{exact:vcfg.deviceId},   width: { min: 320, ideal: 640, max: 640},  height: { min: 240, ideal: 480, max: 480 }, frameRate:30}  ,
   audio:{ deviceId:{exact:acfg.deviceId} }
   };
  main.vars.local_av_handle=av.Create(null);
  main.vars.local_av_object=av.Get(main.vars.local_av_handle);
  av.GetMedia(main.vars.local_av_handle,avc);
  main.StageSet(220);
  break;



  case 220:
  if(main.vars.local_av_object.media_stream==null) { break; }
  if(main.vars.local_av_object.media_stream==-1)   { Logger(40,"getmedia error "+main.vars.local_av_object.media_emessage+"  "+main.vars.local_av_object.media_ename); main.StageSet(200);  Oof("getmedia error "+main.vars.local_av_object.media_emessage+"  "+main.vars.local_av_object.media_ename); break; }
  main.vars.local_av_stream=main.vars.local_av_object.media_stream;
  Logger(40,main.vars.local_av_stream.getVideoTracks()[0].getSettings().width+" "+main.vars.local_av_stream.getVideoTracks()[0].getSettings().height);
  Logger(40,"local_av_stream set");
  remlog.Write("","local av stream set");
  gui.Get(gui.IdFind("selfvideo")).dom.srcObject=main.vars.local_av_stream;

  remlog.Write("","imagecapture="+typeof ImageCapture);
  main.StageSet(230);
  main.StageSet(500);
  break;





  case 230:
  remlog.Write("",env.browser_name+" "+env.is_mobile);
  //if(env.browser_name=="chrome"&&env.is_mobile==true)
  if(env.is_mobile==true)
   {
   if(typeof ImageCapture==="function")
    {
    remlog.Write("","about to try torch");
    Torch(false);
    remlog.Write("","trying");
    main.vars.local_torch_tik=timer.MsRunning();
    main.StageSet(250);
    break;
    }
   }
  main.StageSet(500);
  break;

  case 250:
  if(main.vars.local_torch_state==null)
   {
   if((timer.MsRunning()-main.vars.local_torch_tik)>500)
    {
    remlog.Write("","torch timeout");
    remlog.Write("","torch state "+main.vars.local_torch_state);
    main.StageSet(500);
    break;
    }
   break;
   }
  remlog.Write("","torch state "+main.vars.local_torch_state);
  main.StageSet(500);
  break;







  case 500:
  main.vars.room_handle=room.Create(main.vars.my_room,max_windows);
  main.vars.room_object=room.Get(main.vars.room_handle);
  main.StageSet(510);
  break;




  case 510:
  Logger(40,"connecting to room "+main.vars.room_object.name);
  remlog.Write("","connecting to room "+main.vars.room_object.name);
  main.vars.wock_handle=wock.Call("wss://mebeam.com:443/wss/"+main.vars.room_object.name);
  main.vars.wock_object=wock.Get(main.vars.wock_handle);
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  wock.DirectSet(main.vars.wock_handle,true);
  main.StageSet(600);
  break;



  case 600:
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  if(main.vars.wock_status.is_open!=true) { break; }
  if(main.vars.wock_status.is_closed==true) { Oof(); }
  Logger(40,"connected to room "+main.vars.room_object.name);
  remlog.Write("","connected to room "+main.vars.room_object.name);
  wock.Write(main.vars.wock_handle,JSON.stringify({"cmd":"hello"}));
  main.StageSet(700);
  break;


  case 700:
  RoomEngine(main.vars.room_handle,main.vars.wock_handle);
  if((peer=room.PeerNext(main.vars.room_handle))==null) { break; }
               switch(peer.phaze)
                {
                case 0:
                peer.phaze=100;
                break;

                case 100:
                //Logger(40,"new peer "+peer.hancock+" "+peer.uuid+"  "+peer.id_dif+"  "+peer.index);
                peer.vars.av_object.pc.addStream(main.vars.local_av_stream);
                if(peer.id_dif>0)  {  peer.phaze=300;    }
                else               {  peer.phaze=500;    }
                break;


                case 300:
                av.CreateOffer(peer.vars.av_handle)
                peer.phaze=320;
                case 320:
                if(peer.vars.av_object.loc_offer_desc==null) { break; }
                if(peer.vars.av_object.loc_offer_desc==-1)   { Oof(); }
                msg={"cmd":"myIceOffer","uuid":peer.uuid,"data":peer.vars.av_object.loc_offer_desc};
                wock.Write(main.vars.wock_handle,JSON.stringify(msg));
                peer.phaze=340;
                case 340:
                if(peer.vars.ice_answer_data==null) { break; }
                av.AcceptAnswer(peer.vars.av_handle,peer.vars.ice_answer_data);
                gui.UpdateRequest();
                peer.phaze=1000;
                break;


                case 500:
                if(peer.vars.ice_offer_data==null) { break; }
                av.CreateAnswer(peer.vars.av_handle,peer.vars.ice_offer_data);
                peer.phaze=520;
                case 520:
                if(peer.vars.av_object.loc_answer_desc==null) { break; }
                if(peer.vars.av_object.loc_answer_desc==-1)   { Oof(); }
                msg={"cmd":"myIceAnswer","uuid":peer.uuid,"data":peer.vars.av_object.loc_answer_desc};
                wock.Write(main.vars.wock_handle,JSON.stringify(msg));
                gui.UpdateRequest();
                peer.phaze=1000;
                break;


                case 1000:
                if(peer.vars.av_object.rem_ice_candidate.length>=1)
                 {
                 //Logger(30,"peer.phaze 1000, rem_ice_candi_que = "+peer.vars.av_object.rem_ice_candidate.length+" ice safe="+peer.vars.av_object.is_ice_safe);
                 if(peer.vars.av_object.is_ice_safe==true)
                  {
                  msg=peer.vars.av_object.rem_ice_candidate.shift();
                  candi=new RTCIceCandidate({sdpMLineIndex:msg.data.label,candidate:msg.data.candidate});
                  peer.vars.av_object.pc.addIceCandidate(candi);
                  }
                 }
                if(peer.vars.av_object.loc_ice_candidate.length>=1)
                 {
                 //Logger(30,"peer.phaze 1000, loc_ice_candi_que = "+peer.vars.av_object.loc_ice_candidate.length);
                 candi=peer.vars.av_object.loc_ice_candidate.shift();
                 ctype=candi.candidate.split(" ")[7];
                 cdata={type:'candidate',label:candi.sdpMLineIndex,id:candi.sdpMid,candidate:candi.candidate};
                 msg={"cmd":"myIceCandidate","uuid":peer.uuid,"data":cdata};
                 //Logger(30,"sending queued loc candi to "+peer.uuid);
                 wock.Write(main.vars.wock_handle,JSON.stringify(msg));
                 }
                else
                 {
                 if(peer.vars.av_object.loc_ice_eoc==true) {}
                 }
                break;
                }
  break;


  }

 }



