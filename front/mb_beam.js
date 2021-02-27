
/*-=---------------------------------------------------------------------*/

 function DimJpgSet(wid,hit,qul) { jpg_wid=wid; jpg_hit=hit; jpg_quality=qul; }
 function DimSlfSet(wid,hit)     { slf_wid=wid; slf_hit=hit; }
 function DimRcvSet(wid,hit)     { rcv_wid=wid; rcv_hit=hit; }

/*-=---------------------------------------------------------------------*/





 function hotspotArrayClear ()
 {
 codeHit("hotspotArrayClear",0);
 hotspot_array=[];
 }


 function hotspotArrayAdd (x,y,w,h,data,etc)
 {
 var c,obj;
 var han,obj,ktx,div;

 codeHit("hotspotArrayAdd",0);
 c=hotspot_array.length;
 obj={};
 obj.in_use=true;
 obj.x=x;
 obj.y=y;
 obj.w=w;
 obj.h=h;
 obj.x1=x;
 obj.y1=y;
 obj.x2=obj.x1+obj.w;
 obj.y2=obj.y1+obj.h;
 obj.data=data;
 obj.etc=etc;
 hotspot_array.push(obj);
 if(flash_spots==1)
  {
  div=parseInt(main.vars.display_stats.frame_count/20);
  div=div%2;
  if(div==0)
   {
   han=gui.IdFind("confcan");
   obj=gui.Get(han);
   ktx=gui.CanvasContextGet(han);
   ktx=ctxStyle(ktx,2,null,gui.RgbaSet(0xcc,0xcc,0x00,1.0),gui.RgbaSet(200,100,200,1.0));
   ktx.strokeRect(x,y,w,h);
   }
  }
 return true;
 }





/*-----------------------------------------------------------------------*/



 function ChatUxElementCreate(type,id,wid,hit,zi)
 {
 codeHit("ChatUxElementCreate",0);
 var han=gui.Create(type);
 gui.IdSet(han,id,0);
 gui.WidthHeightSet(han,wid,hit);//wid*disp.density,hit);
 gui.Get(han).dom.style.zIndex=zi;
 gui.Get(han).dom.style.display="none";
 gui.Get(han).dom.style.opacity=1.0;
 return han;
 }



 function CanvasPathRect (handle,xx,yy,ww,hh)
 {
 var obj,ctx,x1,y1,x2,y2;
 codeHit("CanvasPathRect",0);
 //-----------------------------------------
 if((obj=gui.Get(handle))==null) { return false; }
 if(obj.ctx==undefined) { return false; }
 ctx=obj.ctx;
 x1=xx;
 y1=yy;
 x2=(xx+ww)-1;
 y2=(yy+hh)-1;
 ctx.beginPath();
 ctx.moveTo(x1,y1); // tl
 ctx.lineTo(x2,y1); // tr
 ctx.lineTo(x2,y2); // br
 ctx.lineTo(x1,y2); // bl
 ctx.lineTo(x1,y1); // tl
 ctx.closePath();
 return true;
 }





 function CanvasPaintBurger (handle,xx,yy,ww,hh)
 {
 var obj,ctx,x1,y1,x2,y2,div;
 codeHit("CanvasPaintBurger",0);
 //-----------------------------------------
 if((obj=gui.Get(handle))==null) { return false; }
 if(obj.ctx==undefined) { return false; }
 if(hh<5) { hh=5; }
 yy-=2;
 ctx=obj.ctx;


 /*
// the logo and its shadow
 ctx.fillStyle=gui.RgbaSet(0x0f,0x0f,0x0f,1.0);
 ctx.fillRect(14,14,34,34);
 ctx.globalAlpha=1.0;
 ctx.drawImage(base_image,8,8,34,34);


*/

 x1=xx;
 y1=yy;
 x2=(xx+ww)-1;
 y2=(yy+hh)-1;
 ctx.beginPath();
 if(hh<20) { div=1.5; y1-=(hh/4); }
 else      { div=5.0; y1+=(hh/3); }
 ctx.moveTo(x1,y1); ctx.lineTo(x2,y1);
 y1+=(hh/div); ctx.moveTo(x1,y1); ctx.lineTo(x2,y1);
 y1+=(hh/div); ctx.moveTo(x1,y1); ctx.lineTo(x2,y1);
 ctx.closePath();
 return true;
 }








 function ChatUxPaintTextArea (ctx,xx,yy,ww,hh,str)
 {
 var metrix,han,div;
 codeHit("ChatUxPaintTextArea",0);
 //------------------------------------------
 ctx.save();
 CanvasPathRect(gui.CanvasContextFind(ctx),xx,yy,ww,hh);
 // the background color of our own text entry area
 ctx=ctxStyle(ctx,4,"bevel","#002200",gui.RgbaSet(0xff,250,0xff,1.0));
 gui.CanvasShadowSet(gui.IdFind("maincan"),"transparent",0,0,0);
 ctx.stroke();
 ctx.fill();
 // font size of our own text entry area
 ctx=ctxFontStyle(ctx,"400 32px arial","start","middle");
 if(env.is_mobile&&text.IndexOf(env.browser_platform,"win")<0) {   ctx.font="600 46px arial";   }
 gui.CanvasShadowSet(gui.IdFind("maincan"),"transparent",0,0,0);
 // font color of our text entry area actual text
 ctx.fillStyle=gui.RgbaSet(0x53,0x17,0xcf,1.0);//"#fffaff";
 metrix=ctx.measureText(str);
 div=parseInt((timer.MsRunning()/300))%2;
 if(div==0||room_field_state) { ChatUxWrapText(ctx,xx+20,yy+40,ww-50,45,str); }
 else                         { ChatUxWrapText(ctx,xx+20,yy+40,ww-50,45,str+"|"); }
 ctx.restore();
 }





 function ChatUxWrapText (ctx,xx,yy,ww,lh,text)
 {
 var words,line,n,testLine,metrics,testWidth,str;
 codeHit("ChatUxWrapText",0);
 //----------------------------------------------------
 str=text;
 words=str.split(' ');
 line='';
 for(n=0;n<words.length;n++)
  {
  testLine=line+words[n]+' ';
  metrics=ctx.measureText(testLine);
  testWidth=metrics.width;
  if(testWidth>ww&&n>0)  {  ctx.fillText(line,xx,yy);  line=words[n]+' ';    yy+=lh;         }
  else                   {  line=testLine;        }
  }
 ctx.fillText(line,xx,yy);
 }




 function ChatUxPaintTimeOfMsg (ctx,xx,yy,ww,hh,when)
 {
 var dat,txt,rec,hit,wid,ax,ay;
 var rx1,ry1,rx2,ry2,metrix;
 codeHit("chatuxpainttimeofmsg",0);
 //-----------------------------
 rx1=xx;
 ry1=yy;
 rx2=(rx1+ww)-1;
 ry2=(ry1+hh)-1;
 ctx.save();
 txt=when+" ";
 // font size of incoming text, and color of text entry
 ctx=ctxFontStyle(ctx,"600 23px arial","start","middle");
 metrix=ctx.measureText(txt);
 hit=(metrix.actualBoundingBoxAscent+metrix.actualBoundingBoxDescent)+2;
 wid=metrix.width+2;
 ax=rx1+(rx2-rx1)-wid;
 ay=(yy+hh)-hit;
 ay+=8;
 ax+=4;
 ctx.fillStyle=gui.RgbaSet(0x0f,0x0f,0x0f,0.3); ctx.fillText(txt,ax+1,ay+1);
 ctx.fillStyle=gui.RgbaSet(0x1f,0x1f,0xaf,0.1); ctx.fillText(txt,ax-1,ay-1);
 ctx.restore();
 }




 function ChatUxPaintBubble (ctx,xx,yy,ww,hh,isme,str)
 {
 var rx1,ry1,rx2,ry2;
 codeHit("chatuxpaintbubble",0);
 //-----------------------------
 rx1=xx;
 ry1=yy;
 rx2=(rx1+ww)-1;
 ry2=(ry1+hh)-1;
 ctx.save();
 //---------------------------
 ctx.beginPath();
 ctx.moveTo(rx1,ry1);
 ctx.lineTo(rx2,ry1);
 ctx.lineTo(rx2,ry2);
 ctx.lineTo(rx1,ry2);
 ctx.lineTo(rx1,ry1);
 ctx.moveTo(rx1,ry1+30);
 ctx.lineTo(rx1-30,ry1+60);
 ctx.lineTo(rx1,ry1+70);
 ctx.closePath();
 //---------------------------
 // background color of incoming text entries
 // frame color of incoming text entries, depending if our own or others message
 ctx=ctxStyle(ctx,5,"bevel","#0044b0",gui.RgbaSet(0xff,0xff,0xff,1.0));
 gui.CanvasShadowSet(gui.IdFind("maincan"),"transparent",0,0,0);
 ctx.stroke();
 ctx.fill();
 //---------------------------
 ctx.moveTo(rx1,ry1);
 // font size of incoming text and color
 ctx=ctxFontStyle(ctx,"600 31px arial","start","middle");
 ctx.fillStyle="#4050f0";
 ChatUxWrapText(ctx,xx+20,yy+20,ww-50,45,str);
 ctx.restore();
 }







 function ChatUxPaintCompleteHistory (dtx,disp)
 {
 var r,dww,dhh;
 var wid,hit,hs,done,i,che,sid,han,str,hx,rra,rrb,rrc,isme,tall;
 var kw,kh;
 var ewid,ehit;
 var ymiss;

 if(current_chat_last_stamp==0) { return; }
 if(do_flicker) { r=128; }
 else           { r=1;   }
 //----------------------------------------
 disp=env.DisplayGet();
 dww=disp.win_wid;
 dhh=disp.win_hit;
 kw=gui.Get(gui.IdFind(dtx.canvas.id)).dom.width;
 kh=gui.Get(gui.IdFind(dtx.canvas.id)).dom.height;
 ewid=main.app.rcve_area.w;
 ehit=main.app.rcve_area.h;
 dtx.fillStyle=gui.RgbaSet(0x4f,0x5f+num.Rand(r),0x9f,1.0);
 ymiss=20;
 rra=gui.XywhSet(20,kh-(ehit+ymiss),ewid,ehit);
 rrb=gui.XywhSet(rra.x+rra.w+40,kh-(ehit+(ymiss*1)),dww-(rra.x+rra.w+40),ehit);
 hs=chat_history_slots;
 hx=hs-1;
 done=0;
 tall=main.app.rcve_vgap;
 for(i=0;i<hs;i++)
  {
  if(hx<0)   {   break;   }
  che=chat_history_array[hx];
  sid=document.getElementById(che.cha_id);
  if(sid==null||sid.src==null)        { Oof(); }
  if(sid.src.substring(0,5)!="data:") { hx--; continue; }
  if(che.msg.uuid==main.vars.room_object.my_uuid) { isme=1;  }
  else                                            { isme=0; }
  dtx.drawImage(sid,rra.x,rra.y,rra.w,rra.h);
  ChatUxPaintBubble(dtx,rrb.x,rrb.y,rrb.w-20,rrb.h,isme,che.txt);
  ChatUxPaintTimeOfMsg(dtx,rrb.x,rrb.y,rrb.w-20,rrb.h,che.when);
  rra.y-=tall;
  rrb.y-=tall;
  done++;
  hx--;
  }
// console.log(arguments.callee.name+" history_height="+history_height+"  to "+done);
 history_height=done;
 }





/*-=-----------------------------------------------------------
 Begin Ux
-------------------------------------------------------------*/

 function ChatUxBegin()
 {
 var disp,han,obj,ctx,spot,s;
 codeHit("chatuxbegin",0);
 //----------------------------------------------
 disp=env.DisplayGet();
 prevoUpdate(disp);
 //-------------------------
 main.vars.display_stats={};
 main.vars.display_stats.tik=0;
 main.vars.display_stats.elapsed=0;
 main.vars.display_stats.frame_count=0;
 main.vars.display_stats.fps=0;
 //-------------------------
 main.app.selfvid_size=gui.SizeSet(main.app.selfvid_size,slf_wid,slf_hit);
 main.app.selfvid_area=gui.RectSet(main.app.selfvid_area,0,0,slf_wid,slf_hit);
 main.app.photcan_size=gui.SizeSet(main.app.photcan_size,jpg_wid,jpg_hit);
 main.app.fxfxcan_size=gui.SizeSet(main.app.fxfxcan_size,jpg_wid,jpg_hit);
 main.app.kbkey_yshift=5;
 //-------------------------
 main.app.rcve_area=gui.RectSet(main.app.rcve_area,0,0,rcv_wid,rcv_hit);
 main.app.rcve_vgap=rcv_hit+20;
 //-------------------------
 main.app.text_area=gui.RectSet(main.app.text_area,0,0,slf_wid,slf_hit);
 main.app.scroll_canvas_height=chat_history_slots*main.app.rcve_vgap;
 //-------------------------
 console.log("canv="+main.app.scroll_canvas_height);
 history_height=0;
 history_change=false;
 ChatUxKeyboardInit();
 //-------------------------
 han=ChatUxElementCreate("video","selfvid",main.app.selfvid_size.w,main.app.selfvid_size.h,3100);
 gui.Get(han).dom.style.objectFit="contain";
 //-------------------------
 han=ChatUxElementCreate("canvas","maincan",disp.win_wid/2,disp.win_hit/1,3000);
 //-------------------------
 han=ChatUxElementCreate("canvas","scrlcan",disp.win_wid,main.app.scroll_canvas_height,7000);
 //-------------------------
 han=ChatUxElementCreate("canvas","confcan",disp.win_wid,disp.win_hit,7000);
 //-------------------------
 han=ChatUxElementCreate("canvas","photcan",main.app.photcan_size.w,main.app.photcan_size.h,3500);
 //-------------------------
 han=ChatUxElementCreate("canvas","fxfxcan",main.app.photcan_size.w,main.app.photcan_size.h,9540);
 //-------------------------
 han=ChatUxElementCreate("div","keybdiv",300,300,4000);
 //-------------------------
 if(gui.Get(gui.IdFind("maincan")).dom.style.display=="none")  { gui.Get(gui.IdFind("maincan")).dom.style.display="inline";   }
 //if(gui.Get(gui.IdFind("scrlcan")).dom.style.display=="none")  { gui.Get(gui.IdFind("scrlcan")).dom.style.display="inline";   }
 //if(gui.Get(gui.IdFind("confcan")).dom.style.display=="none")  { gui.Get(gui.IdFind("confcan")).dom.style.display="inline";   }
 //if(gui.Get(gui.IdFind("selfvid")).dom.style.display=="none")  { gui.Get(gui.IdFind("selfvid")).dom.style.display="inline";   }
 //if(gui.Get(gui.IdFind("fxfxcan")).dom.style.display=="none")  { gui.Get(gui.IdFind("fxfxcan")).dom.style.display="inline";   }
 if(gui.Get(gui.IdFind("keybdiv")).dom.style.display=="none")  { gui.Get(gui.IdFind("keybdiv")).dom.style.display="inline";   }
 ChatUxClickHandler();
 keyboard.Start();
 gui.UpdateRequest();
 return true;
 }





 function ctxReset (ctx)
 {
 codeHit("ctxreset",0);
 ctx.globalAlpha=1;
 ctx.mozImageSmoothingEnabled=false;
 ctx.oImageSmoothingEnabled=false;
 ctx.webkitImageSmoothingEnabled=false;
 ctx.imageSmoothingEnabled=false;
 return ctx;
 }


 function ctxStyle (ctx,linewid,linejoinstyl,strkstyl,filstyl)
 {
 codeHit("ctxstyle",0);
 if(linewid!=null)      { ctx.lineWidth=linewid; }
 if(linejoinstyl!=null) { ctx.lineJoin=linejoinstyl; }
 if(strkstyl!=null)     { ctx.strokeStyle=strkstyl; }
 if(filstyl!=null)      { ctx.fillStyle=filstyl; }
 return ctx;
 }



 function ctxFontStyle (ctx,font,talign,tbaseline)
 {
 codeHit("ctxfontstyle",0);
 if(font!=null)       { ctx.font=font; }
 if(talign!=null)     { ctx.textAlign=talign; }
 if(tbaseline!=null)  { ctx.textBaseline=tbaseline; }
 return ctx;
 }




 function fillTopRow (ctx,disp,sy)
 {
 codeHit("filltoprow",0);
 ///ctx=ctxStyle(ctx,0,null,"none",gui.RgbaSet(0x4f,0x5f,0x9f,1.0));
 ctx=ctxStyle(ctx,0,null,null,gui.RgbaSet(0x4f,0x5f,0x9f,1.0));
 ctx.fillRect(0,0,disp.win_wid,sy);
 }





 function fillSelfRow (ctx,disp,sy)
 {
 codeHit("fillselfrow",0);
 ctx=ctxStyle(ctx,0,null,"none",gui.RgbaSet(0xc0,0xd0,0xfd,1.0),gui.RgbaSet(0xff,0xad,0x2f,1.0));
 ctx.fillRect(0,sy,disp.win_wid,main.app.selfvid_area.h+32);
  ctx=ctxStyle(ctx,3,null,null,gui.RgbaSet(0xda,0x10,0x0f,0.9));
  ctx.fillRect(0,sy,disp.win_wid,6);
  ctx=ctxStyle(ctx,3,null,null,gui.RgbaSet(0x1a,0x20,0xcf,0.8));
  ctx.fillRect(0,sy+main.app.selfvid_area.h+28 ,disp.win_wid,6);
 }





 function exText (ctx,disp,fam,wei,sz,rgb,ali,xx,yy,txt)
 {
 var str,methit,box,rec,ww,hh;
 codeHit("extext",0);
 str=wei+" "+sz+"px "+fam;
 ctx=ctxFontStyle(ctx,str,"left","top");
 metrix=ctx.measureText(txt);
 methit=0;
 if(metrix.actualBoundingBoxAscent!==undefined)  {  methit+=metrix.actualBoundingBoxAscent;  }
 if(metrix.actualBoundingBoxDescent!==undefined) {  methit+=metrix.actualBoundingBoxDescent;  }
 if(isNaN(methit))
  {
  if(metrix.fontBoundingBoxAscent!==undefined)  {  methit+=metrix.fontBoundingBoxAscent;  }
  if(metrix.fontBoundingBoxDescent!==undefined) {  methit+=metrix.fontBoundingBoxDescent;  }
  }
 if(isNaN(methit))  {  alert(methit);   }
 ww=metrix.width;
 hh=methit;
 if(hh<=0) { hh=40; }
 rec=gui.RectSet(rec,xx,yy,ww,hh);
 rec.x1=parseInt(rec.x1);
 rec.y1=parseInt(rec.y1);
 rec.x2=parseInt(rec.x2);
 rec.y2=parseInt(rec.y2);
 if(1)  {  rec.x1-=2; rec.x2+=4;  rec.y1-=2; rec.y2+=4;  }
 rec.w=(rec.x2-rec.x1)+1;
 rec.h=(rec.y2-rec.y1)+1;
 if(0)  {  ctx.fillStyle=gui.RgbaSet(0x2f,0xff,0x1f,1.0);  ctx.fillRect(rec.x1,rec.y1,rec.w,rec.h);  }
 ctx.fillStyle=rgb;
 ctx.fillText(txt,rec.x1,rec.y1);
 return rec;
 }






 function paintHeader (ctx,disp)
 {
 var r,txt,sxt,metrix,rec,grad,methit,on;
 var oj,os,yy,xx,ss;
 var arrow_rect;

 codeHit("paintheader",0);
 oj=isRoomBookmarked(main.vars.my_info.room);
 if(oj>=0) { on=1; }
 else      { on=0; }
 if(pwa.is_subscribed) { os=1; }
 else                  { os=0; }

 txt="\u{2b50}";
 if(do_flicker) { r=128; }
 else           { r=1;   }

 ctx.save();

 ctx=ctxFontStyle(ctx,"600 38px arial","left","middle");
 metrix=ctx.measureText(txt);
 methit=0;
 if(metrix.actualBoundingBoxAscent!==undefined)   {  methit+=metrix.actualBoundingBoxAscent;  }
 if(metrix.actualBoundingBoxDescent!==undefined)  {  methit+=metrix.actualBoundingBoxDescent;  }
 methit=methit*0.9;
 if(methit<40) { methit=40; }
 rec=gui.RectSet(rec,0,0,disp.win_wid,methit*2);
 grad=ctx.createLinearGradient(0,0,0,rec.y2-rec.y1);
 if(focused==true)
  {
  grad.addColorStop(0.0,gui.RgbaSet(0x2f,0x4f,0x7f,1.0));
  grad.addColorStop(1.0,gui.RgbaSet(0x2f,0x4f,0xcf,0.7));
  }
 else
  {
  grad.addColorStop(0.0,gui.RgbaSet(0x1f,0x1f,0x1f,1.0));
  grad.addColorStop(1.0,gui.RgbaSet(0x2f,0x0f,0x1f,0.7));
  }
 ctx.fillStyle=grad;
 ctx.fillRect(rec.x1,rec.y1,rec.w,rec.h);
 // middle burger

 if(cfg_state==0)  {   ctx=ctxStyle(ctx,3,null,null,gui.RgbaSet(0xff,0xff,0xff,0.7));   }
 else
 if(cfg_state==1)  {  ctx=ctxStyle(ctx,3,null,null,gui.RgbaSet(0xff,0xff,0x00,1.0));  }
 else              {  Oof(cfg_state);  }
 yy=methit+2;//(rec.y2)/2;
 xx=(disp.win_wid/2)-15;
 xx=disp.win_wid-80;
 ss=17;

 // use logo instead of burger
 if(cfg_state==0)
  {
  ctx.fillStyle=gui.RgbaSet(0x2f,0x2f,0x1f,0.7);
  ctx.globalAlpha=0.7;
  ctx.fillRect(xx,14,56,56);//,14,34,34);
  ctx.drawImage(base_image,xx-8,8,56,56);
  }
 else
  {
  ctx.fillStyle=gui.RgbaSet(0x1f,0x1f,0x1f,0.9);
  ctx.globalAlpha=0.7;
  ctx.fillRect(xx,14,56,56);//,14,34,34);
  ctx.drawImage(base_image,xx-6,10,56,56);
  }

 //ctx.drawImage(base_image,xx-12,8,56,56);
 ctx.globalAlpha=1.0;

 /*
 ctx.fillRect(xx,yy-ss,50,4);
 ctx.fillRect(xx,yy-0 ,50,4);
 ctx.fillRect(xx,yy+ss,50,4);
 //burg_rect=gui.RectSet(burg_rect,xx,yy-ss,50,ss*2)//,,rec.y1-(methit/2),metrix.width,methit);///,rec.h);
 */

 ///burg_rect=gui.RectSet(burg_rect,xx,0,80,methit*4)//,,rec.y1-(methit/2),metrix.width,methit);///,rec.h);
 //burg_rect=gui.RectSet(burg_rect,xx-12,4,64,64);//80,methit*4)//,,rec.y1-(methit/2),metrix.width,methit);///,rec.h);
 burg_rect=gui.RectSet(burg_rect,xx-12,0,64+16,64+16);//methit);//80,methit*4)//,,rec.y1-(methit/2),metrix.width,methit);///,rec.h);

 // horizontal line
 ctx=ctxStyle(ctx,3,null,null,gui.RgbaSet(0xca,0x30,0x5f,0.7));
 ctx.fillRect(0,rec.y2-4,disp.win_wid,4);
 txt="MeBeam - "+main.vars.my_info.room;

 rec=exText(ctx,disp,"arial",600,40,gui.RgbaSet(0xaf,0xff,0xaf,1.0),"mm",32,(methit/2)+5,txt);
 if(on==0)  {  star_rect=exText(ctx,disp,"arial",400,57,gui.RgbaSet(0xff,0xff,0xff,(on==1)?1.0:0.45),"mm",44+rec.w,(methit/2)-5,"\u{2606}");  }
 else       {  star_rect=exText(ctx,disp,"arial",600,44,gui.RgbaSet(0xdf,0xff,0xff,(on==1)?1.0:0.15),"mm",40+rec.w,(methit/2)+0,"\u{2b50}");  }

 //https://join.skype.com/invite/Xj5stY25UgqG
 // join beta
 /*
 txt="Testers";
 beta_rect=exText(ctx,disp,"arial",400,32,gui.RgbaSet(0x3f,0x1f,0x1f,1.0),"mm",disp.win_wid-300,(methit/2)+5,txt);
 ctx.fillRect(beta_rect.x,beta_rect.y+beta_rect.h,beta_rect.w-5,4);
 beta_rect=exText(ctx,disp,"arial",400,32,gui.RgbaSet(0xcf,0xcf,0xff,1.0),"mm",(disp.win_wid-300)-3,((methit/2)+5)-3,txt);
 ctx.fillRect(beta_rect.x,beta_rect.y+beta_rect.h,beta_rect.w-5,4);
 */


 /*
 txt="MeBeam Help";
 beta_rect=exText(ctx,disp,"arial",400,32,gui.RgbaSet(0x3f,0x1f,0x1f,1.0),"mm",disp.win_wid-380,(methit/2)+5,txt);
 ctx.fillRect(beta_rect.x,beta_rect.y+beta_rect.h,beta_rect.w-5,4);
 beta_rect=exText(ctx,disp,"arial",400,32,gui.RgbaSet(0xcf,0xcf,0xff,1.0),"mm",(disp.win_wid-380)-3,((methit/2)+5)-3,txt);
 ctx.fillRect(beta_rect.x,beta_rect.y+beta_rect.h,beta_rect.w-5,4);
 beta_rect.h+=5;
 */

///beta_rect=exText(ctx,disp,"arial",400,47,gui.RgbaSet(0xff,0xff,0xff,1.0),"mm",64+rec.w,(methit/2)+0,"\u{2606}");
 // the logo and its shadow
 /**
 ctx.fillStyle=gui.RgbaSet(0x0f,0x0f,0x0f,1.0);
 ctx.fillRect(14,14,34,34);
 ctx.globalAlpha=1.0;
 ctx.drawImage(base_image,8,8,34,34);
 */


 ctx.restore();
 }







 function paintScrollTab (ctx,disp,sy)
 {
 var r,scroy,pc;
 codeHit("paintscrolltab",0);
 if(do_flicker) { r=128; }
 else           { r=1;   }
 scroy=((history_height-1)*main.app.rcve_vgap);
 pc=num.PercentIs(history_fine,scroy);
 if(isNaN(pc)||pc<0) { pc=0;   }  else
 if(pc>100)          { pc=100; }
 pc=100-pc;
 pc=num.PercentOf(pc,sy-20);
 ctx=ctxStyle(ctx,2,null,gui.RgbaSet(0xcc,0xcc,0x00,1.0),gui.RgbaSet(195-num.Rand(r),245-num.Rand(r),225,0.8));
 ctx.fillRect(disp.win_wid-25,pc,23,17);
 ctx.strokeRect(disp.win_wid-25,pc,23,17);
 scroll_tab_rect=gui.RectSet(scroll_tab_rect,disp.win_wid-25,pc,23,17);
 if(0)
  {
  ctx=ctxStyle(ctx,2,null,gui.RgbaSet(0xcc,0xcc,0x00,1.0),gui.RgbaSet(20,20,20,1.0));
  ctx.fillRect(star_rect.x1,star_rect.y1,star_rect.w,star_rect.h);
  console.log(star_rect.w+" "+star_rect.h);
  }
 }





 function fx_brighten ()
 {
 var xx,yy,r,g,b,a,i;

 for(yy=0;yy<jpg_hit;yy++)
  {
  for(xx=0;xx<jpg_wid;xx++)
   {
   i=(yy*jpg_wid)+xx;
   r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
   r=r*(main.vars.cycle%2);
   g=g*(main.vars.cycle%3);
   b=b*((main.vars.cycle+yy)%2);

   cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;
   }
  }
 return;


  for(yy=0;yy<jpg_hit;yy++)
   {
   xx=0;
   i=(yy*jpg_wid)+xx;
   r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
   cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;

   xx=(jpg_wid-1);
   i=(yy*jpg_wid)+xx;
   r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
   cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;
   }

  for(xx=0;xx<jpg_wid;xx++)
   {
   yy=0;
   i=(yy*jpg_wid)+xx;
   r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
   cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;

   yy=(jpg_hit-1);
   i=(yy*jpg_wid)+xx;
   r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
   cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;
   }
  for(yy=0;yy<jpg_hit;yy++)
   {
   for(xx=40;xx<jpg_wid;xx++)
    {
    i=(yy*jpg_wid)+xx;
    r=cap_frame.data[i*4+0]; g=cap_frame.data[i*4+1];  b=cap_frame.data[i*4+2];  a=cap_frame.data[i*4+3];
    r=(r*5);
    g=(g*5);
    b=(b*5);
    a=255;//22;//
    cap_frame.data[i*4+0]=r; cap_frame.data[i*4+1]=g;  cap_frame.data[i*4+2]=b;  cap_frame.data[i*4+3]=a;
    }
   }
 }




 function ChatUxAnimate()
 {
 var disp;
 var ktx,dtx,ctx,canv;
 var dww,dhh;
 var han,obj;
 var kb;
 var ewid,ehit,etal;
 var fx,fa;
 var dw,dh;
 var sy;
 var cando,todo;
 var ypos;
 var yup;
 var scroy,pc;
 var change,plus,grad,rec,crec;
 var metrix;
 var yp,ya,xp;
 var ypdf;
 var etc,j;//found,ud;
 var hit,i,etc,k;
 var scaledhit;
 var box;
 var avail_height;
 var xx,yy,r,g,b,a,raf;


 //---------------------------------------------------------------------
 disp=env.DisplayGet();
 dww=disp.win_wid;
 dhh=disp.win_hit;
 //-------------------------
 if(history_change==true)  {  history_fine=0;  }
 change=prevoUpdate(disp);
 if(change>0)  {  change_prevo++;  }

 if(change>0||history_change==true||(main.vars.stage<777/*&&num.Rand(4)==0*/)||main.vars.stage<100)
  {
  scaledhit=num.Fixed((disp.win_hit/disp.density),2);
  DimJpgSet(320,240,0.55);
  if(big_mode==0)   {   DimSlfSet(160,120);   DimRcvSet(160,120);   }  else
  if(big_mode==1)   {   DimSlfSet(240,160);   DimRcvSet(240,160);   }  else
  if(big_mode==2)   {   DimSlfSet(320,240);   DimRcvSet(320,240);   }  else
  if(big_mode==3)   {   DimSlfSet(360,280);   DimRcvSet(360,280);   }
  main.app.selfvid_size=gui.SizeSet(main.app.selfvid_size,slf_wid,slf_hit);
  main.app.selfvid_area=gui.RectSet(main.app.selfvid_area,0,0,slf_wid,slf_hit);
  main.app.rcve_area=gui.RectSet(main.app.rcve_area,0,0,rcv_wid,rcv_hit);
  main.app.rcve_vgap=rcv_hit+20;
  main.app.text_area=gui.RectSet(main.app.text_area,0,0,slf_wid,slf_hit);
  main.app.scroll_canvas_height=(chat_history_slots*main.app.rcve_vgap);//+(main.app.selfvid_size.h);
  gui.WidthHeightSet(gui.IdFind("maincan"),disp.win_wid/2,disp.win_hit);
  gui.WidthHeightSet(gui.IdFind("scrlcan"),disp.win_wid,main.app.scroll_canvas_height);
  gui.WidthHeightSet(gui.IdFind("confcan"),disp.win_wid,main.app.scroll_canvas_height);
  if(env.is_mobile)   {   kh=parseInt(dhh*0.33);   kh=num.Fixed(num.PercentOf(30,disp.win_hit),2);   }
  else                {   kh=parseInt(dhh*0.28);   kh=num.Fixed(num.PercentOf(25,disp.win_hit),2);   }
  if(env.is_win) { kh=10; }
  main.app.kbkey_yshift=5;
  main.app.keyboard_area=gui.RectSet(main.app.keyboard_area,10,dhh-(kh),dww-20,kh); // was dhh-380,dww-40,370
  plus=6;
  main.app.selfvid_area=gui.RectSet(main.app.selfvid_area,20,main.app.keyboard_area.y-(slf_hit+plus),slf_wid,slf_hit);
  main.app.text_area=gui.RectSet(main.app.text_area,20+slf_wid+10,main.app.keyboard_area.y-(slf_hit+plus),dww-(20+slf_wid+30),slf_hit);
  sy=main.app.selfvid_area.y-20;
  hit=(dhh-sy);
  hit=dhh-500;
  gui.AreaSet(gui.Get(gui.IdFind("keybdiv")).self_handle,"ltwh","px",main.app.keyboard_area.x,main.app.keyboard_area.y,main.app.keyboard_area.w,main.app.keyboard_area.h);
  gui.AreaSet(gui.Get(gui.IdFind("selfvid")).self_handle,"ltwh","px",main.app.selfvid_area.x,main.app.selfvid_area.y,main.app.selfvid_area.w,main.app.selfvid_area.h);
  history_change=true;
  change_count++;
  paintkb=1;
  }

 height_avail=parseInt((disp.win_hit-280)-55);
 base_font_size=32*((height_avail/720));
 base_font_size=parseInt(base_font_size);

 if(cfg_state==0)
  {
  hotspotArrayClear();
  }
 else
 if(cfg_state>=1)
  {
  han=gui.IdFind("confcan");
  gui.AreaSet(gui.Get(gui.IdFind("confcan")).self_handle,"ltwh","px",40,40,4,4);
  obj=gui.Get(han);
  ktx=gui.CanvasContextGet(han);
  ktx.clearRect(0, 0, obj.dom.width,obj.dom.height);//400,400);//obj.width,obj.height);
  ktx=ctxReset(ktx);
  ktx.save();

  yp=55+(base_font_size*1.5);
  ypdf=(yp-55)-(base_font_size);
  if(ypdf>24) yp-=16;
  else        yp+=8;

  sy=main.app.selfvid_area.y-20;
  rec=gui.RectSet(rec,0,0,disp.win_wid,sy);
  ktx.fillStyle=gui.RgbaSet(10,60,140,1.0);
  ktx.fillRect(rec.x1,rec.y1,rec.w,rec.h);
  ktx.fillStyle=gui.RgbaSet(0x1f,0xdf,0xff,1.0);
  hotspotArrayClear();
  xp=20;

  for(i=0;i<db_array.length;i++)
   {
   obj=JSON.parse(db_array[i].val);
   etc=obj.room;
   crec=exText(ktx,disp,"arial",400,base_font_size-6,gui.RgbaSet(0xdf,0xff,0xff,1.0),"mm",xp+0,yp+0,"\u{274c}");   // red close button
   crec.x2-=4;
   crec.w=(crec.x2-crec.x1)+1;
   rec.y2-=4;
   crec.h=(crec.y2-crec.y1)+1;
   hotspotArrayAdd(crec.x1,crec.y1,crec.w,crec.h,100+i,obj.room);
   if(xp==20) { xp=80+(base_font_size/2); }
   else       { xp+=(crec.w+(base_font_size/2)); }//80+(base_font_size/2);
   if(etc==main.vars.my_info.room)    {    rec=exText(ktx,disp,"arial",400,base_font_size,gui.RgbaSet(0x8f,0xff,0xcf,1.0),"mm",xp,yp,etc+"");    }
   else                               {    rec=exText(ktx,disp,"arial",400,base_font_size,gui.RgbaSet(0xdf,0xcf,0xdf,1.0),"mm",xp,yp,etc+"");    }
   crec.h=(crec.y2-crec.y1)+1;
   hotspotArrayAdd(rec.x1,rec.y1,rec.w,crec.h,200+i,obj.room); // rooms link
   if((rec.x1+rec.w)>(disp.win_wid/2))    {    xp=20;    yp+=(base_font_size*1.5);    }
   else                                   {    xp+=(rec.w)+50;        }
   }
  if(i!=0)
   {
   if(xp>20)    yp+=(base_font_size*1.5);
   }
  ktx.fillStyle=gui.RgbaSet(170,120,220,0.7);
  ktx.fillRect(20,yp-(base_font_size/4),disp.win_wid-40,2);

  yp+=(base_font_size/2);
  xp=20;
  k=0;
  for(i=0;i<devices.state.device_array.length;i++)
   {
   if(devices.state.device_array[i].kind!="videoinput") { continue; }
   xp=20;
   rec=exText(ktx,disp,"arial",600,base_font_size-4,gui.RgbaSet(0xdf,0xff,0xff,1.0),"mm",xp,yp+0,"\u{1f4f7}"); // camera
   rec.x2-=5;
   rec.w=(rec.x2-rec.x1)+1;
   rec.y2-=8;
   rec.h=(rec.y2-rec.y1)+1;

   hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,300+i,k);
   xp=80+(base_font_size/2);
   if(video_index_used==k)    {    rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0xdf,0xaf,0xff,1.0),"mm",xp,yp+0,devices.state.device_array[i].label);    }
   else                       {    rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0xdf,0xff,0xff,1.0),"mm",xp,yp+0,devices.state.device_array[i].label);    }
   hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,400+i,devices.state.device_array[i].label); // video input label
   yp+=rec.h+16;
   k++;
   }

  ktx.fillStyle=gui.RgbaSet(170,120,220,0.7);
  ktx.fillRect(20,yp-(base_font_size/4),disp.win_wid-40,2);
  yp+=20;
  xp=20;

  switch(big_mode)
   {
   case 0:
   rec=exText(ktx,disp,"arial",600,base_font_size+2,gui.RgbaSet(0x2f,0xff,0x6f,1.0),"mm",xp,yp+0,"\u{25f1}");
   hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h+2,850,850);
   xp=80+(base_font_size/2);
   rec=exText(ktx,disp,"arial",400,base_font_size-4,gui.RgbaSet(0xaf,0xff,0xcc,1.0),"mm",xp,yp,"Compact view");
   hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,850,850);
   yp+=(base_font_size*1.25);
   xp=20;
   break;

   case 1:
   rec=exText(ktx,disp,"arial",600,base_font_size+2,gui.RgbaSet(0x2f,0xff,0x6f,1.0),"mm",xp,yp+0,"\u{25f3}");
   hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h+2,850,850);
   xp=80+(base_font_size/2);
   rec=exText(ktx,disp,"arial",400,base_font_size-4,gui.RgbaSet(0xaf,0xff,0xcc,1.0),"mm",xp,yp,"Standard view");
   hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,850,850);
   yp+=(base_font_size*1.25);
   xp=20;
   break;

   case 2:
   rec=exText(ktx,disp,"arial",600,base_font_size+2,gui.RgbaSet(0x2f,0xff,0x6f,1.0),"mm",xp,yp+0,"\u{25f0}");
   hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h+2,850,850);
   xp=80+(base_font_size/2);
   //rec=exText(ktx,disp,"arial",400,32,gui.RgbaSet(0x2f,0xff,num.Rand(55),1.0),"mm",xp,yp,"Click for largest size mode");
   rec=exText(ktx,disp,"arial",400,base_font_size-4,gui.RgbaSet(0xaf,0xff,0xcc,1.0),"mm",xp,yp,"Large view");//Click for compact size mode");
   hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,850,850);
   yp+=(base_font_size*1.25);
   xp=20;
   break;
   }

  rec=exText(ktx,disp,"arial",600,base_font_size+4,gui.RgbaSet(0xdf,0xff,0x6f,1.0),"mm",xp,yp+0,"\u{224b}");
  hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h+2,500,500);
  xp=80+(base_font_size/2);
  rec=exText(ktx,disp,"arial",400,base_font_size-4,gui.RgbaSet(0xdf,0xff,num.Rand(55),1.0),"mm",xp,yp,"Invite someone to "+main.vars.my_info.room);
  hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,500,500);
  yp+=(base_font_size*1.25);
  xp=20;
  rec=exText(ktx,disp,"arial",600,base_font_size-8,gui.RgbaSet(0x5f,0xff,0xaf,1.0),"mm",xp,yp+0,"\u{27af}");  //arrrow go room
  hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h+2,600,600);
  xp=80+(base_font_size/2);
  rec=exText(ktx,disp,"arial",400,base_font_size-4,gui.RgbaSet(0xdf,0xff,0xff,1.0),"mm",xp,yp,"Change room");
  hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,600,600);

  if(room_field_state==false)
   {

   }
  else
  if(room_field_state==true)
   {
   xp=rec.x2+10;
   rec=gui.RectSet(rec,xp,yp-4,320,rec.h);
   ktx.fillStyle=gui.RgbaSet(210,240,240,1.0);//0xbf+num.Rand(30),0xdf-num.Rand(100),0xff,1.0);
   ktx.fillRect(rec.x1,rec.y1,rec.w,rec.h);
  // hotspotArrayAdd(rec.x2-50,rec.y1,50,50,900,900);
  /// rec=exText(ktx,disp,"arial",600,30,gui.RgbaSet(0x5f,0xff,0xaf,1.0),"mm",rec.x2-40,rec.y1,"\u{2705}");
   rec=gui.RectSet(rec,xp+4,yp-4,240,rec.h+8);
   //if(room_field_input=="") { room_field_input="chatlobby";  }
   if(room_field_caret==0)    {    rec=exText(ktx,disp,"arial",500,base_font_size,gui.RgbaSet(0x7,0x12,0x4f,1.0),"mm",rec.x1,rec.y1+4,room_field_input+"|");    }
   else                       {    rec=exText(ktx,disp,"arial",500,base_font_size,gui.RgbaSet(0x7,0x12,0x4f,1.0),"mm",rec.x1,rec.y1+4,room_field_input);    }
   //" "+room_field_caret);///xp,yp+4,"\u{274c}");
   room_field_caret=parseInt((timer.MsRunning()/300))%2;
   }
  yp+=(base_font_size*1.25);
  xp=20;

  if(main.vars.is_pwa==true)
   {
   if(pwa.support_level!=3)
    {
    rec=exText(ktx,disp,"arial",600,base_font_size-8,gui.RgbaSet(0x5f,0xff,0xaf,0.15),"mm",xp-2,yp+0,"\u{1F515}");  //arrrow go room
    hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h-2,740,740);
    xp=80+(base_font_size/2);
    rec=exText(ktx,disp,"arial",400,base_font_size-12,gui.RgbaSet(0xdc,0x6f,0xcf,0.85),"mm",xp,yp+4,"Message alerts UNSUPPORTED");
    //hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,740,740);
    }
   else
   if(pwa.is_messaging_blocked==true)
    {
    rec=exText(ktx,disp,"arial",600,base_font_size-8,gui.RgbaSet(0x5f,0xff,0xaf,0.35),"mm",xp-2,yp+0,"\u{1F515}");  //arrrow go room
    hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h-2,740,740);
    xp=80+(base_font_size/2);
    rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0xff,0x7f,0x7f,0.85),"mm",xp,yp,"Message alerts are BLOCKED");
    //hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,740,740);
    }
   else
    {
    if(pwa.is_subscribed)
     {
     rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0x5f,0xff,0xaf,1.0),"mm",xp-2,yp+0,"\u{1F514}");  //arrrow go room
     hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h-2,750,750);
     xp=80+(base_font_size/2);
     rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0x22,0xff,0x6f,1.0),"mm",xp,yp,"Message alerts are ON");//notifications for "+main.vars.my_info.room);
     hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,750,750);
     }
    else
     {
     rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0x5f,0xff,0xaf,0.45),"mm",xp-2,yp+0,"\u{1F514}");  //arrrow go room
     hotspotArrayAdd(rec.x1,rec.y1-2,rec.w,rec.h-2,740,740);
     xp=80+(base_font_size/2);
     rec=exText(ktx,disp,"arial",400,base_font_size-8,gui.RgbaSet(0xbf,0xdf,0xdf,0.65),"mm",xp,yp,"Message alerts are OFF");//notifications for "+main.vars.my_info.room);
     hotspotArrayAdd(rec.x1,rec.y1,rec.w,rec.h,740,740);
     }
    }
   //yp+=72;
   yp+=(base_font_size*2);
   xp=20;
   }
  ktx.fillStyle=gui.RgbaSet(170,120,220,0.7);
  ktx.fillRect(20,yp-(base_font_size/4),disp.win_wid-40,2);
  }

 ktx=gui.CanvasContextGet(gui.IdFind("confcan"));
 han=gui.IdFind("scrlcan");
 ///gui.AreaSet(gui.Get(gui.IdFind("scrlcan")).self_handle,"ltwh","px",40,40,4,4);
 obj=gui.Get(han);
 dtx=gui.CanvasContextGet(han);
 dtx=ctxReset(dtx);
 //-------------------------
 han=gui.IdFind("maincan");
 if(paintkb)  {  if((ret=gui.WidthHeightSet(han,disp.win_wid,disp.win_hit))!=true) { Oof(); }  }
 obj=gui.Get(han);
 ctx=gui.CanvasContextGet(han);
 ctx=ctxReset(ctx);
 // keyboard key font
 if(env.is_mobile) { ctx.font="300 35px arial"; }
 else              { ctx.font="100 25px arial"; }
 sy=main.app.selfvid_area.y-20;
// ctx.save();
 fillTopRow(ctx,disp,sy);
 fillSelfRow(ctx,disp,sy);
 ChatUxPaintTextArea(ctx,main.app.text_area.x,main.app.text_area.y,main.app.text_area.w,main.app.text_area.h,chat_input_text);
 if(history_change==true)  {  ChatUxPaintCompleteHistory(dtx,disp);  }
 if(cfg_state>=1)  {  ctx.drawImage(document.getElementById("confcan"),0,0,dww,sy,0,0,dww,sy);  }
 else              {  ctx.drawImage(document.getElementById("scrlcan"),0,(main.app.scroll_canvas_height-sy)-history_fine,dww,sy,0,0,dww,sy);  }

//=====
 if(cfg_state>=0)
  {
  vido=gui.Get(gui.IdFind("selfvid")).dom;


  if(vido.currentTime==cap_frame_cur_ms||cap_frame_cur_ms==undefined)
   {
   if(cap_frame_cur_ms==undefined) { cap_frame_cur_ms=vido.currentTime; }
   ctx2=gui.CanvasContextGet(gui.IdFind("maincan"));
   ctx2.drawImage(gui.Get(gui.IdFind("fxfxcan")).dom,main.app.selfvid_area.x,main.app.selfvid_area.y,main.app.selfvid_area.w,main.app.selfvid_area.h);
   cap_frame_cur_ms=vido.currentTime;
   }
  else
   {
   raf=(vido.currentTime-cap_frame_cur_ms);
   raf=num.Fixed(raf,3);
   ctx1=gui.CanvasContextGet(gui.IdFind("fxfxcan"));
   ctx1.drawImage(vido,0,0,jpg_wid,jpg_hit);
   cap_frame=ctx1.getImageData(0,0,jpg_wid,jpg_hit);
   //fx_brighten();
   ctx1.putImageData(cap_frame,0,0);
   ctx2=gui.CanvasContextGet(gui.IdFind("maincan"));
   ctx2.drawImage(gui.Get(gui.IdFind("fxfxcan")).dom,main.app.selfvid_area.x,main.app.selfvid_area.y,main.app.selfvid_area.w,main.app.selfvid_area.h);
   cap_frame_cur_ms=vido.currentTime;
   }
  }
//=====
 history_change=false;
 is_scroll_visible=false;
 if(history_height>0)  {  is_scroll_visible=true;  paintScrollTab(ctx,disp,sy);  }
 paintHeader(ctx,disp);
 if(env.is_win) {}
 else           {  if(paintkb) ChatUxPaintKeyboard(disp);  }
 //ctx.restore();
 gui.UpdateClear();
 }















 function KeyboardLoop ()
 {
 var loops,ok,kb;
 codeHit("keyboardloop",0);
 //---------------------------------------
 loops=0;
 while(1)
  {
  if(loops>=2) { break; }
  if((kb=keyboard.Read())==null) { break; }
  loops++;
  ok=false;
  if(kb.name=="keydown")
   {
   if(kb.key=="Alt")
    {
//     ChatHudsToggle();
    }
   else
   if(kb.key=="End")
    {
    history_fine=0;
    }
   else
   if(kb.key=="Home")
    {
    history_fine=((history_height-1)*main.app.rcve_vgap)
    }
   else
   if(kb.key=="ArrowUp")
    {
    history_fine+=swipe_speed;
    if(history_fine>=((history_height-1)*main.app.rcve_vgap)) { history_fine=((history_height-1)*main.app.rcve_vgap); }
    }
   else
   if(kb.key=="ArrowDown")
    {
    history_fine-=swipe_speed;
    if(history_fine<=0) { history_fine=0; }
    }
   else
   if(kb.key==" ")     {     ok=true;     }
   else
   if(kb.key=="Tab")   {     }
   else                {     ok=true;     }
   }
  if(ok==true)
   {
   ChatUxKeyEvent(kb);
   }
  }
/// if(loops>14) { console.log("loops = "+loops); }
 }






 function ChatUxTouchDecode(typ,eve)
 {
 var obj, k,i;
 codeHit("chatuxtouchdecode",0);
 //-----------------------------------------------
 obj={};
 obj.type=typ;
 obj.eventName=eve.eventName;
 obj.eventPhase=eve.eventPhase;
  obj.altKey=eve.olde.altKey;
  obj.ctrlKey=eve.olde.ctrlKey;
  obj.what=eve.olde.type;
  obj.shiftKey=eve.olde.shiftKey;
  obj.timeStamp=eve.olde.timeStamp;
  obj.which=eve.olde.which;
  obj.srcElementId=eve.olde.srcElement.id;
  obj.targetId=eve.olde.target.id;
  if(eve.olde.x) { obj.x=eve.olde.x; }
  else           { obj.x=null;       }
  if(eve.olde.y) { obj.y=eve.olde.y; }
  else           { obj.y=null;       }
  obj.changedTouchesLen=0;
  obj.changedTouches=[];
  if(eve.olde.changedTouches)
   {
   obj.changedTouchesLen=eve.olde.changedTouches.length;
   k=obj.changedTouchesLen;
   for(i=0;i<3;i++)
    {
    if(i<k)
     {
     obj.changedTouches[i]={};
     obj.changedTouches[i].clientX=eve.olde.changedTouches[i].clientX;
     obj.changedTouches[i].clientY=eve.olde.changedTouches[i].clientY;
     obj.changedTouches[i].force=eve.olde.changedTouches[i].force;
     obj.changedTouches[i].identifier=eve.olde.changedTouches[i].identifier;
     obj.changedTouches[i].pageX=eve.olde.changedTouches[i].pageX;
     obj.changedTouches[i].pageY=eve.olde.changedTouches[i].pageY;
     obj.changedTouches[i].radiusX=eve.olde.changedTouches[i].radiusX;
     obj.changedTouches[i].radiusY=eve.olde.changedTouches[i].radiusY;
     obj.changedTouches[i].rotationAngle=eve.olde.changedTouches[i].rotationAngle;
     obj.changedTouches[i].screenX=eve.olde.changedTouches[i].screenX;
     obj.changedTouches[i].screenY=eve.olde.changedTouches[i].screenY;
     obj.changedTouches[i].targetId=eve.olde.changedTouches[i].targetId;
     }
    }
   }
  obj.targetTouchesLen=0;
  obj.targetTouches=[];
  if(eve.olde.targetTouches)
   {
   obj.targetTouchesLen=eve.olde.targetTouches.length;
   k=obj.targetTouchesLen;
   for(i=0;i<3;i++)
    {
    if(i<k)
     {
     obj.targetTouches[i]={};
     obj.targetTouches[i].clientX=eve.olde.targetTouches[i].clientX;
     obj.targetTouches[i].clientY=eve.olde.targetTouches[i].clientY;
     obj.targetTouches[i].force=eve.olde.targetTouches[i].force;
     obj.targetTouches[i].identifier=eve.olde.targetTouches[i].identifier;
     obj.targetTouches[i].pageX=eve.olde.targetTouches[i].pageX;
     obj.targetTouches[i].pageY=eve.olde.targetTouches[i].pageY;
     obj.targetTouches[i].radiusX=eve.olde.targetTouches[i].radiusX;
     obj.targetTouches[i].radiusY=eve.olde.targetTouches[i].radiusY;
     obj.targetTouches[i].rotationAngle=eve.olde.targetTouches[i].rotationAngle;
     obj.targetTouches[i].screenX=eve.olde.targetTouches[i].screenX;
     obj.targetTouches[i].screenY=eve.olde.targetTouches[i].screenY;
     obj.targetTouches[i].targetId=eve.olde.targetTouches[i].targetId;
     }
    }
   }
  obj.touchesLen=0;
  obj.touches=[];
  if(eve.olde.touches)
   {
   obj.touchesLen=eve.olde.touches.length;
   k=obj.touchesLen;
   for(i=0;i<3;i++)
    {
    if(i<k)
     {
     obj.touches[i]={};
     obj.touches[i].clientX=eve.olde.touches[i].clientX;
     obj.touches[i].clientY=eve.olde.touches[i].clientY;
     obj.touches[i].force=eve.olde.touches[i].force;
     obj.touches[i].identifier=eve.olde.touches[i].identifier;
     obj.touches[i].pageX=eve.olde.touches[i].pageX;
     obj.touches[i].pageY=eve.olde.touches[i].pageY;
     obj.touches[i].radiusX=eve.olde.touches[i].radiusX;
     obj.touches[i].radiusY=eve.olde.touches[i].radiusY;
     obj.touches[i].rotationAngle=eve.olde.touches[i].rotationAngle;
     obj.touches[i].screenX=eve.olde.touches[i].screenX;
     obj.touches[i].screenY=eve.olde.touches[i].screenY;
     obj.touches[i].targetId=eve.olde.touches[i].targetId;
     }
    }
   }
 return obj;
 }







 function ChatUxClickHandler()
 {
 var clkx,clky,spot,tsd,ok;
 codeHit("chatuxclickhandler",0);
 //--------------------------------------------
 document.body.style.touchAction="none";
 document.getElementById('bodid').addEventListener('tap',function(event)
  {
  if(event.type=="click"||event.type=="tap")
   {
   if(audio_clicked!=true)
    {
    audio_clicked=true;
//    console.log("setting audio_clicked to true");
    }
   ChatUxEventHandler(event.type,event);
   }
  event.preventDefault();
  event.stopPropagation();
  },false);
 }








 function ChatUxEventHandler(typ,eve)
 {
 var ok,clkx,clky;
 var spot;
 var i,j,k,c;
 var obj;
 var han,obj,ctx;
 var thing,t,dx,dy,dv;
 var sx,sy,vi,ur,disp;
 var mx,my;
 var ew,eh;
 var ook,z,v;
 codeHit("chatuxeventhandler",0);
 //-----------------------------------------------

 ok=false;
 ook=0;

 if(typ=="tap"&&(eve.olde.type=="touchstart"||eve.olde.type=="touchmove"||eve.olde.type=="touchend"||eve.olde.type=="click"))
  {
  obj=ChatUxTouchDecode(typ,eve);
  dx=dy=-1;

  if(obj.what=="click"||obj.what=="touchstart")
   {
   audio_clicked=true;
   disp=env.DisplayGet();
   ew=disp.win_wid-100;
   eh=80;
   }

  if(obj.what=="click")
   {
   sx=main.app.selfvid_area.x;
   sy=main.app.selfvid_area.y;
   dx=obj.x-sx;
   dy=obj.y-sy;
   if((obj.x>=ew&&obj.x<disp.win_wid)&&(obj.y>=0&&obj.y<eh))    {    console.log("click aaaa");    }
   mx=obj.x;
   my=obj.y;
   mx=parseInt(mx);
   my=parseInt(my);
   ook=1;
   }
  else
  if(obj.what=="touchstart")
   {
   sx=main.app.selfvid_area.x;
   sy=main.app.selfvid_area.y;
   dx=obj.changedTouches[0].clientX-sx;
   dy=obj.changedTouches[0].clientY-sy;
   mx=obj.changedTouches[0].clientX;
   my=obj.changedTouches[0].clientY;
   mx=parseInt(mx);
   my=parseInt(my);
   ook=1;
   }


  if(ook==1)
  {

  /**
   if(mx>=beta_rect.x1&&my>=beta_rect.y1)
    {
    if(mx<=beta_rect.x2&&my<=beta_rect.y2)
     {
//   setTimeout(()=>window.open("https://join.skype.com/invite/Xj5stY25UgqG","_blank"),3000);
     setTimeout(()=>window.open("https://youtu.be/DVDFSbusEYY","_blank"),1000);
     //Testers();
     //window.open("https://join.skype.com/invite/Xj5stY25UgqG","_blank");
     //toggleBookmarked(main.vars.my_info.room);
     }
    }
    */


   if(mx>=star_rect.x1&&my>=star_rect.y1)
    {
    if(mx<=star_rect.x2&&my<=star_rect.y2)
     {
     toggleBookmarked(main.vars.my_info.room);
     }
    }

    /*
   if(mx>=bell_rect.x1&&my>=bell_rect.y1)
    {
    if(mx<=bell_rect.x2&&my<=bell_rect.y2)
     {
     console.log("toggle subs");
     PwaClick();
     //toggleBookmarked(main.vars.my_info.room);
     }
    }
    */


   if(cfg_state==0)
    {
    for(z=0;z<hotspot_array.length;z++)
     {
     if(mx>=hotspot_array[z].x1&&my>=hotspot_array[z].y1)
      {
      if(mx<=hotspot_array[z].x2&&my<=hotspot_array[z].y2)
       {
       if(hotspot_array[z].in_use==true&&cfg_state==0)
        {
        if(hotspot_array[z].data!=850)
         {
         window.location.href="https://mebeam.com?vi="+video_index_used;//hotspot_array[z].etc;
         return;
         }
        }
       }
      }
     }
    }


   if(cfg_state>=0)
    {
    for(z=0;z<hotspot_array.length;z++)
     {
     //console.log(z+" "+hotspot_array[z].data);

     if(mx>=hotspot_array[z].x1&&my>=hotspot_array[z].y1)
      {
      if(mx<=hotspot_array[z].x2&&my<=hotspot_array[z].y2)
       {
       if(hotspot_array[z].in_use==true&&cfg_state>=1)
        {
        if(hotspot_array[z].data>=100&&hotspot_array[z].data<=199)
         {
         v=hotspot_array[z].data-100;
         toggleBookmarked(hotspot_array[z].etc);
         return;
         }
        else
        if(hotspot_array[z].data>=200&&hotspot_array[z].data<=299)
         {
         v=hotspot_array[z].data-200;
         window.location.href="https://mebeam.com/"+hotspot_array[z].etc+"?vi="+video_index_used;
         return;
         }
        else
        if(hotspot_array[z].data>=300&&hotspot_array[z].data<=399)
         {
         v=hotspot_array[z].data-300;
         window.location.href="https://mebeam.com/"+main.vars.my_info.room+"?vi="+v;//video_index_used;//hotspot_array[z].etc;
         return;
         }
        else
        if(hotspot_array[z].data>=400&&hotspot_array[z].data<=499)
         {
         v=hotspot_array[z].data-400;
         window.location.href="https://mebeam.com/"+main.vars.my_info.room+"?vi="+v;//video_index_used;//hotspot_array[z].etc;
         return;
         }
        else
        if(hotspot_array[z].data==500)
         {
         if(env.is_mobile)
          {
          if(text.IndexOf(env.browser_platform,"win")<0)
           {
           if(inviteOthers()==false) { ShareTwo(false); }
           }
          else     {     ShareTwo(true);     }
          }
         else                     {    ShareTwo();    }
         return;
         }
        else
        if(hotspot_array[z].data==600)
         {
         if(room_field_state==false)
          {
          room_field_state=true;
          room_field_input="";
         //room_field_input="chatlobby";
          room_field_caret=0;
          }
         else
         if(room_field_state==true)
          {
          room_field_state=false;
          }
         //return;
         }
        else
        if(hotspot_array[z].data==701)
         {
         window.location.href="https://mebeam.com?vi="+video_index_used;//hotspot_array[z].etc;
         return;
         }
        else
        if(hotspot_array[z].data==740)      {         PwaClick();         return;         }
        else
        if(hotspot_array[z].data==750)         {         PwaClick();         return;         }
        else
        if(hotspot_array[z].data==850)
         {
         big_mode++;
         if(big_mode==3) { big_mode=0; }
         history_change=true;
         cfg_tik=timer.MsRunning();     cfg_state^=1;     paintkb=1;
         return;
         }
        else
         {
         window.location.href="https://mebeam.com/"+room_field_input+"?vi="+video_index_used;//hotspot_array[z].etc;
         return;
         }
        }
       }
      }
     }
    }
   if(mx>=burg_rect.x1&&my>=burg_rect.y1)    {    if(mx<=burg_rect.x2&&my<=burg_rect.y2)     {     cfg_tik=timer.MsRunning();     cfg_state^=1;     paintkb=1;     }    }
   }


  if(obj.what=="click")
   {
   clkx=obj.x;
   clky=obj.y;
   spot=ChatUxKeyFromCord(clkx,clky);
   if(spot)     {     ok=true;   }
   }
  else
  if(obj.what=="touchstart")
   {
   clkx=obj.changedTouches[0].clientX;
   clky=obj.changedTouches[0].clientY;
   spot=ChatUxKeyFromCord(clkx,clky);
   if(spot)    {      ok=true;    }
   finger=[];
   thing={};
   thing.stamp=obj.timeStamp;
   thing.x=parseInt(clkx);
   thing.y=parseInt(clky);
   finger.push(thing);
   HandleTouch(obj.what);
   }
  else
  if(obj.what=="touchmove")
   {
   clkx=obj.changedTouches[0].clientX;
   clky=obj.changedTouches[0].clientY;
   spot=ChatUxKeyFromCord(clkx,clky);
   if(spot)
     {
     //if(spot.key=="<<")      {      ok=true;      }
     }
   thing={};
   thing.stamp=obj.timeStamp;
   thing.x=parseInt(clkx);
   thing.y=parseInt(clky);
   finger.push(thing);
   HandleTouch(obj.what);
   }
  else
  if(obj.what=="touchend")
   {
   clkx=obj.changedTouches[0].clientX;
   clky=obj.changedTouches[0].clientY;
   thing={};
   thing.stamp=obj.timeStamp;
   thing.x=parseInt(clkx);
   thing.y=parseInt(clky);
   finger.push(thing);
   HandleTouch(obj.what);
   }
  }
 if(ok==true)
  {
  ChatUxKeyEvent(spot);
  }
 }






 function HandleTouch(what)
 {
 var fl,ffi,fli,thing,delt,swipe_time,dx,dy,dv;
 var frst,last,prev,scroy,pc;
 codeHit("handletouch",0);
 //-------------------------------
 fl=finger.length;
 fli=fl;
 if(fli<=0) { Oof(fli); }
 fli--;
 ffi=0;

 if(what=="touchmove"&&cfg_state==0)
  {
  dx=dy=0;
  if(fl>=2)
   {
   delt={};
   delt.x=0;
   delt.y=0;
   frst=finger[ffi];
   last=finger[fli];
   prev=finger[fli-1];
   dx=(last.x-prev.x);
   dy=(last.y-prev.y);
   if(dy>0)    {    history_fine+=dy*swipe_multi;            }   else
   if(dy<0)    {    history_fine-=Math.abs(dy)*swipe_multi;  }
   if(history_fine>=((history_height-1)*main.app.rcve_vgap)) { history_fine=((history_height-1)*main.app.rcve_vgap); }
   if(history_fine<0)                                        { history_fine=0; }
   }
  }
 }





 function ChatUxKeyEvent(ev)
 {
 var ok;
 var s,spot;
 var ch1,ch2;
 var kc,si;
 var pot;
 var ac,el;
 var what,ll;
 var sub,brp;
 var old_keyboard_stage;
 codeHit("chatuxkeyevent",0);
 //-----------------------------------
 pot=null;

 if(ev.name!="keydown")  {  return null;  }
 old_keyboard_page=keyboard_page;
 while(1)
  {
  if(ev.key=="ABC")  { keyboard_page=1;   gui.UpdateRequest(); break; }
  if(ev.key=="123")  { keyboard_page=2;   gui.UpdateRequest(); break; }
  if(ev.key=="#+=")  { keyboard_page=3;   gui.UpdateRequest(); break; }
  if(ev.key=="abc")  { keyboard_page=0;   gui.UpdateRequest(); break; }
  break;
  }
 if(old_keyboard_page!=keyboard_page)
  {
  console.log(old_keyboard_page+" to "+keyboard_page);
  paintkb=1;
  return null;
  }

              if(ev.key=="cfg")
               {
               switch(cfg_state)
                {
                case 0:
                paintkb=1;
                cfg_tik=timer.MsRunning();
                cfg_state=1;
                break;

                case 1:
                cfg_state=0;
                paintkb=1;
                break;

                /*
                el=timer.MsRunning()-cfg_tik;
                if(el>1000) { cfg_state=0; paintkb=1; break; }
                cfg_state=2;
                */

                case 2:
                if(env.is_mobile)
                 {
                 brp=env.browser_platform;
                 if(text.IndexOf(brp,"win")<0)
                  {
                  if(inviteOthers()==false) { ShareTwo(false); }
                  }
                 else     {     ShareTwo(true);     }
                 }
                else                     {    ShareTwo();    }
                cfg_state=0;
                paintkb=1;
                break;
                }
               gui.UpdateRequest();
               return null;
               }


 pot=keyboard_spot_array[ev.self_index];
 // desktop keypress
 if(pot==null)
  {
  if((ev.keyCode==13||ev.key=="GO")&&room_field_state==false)
   {
   if(chat_input_text!=""&&chat_input_text.length>0)   {   ChatRoomSend("jpg",jpg_quality,chat_input_text);   chat_input_text="";    paintkb=1;    gui.UpdateRequest();    }
   return null;
   }
  if((ev.keyCode==13||ev.key=="GO")&&room_field_state==true)
   {
   //if(room_field_input!=""&&room_field_input.length>0)
    {
    if(room_field_input=="")  {  window.location.href="https://mebeam.com/"+"chatlobby"+"?vi="+video_index_used;     }
    else                      {  window.location.href="https://mebeam.com/"+room_field_input+"?vi="+video_index_used;     }
    //Oof(room_field_input);   room_field_input="";    paintkb=1;    gui.UpdateRequest();
    }
   return null;
   }

  if(ev.keyCode==8&&room_field_state==false)
   {
   input_touched=true;
   if(chat_input_text!=""&&chat_input_text.length>0)    {    chat_input_text=chat_input_text.substring(0,chat_input_text.length-1);    paintkb=1;   gui.UpdateRequest();    }
   return null;
   }
  if(ev.keyCode==8&&room_field_state==true)
   {
   input_touched=true;
   if(room_field_input!=""&&room_field_input.length>0)    {    room_field_input=room_field_input.substring(0,room_field_input.length-1);    paintkb=1;   gui.UpdateRequest();    }
   return null;
   }

  if((ev.keyCode>=32&&ev.keyCode<127)&&room_field_state==false)
   {
   if(ev.key.length==1)  {    chat_input_text+=ev.key;    paintkb=1;    input_touched=true;    gui.UpdateRequest();    }
   return null;
   }
  if(((ev.keyCode>=48&&ev.keyCode<=57)||(ev.keyCode>=65&&ev.keyCode<=90)||(ev.keyCode>=97&&ev.keyCode<=122))&&(room_field_state==true))
  //  if((ev.keyCode>=32&&ev.keyCode<127)&&room_field_state==true)
   {
   if(ev.key.length==1)  {    room_field_input+=ev.key;    paintkb=1;    input_touched=true;    gui.UpdateRequest();    }
   return null;
   }


   if(room_field_state==false)
    {
    if(ev.key.length==1)
     {
     chat_input_text+=ev.key;
     console.log("bb="+chat_input_text);
     paintkb=1;    input_touched=true;    gui.UpdateRequest();
     }
    }
   else
   if(room_field_state==true)
    {
   // if(ev.key.length==1)  {    room_field_input+=ev.key;    paintkb=1;    input_touched=true;    gui.UpdateRequest();    }
    }
   return null;
   }

  if(ev.key.length==1&&room_field_state==false)
   {
   chat_input_text+=ev.key;
   console.log("cc="+chat_input_text);
   paintkb=1;
   input_touched=true;
   gui.UpdateRequest();
   return null;
   }



  if(ev.key.length==1&&room_field_state==true)
   {
   if(((ev.keyCode>=48&&ev.keyCode<=57)||(ev.keyCode>=65&&ev.keyCode<=90)||(ev.keyCode>=97&&ev.keyCode<=122)))
    {
    room_field_input+=ev.key;
    paintkb=1;
    input_touched=true;
    gui.UpdateRequest();
    }
   return null;
   }


  // phone touch
  if(ev.key=="GO"&&room_field_state==false)
   {
   if(chat_input_text!=""&&chat_input_text.length>0)
    {
    if(chat_input_text.substring(0,4)=="//:)")
     {
     sub=chat_input_text.substring(4);
     while(1)
      {
      //if(sub=="ht") { ChatHudsToggle(); break; }
      if(sub=="flk") { do_flicker++; do_flicker%=2; console.log("do flicker="+do_flicker); break; }
      break;
      }
     chat_input_text="";
     paintkb=1;
     gui.UpdateRequest();
     return null;
     }
    ChatRoomSend("jpg",jpg_quality,chat_input_text);
    chat_input_text="";
    paintkb=1;
    gui.UpdateRequest();
    }
   return pot;
   }

  if(ev.key=="GO"&&room_field_state==true)
   {
   if(room_field_input=="") {     window.location.href="https://mebeam.com/"+"chatlobby"+"?vi="+video_index_used;     }
   else                     {     window.location.href="https://mebeam.com/"+room_field_input+"?vi="+video_index_used;     }
   room_field_input="";
   paintkb=1;
   gui.UpdateRequest();
   return pot;
   }


  if(ev.key=="<<"&&room_field_state==false)
   {
   input_touched=true;
   if(chat_input_text!=""&&chat_input_text.length>0)   {   chat_input_text=chat_input_text.substring(0,chat_input_text.length-1);   paintkb=1;    gui.UpdateRequest();    }
   return pot;
   }

  if(ev.key=="<<"&&room_field_state==true)
   {
   input_touched=true;
   if(room_field_input!=""&&room_field_input.length>0)   {   room_field_input=room_field_input.substring(0,room_field_input.length-1);   paintkb=1;    gui.UpdateRequest();    }
   return pot;
   }


  if(ev.key=="nl")
   {
   chat_input_text+="<br>";
   gui.UpdateRequest();
   return pot;
   }

  if(ev.key=="SPACE")
   {
   input_touched=true;
   if(chat_input_text!=""&&chat_input_text.length>0)    {    chat_input_text+=" ";    paintkb=1;    gui.UpdateRequest();    }
   return pot;
   }

  if(pot.key.length==1)
   {
   chat_input_text+=pot.key;
   paintkb=1;
   gui.UpdateRequest();
   }

 return pot;
 }


