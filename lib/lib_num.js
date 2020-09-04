
 var num=(function() {
 var is_init=false;

 function Init () {
 if(is_init==true) { return; }
 is_init=true;
 }

 Init();


 function Rand (max) {
 var val=Math.floor(Math.random()*Math.floor(max));
 return val%max;
 }



 function Fixed (numb,places) {
 return numb.toFixed(places);
 }



 function PercentOf (numb,tot) {
 return(tot/100)*numb;
 }



 function PercentIs (numb,tot) {
 return(100.0/tot)*numb;
 }


 function Pad(numb,width,z) {
 z=z||'0';
 numb=numb+'';
 return numb.length>=width?numb:new Array(width-numb.length +1).join(z)+numb;
 }



 return{
 is_init:is_init,
 Rand:Rand,
 Fixed:Fixed,
 PercentOf:PercentOf,
 PercentIs:PercentIs,
 Pad:Pad
 }

})();

