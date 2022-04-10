const md5 = require("md5");

export const state = () => ({
  instances: [],
});

export const getters = {
  instances: state => state.instances,
  getInstance: (state) => {
    return (instanceId) => {
      return state.instances.filter(instance => instance.id === instanceId)[0] || null;
    };
  },
};

export const actions = {
  addInstance ({ commit }, instance) {
    return new Promise((resolve) => {
      instance.id = md5(instance.name.toLowerCase().replace(' ', '-') + instance.address + instance.port);
      commit('ADD_INSTANCE', instance);
      resolve(instance);
    });
  },
};

export const mutations = {
  ADD_INSTANCE (state, instance) {
    state.instances.push(instance);
  },
};
