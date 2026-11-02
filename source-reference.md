# 源码依据

本页列出手册各主题的实现位置，路径相对于`law100-campus-data`项目根目录。当前实现状态见[功能参考](./features.md)，版本记录见[近期更新](./updates.md)。

## 学校接入

| 主题 | 实现位置 |
| --- | --- |
| 私有凭据、会话与登录恢复 | school/credentials.py、session.py、login.py |
| 学校同步、变化统计和手动刷新 | school/sync.py、refresh_server.py、refresh_client.py |
| 育人智链与全学期覆盖 | yrzl/app.py、project.py、schema.sql、projection.sql |
| 小雅课程、任务和分类缓存 | xiaoya/app.py、enrichment.py、schema.sql |
| 学习通独立接入 | chaoxing/client.py、model.py、app.py、schema.sql |
| 学习通投影与学校来源细查 | campus/chaoxing_projection.py、source_read.py、xiaoya_read.py |

## QQ处理

| 主题 | 实现位置 |
| --- | --- |
| 实时采集、补漏和历史分页 | qq/app.py、db.py、history.py及SQL |
| 群目录与白黑名单 | qq/manage.py、group_server.py、group_client.py |
| 通知候选和回执汇总 | qq/analyze.py、quality.py、acknowledgements.py及SQL |
| 附件下载、正文与选读 | qq/attachments.py、attachment_worker.py、attachment_extract.py、document_policy.py |
| 压缩包 | qq/archive_config.py、archive_pipeline.py、archive_engine.py、archive_query.py |
| 原文查询与原件交付 | qq/query.py、query_server.py、file_delivery.py、file_delivery_worker.py |

## 总库与全局关联

| 主题 | 实现位置 |
| --- | --- |
| 来源与课程映射 | campus/sources.py、mapping.py、store.py |
| 写入协调、映射续接和课次分组 | campus/write_lock.py、mapping_queue.py、schedule_slots.py |
| 一般事项整理 | campus/hub.py、hub_project.py、hub_read.py、hub_worker.py |
| 课程补充 | campus/timetable.py、timetable_policy.py、timetable_worker.py |
| 稳定事项和本人问题 | campus/core.py、core_events.py、core_questions.py、core.sql |
| 选择规则与任务具体范围 | campus/business_choices.py、business_tasks.py、business.sql |
| 本人回答绑定 | campus/core_dialogue.py、hermes/campus-context/handler.py |
| 通知与原生任务对应 | campus/task_links.py、task_relations.sql |
| 事项归档、完成和资料规则 | campus/archives.py、completion.py、knowledge.py及SQL |
| 全局证据索引与读取 | campus/global_read.py |
| 类型关系、事实及纠正 | campus/associations.py、global_relations.sql |
| 增量AI关联 | campus/association_worker.py，由hub_worker启动线程 |
| 只读与受控管理入口 | campus/client.py、server.py、hub_client.py、knowledge_server.py |

## 日历与提醒

| 主题 | 实现位置 |
| --- | --- |
| 发布范围、偏好和稳定UID | campus/calendar_policy.py、calendar_export.py |
| 自动和单项日历闹钟 | campus/calendar_alarms.py |
| 私密订阅 | campus/calendar_subscription.py |
| QQ规划、去重和投递 | campus/notifications.py、notification_sender.py及SQL |
| 被动时间安排 | hermes/campus-planning/scripts/suggest.py |

## 发布、看板和文档

统一发布使用`deploy/campus_release.py`。业务解释、学校来源、归档和全局关联分别使用`apply-business-release.py`、`apply-school-release.py`、`apply-task-relations.py`、`apply-global-association.py`。

映射性能及写入协调使用`deploy/apply-mapping-release.py`，发布时等待学校同步空闲，保留来源采集与现有技能。

Dashboard位于独立的`law100-dashboard/beszel`项目：校园采集为`deploy/law100/campus_collect.py`，页面为`internal/site/src/components/routes/campus-hub.tsx`。Dashboard发布不属于校园业务版本包。

关联工作区与调度为`campus/association_jobs.py`、`association_worker.py`；证据索引及消息附件连接为`global_read.py`、`evidence_reader.py`；身份、个人操作与事实投影为`identity_graph.py`、`owner_actions.py`、`fact_projection.py`。本轮限定发布入口为`deploy/apply-association-release.py`，只迁移总库，不修改来源库或技能。

手册位于`manual/`，配置为`.vitepress/config.mjs`，日常静态发布为`scripts/publish-static.py`。系统服务模板和技能分别位于`deploy/`与`hermes/`，线上副本按实际安装位置核对。

## 相关内容

[架构概览](./architecture.md) · [服务参考](./services.md) · [路径参考](./paths.md) · [文档维护](./maintenance.md)
