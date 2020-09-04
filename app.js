



 function mainEntry () { var i,obj;
 main.Start(205,30,mainProc,false);
 main.WorkerAdd(mainStats,15);
 main.WorkerAdd(wockWorker,2);
 main.Run();
 }







 function mainStats () { var disp,obj,peer,i,j;
 disp=gui.DisplayGet();
 hud.Label(0,"stage: "+main.vars.stage);
 hud.Label(1,"cycle: "+main.vars.cycle+"   msr: "+timer.MsRunning());
 hud.Label(2,"win: "+disp.win_wid+"x"+disp.win_hit+"  scr: "+disp.scr_wid+"x"+disp.scr_hit);
 hud.Label(3,"den: "+disp.density+"  ori: "+disp.orient+"  mob: "+env.is_mobile);
 hud.Label(4,"bnm: "+env.browser_name+"  bpl: "+env.browser_platform+"  bver: "+env.browser_version);
 hud.Label(5,devices.state.audio_inp_count+", "+devices.state.video_inp_count+", "+devices.state.audio_out_count+", "+devices.state.video_out_count);
 j=6;
 if(main.vars.room_handle!=undefined)
  {
  if((obj=room.Get(main.vars.room_handle))==null) { oof(); } 
  hud.Label(j,obj.u.my_hancock+" "+obj.u.my_uuid+" "+obj.u.peer_count);
  j++;
  for(i=0;i<obj.u.peer_slots;i++)
   {
   if((peer=room.PeerByIndexGet(main.vars.room_handle,i))==null) { continue; } 
   if(peer.in_use!=true) { continue; } 
   hud.Label(j,"peer "+peer.self_index+" "+peer.uuid+"  "+peer.hancock+" "+peer.id_dif);
   j++;
   }
  }

 }







 function wockWorker () { var msg;
 if(main.vars.wock_handle==undefined) { return; }
 main.vars.wock_status=wock.Status(main.vars.wock_handle);
 }




 function mainProc () { var msg,i; var bund; var obj,devobj,robj,peer; var conf,han; var chobj;
 switch(main.vars.stage)
  {
  case 0:
  hud.Open(0.7);
  keyboard.Start();
  main.vars.room_handle=room.Create("lobby",16);
  if((robj=room.Get(main.vars.room_handle))==null) { oof(); } 
  main.vars.wock_handle=wock.Call("wss://mebeam.com:443/wss/"+robj.u.name);
  main.StageSet(100);
  break;


  case 100:
  devices.Detect();
  main.StageSet(150);
  break;



  case 150:
  if(devices.state.is_error!=false)   { break; }
  if(devices.state.is_good!=true)     { break; }
  if(devices.state.is_detected!=true) { break; }
  if(main.vars.wock_status.is_open!=true) { break; }
  for(i=0;i<max_windows;i++) { devices.ChannelCreate(); }
  for(i=0;i<devices.state.channel_handef.slots;i++)
   {
   if((chobj=devices.ChannelByIndexGet(i))==null) { continue; } 
   han=chobj.self_handle;
   devices.ChannelAttach(han,devices.VideoConfig(1));
   devices.ChannelAttach(han,devices.AudioConfig(0));
   }
  main.StageSet(160);
  break;

  case 160:
  if(keyboard.hit_map[16]==1&&keyboard.hit_map[81]==1)   {   main.StageSet(170);   }
  break;


  case 170:
  wock.Write(main.vars.wock_handle,JSON.stringify({"cmd":"hello"}));
  main.StageSet(200);
  break;



  case 200:
  if((msg=wock.Read(main.vars.wock_handle))==null) { break; }
  msg=JSON.parse(msg);
  if(msg.cmd!="welcome") { break; }
  room.MySet(main.vars.room_handle,msg.uuid,msg.hancock);
  if((robj=room.Get(main.vars.room_handle))==null) { oof(); } 
  for(i=0;i<msg.peerCount;i++)
   {
   if(msg.peerList[i].uuid==robj.u.my_uuid)  { continue; }
   if((obj=room.PeerFind(main.vars.room_handle,msg.peerList[i].uuid))!=null) { continue; }
   if((obj=room.PeerAdd(main.vars.room_handle,msg.peerList[i].uuid,msg.peerList[i].hancock))==null) { oof(""); }
   }
  main.StageSet(250);
  break;



  case 250:
  main.StageSet(300);
  if((msg=wock.Read(main.vars.wock_handle))==null) { break; }
  msg=JSON.parse(msg);
  if((robj=room.Get(main.vars.room_handle))==null) { oof(); } 

  switch(msg.cmd)
   {
   default:
   Logger(JSON.stringify(msg,0,2));
   break;

   case "userJoined":
   if(msg.uuid==robj.u.my_uuid)  { break; }
   if((obj=room.PeerFind(main.vars.room_handle,msg.uuid))!=null) { break; }
   if((obj=room.PeerAdd(main.vars.room_handle,msg.uuid,msg.hancock))==null) { oof(""); }
   break;

   case "userLeft":
   if(msg.uuid==robj.u.my_uuid)  { break; }
   if((obj=room.PeerFind(main.vars.room_handle,msg.uuid))==null) { break; }
   if(room.PeerRemove(main.vars.room_handle,msg.uuid)!=true)     { oof(); }
   break;
   }
  break;



  case 300:
  main.StageSet(250);
  if((robj=room.Get(main.vars.room_handle))==null) { break; }
  if((peer=room.PeerNext(main.vars.room_handle))==null) { break; } 
  break;
  }
 
 
 if((chobj=devices.ChannelNext())!=null)
  {
  han=chobj.self_handle;
  switch(chobj.u.stage)
   {
   case 0:
   chobj.u.stage=10;
   break;

   case 10:
   devices.ChannelCombine(han);
   if(chobj.u.combined_stream==null) { break; } 
   chobj.u.stage=20;
   break;

   case 20:
   devices.ChannelConnect(han);
   chobj.u.stage=30;
   break;

   case 30:
   if(chobj.u.is_connect!=true) { break; }
   if(chobj.u.negotiation_needed!=true) { break; } 
   //Logger("got neg need");
   chobj.u.stage=40;
   break;

   case 40:
   devices.ChannelCreateOffer(han);
   chobj.u.stage=50;
   break;

   case 50:
   if(chobj.u.loc_offer_desc==null) { break; }
   
   break;
   }
  }

 }




 



