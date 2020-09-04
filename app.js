 


 function mainEntry () { var i,obj;
 main.Start(205,30,mainProc,false);
 main.WorkerAdd(mainStats,15);
 main.WorkerAdd(wockWorker,1);
 main.Run();
 }




 function mainStats () { var disp;
 disp=gui.DisplayGet();
 hud.Label(0,"stage: "+main.vars.stage);
 hud.Label(1,"cycle: "+main.vars.cycle+"   msr: "+timer.MsRunning());
 hud.Label(2,"win: "+disp.win_wid+"x"+disp.win_hit+"  scr: "+disp.scr_wid+"x"+disp.scr_hit);
 hud.Label(3,"den: "+disp.density+"  ori: "+disp.orient+"  mob: "+env.is_mobile);
 hud.Label(4,"bnm: "+env.browser_name+"  bpl: "+env.browser_platform+"  bver: "+env.browser_version);
 hud.Label(5,devices.state.audio_inp_count+", "+devices.state.video_inp_count+", "+devices.state.audio_out_count+", "+devices.state.video_out_count);
 hud.Label(6,main.vars.u.my_room+"  "+main.vars.u.my_hancock+" "+main.vars.u.my_uuid);
 }




 function wockWorker () { var msg;
 if(main.vars.u.wock_handle==undefined) { return; }
 main.vars.u.wock_status=wock.Status(main.vars.u.wock_handle);
 }




 function mainProc () { var msg,i; var bund;
 switch(main.vars.stage)
  {
  case 0:
  hud.Open(0.7);
  main.vars.u.peer_handef=new HandleDefine("peer",max_windows,false);
  main.vars.u.room_name="lobby";
  main.vars.u.my_room=null;
  main.vars.u.my_uuid=null;
  main.vars.u.my_hancock=null;
  main.vars.u.wock_handle=wock.Call("wss://mebeam.com:443/wss/"+main.vars.u.room_name);
  main.StageSet("hud_start");
  break;

  case "hud_start":
  devices.Detect();
  main.StageSet("detection_wait");
  break;

  case "detection_wait":
  if(devices.state.is_error!=false)   { break; }
  if(devices.state.is_good!=true)     { break; }
  if(devices.state.is_detected!=true) { break; }
  if(main.vars.u.wock_status.is_open!=true) { break; }
  for(i=0;i<max_windows;i++) { devices.Create(); }
  main.StageSet("send_hello");
  break;

  case "send_hello":
  wock.Write(main.vars.u.wock_handle,JSON.stringify({"cmd":"hello"}));
  main.StageSet(200);
  break;

  case 200:
  if((msg=wock.Read(main.vars.u.wock_handle))==null) { break; }
  msg=JSON.parse(msg);
  if(msg.cmd!="welcome") { break; }
  main.vars.u.my_room=msg.room;
  main.vars.u.my_uuid=msg.uuid;
  main.vars.u.my_hancock=msg.hancock;
  main.StageSet(250);
  break;

  case 250:
  for(i=0;i<max_windows;i++)
   {
   bund=gui.bundle_array[i];
   Logger(bund.stage);
   }
  main.StageSet(300);
  break;


  }

 }




