# 数据库

Campus Hub保留五个独立来源库和一个统一总库，均使用SQLite。日历缓存与投递账本另行保存。

## 数据库清单

| 数据库 | 定位 | 主要内容 |
| --- | --- | --- |
| qq.sqlite3 | QQ来源 | 群消息、文件索引、授权范围、历史游标、通知和附件结果 |
| xiaoya.sqlite3 | 小雅来源 | 课程、作业、提交结果、分类记录和版本 |
| chaoxing.sqlite3 | 学习通来源 | 课程、作业、通知、考试、章节、资料和同步覆盖 |
| yrzl.sqlite3 | 育人智链来源 | 接口响应页、学校课程、课表、校历和其他选定数据 |
| personal.sqlite3 | 本人输入 | 原话、课程补充、个人资料与决定输入 |
| campus.sqlite3 | 统一业务 | 课程、事项、规则、关系、个人状态、问题及提醒队列 |

来源事实、个人决定和整理结果分别保存。总库重建需要保留本人数据，不能将总库整体当作可丢弃缓存。

## 来源库结构

QQ库按群和消息保存原文、采集时间、撤回状态及文件关联。历史补录与新消息分开记录进度；附件按版本和单元保存正文、理解结果、选读及压缩包成员。

小雅使用课程、任务和分类记录，保留提交状态与观察时间。学习通按课程、作业、分类和修订保存原生标识，分类同步另有检查点与覆盖。章节和过程明细保留分库，总库只取必要摘要。

育人智链先保存接口响应页，再形成学校排课和校历覆盖。个人库保存本人原话、输入任务及已有决定输入，用于追溯和修正。

## 总库主要表族

| 业务 | 表族 | 用途 |
| --- | --- | --- |
| 课程与学校事项 | courses、course_links、items、item_sources及details | 保留业务对象和平台原生对应 |
| 来源解释 | hub_source_records、hub_jobs、hub_projection_status | 跟踪来源版本和整理进度 |
| 补充课表 | timetable_proposals、links、effects、audit | 新课、调停课、实验和选题 |
| 一般安排 | activities、activity_sources、activity_changes | 会议、活动、预约和任务 |
| 资料规则 | knowledge_entries、knowledge_history | 个人、学校和课程要求 |
| 本人状态 | completion_records、user_overrides、hub_entity_archives | 完成、覆盖和归档 |
| 日历与提醒 | calendar_item_settings、reminder_entities、reminder_outbox | 偏好、计划和投递状态 |

## 稳定事项与本人决定

`hub_events`及别名、来源主张保存同一实际事项的稳定身份。问题与决定按课程、学期和轮次关联，保留原话、当前值与历史。

课程选择规则、稳定实验选项和任务具体范围另有业务表。多次转发可以关联同一决定；一个讲次的截止不能扩展到其他讲次。

本人完成与平台提交独立，归档与完成也独立。现有原生任务身份不因时间变化而重建。

## 跨来源关系与证据

| 表族 | 用途 |
| --- | --- |
| hub_course_correspondences | 规则确认的课程对应 |
| hub_native_task_links及候选、审计 | 通知对应唯一平台任务 |
| hub_global_documents | 可检索文本、受控元数据、证据标识及版本 |
| hub_global_coverage、cursors | 来源覆盖和索引进度 |
| hub_association_jobs、runs | 增量分析、检索过程、状态和模型用量 |
| hub_global_relations、facts、audit | 类型关系、有效字段、证据与纠正历史 |

课程、文件和包含关系不形成任务身份。同一身份组最多包含一份原生任务，小雅和学习通的具体任务、提交与个人完成状态分别保留。

## 归档与历史

`hub_entity_archives`和变更表保存自动或本人归档。自动策略按北京时间日期运行，来源明确延期可恢复，个人操作优先。

查询通常使用当前有效结果。来源旧版本、完成、决定、归档和关系变更仍可追溯。

## 备份关系

六个主库、附件、私有配置、日历UID缓存和投递账本需要配套备份。仅恢复总库可能失去原文，仅恢复来源库可能失去本人决定和完成记录。

## 相关内容

[架构概览](./architecture.md) · [状态说明](./states.md) · [备份与恢复](./backup.md)
