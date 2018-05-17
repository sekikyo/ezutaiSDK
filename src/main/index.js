const {ipcRenderer} = require('electron');

function switchCase() {
    var obj = document.getElementById('conType');
    var index = obj.selectedIndex; //序号，取当前选中选项的序号
    var val = obj.options[index].value;

    var flag = ipcRenderer.sendSync('open-server', index);
    if (flag != null) {
        var btn = document.getElementById('sbtn');
        var cbtn = document.getElementById('cbtn');
        btn.disabled = true;
        cbtn.disabled = false;
        btn.innerHTML = "启动中..."
    }

}
function closeCase() {

    var temp = ipcRenderer.sendSync('close-server', "close");
    if (temp != null) {
        var btn = document.getElementById('sbtn');
        var cbtn = document.getElementById('cbtn');
        btn.disabled = false;
        cbtn.disabled = true;
        btn.innerHTML = "启动"
    }

}

function relogin(){

    var flag = ipcRenderer.sendSync('login-out', "out");
    
    window.location.href="../login/index.html";

}

function clearTable() {
    var tab = document.getElementById("myTable"); //获得表格
    tab.innerHTML = "<tr>"
                   +"<td>编号</td>" 
                   +"<td>时间</td>"
                   +"<td>接收消息</td>"
                   +"<td>返回消息(值)</td>"
                   +"<tr>";

}

ipcRenderer.on('print-msg',async(event, msg) => {

    var tab=document.getElementById("myTable"); //获得表格
    var colsNum = tab.rows.item(0).cells.length; //表格的列数
    //表格当前的行数 
    var num = document.getElementById("myTable").rows.length;
    var rownum = num; //第N行增加
    tab.insertRow(rownum);
    for (var i = 0; i < 4; i++) {
        tab.rows[rownum].insertCell(i);//插入列
        if (i == 0) {
            tab.rows[rownum].cells[i].innerHTML =`${msg.id}`;
        } else if (i == 1) {
            tab.rows[rownum].cells[i].innerHTML = `${msg.date}`;
        } else if (i == 2) {
            tab.rows[rownum].cells[i].innerHTML = `${msg.msg}`;
        } else {
            tab.rows[rownum].cells[i].innerHTML = `${msg.value}`;
        } 
    }


  });