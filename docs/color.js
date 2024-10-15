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
.Point{position: relative;padding:.5em 1em;}
.Point .Level{
	position: absolute;
    font-size: .1em;
    left: 0px;
    top: 0px;
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

input{width:5em;}

canvas{
	width: 500px;
	height: 500px;
}
.red{color:#F00 !important;}
.Hidden{display:none;}
`)

	var o=document.createElement('input')
	o.type='file';o.multiple=true;o.onchange=function(){
		for(let file of this.files)if(file.name.endsWith('.txt')){
			let FR=new FileReader()
			FR.Files=this.files
			FR.File=file
			FR.FileName=file.name
			FR.onload=LoadFile
			FR.readAsText(file)
		}
	}
	document.body.appendChild(o)
	Main.CV=document.createElement('canvas')
	document.body.appendChild(Main.CV)

	if(Main.CV.getContext)Main.CT=Main.CV.getContext('2d')
	Main.CV.width='1000'
	Main.CV.height='1000'

	Main.NumberTable=document.body.AddElement({Class:'NumberTable',Value:{}})
	Main.NumberTable.AddFile=function(FileName,Info){
		var NumberValue=this.AddElement({Class:'NumberValue',Value:FileName})
		var o=[]
		for(var i of Info)if(i){
			if(!Main.Color[i.ID])Main.Color[i.ID]=[]
			Main.Color[i.ID].push(i)
			var ColorValue=NumberValue.AddElement({Class:'ColorValue',Value:i.ID})
			ColorValue.ColorLine=i
			for(var v of i)if(v.Point){
				var p=ColorValue.AddElement({Class:'Point',Value:v.deltaE.toFixed(2)})
				p.Info=v
				v.Element=p
				v.Line=i
				// if(i.ID=='K')p.style.color='#0F0'
				p.AddClass(i.ID)
				// p.style.backgroundColor=`rgb(${v.RGB[0]},${v.RGB[1]},${v.RGB[2]})`
				p.style.backgroundColor=`lab(${v.LAB[0]}% ${v.LAB[1]} ${v.LAB[2]})`
				p.AddElement({Class:'Level',Value:v.ID})
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
					if(deltaE(T.LAB,Info.LAB)>deltaE(o.LAB,Info.LAB))T=o
				}
				T.Element.AddClass('Select')
				console.dir(T)
			}
		}
		else ShowInfo()
	}
	document.body.onclick=function(E){
		console.dir(E)
		var EX=E.target
		while(EX)if(EX.ColorLine){
			var Line=EX.ColorLine
			var Points=[]
			for(var o of Line)if(o.Point)Points.push({X:parseFloat(o.ID),Y:parseFloat(o.Point)})
			DrawCurve(Main.CT,Points)
			return
		}else EX=EX.parentElement
	}

}
function DrawCurve(CT,Points){
	
	CT.beginPath()
	for(var i in Points){
		var a=Points[i]
		var b=Points[++i]
		if(!b){CT.quadraticCurveTo(a.X*10, 1000-a.Y*10,a.X*10,1000-a.Y*10);continue;}
		var c={X:(a.X+b.X)/2,Y:(a.Y+b.Y)/2,}
		CT.quadraticCurveTo(a.X*10, 1000-a.Y*10,c.X*10,1000-c.Y*10)
	}
	CT.moveTo(1000,0)
	// CT.closePath()
	CT.stroke()
	
	for(var a of Points){
		
		// var a=Points[i]
		// console.dir(a)

		CT.beginPath()
		CT.arc(a.X*10, 1000-a.Y*10, 3, 0, Math.PI*2)
		CT.fillStyle = 'red'
		CT.closePath()
		CT.fill()
	}
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
	Promise.all(PS).then(OS=>{
		for(var o of OS)Main.NumberTable.AddFile(o.FileName,o)
	})
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