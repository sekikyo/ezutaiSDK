ezutai(易组态)
==========

一款易上手、易通讯、易扩展的web组态，可用于工业云组态

###特色 

快速搭建界面模型，简单方便地与设备建立链接，可以容易搭建出你心目中组态的构图~，ezutai本身提供模拟器，可以在没有设备链接的情况下，模拟出设备运行状态，同时，我们也提供了OPC-UA的连接模块，直接与设备建立链接实时通讯。


## 使用

### 使用之前
     
在浏览器中 打开 [官网](http://www.senkins.top/) 或者 [系统平台](http://ezutai.senkins.top/)

申请一个免费的用户账号  
####   

#### 启用 ezutai（易组态） 

     $ git clone https://github.com/sekikyo/ezutaiSDK.git
     $ cd ezutaiSDK
     $ npm install
     $ npm start
     
####
    系统平台
### 简易教程


 * 运行易组态，登录账号
 
 * 登录主界面，选择连接方式，（目前：我们仅提供[模拟器]和[OPCUA]2种连接方式,其他通讯方式可自行扩展）
 
 * 选择方式（默认模拟器），然后点击启动。 
                                  
直接下载各平台可执行程序[mac os](http://ezutai.senkins.top/download/ezutai_mac.zip/)，[win64](http://ezutai.senkins.top/download/ezutai_win64.exe/)
               
## 其他通讯自定义扩展
如果您喜欢我们的工具，我们也支持其他通讯连接的扩展
 
* 在 server 目录下  新建 demo 文件夹 ，新建 demo.js 
 
* 必须引入 require("../common/messageModel")
 
* 必须继承 messageModel.initCon 


* 在Class demo 中必须有 function onReceiveMqttMessage()

## Example

```javascript

const messageModel = require("../common/messageModel")

class demo extends messageModel{
    constructor(option){
        super();
        super.initCon(option,this.onReceiveMqttMessage);
    }
    disconnect(){
        super.disconnect()
    }
    async onReceiveMqttMessage(msg){

    }

}

```

## Getting support

<support@senkins.top>

