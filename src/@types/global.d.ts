export{}
import {AppCalss} from '../App'
declare global{
	// interface Main{NavigationBar:any}
	interface Object{define:Function}
	interface Date{toString(fmt?:string):string}
	interface Element{
		Variable:string
		GetVariable(Value:Element[]):void
		Show():this
		Hide():this
		SetClass(Class:string,Enable:boolean|number):this

		// SetTopPage(Enable:boolean):void
	}
	interface ElementEX extends Element{
		value:string
		AddCSS(Name:string,CSS:string):void
		AddElement(Values:{ID?:string,Name?:string,Type?:string,Class?:string,Value?:string|Array<any>|object,CSS?:string}):HTMLElement
		AddClass(Value:string):this
		DelClass(Value:string):this
		SetClass(Class:string,Enable:boolean):this
		SetVariable(Value:{[index:string]:any}):this
	}
	interface HTMLElement extends ElementEX{}
	interface HTMLImageElement extends HTMLElement{value:string}

	// interface Page{
	// 	Refresh():void
	// 	SetTopPage(Enable:boolean):void
	// }
	// interface NetDate{
	// 	SearchType:number
	// 	DriverType:number
	// 	SearchText:string
	// 	TimeStart:Date
	// 	TimeEnd:Date
	// 	Count:number
	// }
	// interface MainCLass extends NetDate{
	// 	// TopPage
	// 	NavigationBar:Page
	// 	PrintListPage:Page
	// 	onload():void
	// 	SendData(Action:string,Value:object):Promise<any>
	// }
	// interface Window{
	// 	App:AppCalss
	// }
}