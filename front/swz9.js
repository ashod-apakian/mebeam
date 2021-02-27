

 const applicationServerPublicKey='BKeFzJCy6clKXqA5NOCNOBwjrpqORp4FQ5JwvC1fy-nXA9Klma4d8bWE1EsgPPLa-Q3xATy_ulQ2z5T5h9IsLH0';

 var show_log=1;




 function theStyle(str,weight,sz,bg,fg)
 {
 var str;

 sz=30;
 str="";
 str+="font-family:arial;";
 str+="background:"+bg+";";
 str+="color:"+fg+";";
 str+="font-size:"+sz+"px;";
 str+="font-weight:"+weight+";";
 str+="line-height:150%;";
 //str+="line-height:"+(sz)+"px;";
 //str+="max-height:"+(sz)+"px;";
 str+="padding:5px;";
 str+="margin:-1px;";
 //str+="-webkit-text-stroke:1px #664400;";
 str+="font-style:italic;";
 //str+="text-shadow: -1px 1px 2px #23430C,1px 1px 2px #23430C,1px -1px 0 #23430C,-1px -1px 0 #23430C;";
 return str;
 }





 function urlB64ToUint8Array(base64String)
 {
 const padding='='.repeat((4-base64String.length % 4) % 4);
 const base64=(base64String+padding).replace(/\-/g,'+').replace(/_/g,'/');
 const rawData=window.atob(base64);
 const outputArray=new Uint8Array(rawData.length);
 for(let i=0;i<rawData.length;++i) {  outputArray[i]=rawData.charCodeAt(i);  }
 return outputArray;
 }




 self.addEventListener('install',function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 if(show_log) { console.log("%csw: event=install",this_style); }
 event.waitUntil(self.skipWaiting());
 });




 self.addEventListener('activate',function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 if(show_log) { console.log("%csw: activate",this_style); }
 event.waitUntil(self.skipWaiting());
 });





 self.addEventListener('periodicsync',function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 if(show_log) { console.log("%csw: periodicstbc",this_style); }
 event.waitUntil(self.skipWaiting());
 });




 self.addEventListener('fetch',function(event)
 {
 if(show_log)
  {
  //var this_style=theStyle(this_style,660,24,"#67af00","#101088");
  //console.log("%csw: fetch event "+JSON.stringify(event.request,0,2),this_style);
  }
 event.waitUntil(self.skipWaiting());
 });



 self.addEventListener('message',function(event)
 {
 var r,i;
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 //if(show_log) { console.log("%csw: event=message",this_style); }
 console.log("%csw: event=message "+event.data,this_style);
 //event.source.postMessage("Hi client");
 self.clients.matchAll({type: "window"}).then(function(clients)
  {
  for (i = 0 ; i < clients.length ; i++)
   {
   r=clients[i].url.startsWith("https://mebeam.com");
   if(r==true)
    {
    event.source.postMessage(clients[i].url);//"go away");
    console.log(clients[i].url);
    //clients[i].focus();
    //self.clients.windowClose(clients[i].url);
    }
    //if (clientList[i].url === 'index.html') {      clients.openWindow(clientList[i]);      // or do something else involving the matching client    }
   }

  ///clients[i]
  // do something with your clients list
 });


 event.waitUntil(self.skipWaiting());
 });


 var tab_found=-2;

 /*

 function logTabsForWindows(windowInfoArray)
 {
 for (windowInfo of windowInfoArray)
  {
  console.log(`Window: ${windowInfo.id}`);
  console.log(windowInfo.tabs.map(tab => tab.url));
  }
 }

 function onError(error)
 {
 console.log(`Error: ${error}`);
 }
*/





 function tabExists(url)
 {
 var i,client,r,found,idx;

 tab_found=-2;
 found=false;
 idx=-1;
 clients.matchAll({type: "window"}).then(function(clientList)
  {
  console.log("A check tab exists "+url);
  for(i=0;i<clientList.length;i++)
   {
   client=clientList[i];
   r=client.url.startsWith(url);
   console.log(i+" "+clientList.length+"  "+client.url+"  "+r);
   if(r==true&&found==false) { found=true; idx=i; }
   }
  tab_found=idx;
  console.log("tab found = "+tab_found);
  return;
  });
 tab_found=-3;
 }



 /**
   ///if (client.url == '/' && 'focus' in client)     {    client.focus();    break;    }
    }

  }));

 clients.matchAll(options).then(function(clientList)
  {
  console.log("tab exists "+url);
  for (var i = 0 ; i < clientList.length ; i++)
   {
   client=clientList[i];
   r=client.url.startsWith(url);
   console.log(i+" "+clientList.length+"  "+client.url+"  "+r);
   if(r==true) { found=true; }
   //return true;
   }
  console.log("found = "+found);
  });
 console.log("checking");
 }
*/



 self.addEventListener('notificationclick', function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 var mat,r,any;
 if(show_log) { console.log("%cOn notification click:"+event.notification.tag,this_style); }

 event.waitUntil(clients.matchAll({    type: "window"  }).then(function(clientList)
  {
  any=false;
  for(var i=0;i<clientList.length;i++)
   {
   var client=clientList[i];
   mat="https://mebeam.com/"+event.notification.data;
   if(show_log) { console.log(i+" "+clientList.length+"  "+client.url+"  "+mat); }
   r=client.url.startsWith(mat);
   if(r==true)
    {
    console.log("focusing client and closing "+mat);
    event.notification.close();
    client.focus();
    any=true;
    break;
    }
   }
  if(clients.openWindow&&any==false)
   {
   mat="https://mebeam.com/"+event.notification.data;
   console.log("opening "+mat);
   clients.openWindow(mat);
   var promise=new Promise(function(resolve) {   console.log("res0");    setTimeout(resolve, 3000);    }).then(function()
    {
    console.log("resb, closing "+mat);
    event.notification.close();
    return clients.openWindow(mat);
    });
   console.log("waiting");
   event.waitUntil(promise);
   return;
   }
  }));
 });




 self.addEventListener('push', event =>
 {
 var base,tik,el,cyc;
 var extra={};
 var payload=event.data.text();
 var title="New message";
 var body=payload;//+get_utc+"  "+last_utc;//'A new message has been received.';
 var sound='https://mebeam.com/icq.wav';
 var icon='https://mebeam.com/favicon192x192.png';
 var badge='https://mebeam.com/notiicon.png';
 var tag='tag_'+payload;///'simple-push-demo-notification-tag';
 var any,client,mat,i;



 any=null;
 event.waitUntil(clients.matchAll({    type: "window"  }).then(function(clientList)
  {
  any=false;
  for(i=0;i<clientList.length;i++)
   {
   client=clientList[i];
   mat="https://mebeam.com/"+payload;
   r=client.url.startsWith(mat);
   if(r==true)    {    any=true;    break;    }
   /*
   if(payload=="chatlobby")
    {
    mat="https://mebeam.com";
    r=client.url.startsWith(mat);
    if(r==true)    {    any=true;    break;    }
    }
    */


   }
  console.log("aaaa="+any);
  if(any==false)
   {
   event.waitUntil(   registration.showNotification(title, { body: body,icon: icon, badge:badge,   tag: tag,   sound:sound,   data: payload    }));
   }

  }));



 /**


 //console.log("PUSH - "+payload);
 tik=parseInt(new Date().valueOf());
 base=tik;
 tabExists("https://mebeam.com/"+payload);
 //console.log("pre PUSH found = "+tab_found);
 cyc=0;
 while(1)
  {
  tik=parseInt(new Date().valueOf());
  el=tik-base;
  if((cyc%1000)==0) {   console.log(cyc+"  "+el+"  tf="+tab_found);  }
  cyc++;
  ///if(tab_found!=-3)   {   console.log(el+"  tf="+tab_found);  }
  if(tab_found>=0) { break; }
  if(el>=3000) { break; }
  }
 console.log(el+"  tf="+tab_found);
 if(tab_found>=0)
  {
  console.log("ignoreing");
//  event.waitUntil(self.skipWaiting());
  return;
  }
 //console.log("PUSH found = "+tab_found);
 */
 //console.log("any="+any);
 //event.waitUntil(   registration.showNotification(title, { body: body,icon: icon,   tag: tag,   sound:sound,   data: payload    }));
 });




 self.addEventListener('pushsubscriptionchange',function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 if(show_log) { console.log("%csw: event=pushsubscriptionchange",this_style); }
 });


 self.addEventListener('sync', function(event)
 {
 var this_style=theStyle(this_style,660,24,"#67af00","#101088");
 if(show_log) { console.log("%csync",this_style); }
 event.waitUntil(self.skipWaiting());
 });






