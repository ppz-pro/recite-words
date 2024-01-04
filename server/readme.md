# Server
## Deprecated
+ deno kv 功能太弱

未知问题：用 cli 添加了用户，在生产环境读取不到。

## Structure
##### common
前后端公用的类型、常量

##### deps
+ 外部依赖
+ 未发布的依赖

##### handles
处理请求

##### scripts
自动化脚本（添加初始数据、查询数据）

## development
``` bash
# 在上层目录创建 db 目录
deno task start
```
