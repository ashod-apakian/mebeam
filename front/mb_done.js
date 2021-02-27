


 function geoJSON                      ()
 {
 var data_file="https://freegeoip.app/json/";
 konsole("#202040","#d0e0f0",16,100,"IP->GEO request");
 var http_request=new XMLHttpRequest();
 try{ http_request=new XMLHttpRequest();  }
 catch (e)
  {
  try{ http_request=new ActiveXObject("Msxml2.XMLHTTP"); }
  catch (e)
   {
   try{ http_request=new ActiveXObject("Microsoft.XMLHTTP"); }
   catch (e) { geo_state=-1;  return false; }
   }
  }
 http_request.onreadystatechange=function()
  {
  if(http_request.readyState==4)
   {
   konsole("#202040","#d0e0f0",16,100,"IP->GEO received");
   geo_json=JSON.parse(http_request.responseText);
   geo_state=1;
   }
  }
 http_request.open("GET",data_file,true);
 http_request.timeout=4000;
 http_request.send();
 }


/*-----------------------------------------------------------------------*/



 function getCookieInt()
 {
 coo=cookie.Get(coo_name);
 if(coo==null)
  {
  voo=1;
  cookie.Set(coo_name,voo,1000000);
  coo=cookie.Get(coo_name);
  if(coo==null) { alert(); }
  //voo=null;
  }
 voo=coo;
 if(voo==null) { alert(); voo=0;  }
 }




 function setCookieInt(val)
 {
 voo=val;
 cookie.Set(coo_name,voo,1999999);
 }




/*-----------------------------------------------------------------------*/




// navigator.serviceWorker.addEventListener('message', ... ) should work too
 navigator.serviceWorker.onmessage = function (e)
 {
 var url;
 };





 function ChatMain()
 {
 var i,kv,part,ch,disp,cando,t,k;
 //----------------------------------------
 //console.log("performance" in window);

 LoggerLevelSet(100);
 main.Start(207,50,ChatMainProc,false);
 main.app={};
 main.vars.my_info={};
 main.vars.my_info.alias=null;
 main.vars.my_info.room=null;
 for(i=0;i<env.browser_args.length;i++)
  {
  if(text.IndexOf(env.browser_args[i].key,"alias")<0) { continue; }
  main.vars.my_info.alias=env.browser_args[i].val;
  break;
  }
 if(env.browser_pathpart[0]==""&&env.browser_pathpart[1]=="chat")
  {
  main.vars.my_info.room=env.browser_pathpart[2];
  ch=text.GetLastChar(main.vars.my_info.room);
  if(ch=='/') { main.vars.my_info.room=text.TrimLastChar(main.vars.my_info.room);   }
  }
 if(IsEmpty(main.vars.my_info.alias))  { main.vars.my_info.alias="joe";       }
 if(IsEmpty(main.vars.my_info.room))   { main.vars.my_info.room="chatlobby";  }
 if(!IsEmpty(env.browser_pathpart[1])) { main.vars.my_info.room=env.browser_pathpart[1];  }
 ///console.log("ALIAS="+main.vars.my_info.alias+" ROOM="+main.vars.my_info.room);
 disp=env.DisplayGet();
 if(disp.scr_wid>disp.win_wid) {  cando=(disp.scr_wid*(slf_hit+20));  }
 else                          {  cando=(disp.win_wid*(slf_hit+20));  }
 cando=parseInt((16777216/cando)*0.8);

 ///if(env.is_mobile==true&&env.is_win==false)  {  if(cando>50) { cando=50; }  }
 ////else                                        {  if(cando>100) { cando=100; }  }
 if(cando>100) { cando=100; }


 myDynamicManifest.start_url="https://mebeam.com/";
 myDynamicManifest.short_name="MeBeam";
 myDynamicManifest.name="MeBeam. You see what I'm saying!";
 const stringManifest=JSON.stringify(myDynamicManifest);
 const blob=new Blob([stringManifest],{type:'application/json'});
 const manifestURL=URL.createObjectURL(blob);
 document.querySelector('#manifestId').setAttribute('href',manifestURL);
 BaseImageInit();

 worker=new Worker("mb_worker.js");
 worker_state=1;
 worker.onmessage=function (evt)
  {
  worker_state=2;
  for(k=0;k<10;k++) {   worker.postMessage(k); }
  };
 worker.onerror = function (evt)
  {
  alert("on error "+evt.data);
  };

 ChatHistoryInit(cando); // safari width*height<16megs
 ChatUxBegin();
 main.vars.post_message_to_sw=false;
 main.vars.is_pushy=true;
 main.vars.is_pwa=true;
 fingerPrint();
 getCookieInt();
 main.Run();
 }




/*-=---------------------------------------------------------------------*/



 function ChatMainProc()
 {
 var i,el,z;
 var avc,vcfg;
 var vid,isplaying;
 var wobj;
 var mm;
 var kb,cnt;
 var loops,ok,go;
 var msg,obj,exx;
 var delme;
 var disp,el;
 //----------------------------------------------
 if(main.vars.wock_status&&main.vars.stage!=8188)
  {
  if(main.vars.wock_status.is_closed==true) {  env.BrowserReload(true,1000+num.Rand(1000));  console.log("closed");   main.StageSet(8188); }
  if(main.vars.wock_status.is_error==true)  {  env.BrowserReload(true,1000+num.Rand(1000));  console.log("error");    main.StageSet(8188); }
  }


 codeHit("chatmainproc",0);

 switch(main.vars.stage)
  {
  case 0:
  geoJSON();
  ChatUxAnimator();
  chat_input_text="Please wait, MeBeam is starting..";
  main.StageSet(100);
  break;


  case 100:
  main.vars.local_av_handle=0;
  main.vars.local_av_object=null;
  main.vars.local_av_stream=null;
  main.vars.local_av_track=null;
  main.vars.local_av_caps=null;
  Logger(40,"device detection begining");
  devices.Detect();
  main.StageSet(110);
  main.StageSet(140);
  break;


  case 110:
  break;


  case 140:
  if(devices.state.is_detecting==true) { break; }
  if(devices.state.is_detected!=true)  { break; }
  if(devices.state.is_error==true)   {   Oof("Camera not detected");   main.StageSet(666);   break;   }
  main.StageSet(200);
  break;


  case 200:
  if(vi==-1)
   {
   for(i=0;i<env.browser_args.length;i++)
    {
    if(env.browser_args[i].key=="vi")
     {
     vi=env.browser_args[i].val;
     }
    }
   }
  if(vi==-1) { vi=0; }
  if(isNaN(vi))
   {
   vi=0;
   ur="https://mebeam.com/"+main.vars.my_info.room+"?vi="+vi;
   window.location.href=ur;
   return;
   }
  vi%=devices.state.video_inp_count;
  video_index_used=vi;
  vcfg=devices.VideoConfig(vi);
  avc=
   {
   video:{ deviceId:{exact:vcfg.deviceId}, width: { min: 640, ideal: 640, max: 640}, height: { min: 480, ideal: 480, max: 480 }, frameRate:30},
   audio:false
   };
  main.vars.local_av_handle=av.Create(null);
  main.vars.local_av_object=av.Get(main.vars.local_av_handle);
  av.GetMedia(main.vars.local_av_handle,avc);
  main.StageSet(250);
  break;


  case 250:
  if(main.vars.local_av_object.media_stream==null) { break; }
  if(main.vars.local_av_object.media_stream==-1)   {   main.StageSet(200);   break;   }
  main.vars.local_av_stream=main.vars.local_av_object.media_stream;
  if(gui.Get(gui.IdFind("selfvid"))!=null)
   {
   gui.Get(gui.IdFind("selfvid")).dom.srcObject=main.vars.local_av_stream;
   gui.Get(gui.IdFind("selfvid")).dom.muted=true;
   gui.Get(gui.IdFind("selfvid")).dom.volume=0.1;
   vid=gui.Get(gui.IdFind("selfvid")).dom;
   isplaying=vid.currentTime>0&&!vid.paused&&!vid.ended&&vid.readyState>2;
   if(!isplaying)    {    gui.Get(gui.IdFind("selfvid")).dom.play();    }
   }
  else
   {
   }
  main.vars.local_av_track=main.vars.local_av_stream.getVideoTracks()[0];
  main.StageSet(500);
  break;


  case 500:
  if(geo_state==0)   {   break;   }
  if(geo_state==1)
   {
   konsole("#202040","#d0e0f0",16,100,"g="+geo_json.ip+"="+geo_json.country_code);
   //console.log(geo_json);
   main.StageSet(505);
   break;
   }
  konsole("#202040","#d0e0f0",16,100,">>> "+geo_state);
  break;



  case 505:
  main.vars.room_handle=room.Create(main.vars.my_info.room,max_windows);
  main.vars.room_object=room.Get(main.vars.room_handle);
  konsole("#202040","#d0e0f0",16,100,"room created");
  main.StageSet(510);
  break;


  case 510:
  main.vars.wock_handle=wock.Call("wss://mebeam.com:443/wss/"+main.vars.room_object.name);
  main.vars.wock_object=wock.Get(main.vars.wock_handle);
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  wock.DirectSet(main.vars.wock_handle,true);
  main.StageSet(600);
  break;


  case 600:
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  if(main.vars.wock_status.is_closed==true) {  }
  if(main.vars.wock_status.is_error==true) {  }
  if(main.vars.wock_status.is_open!=true) { break; }
  konsole("#202040","#d0e0f0",16,100,"connected, sending hello");
  wock.Write(main.vars.wock_handle,JSON.stringify({"cmd":"hello"}));
  calculateFps(); // so its no -inf
  main.StageSet(700);
  break;


  case 700:
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  ChatRoomProcess(main.vars.room_handle,main.vars.wock_handle);
  if(main.vars.room_object.my_uuid==null) { break; }
  konsole("#202040","#d0e0f0",16,100,"myuuid="+main.vars.room_object.my_uuid+"  room="+main.vars.room_object.name);
 ///  main.StageSet(777);
  main.StageSet(720);
  break;



  case 720:
  //main.vars.is_pwa=false;
  konsole("#202040","#d0e0f0",16,100,"PWA mode "+main.vars.is_pwa);
  if(main.vars.is_pwa==false)
   {
   main.StageSet(766);
   console.log("((((#####( ready");
   main.StageSet(777);
   ChatUxAnimator();
   break;
   }
  main.StageSet(725);
  break;


  case 725:
  DbProcess();
  //if(db_phaze!=0) { break; }
  //console.log(db_ready);
  if(db_ready!=true) { break; }
  konsole("#202040","#d0e0f0",24,100,"db_ready, db_array.length="+db_array.length);
  if(IsEmptyObject(pwa))   {   PwaInit();   }
  if(pwa.support_level!=3)
   {
   ///"pwa support lebvel="+pwa.support_level);
   console.log("pwa support level = "+pwa.support_level);
   main.StageSet(766);
   ///break;
   }
  PwaRegisterServiceWorker();
  main.StageSet(730);
  break;



  case 730:
  if(pwa.registration_err==null) { break; }
  //console.log(pwa.registration_err);
  //console.log(pwa.registration);
  ntfy_needed=1;
  console.log("going to stage 766");
  main.StageSet(766);
  break;


  case 766:
  if(pwa.support_level==3)
   {
   if(IsEmptyObject(pwa))   {  break; } // PwaInit();   }
   //  ntfyProcess();
   DbProcess();
   ///console.log("@zzz@*@*@* "+pwa.is_subscribed+" "+pwa.is_messsaging_blocked+" "+pwa.is_messsaging_enabled+" "+db_sys.stage+" "+db_phaze+" "+db_state+" "+ntfy_stage);
   if(pwa.is_subscribed==null) { break;  }
   if(db_sys.stage!=1600) { break; }
   if(db_phaze!=0) { break; }
   if(db_state!=0) { break; }
   //if(history_fin_received!=true) { break; }
   //ntfyProcess();
   //alert(ntfy_stage);
   //if(ntfy_stage!=100) { break; }
   //  chat_input_text="";
   }
  console.log("(((((((((( ready");
  ChatUxAnimator();
  main.StageSet(777);
  break;


  case 777:
  if(history_fin_received==1)
   {
   console.log("history_fin_received");
   chat_input_text="";
   history_fin_received=2;
   }
  else
  if(history_fin_received==2)
   {
   ntfyProcess();
   DbProcess();
   }
  main.vars.wock_status=wock.Status(main.vars.wock_handle);
  if(ChatRoomProcess(main.vars.room_handle,main.vars.wock_handle)==false) { }
  KeyboardLoop();
  ChatHistoryAppendManager();
  if((peer=room.PeerNext(main.vars.room_handle))==null) { break; }
  break;
  }

 //if(focused==false)//&&main.vars.stage>0&&main.vars.cycle>10) //==766||main.vars.stage==777)
 }





 function ChatRoomProcess(roomhandle,wockhandle)
 {
 var wobj,robj,msg,i,peer,ix;
 var is_me,ok;
 //----------------------------------------------
 if((wobj=wock.Get(wockhandle))==null) { Oof; }
 if((robj=room.Get(roomhandle))==null) { Oof; }
 if((msg=wock.Read(wockhandle))==null) { return false; }
 msg=JSON.parse(msg);
 if(robj.my_uuid==null)
  {
  if(msg.cmd=="Full"||msg.cmd!="welcome") {  return true; }
  room.MySet(roomhandle,msg.uuid,msg.hancock);
  for(i=0;i<msg.peerCount;i++)
   {
   if(msg.peerList[i].uuid==robj.my_uuid)  { continue; }
   if((peer=room.PeerAdd(roomhandle,true,msg.peerList[i].uuid,msg.peerList[i].hancock))==null)    {    Oof("could not addperr "+i+" hancokc="+msg.peerList[i].hancock);    }
   }
  ///Logger(40,"Hi %c"+msg.hancock+" %c"+msg.uuid+" %cpc="+robj.peer_count,"color:red","color:blue","color:green");
  ///Logger(40," ");
  history_change=true;
  gui.UpdateRequest();
  return true;
  }
 if(msg.uuid==robj.my_uuid) { is_me=true;  }
 else                       { is_me=false; }
// console.log("chatroomprocesss "+msg.cmd);
 switch(msg.cmd)
  {
  default:
  Oof(msg.cmd);
  break;

  case "historyFin":
  history_fin_received=1;
  break;

  case "userJoined":
  if(is_me==true) { return true; } //false; }
  peer=room.PeerAdd(roomhandle,true,msg.uuid,msg.hancock);
  ///Logger(40,"peer joined "+peer.uuid+" "+peer.hancock+" peercount="+robj.peer_count);
  history_change=true;
  return true;


  case "userLeft":
  if(is_me==true) { return true; } //false; }
  if((peer=room.PeerFind(roomhandle,msg.uuid))==null) { break; }
  ///Logger(40,"peer left "+peer.uuid+" "+peer.hancock);
  peer=room.PeerRemove(roomhandle,msg.uuid,msg.hancock);
  ///Logger(40,"peercount="+robj.peer_count);
  history_change=true;
  return true;


  case "chatecho":
  if(msg.txt.substring(0,19)=="automated.gday.ping")   {   break;   }
  if(msg.img.substring(0,5)=="data:")  {   ChatHistoryAppend(msg);   }
  history_change=true;
  break;
  }
 gui.UpdateRequest();
 return true; ///return false;
 }


/*-----------------------------------------------------------------------*/



 function handleVisibilityChange()
 {
 codeHit("handlevisibilitychange",0);
 if(document.hidden) { focused=false; }
 else                { focused=true; }
/// console.log("VisiblityChange, are we focused="+focused);
 //console.log("cused = "+focused);
 }



 document.addEventListener("visibilitychange", handleVisibilityChange, false);




 window.addEventListener("wheel", event =>
 {
 var mul=3;
 const delta=Math.sign(event.deltaY);
    if(delta==-1)
     {
     history_fine+=(swipe_speed*mul);
     if(history_fine>=((history_height-1)*main.app.rcve_vgap)) { history_fine=((history_height-1)*main.app.rcve_vgap); }
     }
    else
    if(delta==+1)
     {
     history_fine-=(swipe_speed*mul);
     if(history_fine<=0) { history_fine=0; }
     }
 //console.info(delta);
 });





 function ChatSound()
 {
 codeHit("chatsound",0);
 if(focused==false&&blink_id==0)
  {
  if(timer.MsRunning()>1000)
   {
   //console.log("audio = "+history_fin_received);
   if(history_fin_received==2)
    {
    if(audio_clicked==true)   { audio.play();  }
    else                      { audio.play();  }
    }
  //console.log("setting focus");
   window.focus();
   }
  blink_cycle=0;
  blink_id=setInterval(blink,100);
  }
 }


 function blink()
 {
 blink_cycle++;
 codeHit("blink",0);
 if((blink_cycle%2)==0)  { setFavIcon(0); }  //env.BrowserTitleSet("mEbEAM - Yo u see what I'm saying!");  }
 else                    { setFavIcon(1); }  //env.BrowserTitleSet("MeBeam - Yo u see what I'm saying!");  }
 if(focused==true)
  {
  setFavIcon(0);
  //env.BrowserTitleSet("MeBeam - Yo u see what I'm saying!");
  if(blink_id)   {   clearInterval(blink_id);   blink_id=0;   }
  }
 }




 function getFaviconEl()
 {
 codeHit("getFaviconEl",0);
 return document.getElementById("favicon");
 }



 function setFavIcon (which)
 {
 var fi;
 fi=getFaviconEl();
 if(which==0) { fi.href="/favicon.ico";  }
 else         { fi.href="/favicon2.ico"; }
 };




/*-----------------------------------------------------------------------*/



 function sysTxt(y,txt)
 {
 var i,s;
 Oof();
 codeHit("sysTxt",0);
 s=sys_txt.length;
 if(y>=s)  {  for(i=s;i<(y+1);i++)   {   sys_txt[i]="";   }  }
 sys_txt[y]=txt;
 }



 function BaseImageInit()
 {
 codeHit("baseimginit",0);
 base_image=new Image();
 base_image.is_ready=false;
 base_image.src='favicon.png';
 base_image.onload=function()  {  base_image.is_ready=true;  }
 }




 function prevoUpdate(disp)
 {
 var change;
 codeHit("prevoupdate",0);
 //---------------------------------------------
 change=0;
 if(prevo.state===undefined)
  {
  prevo.state=true;
  prevo.win_wid=0;
  prevo.win_hit=0;
  prevo.scr_wid=0;
  prevo.scr_hit=0;
  prevo.win_ratio=0;
  }
 while(1)
  {
  if(disp.win_wid!=prevo.win_wid) { change+=1;  }
  if(disp.win_hit!=prevo.win_hit) { change+=2;  }
  if(disp.scr_wid!=prevo.scr_wid) { change+=4;  }
  if(disp.scr_hit!=prevo.scr_hit) { change+=8;  }
  if(disp.win_ratio!=prevo.win_ratio) { change+=16; }
  break;
  }
 if(change!=0)
  {
  prevo.win_wid=disp.win_wid;
  prevo.win_hit=disp.win_hit;
  prevo.scr_wid=disp.scr_wid;
  prevo.scr_hit=disp.scr_hit;
  prevo.win_ratio=disp.win_ratio;
  }
 return change;
 }




 function ChatUxKeyboardInit()
 {
 var s,spot;
 codeHit("chatuxkeyboardinit",0);
 //---------------------------------------
 keyboard_spot_count=0;
 for(s=0;s<100;s++)
  {
  spot={};
  spot.name="";
  spot.self_index=s;
  spot.keyCode=0;
  spot.key="";
  spot.ascii=0;
  spot.x1=0;
  spot.y1=0;
  spot.x2=0;
  spot.y2=0;
  spot.alt_key=false;
  spot.ctrl_key=false;
  spot.shift_key=false;
  keyboard_spot_array[keyboard_spot_count]=spot;
  keyboard_spot_count++;
  }
 keyboard_page=0;
 }




 function ChatUxKeyFromCord(clkx,clky)
 {
 var s,spot;
 codeHit("chatuxkeyfromcord",0);
 //--------------------------------------------
 for(s=0;s<keyboard_spot_count;s++)
  {
  spot=keyboard_spot_array[s];
  if(clkx>=(spot.x1-10)&&clkx<=(spot.x2+5))
   {
   if(clky>=(spot.y1-10)&&clky<=(spot.y2+5))    {    return spot;    }
   }
  }
 return null;
 }


/*-----------------------------------------------------------------------*/



 function timeConverter(UNIX_timestamp)
 {
 var ux,a,months,year,month,date,hour,min,sec,time,ap;
 codeHit("timeconverter",0);
 ux=parseInt(UNIX_timestamp/1000);
 a=new Date(ux);
 months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 year=a.getFullYear();
 month=months[a.getMonth()];
 date=a.getDate();
 hour=a.getHours();
 min=a.getMinutes();
 sec=a.getSeconds();
 if(min<10) { min="0"+min; }
 if(sec<10) { sec="0"+sec; }
 if(hour<12) { ap="am"; } else
 if(hour>12) { ap="pm"; hour-=12;  } else
 if(hour==12) { ap="pm"; }
 year=year%1000;
 time=date+' '+month+' '+year+'  '+hour+':'+min+':'+sec+" "+ap;
 return time;
 }



 function copyTextToClipboard ()
 {
 var text,err;
 var textArea;
 var successful,msg;
 codeHit("copytexttoclipboasrd",0);
 //-----------------------
 text="https://mebeam.com/"+main.vars.my_info.room;
 textArea=document.createElement("textarea");
 textArea.style.position='fixed';
 textArea.style.top=0;
 textArea.style.left=0;
 textArea.style.width='2em';
 textArea.style.height='2em';
 textArea.style.padding=0;
 textArea.style.border='none';
 textArea.style.outline='none';
 textArea.style.boxShadow='none';
 textArea.style.background='transparent';
 textArea.value=text;
 document.body.appendChild(textArea);
 textArea.focus();
 textArea.select();
 err=1;
 try
  {
  successful=document.execCommand('copy');
  msg=successful?'successful':'unsuccessful';
  console.log('Copying text was ' + msg);
  err=0;
  }
 catch (err) {  alert("oops, unable to copy"); console.log('Oops, unable to copy'); err=1; }
 document.body.removeChild(textArea);
 return err;
 }





 function ShareTwo (iswin)
 {
 var ua,url,link,text,ww,er;
 var txt,lnk,tit;
 codeHit("sharetwo",0);
 //----
 ua=navigator.userAgent.toLowerCase();
 txt="Yo u see what I'm saying.";
 lnk="https://mebeam.com/"+main.vars.my_info.room;
 tit="Meet at MeBeam "+main.vars.my_info.room+":\n";
 ww=null;
 if(env.is_mobile&&iswin==false)
  {
  url="";
  if(ua.indexOf("iphone")>-1||ua.indexOf("ipad")>-1) { url+="sms:;"; }
  else                                               { url+="sms:?"; }
  url+="body="+encodeURIComponent(tit)+encodeURIComponent("\n")+encodeURIComponent(txt)+encodeURIComponent("\n")+encodeURIComponent(" \n")+encodeURIComponent(lnk);
  ww=window.open(url,'_blank');
  if(ww!=null) { return true; }
  }
 else
 if(env.is_mobile&&iswin==true)
  {
  //alert("is not mobile");
  }
 //if(ww!=null) { return true; }
 er=copyTextToClipboard();
 if(er==0)  { console.log("link copied"); alert("link copied"); }
 else       { alert("er="+er);    }
 return true;
 }





 function inviteOthers ()
 {
 var url,lnk,txt,tit;
 codeHit("inviteothers",0);
 //----------------------------------------
 txt="Yo u see what I'm saying!\n\n";
 lnk="https://mebeam.com/"+main.vars.my_info.room;
 tit="Meet Me at MeBeam\n";
 if(navigator.share)
  {
  console.log("have share")
  navigator.share({title:tit,text:txt,url:lnk})
  .then(()=>
   {
   console.log("invite ok");
   })
  .catch((error)=>
   {
   //   alert(error);
   });
  }
 else
  {
  return false;
  }
 return true;
 }





 var Fingerprint = function (options)
 {
 codeHit("FingerprintConstruct",0);
 var nativeForEach, nativeMap;
 nativeForEach = Array.prototype.forEach;
 nativeMap = Array.prototype.map;
 if (typeof options == 'object')  {        this.hasher = options.hasher;      this.canvas = options.canvas;  }
 };


 Fingerprint.prototype =
 {
    get: function()
    {
      var keys = [];
      keys.push(navigator.userAgent);
      keys.push(navigator.language);
      keys.push(screen.colorDepth);
      //keys.push(this.getScreenResolution().join('x'));
      keys.push(new Date().getTimezoneOffset());
      keys.push(this.hasSessionStorage());
      keys.push(this.hasLocalStorage());
      keys.push(this.hasIndexDb());
      if(document.body){        keys.push(typeof(document.body.addBehavior));      }
      else             {        keys.push(typeof undefined);      }
      keys.push(typeof(window.openDatabase));
      keys.push(navigator.cpuClass);
      keys.push(navigator.platform);
      keys.push(navigator.doNotTrack);
      if(this.canvas && this.isCanvasSupported()){        keys.push(this.getCanvasFingerprint());      }
      return keys.join('###');
    },
    hasLocalStorage:   function () {  try{        return !!window.localStorage;      }   catch(e) {        return true;      }    },
    hasSessionStorage: function () {  try{        return !!window.sessionStorage;      }   catch(e) {        return true;      }    },
    hasIndexDb:        function () {  try{        return !!window.indexedDB;      }      catch(e) {        return true;      }    },
   isCanvasSupported:  function () {  var elem = document.createElement('canvas');    return !!(elem.getContext && elem.getContext('2d'));    },
   //getScreenResolution: function () {  return (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];    },
   getCanvasFingerprint: function ()
    {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var txt = 'MeBeam.DNA.RNA.fingerprint';
      ctx.textBaseline = "top";
      ctx.font = "14.43px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125,1,62,20);
      ctx.fillStyle = "#069";
      ctx.fillText(txt, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.72)";
      ctx.fillText(txt, 4, 17);
    return canvas.toDataURL("image/jpeg",0.57);
    }
 };



 function fingerPrint()
 {
 if(fingprint_done==false)
  {
  codeHit("fingerprintok",0);
  fingprint_obj= new Fingerprint({canvas: true});
  fingprint_0=""+fingprint_obj.get();
  fingprint_1=sha1(fingprint_0);
  console.log("FINGERPRINT="+fingprint_1);
  fingprint_done=true;
  }
 return fingprint_1;
 }




/*-----------------------------------------------------------------------*/



 function ChatRoomSend (type,qul,txt)
 {
 codeHit("chatroomsend",0);
 var han,obj,ctx,data;
 var sid,pid,msg;
 var cw,ch,vw,vh,th,str;
 var adata,bdata,ii;
 //-----------------------------------------
 if(main.vars.stage<777) { return; }
 str=txt.replace(/['"]+/g, '');
 str=str.replace(/[^\x00-\x7F]/g,"");
 str=str.replace(/\\/g, "/");
 //---------------
 han=gui.IdFind("fxfxcan");
 obj=gui.Get(han);
  ///ctx=gui.CanvasContextGet(han);
 if(obj.dom)
  {
  ///ctx.save();
  if(type=="jpg"||type=="jpeg") { data=obj.dom.toDataURL('image/jpeg',qul);  } else
  if(type=="png")               { data=obj.dom.toDataURL('image/png');       }
  //ctx.restore();
  msg={"cmd":"chatMsgEcho","ali":main.vars.my_info.alias,"img":data,"txt":str};
  wock.Write(main.vars.wock_handle,JSON.stringify(msg));
  }
 if(audio_clicked!=true) { console.log("chatRoomSend, setting audio_clicked = true"); }
 return true;
 }






/**



 function ChatRoomSendEtc(type,qul,txt)
 {
 codeHit("chatroomsend",0);
 var han,obj,ctx,data;
 var sid,pid,msg;
 var cw,ch,vw,vh,th,str;
 var adata,bdata,ii;
 //-----------------------------------------
 if(main.vars.stage<777) { return; }
 str=txt.replace(/['"]+/g, '');
 str=str.replace(/[^\x00-\x7F]/g,"");
 str=str.replace(/\\/g, "/");

 han=gui.IdFind("selfvid");
 han=gui.IdFind("fxfxcan");
 obj=gui.Get(han);
 sid=obj.dom;
  han=gui.IdFind("fxfxcan");
  obj=gui.Get(han);
  ctx=gui.CanvasContextGet(han);
  pid=obj.dom;
 cw=pid.width;
 ch=pid.height;
 vw=sid.videoWidth;
 vh=sid.videoHeight;

 if(sid!=null&&pid!=null)
  {
  ctx.save();


  //if(cw/ch<vw/vh){ th=cw*vh/vw; ctx.drawImage(sid, 0, 0, vw, vh, 0, (ch-th)/2, cw, th);  }
  //else           { tw=ch*vw/vh; ctx.drawImage(sid, 0, 0, vw, vh, (cw-tw)/2, 0, tw, ch);  }


  //adata=ctx.getImageData(0,0,cw,ch);
//  bdata=adata.data;
//  for(ii=0;ii<bdata.length;ii+=4)
//   {
//   bdata[ii+0]=255-bdata[ii+0];
//   bdata[ii+1]=255-bdata[ii+1];
//   bdata[ii+2]=255-bdata[ii+2];
//   }
  //ctx.putImageData(adata,0,0);

  if(type=="jpg"||type=="jpeg") { data=obj.dom.toDataURL('image/jpeg',qul);  } else
  if(type=="png")               { data=obj.dom.toDataURL('image/png');       }
  ctx.restore();
  msg={"cmd":"chatMsgEcho","ali":main.vars.my_info.alias,"img":data,"txt":str};
  wock.Write(main.vars.wock_handle,JSON.stringify(msg));
  }
 if(audio_clicked!=true) { console.log("chatRoomSend, setting audio_clicked = true"); }
 return true;
 }





 function ChatRoomSendNew(type,qul,txt)
 {
 codeHit("chatroomsend",0);
 var han,obj,ctx,data;
 var sid,pid,msg;
 var cw,ch,vw,vh,th,str;
 //--------------
  var vido,frame,l,i;
  let r,g,b,a;
 var pctx;
 //-----------------------------------------

 if(main.vars.stage<777) { return; }
 str=txt.replace(/['"]+/g, '');
 str=str.replace(/[^\x00-\x7F]/g,"");
 str=str.replace(/\\/g, "/");

  han=gui.IdFind("fxfxcan");
  obj=gui.Get(han);
  sid=obj.dom;
 han=gui.IdFind("photcan");
 obj=gui.Get(han);
 pctx=gui.CanvasContextGet(han);
 pid=obj.dom;
  cw=pid.width;
  ch=pid.height;
  vw=sid.width;
  vh=sid.height;

 if(sid!=null&&pid!=null)
  {
  pctx.save();
  if(cw/ch<vw/vh){ th=cw*vh/vw; pctx.drawImage(sid, 0, 0, vw, vh, 0, (ch-th)/2, cw, th);  }
  else           { tw=ch*vw/vh; pctx.drawImage(sid, 0, 0, vw, vh, (cw-tw)/2, 0, tw, ch);  }
  if(type=="jpg"||type=="jpeg") { data=obj.dom.toDataURL('image/jpeg',qul);  } else
  if(type=="png")               { data=obj.dom.toDataURL('image/png');       }
  pctx.restore();
  msg={"cmd":"chatMsgEcho","ali":main.vars.my_info.alias,"img":data,"txt":str};
  wock.Write(main.vars.wock_handle,JSON.stringify(msg));
  }
 if(audio_clicked!=true) { console.log("chatRoomSend, setting audio_clicked = true"); }
 return true;
 }

*/





 function ChatHistoryInit(slots)
 {
 var i,s,entry;
 codeHit("chathistoryinit",0);
 //------------------------------
 if(slots<=0) { Oof(slots); }
 chat_history_array=[];
 chat_history_slots=0;
 for(i=0;i<slots;i++)
  {
  entry={};
  entry.self_index=i;
  entry.msg=null;
  entry.cha_id="cha"+i;
  entry.img=new Image();
  entry.img.id=entry.cha_id;
  entry.img.setAttribute("id",entry.img.id);
  entry.img.src=null;
  entry.img.style.position="absolute";
  entry.img.style.zIndex=8200;
  entry.img.style.display="none";
  entry.txt=null;
  chat_history_array[chat_history_slots]=entry;
  document.body.appendChild(entry.img);
  chat_history_slots++;
  }
 if(chat_history_slots!=slots) { Oof(chat_history_slots+" "+slots); }
 return true;
 }







 function ChatHistoryAppendManager()
 {
 var el,delme;

 codeHit("chathistoryappendmanager",0);
 if(append_delay_ms==0) { return; }
 if(append_utc_processed>=current_chat_last_stamp) { return; }
 el=timer.MsRunning()-append_delay_ms;
 if(isRoomBookmarked(main.vars.my_info.room)>=0)
  {
  if(el<100) { return; }
 //console.log("bookmark updated most recent = "+current_chat_last_stamp);//+" > "+"  "+append_utc_processed);
  konsole("#308090","#f0c0c0",20,100,"chathistoryappend manager, "+main.vars.my_info.room);
  konsole("#308090","#f0c0c0",20,100,"is bookmarkerd = "+isRoomBookmarked(main.vars.my_info.room));
  delme={};
  delme.room=main.vars.my_info.room;
  delme.mode=current_chat_last_stamp;
  DbCmdUpdate("bookmark",JSON.stringify(delme));
  DbAck();
  }
 append_delay_ms=timer.MsRunning();
 append_utc_processed=current_chat_last_stamp;
 }





 function ChatHistoryAppend(msg)
 {
 var li,entry,a,che,delme,dif;
 codeHit("chathistoryappend",0);
 //-------------------------------------------
 li=chat_history_slots-1;
 ArrayRotate(chat_history_array);
 entry=chat_history_array[li];
 entry.msg=msg;
 entry.img.src=msg.img;
 entry.txt=msg.txt;
 entry.now=msg.now;
 entry.utc=msg.utc;
 entry.when=timeConverter(entry.utc);
 chat_history_array[li]=entry;
 ChatSound();
 //console.log("history append "+msg.txt+" "+msg.utc+" "+msg.now+" ");
 if(msg.utc>current_chat_last_stamp)//append_delay_utc)//current_chat_last_stamp)///&&current_chat_last_stamp>0)
  {
  current_chat_last_stamp=msg.utc;
  append_delay_ms=timer.MsRunning();
  ntfy_needed=1;
  }
 }





 function GridCords (obj,wid,hit,xv,yv,wv,hv)
 {
 var xp,yp;
 codeHit("gridcords",0);
 //--------------------------------------------
 if(typeof obj!=='object'&&obj!==null)  {  obj={};   }
 obj.x1=obj.y1=obj.x2=obj.y2=0; obj.w=0; obj.h=0;
 xp=wid/100.0;
 yp=hit/100.0;
  xp=parseInt(xp);
  yp=parseInt(yp);
 obj.x1=xv*xp;
 obj.y1=yv*yp;
 obj.w=(wv*xp);
 obj.h=(hv*yp);
 obj.x2=(obj.x1+obj.w)-1;
 obj.y2=(obj.y1+obj.h)-1;
 return obj;
 }






 function calculateFps ()
 {
 codeHit("calculatefps",0);
 if(main.vars.display_stats.frame_count==0)  {  main.vars.display_stats.tik=timer.MsRunning();  }
 main.vars.display_stats.elapsed=timer.MsRunning()-main.vars.display_stats.tik;
 main.vars.display_stats.frame_count++;
 main.vars.display_stats.fps=main.vars.display_stats.frame_count/(main.vars.display_stats.elapsed/1000);
 }






 function ChatUxAnimator()
 {
 var need_fps;

 if(env.is_mobile==true&&env.is_win==false)    {   need_fps=30;   }
 else                                          {   need_fps=60;   }

 need_fps=55;
 if(main.vars.display_stats.fps<=need_fps)
  {
  ChatUxAnimate();
  calculateFps();
  }
 else
  {
  calculateFps();
  if(main.vars.display_stats.frame_count>2) { main.vars.display_stats.frame_count--; }
  }

 if(num.Rand(100)==0)
  {
  console.log(main.vars.display_stats.fps);
  }

 window.requestAnimationFrame(ChatUxAnimator);
 }







 function ChatUxPaintKeyboard(disp)
 {
 var han,obj,ctx;
 codeHit("chatuxpaintkeyboard",0);
 //-----------------------------------------
 if((han=gui.IdFind("maincan"))==0)        { Oof(); }
 if((obj=gui.Get(han))==null)              { Oof(); }
 if((ctx=gui.CanvasContextGet(han))==null) { Oof(); }
 keyboard_spot_count=0;
  ChatUxPaintKeyboardRow(disp,0);
  ChatUxPaintKeyboardRow(disp,1);
  ChatUxPaintKeyboardRow(disp,2);
  ChatUxPaintKeyboardRow(disp,3);
 paintkb=0;
 }



 function kbLayout (kbpg,row,idx)
 {
 var str,ch,len,phaze,r,k,i;

 if(kbpg<0||kbpg>3) { Oof("kbpg="+kbpg); }
 if(row<0||row>3)   { Oof("row="+row);   }
 //-------------
 if(row==0)
  {
  if(kbpg==0) { str="qwertyuiop"; } else
  if(kbpg==1) { str="QWERTYUIOP"; } else
  if(kbpg==2) { str="1234567890"; } else
  if(kbpg==3) { str="1234567890"; }
  ch=str.charAt(idx);
  }
 else
 if(row==1)
  {
  if(kbpg==0) { str="asdfghjkl"; } else
  if(kbpg==1) { str="ASDFGHJKL"; } else
  if(kbpg==2) { str="-/:;()$=@"; } else
  if(kbpg==3) { str="[]{}#%^*+"; }
  ch=str.charAt(idx);
  }
 else
 if(row==2)
  {
  if(kbpg==0) { str="~zxcvbnm`"; } else
  if(kbpg==1) { str="~ZXCVBNM`"; } else
  if(kbpg==2) { str="~.,?!+#*`"; } else
  if(kbpg==3) { str="~=!_+-*/`"; }
  ch=str.charAt(idx);
  if(ch=="~") { ch="cfg"; }   else
  if(ch=="`") { ch="<<";  }
  }
 else
 if(row==3)
  {
  if(kbpg==0) { str="~!`"; } else
  if(kbpg==1) { str="~!`"; } else
  if(kbpg==2) { str="~!`"; } else
  if(kbpg==3) { str="~!`"; }
  ch=str.charAt(idx);
  if(ch=="~")
   {
   if(kbpg==0) { ch="ABC"; } else
   if(kbpg==1) { ch="123"; } else
   if(kbpg==2) { ch="#+="; } else
   if(kbpg==3) { ch="abc"; }
   }
  else
  if(ch=="!") { ch="SPACE"; }
  if(ch=="`") { ch="GO";    }
  }
 return ch;
 }


 function ChatUxPaintKeyboardRow(disp,row)
 {
 var han,obj,ctx;
 var dww,dhh;
 var kbr,svt;
 var z,ray;
 var zt,zh,zw,zl,ky,sy;
 var hh,ww;
 var xshift;
 var row_rec,p,shrink,xstuff,ch;
 codeHit("chatuxpaintkeyboardrow",0);
 //-------------------------------------------------------
 if((han=gui.IdFind("maincan"))==0)        { Oof(); }
 if((obj=gui.Get(han))==null)              { Oof(); }
 if((ctx=gui.CanvasContextGet(han))==null) { Oof(); }

 ctx=ctxFontStyle(ctx,"arial 800 42px","center","middle");

 dww=disp.win_wid;
 dhh=disp.win_hit;
 kbr=gui.Get(gui.IdFind("keybdiv")).b_rect;
 svt=gui.Get(gui.IdFind("selfvid")).b_rect.top;

 xshift=0;
 zl=kbr.left;
 zt=kbr.top+8;
 zw=(kbr.width);
 zh=kbr.height-10;
 if(disp.win_ratio>1.5)   { zw*=0.64;   xshift=(dww-zw)/2; }
 if(env.is_mobile)        { zh-=main.app.kbkey_yshift; }
 hh=0;
 ww=8;
 sy=zh/4;
 ray=[]; for(z=0;z<10;z++) {  ray[z]={}; }
 row_rec=gui.RectSet(row_rec,0,zt+(sy*row),disp.win_wid,sy);
 if(do_flicker==true||1)
  {
  ctx.fillStyle=gui.RgbaSet(0x1f+(row*60),0xa0,0xc0-(row*50),1.0);
  ctx.strokeStyle=gui.RgbaSet(0x4f,0x20,0x40,1.0);
  ctx.fillRect(row_rec.x1,row_rec.y1,row_rec.w,row_rec.h);
  ctx.strokeRect(row_rec.x1,row_rec.y1,row_rec.w,row_rec.h);
  }
 shrink=+8;
 xstuff=-3;
 switch(row)
  {
  case 0:
  for(z=0;z<10;z++) { GridCords(ray[z],zw,zh,(z*10.0)+2.5,0.0,ww,hh);                ray[z].y1=row_rec.y1;                  ray[z].y2=row_rec.y2;              ray[z].h=sy;    }
  for(z=0;z<10;z++) { ray[z].x1+=(xshift+(xstuff));  ray[z].x2+=(xshift-(xstuff*2)); ray[z].y1+=shrink; ray[z].y2-=shrink;  ray[z].w=(ray[z].x2-ray[z].x1)+1;  ray[z].h=(ray[z].y2-ray[z].y1)+1; }
  for(z=0;z<10;z++) { ray[z].x1=parseInt(ray[z].x1); ray[z].y1=parseInt(ray[z].y1);  ray[z].x2=parseInt(ray[z].x2);         ray[z].y2=parseInt(ray[z].y2);     ray[z].w=parseInt(ray[z].w); ray[z].h=parseInt(ray[z].h);    }
  for(z=0;z<10;z++) {    ChatUxPaintKey(ctx,ray[z].x1,ray[z].y1,ray[z].w,ray[z].h,kbLayout(keyboard_page,row,z),row_rec);    }
  break;

  case 1:
  for(z=0;z<10;z++) { GridCords(ray[z],zw,zh,2.5+(z*10.0)+5.0,0.0,ww,hh);            ray[z].y1=row_rec.y1;                  ray[z].y2=row_rec.y2;              ray[z].h=sy;    }
  for(z=0;z<10;z++) { ray[z].x1+=(xshift+(xstuff));  ray[z].x2+=(xshift-(xstuff*2)); ray[z].y1+=shrink; ray[z].y2-=shrink;  ray[z].w=(ray[z].x2-ray[z].x1)+1;  ray[z].h=(ray[z].y2-ray[z].y1)+1; }
  for(z=0;z<10;z++) { ray[z].x1=parseInt(ray[z].x1); ray[z].y1=parseInt(ray[z].y1);  ray[z].x2=parseInt(ray[z].x2);         ray[z].y2=parseInt(ray[z].y2);     ray[z].w=parseInt(ray[z].w); ray[z].h=parseInt(ray[z].h);    }
  for(z=0;z<9;z++)  {    ChatUxPaintKey(ctx,ray[z].x1,ray[z].y1,ray[z].w,ray[z].h,kbLayout(keyboard_page,row,z),row_rec);    }
  break;

  case 2:
  for(z=0;z<10;z++) { GridCords(ray[z],zw,zh,7.5+(z*10.0),0.0,ww,hh);                ray[z].y1=row_rec.y1;                  ray[z].y2=row_rec.y2;              ray[z].h=sy;    }
  z=0;                GridCords(ray[z],zw,zh,2.5,0.0,12.5,hh);  ray[z].y1=row_rec.y1;    ray[z].y2=row_rec.y2;    ray[z].h=sy;
  z=8;                GridCords(ray[z],zw,zh,87.5,0.0,12.5,hh);  ray[z].y1=row_rec.y1;    ray[z].y2=row_rec.y2;    ray[z].h=sy;
  for(z=0;z<10;z++) { ray[z].x1+=(xshift+(xstuff)); ray[z].x2+=(xshift-(xstuff*2)); ray[z].y1+=shrink; ray[z].y2-=shrink;  ray[z].w=(ray[z].x2-ray[z].x1)+1; ray[z].h=(ray[z].y2-ray[z].y1)+1; }
  for(z=0;z<10;z++) { ray[z].x1=parseInt(ray[z].x1); ray[z].y1=parseInt(ray[z].y1); ray[z].x2=parseInt(ray[z].x2); ray[z].y2=parseInt(ray[z].y2);  ray[z].w=parseInt(ray[z].w); ray[z].h=parseInt(ray[z].h);    }
  for(z=0;z<9;z++)  {    ChatUxPaintKey(ctx,ray[z].x1,ray[z].y1,ray[z].w,ray[z].h,kbLayout(keyboard_page,row,z),row_rec);    }
  break;

  case 3:
  for(z=0;z<10;z++) { GridCords(ray[z],zw,zh,7.5+(z*10.0),0.0,ww,hh);               ray[z].y1=row_rec.y1;                  ray[z].y2=row_rec.y2;    ray[z].h=sy;    }
  z=0; GridCords(ray[z],zw,zh,2.5,0.0,12.5,hh);  ray[z].y1=row_rec.y1;    ray[z].y2=row_rec.y2;    ray[z].h=sy;
  z=1; GridCords(ray[z],zw,zh,17.5,0.0,67.5,hh); ray[z].y1=row_rec.y1;    ray[z].y2=row_rec.y2;    ray[z].h=sy;
  z=2; GridCords(ray[z],zw,zh,87.5,0.0,12.5,hh); ray[z].y1=row_rec.y1;    ray[z].y2=row_rec.y2;    ray[z].h=sy;
  for(z=0;z<10;z++) { ray[z].x1+=(xshift+(xstuff)); ray[z].x2+=(xshift-(xstuff*2)); ray[z].y1+=shrink; ray[z].y2-=shrink;  ray[z].w=(ray[z].x2-ray[z].x1)+1; ray[z].h=(ray[z].y2-ray[z].y1)+1; }
  for(z=0;z<10;z++) { ray[z].x1=parseInt(ray[z].x1); ray[z].y1=parseInt(ray[z].y1); ray[z].x2=parseInt(ray[z].x2); ray[z].y2=parseInt(ray[z].y2);  ray[z].w=parseInt(ray[z].w); ray[z].h=parseInt(ray[z].h);    }
  for(z=0;z<3;z++)  {    ChatUxPaintKey(ctx,ray[z].x1,ray[z].y1,ray[z].w,ray[z].h,kbLayout(keyboard_page,row,z),row_rec);    }
  break;
  }
 }



 function ChatUxPaintKey(ctx,xx,yy,ww,hh,key,rowrec)
 {
 var rec,spot,s,sz,r;
 if(do_flicker) { r=128; }
 else           { r=1;   }
 codeHit("chatuxpaintkey",0);
 //------------------------------------------
 if(rowrec.h>50)  {  yy=rowrec.y1+8;  hh=rowrec.h-16;  }
 else             {  yy=rowrec.y1+4;  hh=rowrec.h-8;  }
 rec=gui.RectSet(rec,xx,yy,ww,hh);
 sz=38; // see in ChatUxPaintKeyRow(..)  ctx=ctxFontStyle(ctx,"arial 600 36px","left","middle"); 36px
 spot=keyboard_spot_array[keyboard_spot_count];
 spot.name="keydown";
 spot.self_index=keyboard_spot_count;
 spot.keyCode=key.charCodeAt(0);
 spot.key=key;
 spot.ascii=spot.key.charCodeAt(0);
 spot.x1=rec.x1;
 spot.y1=rec.y1;
 spot.x2=rec.x2;
 spot.y2=rec.y2;
 spot.x1+=1; spot.x2-=1;
 spot.y1+=1; spot.y2-=1;
 spot.h=(spot.y2-spot.y1)+1;
 spot.w=(spot.x2-spot.x1)+1;
 keyboard_spot_array[keyboard_spot_count++]=spot;
 //---------------------------
 ctx=ctxStyle(ctx,2,"inner",gui.RgbaSet(0xff,0xff-num.Rand(r),0xff-num.Rand(r),1.0),gui.RgbaSet(0x2f,0x4f,0x9f,1.0));
 gui.CanvasShadowSet(gui.IdFind("maincan"),"transparent",0,0,0);
 CanvasPathRect(gui.CanvasContextFind(ctx),spot.x1,spot.y1,spot.w,spot.h);
 ctx.stroke();
 ctx.fill();
 //-------------------
 ctx.fillStyle=gui.RgbaSet(0xff,0xff,0xff,1.0);
 //--------------------
 if(key=="cfg")
  {
  //ctx.save();
  if(cfg_state>=1) {  ctx.strokeStyle="#ffff33";  if(env.is_mobile) { ctx.lineWidth=5;  } else { ctx.lineWidth=3;  } }
  else             {  ctx.strokeStyle="#ffffff";  if(env.is_mobile) { ctx.lineWidth=3;  } else { ctx.lineWidth=2;  } }
  ctx.lineJoin="inner";
  if(env.is_mobile)   {     CanvasPaintBurger(gui.CanvasContextFind(ctx),xx+(ww/2)-(24/2),yy+10,24,hh-10);   }
  else                {     CanvasPaintBurger(gui.CanvasContextFind(ctx),xx+(ww/2)-(20/2),yy+14,20,hh-18);   }
  ctx.stroke();
  //ctx.restore();
  }
 else
  {
  if( env.is_mobile&&key.length==1) {  ctx.fillText(key,parseInt(xx+(ww/2)),parseInt(yy+(hh/2))-2); } else
  if( env.is_mobile&&key.length!=1) {  ctx.fillText(key,parseInt(xx+(ww/2)),parseInt(yy+(hh/2))+2); }
  if(!env.is_mobile&&key.length==1) {  ctx.fillText(key,parseInt(xx+(ww/2)),parseInt(yy+(hh/2))-0); } else
  if(!env.is_mobile&&key.length!=1) {  ctx.fillText(key,parseInt(xx+(ww/2)),parseInt(yy+(hh/2))+1); }
  }
 }


