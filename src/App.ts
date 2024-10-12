
import '../Library/prototype'
import '../Library/Element'

// import {NavigationBar} from './NavigationBar'
// import {PrintListPage} from './PrintListPage'

export class AppCalss{
	PrePage:Element
	TopPage:Element
	// NavigationBar:NavigationBar
	// PrintListPage:PrintListPage
	onload(){
		// const sse=new EventSource('?Action=Amount')
		// sse.onmessage=e=>{
		// 	if(!e.data)return
		// 	const E=JSON.parse(e.data)
		// 	// this.PrintListPage.SetAllLogsCount(E.PrintLog.Value)
		// }
		// sse.onerror=function(e){this.close();console.log(e)}
		
	
		// this.NavigationBar=new NavigationBar(Parent)
		// this.PrintListPage=new PrintListPage(Parent)
		// this.PrintListPage.Refresh()
	
		Parent.onclick=E=>{
			if(this.TopPage){
				for(var o of E.composedPath())if(o==this.TopPage)return
				this.BackPage()
				E.stopPropagation()
			}
		}
	}
	GetStorage(Name:string){return window.localStorage[Name]}
	SetStorage(Name:string,Value:any){window.localStorage[Name]=Value}
	SetTopPage=(Element?:Element)=>{
		if(Element){
			this.PrePage=this.TopPage
			this.TopPage=Element
			this.TopPage.Show()
		}else if(this.TopPage){
			this.TopPage.Hide()
			this.TopPage=this.PrePage
		}
	}
	BackPage(){this.SetTopPage()}
	SendData(Action:string,Value:any){Value.Action=Action;return fetch('',{method:'POST',body:JSON.stringify(Value)}).then(o=>o.json())}
}
const Parent=document.body
export const App=new AppCalss()
onload=_=>App.onload()
var o
while(o=document.getElementsByTagName('script')[0])document.head.removeChild(o)
