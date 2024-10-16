var Main=this;
function AddScript(document,Path,NoHide){
	var o=document.createElement('script');
	if(!NoHide)o.id='HideScript';o.src=Path;
	document.head.appendChild(o);
	if(!NoHide)document.head.removeChild(document.getElementById('HideScript'));
}
AddScript(document,'/Library/prototype.js?v1')
AddScript(document,'/Library/Element.js?v1')
AddScript(document,'/Library/color.js?v1')

this.onload=()=>{
	Main.Color=[]
	var Body=document.body;
	Body.AddCSS('InkCSS',`
body{
	background-color:unset;
	white-space:pre;
	text-align:center;
	cursor:default;
}
.LabelH{font-size:.8em;}
.INK x{display:inline-block;width:1em;}
.INK .LabelT{width:unset;}
.InkInfo{
	margin:auto;
	width:20em;
	height:8em;
	display:block;
}
.NumberTable{display:block;}
.NumberValue{display: inline-grid;}
.ColorValue{display:inline-grid;}
.Point{position: relative;padding:.7em 1em;}
.Point .Level{
	position: absolute;
    font-size: .1em;
    left: 0px;
    top: 0px;
}
.Point .dE{
	position: absolute;
    font-size: .1em;
    left: 0px;
    bottom: 0px;
}

.InfoPage{
	display: block;
    position: fixed;
	background-color: #DDDA;
}
.InfoPage .Level{display: block;}
.InfoPage .LAB{display: block;}
.InfoPage .RGB{display: block;}
.InfoPage .Point{display: block;}
.InfoPage .RGBPoint{display: block;}
.InfoPage .deltaE{display: block;}

.Point{}
.K{color:#0F0;}
.Point.Select{color:#F00;}
.M.Select{color:#0F0;}
.O.Select{color:#00F;}

Menu{
	position:fixed;
	top:0;left:0;
	margin:0;padding:0;
}
Menu>*{display:block;}
input{width:5em;}
canvas{
	position: absolute;
	left: 0;
	width: 500px;
	height: 500px;
    background: #FFF;
    z-index: -1;
    
}
.red{color:#F00 !important;}
.Hidden{display:none;}
`)
	const NumberTable=Main.NumberTable=Body.AddElement({Name:'NumberTable'})
	const Menu=Body.AddElement({ID:'Menu',Value:[
		{ID:'Canvas'},
		{ID:'Input'},
		// {ID:'Switch',Value:'$State'},
		{ID:'Show',Value:'显示画布'},
		{ID:'Hide',Value:'隐藏画布'},
		{ID:'Clear',Value:'清除画布'}
	]})
	const Input=Menu.Input
	const Canvas=Main.CV=Menu.Canvas.Hide()
	Canvas.width=Canvas.height='500'
	Canvas.DrawCurve=ThisDrawCurve
	if(Canvas.getContext)Canvas.Context=Main.CT=Canvas.getContext('2d')
	// Menu.SetVariable({State:'显示画布'})
	// Canvas.Show=()=>{Canvas.SetClass('Hidden',!(Canvas.hidden=1));Menu.SetVariable({State:'隐藏画布'})}
	// Canvas.Hide=()=>{Canvas.SetClass('Hidden',!(Canvas.hidden=0));Menu.SetVariable({State:'显示画布'})}
	// Menu.Switch.onclick=()=>{if(Canvas.hidden=!Canvas.hidden)Canvas.Show();else Canvas.Hide()}
	Canvas.Show=()=>Canvas.SetClass('Hidden',0)
	Canvas.Hide=()=>Canvas.SetClass('Hidden',1)
	Menu.Show.onclick=()=>Canvas.Show()
	Menu.Hide.onclick=()=>Canvas.Hide()
	Menu.Clear.onclick=()=>{Menu.Canvas.Context.closePath();Menu.Canvas.Context.clearRect(0,0,Menu.Canvas.width,Menu.Canvas.height)}

	Input.type='file'
	Input.multiple=true
	Input.onchange=function(){
		for(let file of this.files)if(file.name.endsWith('.txt')){
			let FR=new FileReader()
			FR.Files=this.files
			FR.File=file
			FR.FileName=file.name
			FR.onload=LoadFile
			FR.readAsText(file)
		}
	}
	Main.NumberTable.AddFile=function(FileName,Info){
		var NumberValue=this.AddElement({Name:'NumberValue',Value:FileName})
		for(var i of Info)if(i){
			if(!Main.Color[i.ID])Main.Color[i.ID]=[]
			Main.Color[i.ID].push(i)
			const ColorValue=NumberValue.AddElement({Name:'ColorValue',Value:i.ID})
			ColorValue.ColorLine=i
			ColorValue.onclick=function(E){
				const Line=this.ColorLine
				const Points=[]
				for(let o of Line)if(o.deltaE)Points.push({X:parseFloat(o.ID),Y:parseFloat(o.deltaE)})
				Main.CV.Show().DrawCurve(Points,`lab(${Line[20].LAB.map(o=>o|0).join(' ')})`)
			}
			for(var v of i)if(v.Point){
				const p=ColorValue.AddElement({Name:'Point',Value:v.deltaE.toFixed(2)})
				p.Info=v
				v.Element=p
				v.Line=i
				p.AddClass(i.ID)
				p.style.backgroundColor=`lab(${v.LAB.map(o=>o|0).join(' ')})`
				p.AddElement({Class:'Level',Value:v.ID})
				p.AddElement({Name:'dE',Value:'$dE'})
			}
		}
	}
	document.body.onmousemove=function(E) {
		if(E.target.Info){
			var Info=E.target.Info
			ShowInfo(Info,E.x,E.y)
			for(var SC of Main.Color[Info.Line.ID]){
				var T=SC[0]
				for(var o of SC){
					o.Element.DelClass('Select')
					o.Element.dE.value=deltaE(o.LAB,Info.LAB).toFixed(2)
					if(deltaE(T.LAB,Info.LAB)>deltaE(o.LAB,Info.LAB))T=o
				}
				T.Element.AddClass('Select')
			}
		}
		else ShowInfo()
	}
}
function ThisDrawCurve(Points,Color){
	const CT=this.Context
	const W=this.width
	const s=W/100
	const w=W/20
	for(let i=0;i<=W;i+=w){
		CT.strokeStyle='#000'
		CT.lineWidth=.5
		CT.moveTo(i+.5,0)
		CT.lineTo(i+.5,this.height)
		CT.stroke()
	}
	CT.beginPath()
	CT.lineWidth=2
	CT.strokeStyle=Color
	for(var i in Points){
		var a=Points[i]
		var b=Points[++i]
		if(!b){CT.quadraticCurveTo(a.X*s,W-a.Y*s,a.X*s,W-a.Y*s);continue;}
		var c={X:(a.X+b.X)/2,Y:(a.Y+b.Y)/2}
		CT.quadraticCurveTo(a.X*s,W-a.Y*s,c.X*s,W-c.Y*s)
	}
	CT.moveTo(W,0)
	CT.closePath()
	CT.stroke()
	
	// for(var a of Points){
	// 	CT.beginPath()
	// 	CT.arc(a.X*s,W-a.Y*s,3,0,Math.PI*2)
	// 	CT.fillStyle='red'
	// 	CT.closePath()
	// 	CT.fill()
	// }
}
function ShowInfo(Info,X,Y){
	if(Main.InfoPage==null){
		Main.InfoPage=document.body.AddElement({Class:'InfoPage Hidden',Value:[
			{Class:'Level',Value:'$Level'},
			{Class:'LAB',Value:'$LAB'},
			{Class:'RGB',Value:'$RGB'},
			{Class:'Point',Value:'$Point'},
			{Class:'RGBPoint',Value:'$RGBPoint'},
			{Class:'deltaE',Value:'$deltaE'},
		]})
	}
	if(!Info)return Main.InfoPage.Hide()
	Main.InfoPage.Show()
	var GetT=T=>T.toFixed(2).padStart(5,' ')+' '
	Main.InfoPage.SetVariable({
		Level:Info.ID,
		LAB:GetT(Info.LAB[0])+GetT(Info.LAB[1])+GetT(Info.LAB[2]),
		RGB:GetT(Info.RGB[0])+GetT(Info.RGB[1])+GetT(Info.RGB[2]),
		Point:Info.Point,
		RGBPoint:Info.RGBPoint,
		deltaE:Info.deltaE,
	})
	Main.InfoPage.style.left=X+++'px'
	Main.InfoPage.style.top=Y+16+'px'
}
function LoadFile(){
	console.dir(this.FileName)
	let Length=parseInt(this.result.match(/LGOROWLENGTH\s"(\d+)"/)[1])
	let Color=[]
	Color.ID=this.FileName.match(/(.+)\.txt/)[1]
	let ColorID=[...this.result.matchAll(/PROCESSCOLOR_ID\s"(\d \d) (\w),(\d)"/g)]
	for(let o of ColorID){
		Color[o[3]]=[]
		Color[o[3]].ID=o[2]
	}

	let ID=this.result.match(/ SAMPLE_ID.+/)[0].match(/\S+/g)
	let List=[]
	for(var I of this.result.match(/ \d+\t(.+)/g)){
		let Line={}
		var I=I.match(/\S+/g)
		for(var i=0;i<ID.length;i++)Line[ID[i]]=parseFloat(I[i])
		let index=parseInt((Line.SAMPLE_ID-1)/Length)+1
		let CID=index
		for(var i in Line)if(i.endsWith(index))CID=i
		Color[index].push({
			ID:Line[CID],
			LAB:[Line.LAB_L,Line.LAB_A,Line.LAB_B]
		})
		List.push(Line)
	}
	this.Info=AddFile(this.FileName,Color)
	this.File.Info=this.Info
	
	var PS=[]
	for(var f of this.Files)if(!f.Info)return;else PS.push(f.Info)
	Promise.all(PS).then(OS=>{for(var o of OS)Main.NumberTable.AddFile(o.FileName,o)})
}
function AddFile(FileName,Info){
	console.dir(Info)
	for(let I of Info)if(I){
		if((I[I.length-1].LAB[2]-I[0].LAB[2])>50)for(let i of I)i.Point=parseInt(i.LAB[2]*100)/100
		else for(let i of I)i.Point=parseInt(10000-i.LAB[0]*100)/100
		for(let i of I){
			i.RGB=lab2rgb(i.LAB)
			i.RGBPoint=parseInt(((765-i.RGB[0]-i.RGB[1]-i.RGB[2])/7.65)*100)/100
			i.deltaE=parseInt(deltaE([100,0,0],i.LAB)*100)/100
			// i.deltaE=parseInt(deltaE(I[0].LAB,i.LAB)*100)/100
		}
	}
	// Main.NumberTable.AddFile(FileName,Info)
	Info.FileName=FileName
	return Promise.resolve(Info)
}