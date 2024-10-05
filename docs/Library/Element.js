"use strict"
Element.prototype.IsElement=true
// const delay=s=>new Promise(r=>setTimeout(r,s))
// Element.prototype.GetTop	=function(){return this.getBoundingClientRect().y}
// Element.prototype.GetLeft	=function(){return this.getBoundingClientRect().x}

Element.prototype.AddElement=function({ID,Name,Type,Class,Value,CSS}){
	if(!Type)Type=ID||'x'
	switch(typeof(Value)){
	case 'boolean':	return;
	case 'number':
	case 'string':{
		var Variable=''
		if(Value[0]=='$'){Variable=Value.substr(1);Value=''}
		switch(Type){
			case 'Image':o=this.AddImage(Value,Class);break
			case 'Button':o=this.AddButton(Value,Class);break
			case 'Input':o=this.AddInput(Value,Class);break
			default:o=this.AddLabel({ID,Class,Value});break
		}
		if(ID)this[o.id=ID]=o
		else if(Name)this[Name]=o
		if(!ID&&Name&&!Class)o.className=Name
		if(Variable)o.Variable=Variable
		return o;
	}
	case 'object':
	default:{
		var o=document.createElement(Type)
		this.appendChild(o)
		if(ID)this[o.id=ID]=o
		else if(Name)this[Name]=o
		if(Class)o.className=Class
		if(!ID&&Name&&!Class)o.className=Name
		if(CSS)o.AddCSS((ID||Class)+'CSS',CSS)
		if(!Value)return o
		else if(Value.constructor!=Array)o.AddElement(Value)
		else for(const O of Value)O.IsElement?o.appendChild(O):o.AddElement(O)
		return o
	}}
}
Element.prototype.AddCSS	=function(Name,CSS){
	if(!this[Name]){
		this[Name]=document.createElement('style')
		this[Name].type='text/css';this[Name].innerHTML=CSS
	}
	document.head.appendChild(this[Name])
}
Element.prototype.AddLabel	=function({ID='x',Class,Value}){
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
Element.prototype.AddButton	=(Value,Class)=>this.AddLabel(Value,'Button '+Class)
Element.prototype.AddInput	=function(Value,Class){
	let x=document.createElement('input');
	if(Class)x.className=Class;
	if(Value)x.placeholder=Value;
	this.appendChild(x);
	return x;
}
Element.prototype.AddImage	=function(Value,Class){
	const x=document.createElement('img')
	if(Class)x.className=Class
	x.define('value',{
		get:function(){return this.src},
		set:function(o){if(o)this.src=o;return this}
	})
	// Object.defineProperty(x,'value',{
	// 	get:function(){return this.src},
	// 	set:function(o){if(o)this.src=o;return this}
	// })
	x.value=Value
	// x.style.backgroundImage=`url(${Value})`;
	this.appendChild(x)
	return x
}
Element.prototype.AddCircleBar	=function(Radius){
	let x=document.createElement('x')
	let C=x.C=document.createElement('x')
	x.className='CircleBar'
	C.className='Info'
	x.style.width=x.style.height=Radius*2
	C.appendChild(document.createTextNode(''))
	x.appendChild(C)
	x.SetValue=function(Value,Info){
		C.firstChild.data=Info||Value
		x.style.background='conic-gradient(#0F0 '+(Value*3.6)+'deg,#222 0)';
	}
	this.appendChild(x)
	return x;
}

Element.prototype.SetVariable	=function(Value){
	if(!this.Variables){
		function GetVariable(Target,Value){for(var o of Target.children){GetVariable(o,Value);if(o.Variable)Value[o.Variable]=o}return Value}
		GetVariable(this,this.Variables={})
	}
	if(Value)for(let i in this.Variables)if(i in Value)this.Variables[i].value=Value[i]?.toString()??''
	return this
}

Element.prototype.Show		=function(){return this.SetClass('Hidden',this.hidden=0)}
Element.prototype.Hide		=function(){return this.SetClass('Hidden',this.hidden=1)}
Element.prototype.AddClass	=function(Class){return this.SetClass(Class,1)}
Element.prototype.DelClass	=function(Class){return this.SetClass(Class,0)}
Element.prototype.SetClass	=function(Class,TRUE){
	var cn=this.className
	if(!TRUE)cn=cn.replace(Class,'')
	else if(cn.indexOf(Class)==-1)cn+=' '+Class;
	this.className=cn.replace(/ +/,' ')
	return this
}
Element.prototype.Clear		=function(){while(this.firstChild)this.removeChild(this.firstChild);return this}

// !async function(){
// 	// while(!this?.JSLoaded_portotype)await delay(100)
// 	for(let o of [Element.prototype, CharacterData.prototype, DocumentType.prototype])
// 		o.define('remove',function(){this.parentNode.removeChild(this)})
// }()