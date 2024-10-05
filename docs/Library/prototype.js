"use strict"
!function(){
	const CRC={Table32:[],Get32ForString(Value){
		var crc=0^-1
		for(let i=0;i<Value.length;i++)crc=(crc>>>8)^this.Table32[(crc^Value.charCodeAt(i))&0xFF]
		return(crc^-1)>>>0
	}}
	for(let n=0;n<256;n++){
		let c=n
		for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1)
		CRC.Table32[n]=c
	}

	Object.defineProperty(Object.prototype,'define',{value:function(name,value){
		if(!this.hasOwnProperty(name))Object.defineProperty(this.prototype??this,name,(value instanceof Function)?{value:value}:value)
	}})
	Number.define('Trim',function(){return this})
	String.define('Trim',function(){return this.replace(/(^\s*)|(\s*$)/g,'')})
	String.define('Like',function(o){return typeof(o)=='string'&&this.toLowerCase()==o.toLowerCase()})
	String.define('CRC32',function(){return CRC.Get32ForString(this).toString(16).toUpperCase().padStart(8,'0')})
	Array.define('remove',function(Index){if(typeof Index!='number')Index=this.indexOf(Index);if(Index>-1)this.splice(Index,1);return this})
	
	Date.define('_toString',Date.prototype.toString)
	Date.define('toString',function(fmt='yyyy-MM-dd hh:mm:ss'){
		let o={
			'y+':this.getFullYear(),//月份
			'M+':this.getMonth()+1,//月份
			'd+':this.getDate(),//日
			'h+':this.getHours(),//小时
			'm+':this.getMinutes(),//分
			's+':this.getSeconds(),//秒
			'q+':Math.floor((this.getMonth()+3)/3),//季度
			'S': this.getMilliseconds()//毫秒
		}
		let RE=(R,F,T)=>{var r=R.exec(F);if(!r)return F;r=r[0];return F.replace(R,(T+'').padStart(r.length,'0').slice(-r.length))}
		for(let k in o)fmt=RE(new RegExp('('+k+')'),fmt,o[k])
		return fmt??this._toString()
	})
	EventTarget.define('EventRegister',function(Name,Handle,Order){
		if(!this[Name]||!this[Name].IsEventManager){
			const MainHandle=function(){
				var RET
				for(var Handle of MainHandle.Events){
					RET=Handle.Invoke.apply(this,arguments)
					if(RET===true)break
					else if(RET&&RET.break){delete RET.break;break}
				}
				return RET
			}
			MainHandle.Events=[]
			MainHandle.IsEventManager=true
			if(this[Name])MainHandle.Events.push({Order:0,Invoke:this[Name]})
			this[Name]=MainHandle
		}
		this[Name].Events.push({Order:Order||1,Invoke:Handle})
		this[Name].Events.sort(function(a,b){return a.Order-b.Order})
	})
}()
// this.JSLoaded_portotype=true