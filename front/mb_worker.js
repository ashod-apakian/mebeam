

 onconnect = function(e)
 {
 var i;
 var port = e.ports[0];
 port.onmessage = function(e)
  {
  for (i=0;i<1000;i++) //i=e.data, il=1000001; i<il; i++)
   {
   if((i%100)==0)
    {
    port.postMessage(i);
    }
   //postMessage(i);
   };

  //var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//  port.postMessage(workerResult);
  };
 };



/*

 onmessage = function (evt)
 {
 //var i;
 for(i=0;i<5000000;i++)  {  if((i%10)==4) {  postMessage(0); }  }
 for (var i=evt.data, il=1000001; i<il; i++)
  {
  postMessage(i);
  };
 };



*/
