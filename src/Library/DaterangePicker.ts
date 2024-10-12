
class Time{
    Year:number
    Month:number
    Date:number
    constructor()
    constructor(Time:string)
    constructor(Date:Date)
    constructor(Time:Time)
    constructor(Date:Date,date:number)
    constructor(Time:Time,date:number)
    constructor(year:number,month:number,date:number)
    constructor(YM?:Date|Time|string|number,date?:number,date2?:number){
        if(typeof(YM)=='number'){
            this.Year=YM
            this.Month=date
            this.Date=date2
        }else if(YM instanceof Time){
            this.Year=YM.Year
            this.Month=YM.Month
            this.Date=date??YM.Date
        }else{
            const ym=!YM?new Date():(typeof(YM)=='string')?new Date(YM):YM
            this.Year=ym.getFullYear()
            this.Month=ym.getMonth()+1
            this.Date=date??ym.getDate()
        }
    }
    equals=(B:Time)=>this.Year==B.Year&&this.Month==B.Month&&this.Date==B.Date
    toDate(){return new Date(this.Year,this.Month-1,this.Date)}
    toString(fmt='yyyy/MM/dd'){
        const o={
            'y+':this.Year,
            'M+':this.Month,
            'd+':this.Date,
        }
        const RE=(R,F,T)=>{var r=R.exec(F);if(!r)return F;r=r[0];return F.replace(R,(T+'').padStart(r.length,'0').slice(-r.length))}
        for(let k in o)fmt=RE(new RegExp('('+k+')'),fmt,o[k])
        return fmt
    }
}
class DaterangePicker{
    Element:HTMLElement
    DateList:HTMLElement[]
    TimePage=new Time(undefined,1)
    TimeStart=new Time('2000-01-01')
    TimeEnd=new Time()
    TimeClick:Time
    onVerify:Function
    onCancel:Function
    constructor(){
const CSS=`
DaterangePicker{
    position: absolute;
    display: table;
    width: 224px;
    font-size: 12px;
    line-height: 2em;
    font-family:arial;
    text-align: center;
    border-radius: 4px;
    color: #0D0;
    background: #000;
    user-select: none;
    z-index: 999;
}
DaterangeMonth{display:block;border-bottom:1px solid #666;}
DaterangeWeek{}
DaterangeDate{
    float: left;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
}
DaterangeFooter{float:right;padding:4px;}

PreYear,PreMonth,NextMonth,NextYear{width:24px;font-size:24px;}
PreYear,PreMonth{float:left;}
NextMonth,NextYear{float:right;}

.Week,.Date{
    float: left;
    width:32px;
    line-height:24px;
}
.Week{}
.Date,Verify,Cancel{border-radius:4px;}
DaterangeDate .Date.on:hover,Verify:hover,Cancel:hover{background-color:#8888;}
.Date           {color: #999;}
.Date.on        {color:inherit;}
.Date.on.in     {color:#000;background-color:#888;border-radius:0;}
.Date.on.start,.Date.on.end{color:#F00;background-color:#0FF;}
.Date.on.start  {border-radius:4px 0 0 4px;}
.Date.on.end    {border-radius:0 4px 4px 0;}
.Date.on.start.end{border-radius:4px;}
Verify,Cancel{
    padding: 4px 4px;
    margin: 1px;
    background: #555;
}
`       
        const WeekList=[]
        for(let o of ['日','一','二','三','四','五','六'])WeekList.push({Class:'Week',Value:o})
        const DataList=[]
        for(let i=1;i<43;i++)DataList.push({Class:'Date',Value:i.toString()})
        this.Element=document.body.AddElement({ID:'DaterangePicker',Class:'Hidden',CSS,Value:[
            {ID:'DaterangeMonth',Value:[
                {ID:'PreYear',Value:'«'},
                {ID:'PreMonth',Value:'‹'},
                {Value:'$YearMonth'},
                {ID:'NextYear',Value:'»'},
                {ID:'NextMonth',Value:'›'}
            ]},//⟪   ⟨   <  ‹ «    »   ›   >   ⟩   ⟫
            {ID:'DaterangeWeek',Value:WeekList},
            {ID:'DaterangeDate',Value:DataList},
            {ID:'DaterangeFooter',Value:[
                {ID:'Daterange',Value:'$Daterange'},
                {ID:'Verify',Value:'确认'},
                {ID:'Cancel',Value:'取消'}
            ]}
        ]})
        this.Element['DaterangeMonth'].PreYear.onclick=()=>this.TimePage.Year--
        this.Element['DaterangeMonth'].PreMonth.onclick=()=>this.TimePage.Month--
        this.Element['DaterangeMonth'].NextMonth.onclick=()=>this.TimePage.Month++
        this.Element['DaterangeMonth'].NextYear.onclick=()=>this.TimePage.Year++

        this.DateList=this.Element['DaterangeDate'].children
        for(const o of this.DateList)o.onclick=_=>{
            if(!o['on'])return
            const time=new Time(this.TimePage,parseInt(o.value))
            if(!this.TimeClick){if(time>this.TimeEnd)this.TimeEnd=time;else this.TimeStart=time}
            else{if(time>=this.TimeClick&&!time.equals(this.TimeEnd))this.TimeEnd=time;else this.TimeStart=time}
            this.TimeClick=time
        }
        this.Element['DaterangeFooter'].Verify.onclick=()=>{this.Element.Hide();if(this.onVerify)this.onVerify()}
        this.Element['DaterangeFooter'].Cancel.onclick=()=>{this.Element.Hide();if(this.onCancel)this.onCancel()}
        this.Element.onclick=E=>{E.stopPropagation();this.Refresh()}
        this.Refresh()
    }
    Refresh(){
        this.Element.SetVariable({
            YearMonth:this.TimePage.toString('yyyy年MM月'),
            Daterange:this.TimeStart.toString('yyyy/MM/dd')+' - '+this.TimeEnd.toString('yyyy/MM/dd')
        })
        
        const y=this.TimePage.Year
        const m=this.TimePage.Month-1
        const prel=new Date(y,m,0).getDate()
        var nowd=new Date(y,m,1).getDay()
        const nowl=new Date(y,m+1,0).getDate()
        if(nowd==0)nowd=7
        for(let i=0;i<this.DateList.length;i++){
            const d=(i<nowd?(prel-nowd+i):i<(nowd+nowl)?(i-nowd):(i-nowd-nowl))+1
            const on=this.DateList[i]['on']=nowd<=i&&i<nowd+nowl
            this.DateList[i].SetClass('on',on)
            this.DateList[i].value=d.toString()
        }
            
        for(const o of this.DateList){
            const time=new Time(this.TimePage,parseInt(o.value))
            o.SetClass('in',this.TimeStart<time&&time<this.TimeEnd)
            o.SetClass('start',this.TimeStart.equals(time))
            o.SetClass('end',this.TimeEnd.equals(time))
        }
    }
}
const picker=new DaterangePicker()
export const Show=(Element:HTMLElement,TimeStart?:Date,TimeEnd?:Date)=>new Promise<{TimeStart:Date,TimeEnd:Date}>((resolve,reject)=>{
    Element.appendChild(picker.Element)
    picker.Element.Show()
    if(TimeStart)picker.TimeStart=new Time(TimeStart)
    if(TimeEnd)picker.TimeEnd=new Time(TimeEnd)
    picker.onVerify=()=>resolve({TimeStart:picker.TimeStart.toDate(),TimeEnd:picker.TimeEnd.toDate()})
    // picker.onCancel=reject
}) 