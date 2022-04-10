import axios from "axios";

export const api = (address, port) => {
  return {
    getUrl: (endpoint) => {
      return 'http://' + address + ':' + port + (endpoint ? '/' + endpoint : '');
    },
    getStatus: () => {
      return new Promise((resolve, reject) => {
        axios.get(api(address, port).getUrl('status'))
          .then((res) => {
            resolve(res.data);
          }).catch(reject);
      });
    },
    getDeviceStatus: (deviceId) => {
      return new Promise((resolve, reject) => {
        axios.get(api(address, port).getUrl('device-status/' + deviceId)).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
    getConfig: () => {
      return new Promise((resolve, reject) => {
        axios.get(api(address, port).getUrl('config')).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
    saveConfig: (modifiedConfig, existingConfigs) => {
      return new Promise((resolve, reject) => {
        for (const i in existingConfigs) {
          const config = existingConfigs[i];
          if (config.id === modifiedConfig.id) {
            existingConfigs[i] = modifiedConfig;
            break;
          }
        }

        axios.put(api(address, port).getUrl('gpio-config'), {
          gpioConfig: existingConfigs,
        }).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
    saveSchedules: (modifiedSchedule, existingSchedules) => {
      return new Promise((resolve, reject) => {
        for (const i in existingSchedules) {
          const schedule = existingSchedules[i];
          if (schedule.id === modifiedSchedule.id) {
            existingSchedules[i] = modifiedSchedule;
            break;
          }
        }

        axios.put(api(address, port).getUrl('schedules'), {
          schedules: existingSchedules,
        }).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
    saveMqttConfig: (config) => {
      return new Promise((resolve, reject) => {
        axios.put(api(address, port).getUrl('mqtt-config'), config).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
    controlDevice: (deviceId, setting) => {
      return new Promise((resolve, reject) => {
        axios.post(api(address, port).getUrl('control-device/' + deviceId), {
          setting: (setting) ? 'on' : 'off',
        }).then((res) => {
          resolve(res.data);
        }).catch(reject);
      });
    },
  };
};

export default function (ctx, inject) {
  inject('dynamicApi', api);
};
