const {ipcRenderer} = require('electron');
const crypto = require('crypto');


function login(){
    let phoneNo = document.getElementById("phoneno").value;
    let password = document.getElementById("password").value;
    
    const md5 =crypto.createHash("md5");
    
    let newpwd = md5.update(password + "skkjezutai").digest("hex")

    
    var temp = ipcRenderer.sendSync('login', phoneNo, newpwd);
    if (temp) {
        window.location.href = "../main/index.html";
    } else {
        alert("用户名或密码错误~");
    }


}