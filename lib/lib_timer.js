

 var timer=(function() {
 var is_init=false;
 var msec_base;
 var perf_base;

 function Init () {
 if(is_init==true) { return; }
 msec_base=new Date().valueOf();
 perf_base=performance.now();
 is_init=true;
 }


 Init();



 function TikNow (perf) {
 var t;
 if(perf) { t=performance.now()-perf_base;  }
 else     { t=new Date().valueOf()-msec_base; }
 return t;
 }


 function TikElapsed (perf,tik) {
 return(TikNow(perf)-tik);
 }



 function MsRunning () {
 return(TikNow(false));
 }


 return{
 is_init:is_init,
 TikNow:TikNow,
 TikElapsed:TikElapsed,
 MsRunning:MsRunning
 }


})();

