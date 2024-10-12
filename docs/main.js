function GetForm(){var o=GetArgs("form");return (o?o=="file"?"terraria/file":o=="server"?"terraria/server":o:"main")+".html";}
function GetArgs(name){return GetArgsFromHref(window.location.href,name);}
function GetArgsFromHref(O, name)
{
      var os  = O.split("?");
      var out = "";
    
      if(os[0] == O) return out;
      var str = os[1];
      os = str.split("&");
      for(var i = 0; i < os.length; i ++)
      {
          str = os[i];
          var arg = str.split("=");
          if(arg.length <= 1) continue;
          if(arg[0] == name) out = arg[1]; 
      }
      return out;
}
function upform()
{
	document.getElementById("form").data=GetForm();
}
var old_menu;
function show(name)
{
	var menu=document.getElementById(name);
	if(old_menu!=null&&old_menu!=menu){old_menu.style.display='none';old_menu=menu;}
	menu.style.display=menu.style.display=='none'?'':'none';
}