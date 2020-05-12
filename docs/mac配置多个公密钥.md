------
#### 1.打开终端，前往.ssh目录
`cd .ssh`

------
#### 2.生成一个ssh-key
`ssh-keygen -t rsa -C "youremail@email.com"`

> 后面填写的是你的邮箱账号

------
#### 3.自定义生成的key
> 如果我们 Mac 上面已经有了 ssh-key 再创建 ssh-key 的话，默认会在 ~/.ssh/ 目录下生成 id_rsa 和 id_rsa.pub 两个文件，如果不自定义，就会把原有的给覆盖掉。为了加以区分，我们需要自定义一下生成的 key 的名字,后面的id_rsa_test_github为你自定义的名字

`Enter file in which to save the key (/Users/a-375/.ssh/id_rsa): id_rsa_test_github`

------
#### 4.设置密码
> 需要输入两次密码,输入密码时是看不见的，这个密码在你提交代码到Github时会用到【注意：记住这个密码，最简单的方式就是设置的和github账户登入密码一样，容易记住】,或者可以不用设置密码，这样提交的时候也不需要输入密码了

`Enter passphrase (empty for no passphrase): `

`Enter same passphrase again:` 

------
#### 5.成功生成ssh-key
`Your identification has been saved in /Users/xxx/.ssh/id_rsa_test_github.`

`Your public key has been saved in /Users/xxx/.ssh/id_rsa_test_github.pub.`

`The key fingerprint is:`

`SHA256:/e91V1xop8k8wowRYJeJmEUrTTda32Pgr+EXboCNl3g youremail@email.com`

`The key's randomart image is:`
```
+---[RSA 2048]----+
|       =*o*o.    |
|      o+.*o= o . |
|      . + . o * o|
|       . . X B *.|
|        S * E O o|
|           = * o.|
|            + + +|
|             + .o|
|             .o  |
+----[SHA256]-----+
```

------
#### 6.将ssh-key添加到ssh-agent
> 到上面这一步我们已经创建好了 ssh-key，此时还需要将新的 ssh-key 添加到ssh agent ，因为默认只读 id_rsa，首先查看一下已经添加进去的 ssh-key,当出现下面 这种情况是说明 ssh agent 里面并没有把我们新生产的 ssh-key添加进去

`ssh-add -l`

`The agent has no identities.`

> 接下来，可以选择把我们生成的 ssh-key 添加进去，也可以指定添加
```
//全部添加
ssh-add  
```
```
//指定添加（可以切换到.ssh下添加，也可以直接指定路径添加）
➜  .ssh ssh-add id_rsa_test_github                   
Enter passphrase for id_rsa_test_github: 
Identity added: id_rsa_test_github (id_rsa_test_github)
```

> 这时输入下面指令就能看见我们添加进去的 ssh-key

`ssh-add -l`

------
#### 7. 连接GitHub
1. 获取公钥：
```
cat id_rsa_test_github.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCoG4Tmo8wF3P9/Vdtsm220jE6dNu9iG8jtranZccTO4hsyck4cxO02AniYr7JaPsL91sLCODEhnEmI+YWLSXFIaPbXVyVEa3PHc+VdNjgkkm/unkoBKsMLViP0vOUtU2OSYAdlWAoXpAyzPV17W0ratFVkHTjr1+G4NHOCo/qKbozPaHH9gaed7RB1Kx8swPkt0HGv/o9NQh7psmNPaanqMlTqA0uVS47LbCF5+C0CAgj2bFGEHtKy8cw6M+7OHBaTq90d740IBNca1fIvIDTnjsSV26iOiluQ+jVfsHuHmaAuw7ez2z/84sb+r5RtP5kjMemlw2D+/FmbFqx8qXDt youremail@email.com
```
2.复制公钥

3.在GitHub的设置中粘贴公钥

4.测试
```
ssh -T git@github.com
Hi XXX! You've successfully authenticated, but GitHub does not provide shell access.
```
