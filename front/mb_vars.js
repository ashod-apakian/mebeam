
/*-=---------------------------------------------------------------------*/
 var mb_version_str="v1242";
/*-=---------------------------------------------------------------------*/

 var base_font_size=0;//32;
 var flash_spots=0;

 function codeHit(func,line)
 {
 }


/*-=---------------------------------------------------------------------*/

 var do_flicker=0;

 var big_mode=2;//false;

 var audio_clicked=false;
 var audio=new Audio('icq.wav');//chimein.wav');

 var chat_input_text="";

 var chat_history_array=[];
 var chat_history_slots=0;

 var history_fine=0;
 var history_height=0;
 var history_change=false;

 var history_fin_received=0;

 var current_chat_last_stamp=0;
 var current_chat_push_stamp=0;

 var keyboard_spot_array=[];
 var keyboard_spot_count=0;
 var keyboard_page=0;

 var paintkb=1;

 var usr_txt=[];
 var sys_txt=[];
 var finger=[];
 var prevo={};
 var base_image={};

/*-----------------------------------------------------------------------*/

 var cfg_state=0;
 var cfg_tik=0;

 var input_touched=false;

 var change_count=0;
 var change_prevo=0;

 var is_scroll_visible=false;
 var is_dragging_scroll=false;

 var scroll_tab_rect;

/*-----------------------------------------------------------------------*/

 var star_rect;
 var bell_rect;
 var burg_rect;
 var beta_rect;

 var jpg_wid=320;
 var jpg_hit=240;
 var jpg_quality=0.04;

 var slf_wid=320;
 var slf_hit=240;

 var rcv_wid=320;
 var rcv_hit=240;

 var cap_frame;
 var cap_frame_cur_ms;

/*-----------------------------------------------------------------------*/

 var myDynamicManifest=
 {
  "name": "MeBeam. You see what I'm saying!",//"MeBeam",
  "short_name": "MeBeam",
  "start_url": "https://mebeam.com/",//"/",
  "display": "standalone",
  "background_color": "#ffff99",
  "theme_color": "#2F4F7F",
  "orientation": "portrait",
  "description": "You see what I'm saying!",
  "scope": "https://mebeam.com/",
  "permissions": ["tabs"],
  "icons":[ {"src":"https://mebeam.com/favicon.png","sizes":"32x32","type":"image/png"},{"src":"https://mebeam.com/favicon192x192.png","sizes":"192x192","type":"image/png"},{"src":"https://mebeam.com/splash512x512.png","sizes":"512x512","type":"image/png"}] };


/*-----------------------------------------------------------------------*/


 window.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;
 window.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction;
 window.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange;

 var db_name="mbdb17";
 var db_ver=1;
 var db;
 var db_sys={};
 var db_request;
 var db_cursor;
 var db_state;
 var db_array=[];
 var db_digest="";
 var db_digest_prev="";
 var db_phaze=0;
 var db_parm;
 var db_mode;
 var db_ready=false;

 var os_name="options";
 const OptionsData=[];

 var room_field_state=false;
 var room_field_input="";
 var room_field_caret=0;


/*-----------------------------------------------------------------------*/

 var hotspot_array=[];


/*-----------------------------------------------------------------------*/


 var blink_id=0;
 var blink_cycle=0;
 var focused=true;

 var video_index_used=0;

 var swipe_speed=26;
 var swipe_multi=2;

 var worker;
 var worker_state=0;

/*-----------------------------------------------------------------------*/

 var geo_state=0;
 var geo_json;

 var coo_name="beamz7";
 var coo=null;
 var voo=null;

 var vi=-1;

 var fingprint_done=false;
 var fingprint_obj;
 var fingprint_0="";
 var fingprint_1="";

 var append_delay_ms=0;
 var append_utc_processed=0;


/*-----------------------------------------------------------------------*/


 var pwa={};

 const applicationServerPublicKey='BKeFzJCy6clKXqA5NOCNOBwjrpqORp4FQ5JwvC1fy-nXA9Klma4d8bWE1EsgPPLa-Q3xATy_ulQ2z5T5h9IsLH0';

 const sw_script='swz9.js';

 var ntfy_stage=0;
 var ntfy_ms=0;
 var ntfy_sends=0;
 var ntfy_last_hash="";
 var ntfy_cyc=0;
 var ntfy_grand=0;
 var ntfy_needed=0;


