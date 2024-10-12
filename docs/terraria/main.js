var Main=this
while(o=document.getElementsByTagName('script')[0])document.head.removeChild(o)
function AddScript(document,Path,NoHide){
	var o=document.createElement('script')
	if(!NoHide)o.id='HideScript';o.src=Path
	document.head.appendChild(o)
	if(!NoHide)document.head.removeChild(document.getElementById('HideScript'))
}
AddScript(document,'/Library/Element.js?	v1022')

this.onload=_=>{
	document.head.AddCSS('TerrariaCSS',`
*{
	text-align: center;
	color: #AAA;
	margin:0;
}
h2{color: #AAA;}
div a{display: block;}
#body{
	background: url(../T/TRBG1.gif);
	background-size: cover;
	background-repeat:repeat-x;
	width: 90%;height:92%;
	margin: 2% auto;
	box-shadow:0 0 16px #333,0 0 16px #000;
	border-radius: 10px 10px 10px 10px;
	opacity: 0.8;
	
	animation: animatedBackground 40s linear infinite;
}
#page{
	width:80%;
	float:left;
	border-radius:10px 0 0 10px;
}
#index{
	width:calc(20% - 1px);
	float: right;
	border-radius: 0 10px 10px 0;
	border-left:solid 1px #222;
}
.Form{
	width:80%;height:100%;
	float:left;
	border-radius:10px 0 0 10px
;
}

.footer{font-size: 8px;}

.maxheight{height:100%;}
.gray{
	background: #000;
	background-size:100%;
	opacity: 1;
}
.menu{
	color: #EEE;
	font-size: 16px;
	cursor: default;
}
.submenu{
	color: #AAA;
	font-size: 14px;
}
.submenu a:hover{
	background: #888;
}
.layer{
	position:relative;
	background-color: #222;
}
.vertical{width:1px;height:100%;left: 80%;}
.horizontal{width:100%;height:1px;}

@keyframes animatedBackground {
from{background-position:0 0;}
to	{background-position:calc(100% - 100vw) 0;}
}
	
`)
	var Form=document.createElement('object')
	Form.name='form'
	Form.className='gray Form'
	Form.data='main.html'
	document.body.appendChild(Form)
	var footer=document.body.CreateElementX({Class:'footer',Value:[
		{Value:'©2015-2018 '},
		{Name:'Link',Type:'a'},
		// {Name:'access',Value:'111'}
	]})
	footer.Link.href='../'
	footer.Link.appendChild(document.createTextNode('L'))
	SendDataAsync('access').then(o=>footer.appendChild(document.createTextNode('-'+o)))
	// SendDataAsync('access').then(o=>footer.access.value='-'+o)
}

SendDataAsync=(Action,Data)=>new Promise((R,E)=>SendData(Action,Data,R,E))
function SendData(Action,DATA,Handle,Error){
	let XHR=new XMLHttpRequest(),FD=new FormData()
	XHR.timeout=3000
	FD.set('action',Action);
	if(DATA)for(id in DATA){
		let o=DATA[id];
		if(o===undefined)o='';
		else if(typeof(o)=='string')o=o.trim();
		else if(typeof(o)=='function')continue;
		FD.set(id,o);
	}
	XHR.Handle=Handle
	XHR.ontimeout=XHR.onerror=XHR.Error=Error||(E=>{throw E})
	XHR.onreadystatechange=function(e){if(this.readyState==4&&this.status==200){
		let data=JSON.parse(this.responseText.substr(this.responseText.indexOf('{')));
		if(!data)this.Error(this.responseText);
		else if(data.Type!='Success')this.Error(data)
		else if(this.Handle)this.Handle(data.Value)
	}};
	XHR.open('POST','/Main.php?'+Action)
	try{XHR.send(FD);}catch(e){console.dir(e)}
}
