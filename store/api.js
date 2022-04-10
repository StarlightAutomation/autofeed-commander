export const state = () => ({
  config: undefined,
  schedules: [],
});

export const getters = {
  config: state => state.config,
  schedules: state => state.schedules,
};

export const actions = {
  getConfig ({ commit }, api) {
    return new Promise((resolve, reject) => {
      api.getConfig().then((config) => {
        commit('SET_CONFIG', config);
        resolve(config);
      }).catch(reject);
    });
  },
  saveConfig ({ commit, getters }, { modifiedConfig, api }) {
    return new Promise((resolve, reject) => {
      const existingConfigs = getters.config.gpio || [];
      api.saveConfig(modifiedConfig, existingConfigs).then((config) => {
        commit('SET_CONFIG', config);
        resolve(config);
      }).catch(reject);
    });
  },
  saveSchedules ({ commit, getters }, { modifiedSchedule, api }) {
    return new Promise((resolve, reject) => {
      const existingSchedules = getters.schedules || [];
      api.saveSchedules(modifiedSchedule, existingSchedules).then((config) => {
        commit('SET_CONFIG', config);
        resolve(config);
      }).catch(reject);
    });
  },
  saveMqttConfig ({ dispatch }, { mqttConfig, api }) {
    return new Promise((resolve, reject) => {
      api.saveMqttConfig(mqttConfig).then((mqttConfig) => {
        dispatch('getConfig', api);
        resolve(mqttConfig);
      }).catch(reject);
    });
  },
};

export const mutations = {
  SET_CONFIG (state, config) {
    state.config = config;
    state.schedules = config.schedules;
  },
};
