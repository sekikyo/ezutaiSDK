const messageModel = require("../service/common/messageModel")
const fetch =  require("node-fetch");
const crypto = require('crypto');
const url="101.132.157.198:3006"

const user = {
    async sdklogin(phoneno, password) {
        const md5 = crypto.createHash("md5");
        let newPwd = md5.update(password).digest("hex");
        try {

            const userInfo = await this.syncGetTopic(url, phoneno, password);
            if (userInfo == false) {
                return false
            }
            //组装用户信息
            let ret = {
                phoneNo: userInfo.userName,
                userType: userInfo.userType,
                topic: userInfo.topic
            }
            return ret;
        } catch (e) {
            
            console.log(e);
            return false

        }

    },
    async syncGetTopic(url,phoneNo,password){
        const link = "http://"+url+"/user/login";
        const res = await fetch(link, {
            body: JSON.stringify({phoneNo:phoneNo,password:password}), // must match 'Content-Type' header
            headers: { 'Content-Type': 'application/json'},
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
          })
        
        const json = await res.json();

        if(json.ret == 0){
            
            return false;
        }
        return json
    }

}
module.exports = user