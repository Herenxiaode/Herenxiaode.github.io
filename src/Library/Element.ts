
export class ElementEX extends Element{
	value:string
	Variables:ElementEX[]
	GetVariable(Value:Element[]){for(var o of this.children){o.GetVariable(Value);if(o.Variable)Value[o.Variable]=o}}
	SetVariable(Value:{[index:string]:any}){
		if(!this.Variables)this.GetVariable(this.Variables=[])
		if(Value)for(let i in this.Variables)if(i in Value)this.Variables[i].value=Value[i]?.toString()??''
		return this
	}
	AddElement({ID,Name,Type,Class,Value,CSS}){
		if(!Type)Type=ID||'x'
		switch(typeof(Value)){
		// case 'boolean':	return this;
		// case 'number':
		// 	if(ID)this[o.id=ID]=o;else if(Name)this[Name]=o
		// 	if(!ID&&Name&&!Class)o.className=Name
		// 	return o 
		case 'string':
			var Variable=''
			if(Value[0]=='$'){Variable=Value.substring(1);Value=''}
			switch(Type){
				case 'Image':o=this.AddImage(Value,Class);break
				case 'Button':o=this.AddButton(Value,Class)
				case 'Input':o=this.AddInput(Value,Class);break
				default:o=this.AddLabel(ID,Class,Value);break
			}
			if(Variable)o.Variable=Variable
		// case 'number':
			if(ID)this[o.id=ID]=o;else if(Name)this[Name]=o
			if(!ID&&Name&&!Class)o.className=Name
			return o 
		case 'object':
		default:{
			var o=document.createElement(Type) as HTMLElement
			this.appendChild(o)
			if(ID)this[o.id=ID]=o
			else if(Name)this[Name]=o
			if(Class)o.className=Class
			if(!ID&&Name&&!Class)o.className=Name
			if(CSS)o.AddCSS((ID||Class)+'CSS',CSS)
			if(!Value)return o
			else if(Value.constructor!=Array)o.AddElement(Value as any)
			else for(const O of Value)O.IsElement?o.appendChild(O):o.AddElement(O)
			return o
		}}
	}
	AddCSS(Name:string,CSS:string){
		if(!this[Name]){
			this[Name]=document.createElement('style')
			this[Name].type='text/css';this[Name].innerHTML=CSS
		}
		document.head.appendChild(this[Name])
	}
	AddLabel(ID='x',Class:string,Value:string){
		const x=this[ID]=document.createElement(ID)
		if(Class)x.className=Class
		x.appendChild(document.createTextNode(Value||''))
		Object.defineProperty(x,'value',{
			get:function(){return this.firstChild.data},
			set:function(o){return this.firstChild.data=o}
		})
		this.appendChild(x)
		return x
	}
	AddButton(Value:string,Class:string){return this.AddLabel('x',Value,'Button '+Class)}
	AddInput(Value:string,Class:string){
		const x=document.createElement('input')
		if(Class)x.className=Class
		if(Value)x.placeholder=Value
		this.appendChild(x)
		return x
	}
	AddImage(Value:string,Class:string){
		const x=document.createElement('img')
		if(Class)x.className=Class
		x.define('value',{
			get:function(){return this.src},
			set:function(o:string){
				this.onerror=function(){this.src='NoImage.png';this.onerror=undefined}
				this.src=o;return this
			}
		})
		x.value=Value
		this.appendChild(x)
		return x
	}
	AddCircleBar(Radius:number){
		const x=document.createElement('x') as any
		const C=x.C=document.createElement('x')
		x.className='CircleBar'
		C.className='Info'
		x.style.width=x.style.height=(Radius*2)as any
		const text=document.createTextNode('')
		C.appendChild(text)
		x.appendChild(C)
		x.SetValue=function(Value:any,Info:string){
			text.data=Info||Value
			x.style.background=`conic-gradient(#0F0 ${Value*3.6}deg,#222 0)`;
		}
		this.appendChild(x)
		return x as HTMLElement
	}
	Hide(){return this.SetClass('Hidden',true)}
	Show(){return this.SetClass('Hidden',false)}
	AddClass(Class:string){return this.SetClass(Class,true)}
	DelClass(Class:string){return this.SetClass(Class,false)}
	SetClass(Class:string,Enable:boolean){
		var cn=this.className
		if(!Enable)cn=cn.replace(Class,'')
		else if(cn.indexOf(Class)==-1)cn+=' '+Class;
		this.className=cn.replace(/ +/,' ')
		return this
	}
	Clear(){while(this.firstChild)this.removeChild(this.firstChild);return this}
}
Object.setPrototypeOf(HTMLElement.prototype, ElementEX.prototype)

// !async function(){
// 	// while(!this?.JSLoaded_portotype)await delay(100)
// 	for(let o of [Element.prototype, CharacterData.prototype, DocumentType.prototype])
// 		o.define('remove',function(){this.parentNode.removeChild(this)})
// }()