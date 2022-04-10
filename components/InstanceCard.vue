<template>
  <div class="w-full">
    <nuxt-link
      class="block border border-dashed border-blue-600 p-3 hover:shadow"
      :to="`/instances/${instance.id}`"
    >
      <div class="flex">
        <div class="mr-3 mt-0.5">
          <font-awesome-icon v-if="connectionStatus <= 1" :icon="['fas', 'spinner']" spin class="w-4 h-4 text-gray-400" />
          <font-awesome-icon v-if="connectionStatus === 2" :icon="['fas', 'check-circle']" class="w-4 h-4 text-green-400" />
          <font-awesome-icon v-if="connectionStatus === 3" :icon="['fas', 'times-circle']" class="w-4 h-4 text-red-400" />
        </div>
        <h1 class="text-lg">
          {{ instance.name }}
          <span class="text-sm">
            (<span class="font-mono">{{ instance.address }}:{{ instance.port }}</span>)
          </span>
        </h1>
      </div>
      <b>Version:</b>
      <span class="text-sm font-mono bg-red-50 rounded p-1">{{ version }}</span>
      <div class="border-b border-gray-200 mt-2 mb-3" />
      <div v-if="configFetchError" class="rounded border border-red-300 bg-red-200 p-3">
        There was a problem fetching the instance configuration: {{ configFetchError }}
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <b>GPIO Devices:</b>
            <span class="text-sm font-mono bg-red-50 rounded p-1">{{ gpioDevices }}</span>
          </div>
          <div>
            <b>Home Assistant:</b>
            <font-awesome-icon v-if="mqttEnabled === true" :icon="['fas', 'check-circle']" class="w-4 h-4 text-green-400" />
            <font-awesome-icon v-if="mqttEnabled === false" :icon="['fas', 'times-circle']" class="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
const CONNECTION_STATUS_IDLE = 0;
const CONNECTION_STATUS_TESTING = 1;
const CONNECTION_STATUS_SUCCESS = 2;
const CONNECTION_STATUS_FAILED = 3;

export default {
  name: 'InstanceCard',
  props: {
    instance: {
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      connectionStatus: CONNECTION_STATUS_IDLE,
      version: undefined,
      configFetchError: undefined,

      gpioDevices: undefined,
      mqttEnabled: undefined,
    };
  },
  computed: {
    api () {
      return this.$dynamicApi(this.instance.address, this.instance.port);
    },
  },
  methods: {
    checkStatus () {
      this.connectionStatus = CONNECTION_STATUS_TESTING;
      this.api.getStatus().then((res) => {
        this.connectionStatus = CONNECTION_STATUS_SUCCESS;
        this.version = res.version;
      }).catch(() => {
        this.connectionStatus = CONNECTION_STATUS_FAILED;
      });
    },
    getConfig () {
      this.api.getConfig().then((config) => {
        this.gpioDevices = config.gpio.length;
        this.mqttEnabled = !!config.mqtt;
      }).catch((error) => {
        this.configFetchError = error;
      });
    },
  },
  mounted () {
    this.checkStatus();
    this.getConfig();
  },
};
</script>
