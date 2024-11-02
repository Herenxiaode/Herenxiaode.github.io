
import './Library/prototype'
import './Library/Element'

let o
while(o=document.getElementsByTagName('script')[0])document.head.removeChild(o)
const link = document.createElement('link'); //创建link标签
link.setAttribute('rel', 'stylesheet'); //设置rel属性
link.setAttribute('href', '/index.css'); //设置href属性
document.head.appendChild(link);

onload=function(){
	const Parent=document.body
	Parent.AddElement({Class:'Body',Value:[
		{Type:'iframe',ID:'Page'},
		{ID:'Index',Value:[
			{Class:'Header',Value:'目录'},
			{Name:'Terraria',Value:'泰拉瑞亚'},
			{Name:'Note',Value:'笔记'},
		]},
		{ID:'Footer',Value:'©2015-2024 L'}
	]})['Page'].src='Web/main.html'
	document.title='此世间如此无趣...'
}
function SendData(Action:string,Value:any){Value.Action=Action;return fetch('',{method:'POST',body:JSON.stringify(Value)}).then(o=>o.json())}
