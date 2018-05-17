const messageModel = require("../common/messageModel")


class simulator extends messageModel{
    constructor(option){
        super();
        super.initCon(option,this.onReceiveMqttMessage);
    }
    disconnect(){
        super.disconnect()
    }
    async onReceiveMqttMessage(msg) {
        if (msg.type == 'bool') {
            if(Math.random()>0.5){
                return 1
            }else{
                return 0
            }      
        } else {
            return Math.round(Math.random() * 10000) / 100;
        }

    }

}
module.exports = simulator