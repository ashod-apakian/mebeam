


 var main=(function() {
 var is_init=false;
 var state={};
 var vars={};



 function Init () {
 if(is_init==true) { return; }
 state.is_running=false;
 state.version=0;
 state.speed=0;
 state.funcProc=null;
 state.thread_id=0;
 state.worker_array=[];
 vars={};
 vars.u={};
 is_init=true;
 }


 Init();


 function Start (ver,spd,proc,dorun) { var work;
 if(main.state.is_running!=false) { return false; }
 main.state.version=ver;
 main.vars={};
 main.vars.u={};
 main.vars.cycle=-1;
 main.state.thread_id=0;
 main.state.speed=spd;
 main.state.funcProc=proc;
 main.state.is_running=true;
 main.vars.stage=0;
 WorkerAdd(wock.Yield,19);
 WorkerAdd(env.Yield,19);
 WorkerAdd(devices.Yield,19);
 if(dorun==true) { Run(); }
 return true;
 }



 function WorkerAdd (proc,step) { var work;
 if(arguments.length!=2)  alert("workeradd 2 arguments, not "+arguments.length);
 work={};
 work.proc=proc;
 work.step=step;
 main.state.worker_array.push(work);
 return true;
 }



 function Clear () {
 clearTimeout(main.state.thread_id);
 main.state.thread_id=0;
 return true;
 }



 function Run () { var i; var work;
 main.vars.cycle++;
 if(main.state.worker_array.length>=1)
  {
  for(i=0;i<main.state.worker_array.length;i++)
   {
   work=main.state.worker_array[i];
   if(work.proc==undefined||work.proc==null) { continue; }
   if(work.step<1) { continue; }
   if(((main.vars.cycle%work.step)==(work.step-1))||(main.vars.cycle==1)) {   work.proc(); }
   }
  }
 main.state.thread_id=window.setTimeout(function()
  {
  main.Clear();
  main.state.funcProc();
  main.Run();
  },main.state.speed);
 return true;
 }




 function StageSet (stage) {
 main.vars.stage=stage;
 }



 return{
 is_init:is_init,
 state:state,
 vars:vars,
 Start:Start,
 WorkerAdd:WorkerAdd,
 Run:Run,
 Clear:Clear,
 StageSet:StageSet,
 };


})();
