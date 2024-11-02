var Main=this
while(o=document.getElementsByTagName('script')[0])document.head.removeChild(o)
function AddScript(document,Path,NoHide){
	var o=document.createElement('script')
	if(!NoHide)o.id='HideScript';o.src=Path
	document.head.appendChild(o)
	if(!NoHide)document.head.removeChild(document.getElementById('HideScript'))
}
AddScript(document,'./Library/prototype.js?	v7')
AddScript(document,'./Library/Element.js?	v1022')

this.onload=_=>{
	const Element=document.body.AddElement({Value:[
		{Name:'Index',Class:'Index',Value:[
			{Class:'Header',Value:'目录'},
			{Name:'Terraria',Value:'泰拉瑞亚'},
			{Name:'Note',Value:'笔记'},
		]},
		{Name:'Page',Type:'iframe',Class:'Page'},
		{Class:'footer',Value:'©2015-2022 L-0'}
	],CSS:`
html{height:100%;text-align:center;color:#AAA;cursor:default;}
body{
	background: url(RES/BJ2.jpg);
	background-repeat: no-repeat;
	background-position: center;
	background-color: #000;
	width: 90%;height:94%;
	margin: 3% auto;
	box-shadow:0 0 16px #333,0 0 16px #000;
	border-radius: 5px 5px 5px 5px;
	opacity: 0.8;
}
.Index{
	display:grid;align-content:start;
	width:calc(20% - 1px);height:100%;
	overflow:overlay;
	float:right;
	border-radius:0 5px 5px 0;
	border-left:#222 solid 1px;
	background:#000;
}
.Page{
	width:80%;height:100%;
	float:left;
	border-style:none;
	border-radius:5px 0 0 5px;
	background:#000;
}
.Header{border-bottom:#222 solid 1px;}
.footer{position:absolute;left:50%;bottom:0px;transform:translate(-50%,0);font-size:8px;}
`})
	Element.Page.src='Web/main.html'
	document.title='此世间如此无趣...'
	
}