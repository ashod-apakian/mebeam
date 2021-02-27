



/*-----------------------------------------------------------------------*/


 function konsole(bg,fg,sz,wt,txt)
 {
 ///console.log(txt);
 return;
 var pre;
 var str="";
 sz-=2;
 str+="font-family:consolas;";
 if(isNaN(bg)==false)          {  str+="background:"+gui.ColourGet(bg)+";";  }
 else                          {  str+="background:"+bg+";";  }
 if(isNaN(fg)==false)          {  str+="color:"+gui.ColourGet(fg)+";";  }
 else                          {  str+="color:"+fg+";";  }
 str+="font-size:"+sz+"px;";
 str+="font-weight:"+wt+";";
 str+="line-height:150%;";
 str+="padding:5px;";
 str+="margin:-1px;";
 pre=num.Pad(num.Fixed(timer.TikNow(true),2),10,'0');
 console.log("%c"+pre+": "+txt,str);
 }






/*-----------------------------------------------------------------------*/





 function DbInit()
 {
 codeHit("dbinit",0);
 if(main.vars.is_pushy!=true)  { return false; }
 if(db_sys.is_init!==undefined) { return true; }
 konsole("#5588ff","#000000",18,200,"DbInit()");
 db_sys.is_init=true;
 db_sys.last_cmd=null;
 db_sys.que=[];
 if(!window.indexedDB)  { konsole(5,15,20,100,"no IndexedDB.");  DbStateSet(666);  return true;  }
 db_phaze=0;
 db_array=[];
 db_digest="";//sha1(JSON.stringify(db_array));
 DbStageSet(0);
 return true;
 }



 function DbStageSet(stage)
 {
 codeHit("dbstageset",0);
 if(db_sys.is_init!=true)      { return false;   }
 db_sys.stage=stage;
 return true;
 }




 function DbOpen()
 {
 var i,objstor;
 db_state=0;
 codeHit("dbopen",0);
 konsole("#5588ff","#000000",18,200,"DbOpen");
 db_request=window.indexedDB.open(db_name,db_ver);
 db_request.onerror=function(event)   {  konsole(10,15,20,100,"err");  db_state=666;  return;  }
 db_request.onsuccess=function(event)
  {
  konsole("#5588ff","#000000",18,200,"DbOpen on Success");
  db=db_request.result;
  db_state=1;
  return;
  }
 db_request.onupgradeneeded=function(event)
  {
  konsole("#5588ff","#000000",18,200,"DbOpen on upgrade needed");
  db=event.target.result;
  objstore=db.createObjectStore(os_name,{keyPath:"id",autoIncrement:true});
  for(i in OptionsData)   {   objstore.add(OptionsData[i]);   }
  var tran=event.target.transaction;
  tran.oncomplete=function(event)
   {
   konsole("#5588ff","#000000",18,200,"DbOpen on complete");
   konsole(10,15,20,100,"upgrade finished");
   db_state=2;
   }
  return;
  }
 }




 function DbClose()
 {
 codeHit("dbclose",0);
 konsole("#5588ff","#000000",18,200,"DbClose");
 db.close();
 db_request=null;
 db_cursor=null;
 db_state=0;
 db=null;
 }





 function DbReadAll()
 {
 var obj,req,tran,objstor,out,i;

 codeHit("dbreadall",0);
 db_state=0;
 db_array=[];
 ///db_digest=sha1(JSON.stringify(db_array));

 tran=db.transaction([os_name],"readwrite");//only"); // was readonly
 objstor=tran.objectStore(os_name);

 tran.oncomplete=function(event)
  {
  konsole("#5588ff","#000000",18,200,"DbReadAll oncomplete");
  out=[];
  for(i=0;i<db_array.length;i++)
   {
   obj=JSON.parse(db_array[i].val);
   out.push(db_array[i].val);
   }
  db_digest=sha1(JSON.stringify(out));
  db_state=1;
  if(ntfy_last_hash=="")
   {
   ntfy_last_hash=db_digest;
   }
  konsole("#c0c0f0","#201120",20,100,"dbreadall, cn="+db_array.length+" hsh="+db_digest);
  return;
  };
 tran.onerror=function(event)     {  konsole("#202040","#d0e0f0",20,100,"err");   konsole("#202040","#d0e0f0",20,100,"ev="+event);  db_state=666;  return;  };
 tran.onabort=function(event)     {  konsole("#202040","#d0e0f0",20,100,"abo");  db_state=44;  return;  }
 req=objstor.openCursor();
 req.onsuccess=function(event)
  {
  //konsole("#5588ff","#000000",18,200,"DbReadAll onsuccess");
  db_cursor=event.target.result;
  if(db_cursor)
   {
   obj={};
   obj.id=db_cursor.key;
   obj.key=db_cursor.value.ky;
   obj.val=db_cursor.value.vl;
   //konsole("#c0c0f0","#201120",20,100,"pushing "+JSON.stringify(obj));
   //console.log(JSON.stringify(obj));
   db_array.push(obj);
   db_cursor.continue();
   }
  };
 req.onerror=function(event)  {  db_state=667;  return;  };
 }





 function DbClear()
 {
 db_state=0;
 codeHit("dbclear",0);
 db_request=db.transaction([os_name],"readwrite").objectStore(os_name).clear();
 db_request.onsuccess=function(event)  {  db_state=1;    return;  }
 db_request.onerror=function(event)    {  db_state=666;  return;  }
 }




 function DbRemove(key)
 {
 db_state=0;
 codeHit("dbremove",0);
 db_request=db.transaction([os_name],"readwrite").objectStore(os_name).delete(key);
 db_request.onsuccess=function(event)  { console.log("delete ok key="+key); db_state=1;    return;  }
 db_request.onerror=function(event)    { console.log("delete fail");  db_state=666;  return;  }
 }




 function DbAdd(kyv,vlv)
 {
 codeHit("dbadd",0);
 var what={ ky: kyv,vl:vlv};

 db_state=0;
 ///konsole("#5588ff","#000000",18,200,"DbAdd");
 db_request=db.transaction([os_name],"readwrite").objectStore(os_name).put(what);
 db_request.onsuccess=function(event)
  {
  db_state=1;
  konsole("#c0c0a0","#202010",13,100,"((((((((((((((( Dbadd "+JSON.stringify(what,0,2));
  };
 db_request.onerror=function(event)
  {
  /// konsole("#c0c0a0","#202010",20,200,"dbaddfail");
   db_state=666;
   }
 return true;
 }



 function DbUpdate(kyv,vlv)
 {
 var i;
 var what={ ky: kyv,vl:vlv};

 codeHit("dbupdate",0);
 ///konsole("#5588ff","#000000",18,200,"DbUpdate");
 i=isRoomBookmarked(main.vars.my_info.room);
 if(i>=0)
  {
  konsole("#a0a0c0","#152020",13,100,"updating , first remove id "+db_array[i].id);
  db_state=0;
  db_request=db.transaction([os_name],"readwrite").objectStore(os_name).delete(db_array[i].id);
  db_request.onsuccess=function(event)
   {
   DbAdd("bookmark",vlv);
   konsole("#c0c0a0","#202010",13,100,"((((((((((((((( Dbupdate "+JSON.stringify(what,0,2));
   }
  db_request.onerror=function(event)
   {
   console.log("delete fail");
   }
  return;
  }
 else
  {
  /// konsole("#a0a0c0","#152020",20,100,"adding new bookmark ");
  db_state=0;
  DbAdd("bookmark",vlv);//JSON.stringify(delme));
  }
 return;

 db_state=0;
 db_request=db.transaction([os_name],"readwrite").objectStore(os_name).delete(kyv);
 db_request.onsuccess=function(event)
  {
//   delme={};
//   delme.room=rn;
//   delme.mode=db_mode;
  console.log("delete up ok");
  console.log(vlv);
  DbAdd("bookmark",vlv);//JSON.stringify(delme));
  //DbAdd("bookmark",JSON.stringify(vlv));
//  console.log("dele succ");
//  db_state=1;
  return;
  }
 db_request.onerror=function(event)
  {
  console.log("dele fail");
  db_state=666;
  return;
  }

 return true;
 }







 function DbCmdClear()
 {
 var obj;
 codeHit("dbcmdclear",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 obj={};
 obj.cmd="clear";
 db_sys.que.push(obj);
 return true;
 }


 function DbCmdRemove(key)
 {
 var obj;
 codeHit("dbcmdremove",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 obj={};
 obj.cmd="remove";
 obj.key=key;
 db_sys.que.push(obj);
 return true;
 }




 function DbCmdAdd(what,val)
 {
 var obj;
 codeHit("dbcmdadd",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 ///console.log("!!!!!!!DBCMDADD "+what+" "+val);
 obj={};
 obj.cmd="add";
 obj.what=what;
 obj.val=val;
 db_sys.que.push(obj);
 return true;
 }


 function DbCmdUpdate(key,val)
 {
 var obj;
 codeHit("dbcmdupdate",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 ///console.log("!!!!!!!DBCMDUPDATE "+key+" "+val);
 obj={};
 obj.cmd="update";
 obj.val=val;
 obj.key=key;
 db_sys.que.push(obj);
 return true;
 }



 function DbCmdNop(key,val)
 {
 var obj;
 codeHit("dbcmdnop",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 ///console.log("!!!!!!!DBCMDNOP "+key+" "+val);
 obj={};
 obj.cmd="nop";
 obj.val=val;
 obj.key=key;
 db_sys.que.push(obj);
 return true;
 }

/*---------------------*/



 function DbAck()
 {
 codeHit("dback",0);
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 //konsole("#5588ff","#000000",18,200,"DbAck stage ="+db_sys.stage);
 if(db_sys.stage!=1500&&db_sys.stage!=1600) { return false; }
 db_sys.stage=1600;
 return true;
 }



 function DbDump()
 {
 var i;
 alert();

 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return false;   }
 if(db_array.length<=0) {  konsole("#202040","#d0e0f0",20,100,"nothing to dump"); return true; }
 ///console.log("DbDump: "+db_array.length+"  "+db_array_final.length);
 for(i=0;i<db_array.length;i++)  {   konsole("#202040","#d0e0f0",20,100,"i="+i+"/"+db_array.length+" id="+db_array[i].id+"  key="+db_array[i].key+"  val="+db_array[i].val);  }
 return true;
 }



/*-----------------------------------------------------------------------*/


 function DbEngine()
 {
 var obj,go,i,j,bm;

 codeHit("dbengine",0);
 if(main.vars.is_pushy!=true)  { return;   }
 if(db_sys.is_init==undefined) { DbInit(); }
 if(db_sys.is_init!=true)      { return;   }
 go=14;
 while(go>0)
  {
  switch(db_sys.stage)
   {
   case 0:
   DbStageSet(100);
   break;

   case 100:
   DbOpen();
   DbStageSet(2000);
   break;

   case 1300:
   DbClose();
   DbStageSet(1500);
   break;

   case 1500:
   db_ready=true;
   go=1;
   break;

   case 1600:
   if(db_sys.que.length==0)    {    DbStageSet(1500);    go=1;    break;    }
   db_sys.last_cmd=db_sys.que.shift();
   konsole("#5588ff","#000000",18,200,"DbEngine, stage 1600, cmd = "+JSON.stringify(db_sys.last_cmd,0,2));
   go=1;
   DbStageSet(1700);
   break;

   case 1700:
   DbOpen();
   DbStageSet(1800);
   break;

   case 1800:
   if(db_state==0)   { break; }
   if(db_state==666) { DbStageSet(666); break; }
   if(db_state!=1&&db_state!=2)   { Oof("db_sys.stage="+db_sys.stage+" db_state="+db_state); break; } //DbStageSet(666); break; }
   DbStageSet(1900);
   break;

   case 1900:
   if(db_sys.last_cmd)
    {
    if(db_sys.last_cmd.cmd=="add")     {     DbAdd(db_sys.last_cmd.what,db_sys.last_cmd.val);     DbStageSet(2000);     break;     }
    if(db_sys.last_cmd.cmd=="remove")  {     DbRemove(db_sys.last_cmd.key);                       DbStageSet(2000);     break;     }
    if(db_sys.last_cmd.cmd=="clear")   {     DbClear();                                           DbStageSet(2000);     break;     }
    if(db_sys.last_cmd.cmd=="update")  {     DbUpdate(db_sys.last_cmd.key,db_sys.last_cmd.val);   DbStageSet(2000);     break;     }
    if(db_sys.last_cmd.cmd=="nop")     {     DbStageSet(2000);     break;     }
    }
   DbClose();
   DbStageSet(1600);
   break;


   case 2000:
   if(db_state==0) { break; }
   if(db_state!=1&&db_state!=2)   { Oof("db_sys.stage="+db_sys.stage+" db_state="+db_state); DbStageSet(666); break; }
   DbReadAll();
   DbStageSet(2100);
   break;

   case 2100:
   if(db_state==0) { break; }
   if(db_state!=1&&db_state!=2)   { Oof("db_sys.stage="+db_sys.stage+" db_state="+db_state); DbStageSet(666); break; }
   DbStageSet(1300);
   break;
   }
  go--;
  }
 return true;
 }



/*-----------------------------------------------------------------------*/
/*-----------------------------------------------------------------------*/



 function DbProcess ()
 {
 var i,delme,changed,obj,rn;

 codeHit("dbprocess",0);
 DbEngine();
 if(db_sys.is_init!=true) { return false; }
 if(db_sys.stage!=1500)   { return true;  }
  switch(db_phaze)
  {
  case 0:
  DbAck();
  break;

  case 10000:
  rn=db_parm;
  i=isRoomBookmarked(rn);
  konsole("#5588ff","#000000",18,200,"db_phaze="+db_phaze+" isroombookmarker("+rn+") = "+i);
  if(i>=0)
   {
   konsole("#202020","#aaff00",18,200,"cmdadd failed for "+rn+" as exists");
   DbCmdRemove(db_array[i].id);
   }
  else
   {
   delme={};
   delme.room=rn;
   delme.mode=db_mode;
   DbCmdAdd("bookmark",JSON.stringify(delme));
   }
  DbAck();
  ntfy_needed=1;
  db_phaze=0;
  break;


  case 15000:
  rn=db_parm;
  i=isRoomBookmarked(rn);
  konsole("#5588ff","#000000",18,200,"db_phaze="+db_phaze+" isroombookmarker("+rn+") = "+i);
  if(i>=0)
   {
   DbAck();
   DbCmdRemove(db_array[i].id);
   db_phaze=10000;
   }
  else
   {
   DbAck();
   db_phaze=10000;
   break;
   }
  break;


  case 25000:
  DbAck();
  delme={};
  delme.room=rn;
  delme.mode=db_mode;
  DbCmdNop("bookmark",JSON.stringify(delme));
  rn=db_parm;
  DbAck();
  ntfy_needed=1;
  db_phaze=0;
  break;




  }
 return true;
 }




/*-----------------------------------------------------------------------*/



 function isRoomBookmarked (room)
 {
 var i,obj;
 codeHit("isroombookmarked",0);
 for(i=0;i<db_array.length;i++)
  {
  obj=JSON.parse(db_array[i].val);
  if(obj.room==room)   {   obj={};   return i;   }
  obj={};
  }
 return -1;
 }




 function toggleBookmarked (room)
 {
 if(db_sys.is_init!=true) { return false; }
 codeHit("togglebookmarked",0);
 konsole("#a0a0c0","#152020",20,100,"toggleBookmarked "+room);
 //isRoomBookmarked(room)

 while(1)  {  DbEngine();  if(db_sys.stage==1500) { break; }  console.log("db_sys.stage="+db_sys.stage); }
 db_parm=room;
 db_mode=0;
 if(main.vars.my_info.room==room)
  {
  db_mode=current_chat_last_stamp;
  }


 db_phaze=10000;
 return true;
 }



 function regetBookmarks (room)
 {
 //alert();
 codeHit("regetbookmarks",0);
 if(db_sys.is_init!=true) { return false; }
 konsole("#a0a0c0","#152020",20,100,"regget ookmarked "+room);
 while(1)  {  DbEngine();  if(db_sys.stage==1500) { break; }  }
 db_parm=room;
 db_mode=0;
 db_phaze=25000;
 return true;
 }





 function updateBookmark (room,utc)
 {
 var i,j;

 codeHit("updatebookmarks",0);
 if(db_sys.is_init!=true) { return false; }
 konsole("#c0c0a0","#202010",20,100,"updateBookmark "+room+" "+utc);
 //for(i=0;i<db_array.length;i++)  {
 while(1)  {  DbEngine();  if(db_sys.stage==1500) { break; }  }
 db_parm=room;
 db_mode=utc;
 db_phaze=15000;
 return true;
 }



/*-----------------------------------------------------------------------*/
/*-----------------------------------------------------------------------*/



 function PwaSupportCheck()
 {
 var res;
 res=0;
 codeHit("pwasupportcheck",0);
 if(('serviceWorker' in navigator)) { res+=1;  }
 if(('PushManager' in window))      { res+=2; }
 ///konsole(25,15,20,100,"PwaSupportCheck="+res);
 return res;
 }





 function PwaInit()
 {
 codeHit("pwainit",0);
 ///konsole(30,15,20,100,"PwaInit");
 pwa={};
 pwa.support_level=PwaSupportCheck();
 pwa.registration=null;
 pwa.registration_err=null;
 pwa.subscription=null;
 pwa.subscription_err=null;
 pwa.is_subscribed=null;
 pwa.is_messaging_blocked=null;
 pwa.is_messaging_enabled=null;
 pwa.is_disabled=null;
 pwa.subs_digest=null;
 pwa.subs_object=null;
 return true;
 }






 function PwaRegisterServiceWorker()
 {
 codeHit("pwaregisterserviceworker",0);
 pwa.registration=null;
 pwa.registration_err=null;
 navigator.serviceWorker.register(sw_script).then(function(swReg)
  {
  konsole(55,"#e0ff20",20,100,"PwaRegisterServiceWorker "+sw_script+" is registered");
  pwa.registration=swReg;
  pwa.registration_err=false;
  PwaInitializeUI();
  ///pwa.registration.active.postMessage(main.vars.my_info.room);//"Hi service worker");
  })
 .catch(function(error)
  {
  pwa.registration_err=error;
  });
 }





 function PwaFixSubscription(subscription)
 {
 codeHit("pwafixsubscription",0);
 var etc,sus,dig,nfo;
 pwa.subscription=subscription;
 sus=JSON.parse(JSON.stringify(subscription));

  etc={};
  etc.ua=navigator.userAgent;
  etc.ip=geo_json.ip;
  etc.cc=geo_json.country_code;
  etc.fingerprint=fingerPrint();
  etc.is_mobile=env.is_mobile;
  etc.is_win=env.is_win;
  etc.is_standalone=env.is_standalone;
  etc.br_who=env.browser_who;
  etc.br_name=env.browser_name;
  etc.br_version=env.browser_version;
  etc.br_platform=env.browser_platform;

  //etc={};
  //etc.one=nfo;//JSON.stringify(nfo);

  nfo={};
  nfo.endpoint=sus.endpoint;
  nfo.expires=sus.expirationTime;
  nfo.auth=sus.keys.auth;
  nfo.p256dh=sus.keys.p256dh;

  //etc.nfo=nfo;


  //etc.one=JSON.stringify(nfo);

  /*
  etc.subs={};
  etc.subs.endpoint=sus.endpoint;
  etc.subs.expire=sus.expirationTime;
  etc.subs.auth=sus.keys.auth;
  etc.subs.p256dh=sus.keys.p256dh;
  */

 pwa.subs_object=nfo;
 pwa.subs_digest=sha1(JSON.stringify(nfo));//pwa.subs_object));

///  etc.digest=pwa.subs_digest;
  //msg={"cmd":"updateSubs","ali":main.vars.my_info.alias,"subs":pwa.subs,"dig":pwa.digest,"etc":etc};
  //wock.Write(main.vars.wock_handle,JSON.stringify(msg));
  //meg={"cmd":"updateSubs","ali":main.vars.my_info.alias,"subs":subscription,"dig":sha1(JSON.stringify(subscription)),"moo":moo};
 }






 function PwaInitializeUI()
 {
 codeHit("pwainitializeui",0);
 pwa.is_disabled=true;
 pwa.registration.pushManager.getSubscription().then(function(subscription)
  {
  pwa.is_subscribed=!(subscription===null);
  if(pwa.is_subscribed)
   {
   PwaFixSubscription(subscription);
   pwa.is_messaging_blocked=false;
   pwa.is_messaging_enabled=true;
   konsole("#101050","#30c0d0",20,100,"getsubscription, is subs");
   }
  else
   {
   konsole("#101050","#30c0d0",20,100,"getsubscription, is not subs "+Notification.permission);
   pwa.is_messaging_enabled=false;
   if(Notification.permission==='denied')    {   pwa.is_messaging_blocked=true;    }
   else                                      {   pwa.is_messaging_blocked=false;   }
   }
  pwa.is_disabled=false;
  PwaUpdateButton();
  PwaUpdateSubscriptionOnServer(pwa.subscription);

  });
 }





 function PwaUpdateButton()
 {
 codeHit("pwaupdatebuttoni",0);
 konsole("#803040","#e0c030",20,100,"PwaUpdateButton, Notification.permission="+Notification.permission+" pwa.is_subs="+pwa.is_subscribed+" msg_blocks="+pwa.is_messaging_blocked+" isdis="+pwa.is_disabled);

 if(Notification.permission==='denied')
  {
  pwa.is_messaging_blocked=true;
  pwa.is_disabled=true;
  konsole(88,15,20,100,"PwaUpdateButton, perm=denied, msg_blocked=true  disabled=true  is_subscripbed="+pwa.is_subscribed);
  //PwaUpdateSubscriptionOnServer(null)
  pwa.is_disabled=false;
  return;
  }


/*
 if(Notification.permission==='denied')
  {
  pwa.is_messaging_blocked=true;
  pwa.is_disabled=true;
  konsole(88,15,20,100,"PwaUpdateButton, perm=denied, msg_blocked=true  disabled=true  is_subscripbed="+pwa.is_subscribed);
  PwaUpdateSubscriptionOnServer(null)
  return;
  }
 if(pwa.is_subscribed)  { pwa.is_messaging_enabled=true;  }
 else                   { pwa.is_messaging_enabled=false;  }
  */
 pwa.is_disabled=false;
 //konsole(88,15,20,100,"PwaUpdateButton, qqqqqq perm="+Notification.permission+" is_subscribed="+pwa.is_subscribed);
 }










 function PwaUserSubscribe()
 {
 codeHit("pwausersubscribe,0");

 konsole(60,15,20,100,"PwaUserSubscribe");
 const applicationServerKey=urlB64ToUint8Array(applicationServerPublicKey);
 pwa.is_disabled=true; ///===-----------------
 pwa.registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:applicationServerKey}).then(function(subscription)
  {
  konsole(60,15,20,100,"subscribed successful");
  PwaFixSubscription(subscription);
  pwa.is_messaging_blocked=false;
  pwa.is_messaging_enabled=true;
  pwa.is_subscribed=true;
  //console.log(JSON.stringify(subscription,0,2));
  PwaUpdateSubscriptionOnServer(subscription);
//  pwa.is_subscribed=true;
  PwaUpdateButton();
  })
 .catch(function(err)
  {
  konsole(60,15,20,100,"!Failed to subscribe the user: "+err+" >>");
  PwaUpdateButton();
  });
 }







 function PwaUserUnsubscribe()
 {
 codeHit("pwauserUnsubscribe",0);
 konsole(65,15,20,100,"PwaUserUnsubscribe");
 pwa.is_disabled=true; ///===-----------------
 pwa.registration.pushManager.getSubscription().then(function(subscription)
  {
  konsole(65,15,20,100,"getsubscription successful");
  //konsole(65,15,20,100,JSON.stringify(subscription,0,'\t').replaceAll("https://","https:::"));
  pwa.subscription=subscription;
  if(subscription) {      return pwa.subscription.unsubscribe();    }
  })
 .catch(function(error)
  {
  konsole(65,15,20,100,"Error unsubscribing"+ error);
  PwaUpdateButton();
  //pwa.is_disabled=false; ///===-----------------
  })
 .then(function()
  {
  console.log("unsubscribed "+pwa.subs_digest);
  pwa.is_subscribed=false;
  PwaUpdateSubscriptionOnServer(null);
  pwa.subscription=null;
  pwa.subscription_err=null;
  pwa.subs_object=null;
  pwa.subs_digest=null;//;sha1(JSON.stringify(nfo));//pwa.subs_object));
  konsole(65,15,20,100,"unsubscribe successful");
  //pwa.digest=null;
  //pwa.sub=null;
  PwaUpdateButton();
  });
 }






 function PwaUpdateSubscriptionOnServer(subscription)
 {
 var txt,msg,etc,sus,out,i,obj,nfo;
 codeHit("pwaupdatesubscriptiononserver",0);
 if(pwa.subs_digest==null) { return; }
 //konsole(70,15,20,100,"PwaUpdateSubscriptionOnServer "+pwa.is_subscribed);
 if(pwa.is_subscribed==true||pwa.is_subscribed==false)
  {
 // sus=JSON.parse(JSON.stringify(subscription));
 // sus=JSON.parse(JSON.stringify(pwa.subscription));
  sus=JSON.parse(JSON.stringify(pwa.subscription));
  msg={};
  msg.cmd="subShot";
  msg.ali=main.vars.my_info.alias;
   etc={};
   etc.endpoint=sus.endpoint;
   etc.expire=sus.expirationTime;
   etc.auth=sus.keys.auth;
   etc.p256dh=sus.keys.p256dh;
  msg.subs_obj=etc;
  msg.subs_dig=pwa.subs_digest;
  out=[];
  for(i=0;i<db_array.length;i++)
   {
   obj=JSON.parse(db_array[i].val);
   if(obj.mode>=0)
    {
    ///console.log(obj.room+"==="+parseInt(obj.mode));
    out.push({'room':obj.room,'mode':parseInt(obj.mode)});
    }
   }
  msg.marks=out;
  msg.state=pwa.is_subscribed;

  nfo={};
  nfo.ua=navigator.userAgent;
  nfo.ip=geo_json.ip;
  nfo.cc=geo_json.country_code;
  nfo.fingerprint=fingerPrint();
  nfo.is_mobile=env.is_mobile;
  nfo.is_win=env.is_win;
  nfo.is_standalone=env.is_standalone;
  nfo.br_who=env.browser_who;
  nfo.br_name=env.browser_name;
  nfo.br_version=env.browser_version;
  nfo.br_platform=env.browser_platform;
  msg.nfo=JSON.stringify(nfo);
  wock.Write(main.vars.wock_handle,JSON.stringify(msg));
  }
 else
  {
  alert(pwa.is_subscribed);
  }
 }






 function PwaClick()
 {
 codeHit("pwaclick", 0);
 pwa.is_disabled=true;
/// konsole("#c00000","#ffeeff",20,100,"PwaClick");
 if(pwa.is_subscribed)  {  konsole("#c00000","#ffeeff",20,100,"pwa.is_subscribed so unsubscribing");  }
 else                   {  konsole("#c00000","#ffeeff",20,100,"pwa.is_not_subscribed so trying to subscribe");  }
 if(pwa.is_subscribed)  {     PwaUserUnsubscribe();    }
 else                   {     PwaUserSubscribe();    }
 }








 function ntfyProcess ()
 {
 var out,i,obj,msg,etc;
 codeHit("ntfyprocess",0);
 if(main.vars.is_pwa!==true) { return; }
 ///printPushStats();
 if(ntfy_ms==0)  {  ntfy_ms=timer.MsRunning();  }

 switch(ntfy_stage)
  {
  case 0:
  if(pwa.is_subscribed==true)
   {
   konsole("#803040","#a0c030",20,100,"we are subscribed");
   konsole("#803040","#a0c030",20,100,JSON.stringify(pwa.subs_object));
   konsole("#803040","#a0c030",20,100,pwa.subs_digest);//JSON.stringify(pwa.subs_object));
   ntfy_stage=100;
   break;
   }
  break;

  case 100:
  if(pwa.is_subscribed==false)
   {
   konsole(75,15,20,100,"we are no longer subscribed");
   ntfy_stage=0;
   ntfy_ms=1;
   ///break;
   }
  if((timer.MsRunning()-ntfy_ms)>4500)//&&ntfy_last_hash==db_digest)
   {
   ///konsole(75,15,20,100,"sending subs");
   PwaUpdateSubscriptionOnServer(pwa.subscription);
   ntfy_ms=timer.MsRunning();
   }
  if(ntfy_last_hash!==db_digest)
   {
   out=[];
   for(i=0;i<db_array.length;i++)
    {
    obj=JSON.parse(db_array[i].val);
    out.push(db_array[i].val);
    //konsole(70,20,20,100,JSON.stringify(db_array[i].val));
    }
   ntfy_last_hash=db_digest;
   ///msg={"cmd":"chatNtfyData","ali":main.vars.my_info.alias,"marks":JSON.stringify(out),"dig":pwa.subs_digest,"state":pwa.is_subscribed};
   //wock.Write(main.vars.wock_handle,JSON.stringify(msg));
   //ntfy_last_hash=db_digest;
   }
  break;
  }
 }




