# 路径参考

本页列出维护时需要定位的目录。路径不包含具体凭据值，私有目录不应作为网站静态根目录。

## 本地项目

| 路径 | 内容 |
| --- | --- |
| D:/Projects/law100-campus-data | Campus Hub源码 |
| 项目下manual/ | VitePress Markdown、配置和发布脚本 |
| manual/.vitepress/dist/ | 文档构建产物 |
| D:/Projects/law100.github.io | 公开文档仓库的本地副本 |
| 项目下deploy/ | 阶段安装脚本、客户端入口和systemd模板 |
| 项目下hermes/ | 技能与对话上下文钩子源码 |
| 项目下login/ | 必要的浏览器登录辅助 |
| D:/Projects/_ops/ | 私有维护和部署核对记录 |

## 甲骨文业务目录

| 路径 | 内容 |
| --- | --- |
| /opt/law100-campus-data | 线上业务源码 |
| /opt/law100-campus-data/private | 主要数据库、会话、凭据和业务配置 |
| private/qq-attachments | 附件原件与解出内容 |
| /opt/law100-campus-data/attachments-venv | 附件读取Python环境 |
| /usr/local/bin/campus-* | 已安装校园客户端，含全局证据查询与关联管理 |
| /usr/local/bin/qq-query、qq-groups | QQ查询与名单客户端 |
| /usr/local/lib/law100-campus-query | 已安装查询客户端副本 |
| /srv/hermes/.hermes/skills | 线上技能，管理端维护、Hermes只读 |
| /srv/law100-campus-files | 官方机器人原件交付副本 |
| /root/backups | 私有部署与手动备份 |

学习通来源库为`private/chaoxing.sqlite3`；全局索引、队列和关系表位于`private/campus.sqlite3`。Dashboard校园摘要为`/var/lib/law100-campus-dashboard/overview.json`，由独立只读采集任务生成。

`private/campus.lock`协调总库写入；`private/pending-mappings/`保存学校映射续接请求及完成记录，包含私有业务状态。

## 本机服务Socket

| 路径 | 服务 |
| --- | --- |
| /run/law100-campus-query/query.sock | 总库只读查询 |
| /run/law100-campus-refresh/refresh.sock | 手动刷新 |
| /run/law100-campus-timetable/timetable.sock | 课程补充 |
| /run/law100-campus-knowledge/knowledge.sock | 资料、一般日程与受控写入 |
| /run/law100-qq-query/query.sock | QQ原文与附件 |
| /run/law100-qq-groups/groups.sock | 群管理 |
| /run/law100-campus-notify/notify.sock | 固定本人提醒投递 |

Socket由对应服务运行时创建。文件不存在或权限不符时，先查服务和属主，不直接将整个目录改成所有人可写。

## 日历与提醒

| 路径 | 内容 |
| --- | --- |
| /var/lib/law100-campus-calendar/current.ics | 当前有效日历文件 |
| /var/lib/law100-campus-calendar/events.sqlite3 | 导出事件缓存与状态 |
| /etc/law100-campus-calendar/subscription.json | 私密订阅配置 |
| /etc/nginx/snippets/law100-campus-calendar.conf | 订阅路径匹配配置 |
| /var/lib/law100-campus-notify/delivery.sqlite3 | QQ投递账本 |
| /etc/law100-campus-notify/recipient.json | 固定本人投递身份配置 |

订阅配置和收件身份只在受保护的维护环境中读取，不能直接贴入公开日志。

## 阿里云文档站

| 路径 | 内容 |
| --- | --- |
| /var/www/law100-campus-docs/releases | 各次静态发布版本 |
| /var/www/law100-campus-docs/current | 当前发布版本链接 |
| /etc/nginx/sites-available/law100-docs | 文档站Nginx配置 |
| /etc/letsencrypt/live/law100-docs | 文档站HTTPS证书 |
| /var/log/nginx/law100-docs-error.log | 文档站Nginx错误日志 |

## 相关内容

[架构](./architecture.md) · [部署更新](./deployment.md) · [备份恢复](./backup.md)
