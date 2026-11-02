# 服务参考

以下名称来自现有部署。除明确列为定时任务外，多数为常驻服务。使用前可通过`systemctl cat <名称>`查看线上实际单元及覆盖配置。

## 校园业务

| 服务 | 用途 | 主要关联 |
| --- | --- | --- |
| law100-campus-query | 总库只读查询 | campus-query客户端 |
| law100-campus-refresh | 接收人工刷新、查询进度 | 学校同步锁与任务状态 |
| law100-campus-sync | 读取三个学校来源并映射 | 配套sync.timer |
| law100-campus-hub-project | 本地来源投影、学校映射续接 | 配套hub-project.timer |
| law100-campus-hub-worker | 一般事项及全局关联线程 | hub_jobs、关联队列与模型接口 |
| law100-campus-timetable | 课程补充管理入口 | campus-timetable客户端 |
| law100-campus-timetable-worker | 分析与映射补充课表 | 平台通知、QQ及本人课程输入 |
| law100-campus-knowledge | 资料规则、一般事项等受控写入口 | knowledge.sock |
| law100-campus-knowledge-sync | 学籍基础资料映射 | 配套knowledge-sync.timer |

全局证据索引和AI关联随`law100-campus-hub-worker`运行，不新增独立关联服务。处理进度通过`campus-query association-status`读取。

## QQ链路

| 服务 | 用途 |
| --- | --- |
| law100-yogurt-direct | 当前QQ会话运行进程 |
| law100-campus-qq-signer | QQ签名相关运行环境 |
| law100-qq-readonly | 主账号只读网关 |
| law100-qq-readonly-firewall | 限制原始QQ接口访问身份 |
| law100-qq-groups | 群目录、白名单与黑名单 |
| law100-qq-collector | 实时事件及近期补漏 |
| law100-qq-history | 历史向前补录队列 |
| law100-qq-analysis | 通知候选分析 |
| law100-qq-attachments | 图片、文档及压缩包内容处理 |
| law100-qq-query | 原文、附件与处理进度查询 |
| law100-qq-file-delivery | 原件交付准备工作进程 |

只读网关和访问保护是主号权限边界。相关服务异常时应修复边界，不回退到未受控的原始发信接口。

## 日历与通知

| 服务 | 用途 |
| --- | --- |
| law100-campus-calendar | 从总库生成ICS与导出缓存 |
| law100-campus-reminders | 根据总库规划并投递到提醒桥 |
| law100-campus-notify | 固定本人官方QQ投递桥及账本 |

## Hermes和看板

Hermes网关的实际单元名称按服务器清单查看：

```sh
systemctl list-units --all --no-pager '*hermes*'
```

`law100-dashboard-campus.service`生成校园状态摘要，供独立Dashboard项目展示。看板页面故障不必然意味着总库服务故障。

## 定时器

| timer | 当前策略 |
| --- | --- |
| law100-campus-sync.timer | 00、01、07–23点每15分钟，含随机短延迟 |
| law100-campus-hub-project.timer | 开机后约30秒，前轮结束后约60秒 |
| law100-campus-knowledge-sync.timer | 约10分钟 |
| law100-campus-calendar.timer | 开机后约30秒，前轮结束后约5分钟 |
| law100-campus-reminders.timer | 每分钟检查 |
| law100-dashboard-campus.timer | 看板摘要定期刷新，实际周期查线上单元 |

定时器成功触发不代表业务已经成功完成，仍应检查服务退出码和业务状态。

## 文档站

以下单元位于阿里云：

- `law100-docs-cert-renew.timer`：文档站HTTPS证书续期检查。
- `nginx`：公开提供静态页面、搜索索引和资源。

GitHub Pages由文档仓库的Actions工作流构建和发布。文档站不运行Campus Hub采集或数据库查询服务。

## 相关内容

[服务管理](./operations.md) · [路径参考](./paths.md)
