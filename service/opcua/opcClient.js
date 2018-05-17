const messageModel = require("../common/messageModel")
const opcua = require("node-opcua");

const endpointUrl = "opc.tcp://192.168.0.18:49320";
const OPCUAClient = opcua.OPCUAClient;
const SecurityPolicy = opcua.SecurityPolicy;
const MessageSecurityMode = opcua.MessageSecurityMode;
const client = new OPCUAClient({
    securityMode: MessageSecurityMode.SIGNANDENCRYPT,
    securityPolicy: SecurityPolicy.Basic128Rsa15
});
var the_session;

const retVariable =(nodeId)=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            return resolve(0)
        },1500);
        the_session.readVariableValue(nodeId, function (err, dataValue) {
            if (!err) {
                if (dataValue.value == null) {
                    return resolve(0)
                }
                if ('Float' === dataValue.value.dataType.key) {
                    dataValue.value.value = parseFloat(dataValue.value.value.toFixed(2))
                }
                let msgValue = dataValue.value.value;
                return resolve(msgValue)
            }
            return reject(err)
        });
    })
} 

class opcClient extends messageModel{
    constructor(option){
        super();
        this.opcUAConnect().then((res) => {
            if (res) {
                this.opcSession()
                super.initCon(option, this.onReceiveMqttMessage);
            } else {
                return false;
            }

        });
        
    }
    disconnect(){
        //消息服务器断开连接
         super.disconnect()
        //关闭连接
        client.disconnect().then();

    }
    async opcUAConnect() {
        return new Promise((resolve, reject) => {
            client.connect(endpointUrl, function (err) {
                if (err) {
                    console.log(" cannot connect to endpoint :", endpointUrl);
                    reject(err)
                } else {
                    resolve(true)
                }
            });
        })
    }
    async opcSession() {
        return new Promise((resolve, reject) => {
            client.createSession(function (err, session) {
                if (!err) {
                    the_session = session;
                    return resolve(the_session)
                }
                console.log(err)
                return reject(err)
            });
        });
    }
    async onReceiveMqttMessage(message) {
        let ret;
        try{
           
            ret = await retVariable(message.tid);

            return ret;

    }catch (e){
        
        console.log("Failed to Send msg:"+ e);
        
        return false   
    }
    }
}

module.exports = opcClient