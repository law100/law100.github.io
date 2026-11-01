import { defineConfig } from 'vitepress';
const groups = [
 {text:'简介',items:[['什么是 Campus Hub？','overview'],['快速开始','quickstart'],['近期更新','updates']]},
 {text:'学校数据',items:[['日常查询','queries'],['学校平台','school-platforms'],['数据刷新','refresh']]},
 {text:'信息整理',items:[['跨来源关联','associations'],['事项归档','task-archive'],['Dashboard','dashboard']]},
 {text:'QQ资料',items:[['处理流程','qq'],['群管理','groups'],['消息与历史','history'],['图片与文档','attachments'],['压缩包','archives']]},
 {text:'日程管理',items:[['课表与日程','schedule'],['待决定事项','decisions'],['完成与恢复','completion'],['个人资料与规则','knowledge']]},
 {text:'日历与规划',items:[['日历订阅','calendar'],['提醒设置','reminders'],['时间安排建议','planning']]},
 {text:'功能参考',items:[['功能与实现状态','features'],['状态说明','states'],['命令参考','commands'],['架构概览','architecture'],['数据库','databases'],['服务参考','services'],['路径参考','paths'],['源码依据','source-reference']]},
 {text:'运维',items:[['服务管理','operations'],['部署与更新','deployment'],['版本、升级与回滚','releases'],['备份与恢复','backup'],['故障排查','troubleshooting'],['文档维护','maintenance']]}
];
export default defineConfig({
 lang:'zh-CN',title:'Campus Hub 使用手册',description:'Campus Hub 校园信息助手的使用与维护手册',cleanUrls:true,
 base:'/',srcExclude:['README.md','scripts/**'],
 themeConfig:{nav:[{text:'指南',link:'/overview',activeMatch:'/(overview|quickstart|updates|associations|task-archive|dashboard|queries|school-platforms|refresh|qq|groups|history|attachments|archives|schedule|decisions|completion|knowledge|calendar|reminders|planning)$'},{text:'参考',link:'/features',activeMatch:'/(features|states|commands|architecture|databases|services|paths|source-reference)$'},{text:'运维',link:'/operations',activeMatch:'/(operations|deployment|releases|backup|troubleshooting|maintenance)$'}],
 sidebar:groups.map(g=>({...g,items:g.items.map(([text,id])=>({text,link:'/'+id}))})),
 search:{provider:'local',options:{translations:{button:{buttonText:'搜索文档',buttonAriaLabel:'搜索文档'},modal:{noResultsText:'没有找到相关内容',resetButtonTitle:'清除搜索',displayDetails:'显示详细结果',backButtonTitle:'关闭搜索',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}},outline:{label:'本页目录',level:[2,3]},docFooter:{prev:'上一页',next:'下一页'},
 returnToTopLabel:'返回顶部',sidebarMenuLabel:'目录',darkModeSwitchLabel:'外观',footer:{message:'Campus Hub · 使用与维护手册'}},
 markdown:{config(md){const original=md.renderer.rules.fence;md.renderer.rules.fence=(tokens,idx,opts,env,self)=>{
 if(tokens[idx].info.trim()==='mermaid'){return '<MermaidDiagram code="'+md.utils.escapeHtml(tokens[idx].content)+'" />';}
 return original(tokens,idx,opts,env,self);};}}
});
