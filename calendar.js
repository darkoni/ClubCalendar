
var godina = 2009 , mjesec = 11 , tip=0 ;

function xx(m){var t='';if(m<10)t='0';return t+m;}
function  trim(str, chars){ if(null==str)return''; return ltrim(rtrim(str, chars), chars);}
function ltrim(str, chars){ if(null==str)return''; chars = chars || "\\s"; return str.replace(new RegExp("^[" + chars + "]+","g"),""); }
function rtrim(str, chars){ if(null==str)return''; chars = chars || "\\s"; return str.replace(new RegExp("[" + chars + "]+$","g"),""); }
function daysInMonth(iYear,iMonth){       iMonth--; return 32 - new Date(iYear,iMonth,   32).getDate();}
function   dayOfWeek(iYear,iMonth,iDate){ iMonth--; return      new Date(iYear,iMonth,iDate).getDay();}

var dayNames = new Array("Ned","Pon","Uto","Sri","Čet","Pet","Sub");
var brojdana = daysInMonth(godina,mjesec  );
var  prvidan =   dayOfWeek(godina,mjesec,1);
var  dezurni =[];
var   eventi =[];

// -------------

function dezurnigen(){ if(2==tip)return;
var xframe=document.getElementById('xdezurni');
var ime=null , datum='' ;
var arr = trim(xframe.contentWindow.document.body.textContent).split("\n"); var xc = arr.length;
for(var i=0;i<xc;i++){
arr[i]=trim(arr[i]);
datum=arr[i].substring(0,10);
  ime=arr[i].substring(  11);
  ime=ime.split(" - ");
if(null==ime[1])ime[1]='';
dezurni[datum]={ ime:ime[1] , nick:ime[0] };}}

// -------------

function dezurnitd(datum){
if(null==dezurni[datum])return'';
               nick=dezurni[datum].nick;
// if(null==nick) nick=dezurni[datum].ime;
// if( '' ==nick) nick=dezurni[datum].ime;
return '<br><a target="_blank" href="http://razmjenavjestina.org/index.php/User:'+nick+'">'+nick+'</a>';
}

// -------------

function eventitd(datum){
if(null==eventi[datum])return'';
var a1='',a2='';
if(''!=eventi[datum].url){
a1='<a target="_blank" href="'+eventi[datum].url+'">';
a2='</a>';
} return '<br><font size=-2>'+eventi[datum].vrijeme+'</font><br>'+a1+'<b>'+eventi[datum].ime+'</b>'+a2;
}

// -------------

function eventigen(){if(1==tip)return;
var xframe=document.getElementById('xevents');
var ime=null , datum='' ;
var arr = trim(xframe.contentWindow.document.body.textContent).split("\n"); var xc = arr.length;
for(var i=0;i<xc;i++){
arr[i]=trim(arr[i]);
datum=arr[i].substring(0,10);
  ime=arr[i].substring(  11);
  ime=ime.split(" ~ ");
eventi[datum]={ url:trim(ime[2]) , ime:trim(ime[1]) , vrijeme:trim(ime[0]) };}}

// -------------

function init(){ // alert(tip);

dezurni =[]; dezurnigen();
 eventi =[];  eventigen();

var txt='';
txt+='\n<table border=1 cellspacing=0 cellpadding=3 style="font-size:10pt;">';
txt+='\n<tr bgcolor=#ffff00 style="font-size:8pt;">'; for(i=0;i<7;i++)
txt+='\n<td align=center>'+dayNames[i];
txt+='\n<tr valign=top >';

var trc=0;

for(;trc<prvidan;trc++) txt+='\n<td align=center bgcolor=#aaFFaa >&nbsp;';

for(i=1;i<=brojdana;i++){
if(7==trc){trc=0;txt+='\n<tr valign=top >';}
trc++;
 datum=godina+'-'+xx(mjesec)+'-'+xx(i);
xdatum='<font size=-2>'+datum+'</font>';

ima=!true; if(null!=dezurni[datum])
ima= true; if(null!= eventi[datum])
ima= true;

if(!ima) txt+='\n<td align=center bgcolor=gray    >'+xdatum;
else {   txt+='\n<td align=center bgcolor=#aaaaFF >'+xdatum;
         txt+=dezurnitd(datum);
         txt+= eventitd(datum); }
}

for(i=trc;i<7;i++) txt+='\n<td align=center bgcolor=#aaFFaa >&nbsp;';

txt+='\n<tr bgcolor=#ffff00 style="font-size:8pt;">'; for(i=0;i<7;i++)
txt+='\n<td align=center>'+dayNames[i];
txt+='\n</table>';

document.getElementById('cal').innerHTML=txt;

}

