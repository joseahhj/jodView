# jad-pc项目部署

## 物理机器登陆

- 小技巧如果记不住ip 可以使用命令
```
    history |grep ssh
```
    
## 目录

- 目录地址：/export/Domains/jad-pc/
- 发布： git pull origin master && npm run deploy
    
## 安装依赖中的问题

- registry 两个备选地址： registry.m.jd.com 、 npm.jd.com
- 如何查看及设置registry
 ```
    npm config list -l //查看
    npm set registry http://npm.jd.com //设置
```
- 线上机器的github不能正常访问如何安装 node-sass 
    - 选择所需要的安装包 [github](https://github.com/sass/node-sass/releases)
    - 可通过rz上传到线上机器上也可以通过scp上传到线上机器 
    - nnpm i node-sass --sass_binary_path=./linux-x64-48_binding.node(上传的文件目录) 安装完如果还不能执行sass可在进行一遍 npm i node-sass
        
## nginx配置

- nginx目录  /export/servers/nginx/ 忘记目录可以使用
    
```
ps -ef | grep nginx
```
- 进入  /export/servers/nginx/conf/domains/ 编辑check.x.jd.com

```

在name jad server 配置

location /v2 {
        proxy_pass http://127.0.0.1:8081/;
}

```
-重启nginx sudo /export/servers/nginx/sbin/nginx -s reload 

## pm2 启动http-server 

-  pm2 start /export/Domains/jad-pc/node_modules/http-server/bin/http-server -- /export/Domains/jad-pc/release/  -p 8081 -d  --cors --name jad -f

- 重启 pm2 restart http-server




    
