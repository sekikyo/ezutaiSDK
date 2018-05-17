import { app, BrowserWindow, ipcMain } from 'electron';
const user = require('../user/user');
const simulator = require('../service/simulator/simulator');
const opcClient = require('../service/opcua/opcClient');

if (require('electron-squirrel-startup')) {
  app.quit();
}


let mainWindow;

const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });


  mainWindow.loadURL(`file://${__dirname}/login/index.html`);



  mainWindow.on('closed', () => {

    mainWindow = null;
  });
};


app.on('ready', createWindow);


app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  if (mainWindow === null) {
    createWindow();
  }
});
// 用户信息
let userInfo;
const login = async (event, phoneno, password) => {

  userInfo = await user.sdklogin(phoneno, password);

  event.returnValue = userInfo;
}

const loginOut = async (event, arg) => {

  userInfo = null;

  event.returnValue = arg;
}

const showNotice = async (event, msg) => {
  
  mainWindow.webContents.send("send-msg", msg)
  return event.returnValue = 1

}

let client;
const openServer = async (event, arg) => {
  let clientType;
  switch (arg) {
    case 0:
      clientType = simulator
      break
    case 1:
      clientType = opcClient
      break;

    default:
      clientType = simulator
      break;
  }

  client = new clientType(userInfo.topic)
  client.initWc(mainWindow);
  event.returnValue = arg;
}

const closeServer = async (event, arg) => {

  let temp = client.disconnect();
 
  client = null;
 
  event.returnValue = arg;

}


const iSMef = {
  "login": login,
  "open-server": openServer,
  "close-server": closeServer,
  "show-notice": showNotice,
  "login-out":loginOut
}
// 此处初始化所有消息 一般情况下无需修改
for (var item in iSMef) {
  ipcMain.on(item, iSMef[item])
}

