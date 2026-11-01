# 命令参考

本页列出维护与核对入口，命令在甲骨文服务器执行。日常通过官方QQ机器人表达需求，Hermes负责定位实际对象和构造受控请求。

## 总库查询

基本形式为`sudo -u hermes campus-query <命令> [选项]`。

| 命令 | 用途 |
| --- | --- |
| status、hub-status | 来源、总库处理和业务状态 |
| overview、agenda | 单日概览或统一日程 |
| courses、course-schedule | 课程及实际排课 |
| tasks、events、notices | 任务、事项及通知 |
| search、detail | 总库搜索和实际对象详情 |
| pending、decisions | 当前问题和已有决定 |
| completed、archived | 个人完成与已归档事项 |
| profile、rules、context | 个人资料、学校和课程要求 |
| learning | 必要学习概况 |
| calendar、reminders | 当前日历输出与QQ投递状态 |

```sh
sudo -u hermes campus-query agenda --when tomorrow --limit 50
sudo -u hermes campus-query tasks --source chaoxing --status not_submitted
sudo -u hermes campus-query course-schedule --course '<course_id>'
sudo -u hermes campus-query detail --id '<item_id>'
sudo -u hermes campus-query archived --limit 20
```

### 通用选项

| 选项 | 含义 |
| --- | --- |
| --source | qq、xiaoya、chaoxing、yrzl、personal |
| --course、--semester | 实际课程或学期 |
| --keyword | 按该入口支持的文本搜索 |
| --when | today、tomorrow、week、next-week |
| --date、--from、--to | 单日或起止日期 |
| --status | submitted、not_submitted、submission_unknown、done、needs_action等 |
| --limit、--offset | 分页，limit为1–50 |
| --history | 对支持的入口扩展历史范围 |

`--when`与显式日期不能混用；具体入口只接受各自支持的选项。完整清单按total继续分页。日期解释使用北京时间。

## 学校来源细查

```sh
sudo -u hermes campus-query learning --source chaoxing
sudo -u hermes campus-query source-records --source chaoxing --scope assignments --course '<course_id>'
sudo -u hermes campus-query source-records --source chaoxing --scope exams
sudo -u hermes campus-query source-history --source chaoxing --scope assignments --course '<course_id>' --id '<task_id>'
sudo -u hermes campus-query source-records --source xiaoya --scope announcements --course '<course_id>'
```

学习通分类包括courses、assignments、notices、exams、chapters、learning_summary、resources，以及尚未接接口的过程记录类别。小雅包括announcements、outline、trends、register_history、register_status、study_resources、task_notices、task_records、announcement_messages、task_messages。

原`campus-query xiaoya --scope <类别>`入口保留。分类与历史从本地来源读取，不发起学校请求。

## 全局关联

```sh
sudo -u hermes campus-query global-search --keyword '实际关键词' --limit 20
sudo -u hermes campus-query global-search --course '<course_id>' --source qq
sudo -u hermes campus-query evidence --id '<doc_id>'
sudo -u hermes campus-query relations --id '<实体或关系UUID>'
sudo -u hermes campus-query association-status
sudo -u hermes campus-query task-links --id '<实体UUID>'
```

搜索返回doc_id和revision；evidence补读原文及QQ上下文，relations返回关系revision，task-links查询通知与原生作业对应。各标识和版本使用实际返回值。

| 写入口 | JSON字段 |
| --- | --- |
| campus-hub relation --stdin，解除或恢复 | decision=block/restore、id、version、original |
| 同入口，明确建立关系 | decision=link、left/right各含证据id/version、kind、original |
| campus-hub task-link --stdin | decision=link/unlink、activity、task（建立时）、original |

关系类型及平台边界见[跨来源关联](./associations.md)。时间编辑与取消仍走原业务入口。

## 手动刷新

```sh
sudo -u hermes campus-refresh status
sudo -u hermes campus-refresh start --source all
sudo -u hermes campus-refresh start --source chaoxing
sudo -u hermes campus-refresh job --id '<jobId>'
sudo -u hermes campus-refresh wait --id '<jobId>' --seconds 40
```

来源可选all、xiaoya、yrzl、chaoxing。单次wait支持1–55秒，未结束时继续等待同一个任务。

## QQ群管理

```sh
sudo -u hermes qq-groups status
sudo -u hermes qq-groups whitelist --limit 100
sudo -u hermes qq-groups blacklist --limit 100
sudo -u hermes qq-groups directory --keyword '群名关键词'
sudo -u hermes qq-groups audit --limit 50
```

refresh更新群目录；add、pause、resume、remove按`--group <group_id>`操作。block还需`--reason`，unblock解除黑名单但不自动恢复采集。群管理分页limit为1–100。

## QQ原文与附件

```sh
sudo -u hermes qq-query status
sudo -u hermes qq-query history --limit 50
sudo -u hermes qq-query messages --group '<group_id>' --keyword '关键词'
sudo -u hermes qq-query attachments --keyword '文件名'
sudo -u hermes qq-query attachment --id '<attachment_id>'
sudo -u hermes qq-query attachment-export --id '<attachment_id>' --wait 40
sudo -u hermes qq-query file-request --id '<request_id>' --wait 40
```

files查询文件索引，candidates查询通知候选。附件与原件交付请求使用不同标识，准备成功后由官方机器人发送。

## 日程与个人状态

| 入口 | 用途 |
| --- | --- |
| campus-hub record --stdin | 一般安排或任务 |
| campus-hub request --id | 查询本人输入处理结果 |
| campus-hub answer --stdin | 回答持久问题 |
| campus-hub decide --stdin | 一般事项编辑、确认、撤回或合并 |
| campus-hub complete --stdin | decision=done/reopen，保存targets、original和可选完成时间 |
| campus-hub archive --stdin | decision=archive/reopen，保存targets及original |
| campus-hub calendar --stdin | 单项订阅和日历闹钟 |
| campus-timetable record --stdin --wait | 课程补充输入与等待 |
| campus-timetable detail --id | 课程补充详情 |

目标使用实际id和最新version；日常操作按本人原话提交。完成、归档和解除关联是不同操作。

## 资料与规则

`campus-knowledge`提供profile、rules、list、context、detail、record和withdraw。

```sh
sudo -u hermes campus-knowledge profile --limit 50
sudo -u hermes campus-knowledge rules --scope school --limit 50
```

记录使用`record --stdin`，课程规则需真实course_id和本人原话。全局整理的课程要求也可从`campus-query rules`查看。

## 日历管理

在受保护维护终端查看当前私密地址：

```sh
sudo python3 /opt/law100-campus-data/campus/calendar_subscription.py show
```

rotate、disable、enable用于轮换、停用和恢复。完整地址含订阅密钥；日常文档和日志不保存具体值。

## 版本管理

```sh
sudo campus-release status
sudo campus-release history
sudo campus-release plan /root/release.json
```

应用、回滚、恢复和特定业务维护入口见[版本管理](./releases.md)。
