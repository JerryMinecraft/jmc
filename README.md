# Jmc

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![license: mit](https://img.shields.io/badge/license-MIT-yellow)
![all passedd](https://img.shields.io/badge/tests-100%25%20passed-green)
<!-- ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/bcmRayCrazy-coder/jmc) -->

JerryMc 的网站后台

## 路由
-   /users
    -   /register
        -   注册
    -   /login
        -   登录
    -   /online
        -   获取用户信息
-   /xaml
    -   /:version
        -   获取`version`版本的pcl2主页
-   /whitelist
    -   /request
        -   申请白名单
    -   /list
        -   获取白名单列表
    -   /change
        -   修改白名单
-   /mcserver
    -   /whitelist
        -   /:nickname
            -   查看`nickname`玩家是否通过白名单(可进入游戏)