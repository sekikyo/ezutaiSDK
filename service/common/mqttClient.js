var MQTT = require("async-mqtt")
const fs = require('fs')
const path = require('path')
const mqttUrl = 'mqtt://47.93.205.223:1883';

var mClient;
const mqttclient = {
	async init(topic) {
		var client = await MQTT.connect(mqttUrl);
        mClient = client;
		return new Promise(async (resolve) => {

			await client.subscribe('ur_' + topic, { qos: 1 });

			if (client._client.connected) {
				return resolve(client);
			} else {
				return resolve(false);
			}
		});
	},
	/**
	* 连接mqtt服务器
	*/
	async connectMqtt(option) {
		const mqtt = await this.init(option);

		if (!mqtt) {

			return false
		}

		return mqtt

	},
	async closeMqtt(option) {
		
		if (mClient == null) {

			return false;

		}

		mClient.end();

		return true

	}


}


module.exports = mqttclient;