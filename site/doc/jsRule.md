# js命名规范

## 命名法说明

1). camel命名法，形如thisIsAnApple

2). pascal命名法，形如ThisIsAnApple

3). 下划线命名法，形如this_is_an_apple 

4). 中划线命名法，形如this-is-an-apple 


## 根据不同类型的内容，必须严格采用如下的命名法： 

a). 变量名：必须使用camel命名法

b). 参数名：必须使用camel命名法 

c). 函数名：必须使用camel命名法

d). 方法/属性：必须使用camel命名法

e). 私有（保护）成员：必须以下划线_开头

f). 常量名：必须使用全部大写的下划线命名法，如IS_DEBUG_ENABLED

g). 类名：必须使用pascal命名法

h). 枚举名：必须使用pascal命名法 

i). 枚举的属性：必须使用全部大写的下划线命名法

j). 命名空间：必须使用camel命名法 

k). 语义：命名同时还需要关注语义，如：

变量名应当使用名词； 

boolean类型的应当使用is、has等起头，表示其类型；

函数名应当用动宾短语；

类名应当用名词。


 
<!-- ## 变量名命名规范：加上类型标识

s：表示字符串。例如：sName，sHtml；

n：表示数字。例如：nPage，nTotal；

b：表示逻辑。例如：bChecked，bHasLogin；

a：表示数组。例如：aList，aGroup；

r：表示正则表达式。例如：rDomain，rEmail；

f：表示函数。例如：fGetHtml，fInit；

o：表示以上未涉及到的其他对象，例如：oButton，oDate；

g：表示全局变量，例如：gUserName，gLoginTime； -->


## 函数命名规范：

函数命名：统一使用动词或者动词+名词形式

对象方法命名使用 对象类名+动词+名词形式   animateDoRun() 

某事件响应函数命名方式为触发事件对象名+事件名或者模块名  onDivClick()


- get 获取/set 设置 
- add 增加/remove 删除
- create 创建/destory 移除 
- start 启动/stop 停止
- open 打开/close 关闭
- read 读取/write 写入
- load 载入/save 保存 
- create 创建/destroy 销毁
- begin 开始/end 结束 
- backup 备份/restore 恢复
- import 导入/export 导出 
- split 分割/merge 合并
- inject 注入/extract 提取 
- attach 附着/detach 脱离
- bind 绑定/separate 分离 
- view 查看/browse 浏览
- edit 编辑/modify 修改 
- select 选取/mark 标记
- copy 复制/paste 粘贴 
- undo 撤销/redo 重做
- insert 插入/delete 移除
- clean 清理/clear 清除 
- index 索引/sort 排序
- find 查找/search 搜索
- increase 增加/decrease 减少
- play 播放/pause 暂停 
- launch 启动/run 运行
- compile 编译/execute 执行 
- debug 调试/trace 跟踪
- observe 观察/listen 监听 
- build 构建/publish 发布
- input 输入/output 输出 
- encode 编码/decode 解码
- encrypt 加密/decrypt 解密 
- compress 压缩/decompress 解压缩
- pack 打包/unpack 解包
- parse 解析/emit 生成
- connect 连接/disconnect 断开 
- send 发送/receive 接收
- download 下载/upload 上传 
- refresh 刷新/synchronize 同步
- update 更新/revert 复原 
- lock 锁定/unlock 解锁
- check out 签出/check in 签入 
- submit 提交/commit 交付
- push 推/pull 拉 
- expand 展开/collapse 折叠
- start 开始/finish 完成
- enter 进入/exit 退出 
- abort 放弃/quit 离开
- obsolete 废弃/depreciate 废旧
- collect 收集/aggregate 聚集
   

