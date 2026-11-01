# 服务管理

本页介绍现有服务器上的日常维护。Campus Hub业务运行在甲骨文；文档站运行在阿里云，二者分别管理。

## 维护前准备

1. 确定异常属于查询、学校同步、QQ、分析、日历还是提醒。
2. 查看最近成功时间和相关服务状态。
3. 更新或恢复数据前先建立备份。
4. 只对受影响模块操作，记录开始时间和所用版本。

普通数据刷新优先使用官方机器人或`campus-refresh`入口，不需要重启服务。

## 查看状态

在甲骨文服务器执行：

```sh
systemctl status law100-campus-query.service --no-pager
systemctl status law100-campus-hub-worker.service --no-pager
systemctl status law100-qq-collector.service --no-pager
systemctl list-timers --all --no-pager
```

### 常驻服务

查询、管理Socket、采集、分析和附件工作进程通常是常驻服务，应检查是否`active (running)`以及是否持续重启。

### 一次性任务

学校同步、总库投影、日历导出和提醒规划等任务可能使用`Type=oneshot`。执行结束后`inactive (dead)`可以是正常状态。

核对退出结果：

```sh
systemctl show law100-campus-sync.service   -p ActiveState -p SubState -p Result -p ExecMainStatus
```

结合对应timer的上次和下次执行时间判断，避免将正常结束当成服务掉线。

## 启动与重启

启动未运行的服务：

```sh
sudo systemctl start law100-campus-query.service
```

在代码或配置更新后重启：

```sh
sudo systemctl restart law100-campus-query.service
sudo systemctl status law100-campus-query.service --no-pager
```

重启不会代替数据迁移。涉及表结构、安装客户端或技能副本的更新，需要先按部署方案处理。

## 查看日志

查看最近一小时、最多100行：

```sh
sudo journalctl -u law100-campus-sync.service --since '1 hour ago' -n 100 --no-pager
sudo journalctl -u law100-qq-collector.service --since '1 hour ago' -n 100 --no-pager
sudo journalctl -u law100-qq-attachments.service --since '1 hour ago' -n 100 --no-pager
```

持续观察某个模块：

```sh
sudo journalctl -u law100-campus-hub-worker.service -f
```

使用`Ctrl+C`结束观察，不会停止服务。分享日志前应处理其中的个人内容、身份字段与签名地址。

## 查看定时器

```sh
systemctl list-timers --all --no-pager
systemctl cat law100-campus-sync.timer
systemctl cat law100-campus-calendar.timer
```

`OnCalendar`按指定时间触发；`OnUnitInactiveSec`表示前一轮结束后等待一段时间再触发，因此不是严格整分执行。

学校定时同步当前在02:00–07:00不触发，其他本地投影、日历和提醒有各自策略，见[服务参考](./services.md)。

## 暂停某个模块

暂停单个群优先使用群管理入口。

维护整个附件读取时，可以停止对应工作进程：

```sh
sudo systemctl stop law100-qq-attachments.service
```

维护学校定时任务时：

```sh
sudo systemctl stop law100-campus-sync.timer
systemctl status law100-campus-sync.service --no-pager
```

停止timer只阻止后续触发，当前正在执行的任务需单独确认。维护完成后恢复：

```sh
sudo systemctl start law100-campus-sync.timer
```

提醒维护也需要同时检查timer和正在执行的规划任务，恢复前核对投递队列，避免误发旧内容。

## 时间检查

```sh
timedatectl
```

人的日期、日程解释和定时任务使用`Asia/Shanghai`。来源库里的UTC时间戳继续表示真实时刻，显示时转换，不批量改写历史时间。

## 磁盘与附件

```sh
df -h
sudo du -sh /opt/law100-campus-data/private/qq-attachments
sudo du -sh /root/backups
```

附件和备份是主要增长来源。清理前核对原件保留策略与索引。SQLite运行中的WAL/SHM文件属于数据库工作文件，不能作为普通缓存删除。

## 相关内容

[服务参考](./services.md) · [日志排错](./troubleshooting.md) · [备份恢复](./backup.md)
