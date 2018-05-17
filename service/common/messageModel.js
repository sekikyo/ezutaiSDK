import { log } from 'util';

const mqttClient = require('./mqttClient');
const {ipcRenderer} = require('electron');
var numcount = 0;
var wc = null

/*
通讯基类
*/
class messageModel {
    constructor(){
    }
    async initCon(option,fn){
        //连接消息服务器
        const mqtt = await mqttClient.connectMqtt(option);
        //开始监听消息
        mqtt.on('message', async (topic, message) => {
            numcount++;            
            message = message.toString()
            const base64 = new Buffer(message, 'base64')
            const jsonStr = base64.toString();
            
            try {
                const msgJson = JSON.parse(jsonStr);
                const responseBody = await fn(msgJson)
                // 组装 
                let ret = {
                    id: numcount,
                    msg: msgJson.type,
                    date: new Date().toLocaleString(),
                    value: responseBody
                }
                const res = new Buffer(JSON.stringify(ret))
                //发送
                await mqtt.publish('gs_' + msgJson.topic, res.toString('base64'), { qos: 1 })
                //显示消息
                wc.webContents.send("print-msg", ret)

            } catch (e) {

                console.log('Failed message:'+ e);
                return;
            }
        })

        return true;

        
    }
     disconnect(){
        // 断开消息服务器连接
        mqttClient.closeMqtt().then((res)=>{
            if (res) {
                return true;
            } else {
                return false;
            }
        });
        
    }
    //主进程
    initWc(_wc){
        wc = _wc
    }

}



module.exports = messageModel;