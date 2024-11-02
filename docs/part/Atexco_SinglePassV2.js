//
//Atexco_SinglePassV2软件记录不能查询的暂替方案
//问题似乎是spsdk的GetTaskRecords不能有效的识别传入的Filters
//前端          resources\app\index.html
//后端          resources\app\background.js
//记录注入点    resources\app\js\600.ce888312.js    正则搜索    JSON\.parse\(.*?\.content\)\.Infos
//
console.dir(this)
const sdk=require('sdkLoad').spsdk
function searchLog(obj,opt){//JSON\.parse\(.*?\.content\)\.Infos
    const TaskRecords=sdk.GetTaskRecords(JSON.stringify({Order:{Count:100000},Filters:[]}))
    let Infos=JSON.parse(TaskRecords.content).Infos
    const filter={}
    for(const f of opt.Filters)if(f.Value)filter[f.Key]=f.Value
    if(filter.name)Infos=Infos.filter(o=>o.WorkRecords.find(o=>o.FileName.toLowerCase().indexOf(filter.name.toLowerCase())!=-1))
    if(filter.begin_time)Infos=Infos.filter(o=>o.BeginTime>=filter.begin_time)
    if(filter.end_time)Infos=Infos.filter(o=>o.BeginTime<=filter.end_time)
    obj.tableData =Infos.sort((a,b)=>b.BeginTime-a.BeginTime).slice(opt.Order.Offset,opt.Order.Offset+opt.Order.Count)
    obj.total =Infos.length
}