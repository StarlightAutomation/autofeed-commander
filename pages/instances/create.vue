<template>
  <div class="w-full md:w-2/3 ml-auto mr-auto md:px-0 px-3">
    <h1 class="text-lg border-b border-gray-300 pb-3 mb-5 mt-5">
      Add Instance
    </h1>
    <div class="mb-3">
      <label for="name">Instance Name</label>
      <input id="name" v-model="instance.name" type="text" class="text-input" placeholder="autofeed-instance-name">
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="address">Instance API Address</label>
        <input
          id="address"
          v-model="instance.address"
          :disabled="connectionStatus === 1"
          type="text"
          class="text-input font-mono"
          placeholder="localhost"
          @change="testConnection"
        >
      </div>
      <div>
        <label for="port">Instance API Port</label>
        <input
          id="port"
          v-model="instance.port"
          :disabled="connectionStatus === 1"
          type="number"
          class="text-input font-mono"
          placeholder="8080"
          min="1"
          max="65535"
          @change="testConnection"
        >
      </div>
    </div>
    <div v-if="connectionStatus > 0" :class="connectionStatusClass">
      {{ connectionStatusMessage }}
    </div>
    <div class="border-b border-gray-300 mt-3 mb-3" />
    <button
      :disabled="connectionStatus !== 2"
      :class="saveButtonClass"
      @click="addInstance()"
    >
      Add Instance
    </button>
  </div>
</template>
<script>
const CONNECTION_STATUS_IDLE = 0;
const CONNECTION_STATUS_TESTING = 1;
const CONNECTION_STATUS_SUCCESS = 2;
const CONNECTION_STATUS_FAILED = 3;

export default {
  name: 'CreateInstancePage',
  data () {
    return {
      instance: {
        name: undefined,
        address: undefined,
        port: 8080,
      },

      connectionStatus: CONNECTION_STATUS_IDLE,
    };
  },

  computed: {
    connectionStatusClass () {
      const style = [
        'rounded',
        'p-3',
        'border',
        'mt-3',
      ];

      switch (this.connectionStatus) {
        case CONNECTION_STATUS_TESTING:
          style.push(...[
            'bg-gray-100',
            'border-gray-200',
          ]);
          break;
        case CONNECTION_STATUS_FAILED:
          style.push(...[
            'bg-red-100',
            'border-red-200',
          ]);
          break;
        case CONNECTION_STATUS_SUCCESS:
          style.push(...[
            'bg-green-100',
            'border-green-200',
          ]);
          break;
      }

      return style.join(' ');
    },
    connectionStatusMessage () {
      switch (this.connectionStatus) {
        case CONNECTION_STATUS_TESTING:
          return 'Testing connection...';
        case CONNECTION_STATUS_FAILED:
          return 'Connection failed.';
        case CONNECTION_STATUS_SUCCESS:
          return 'Connection success!';
      }

      return null;
    },
    saveButtonClass () {
      const style = [
        'rounded',
        'w-full',
        'p-3',
        'border',
      ];

      if (this.connectionStatus === CONNECTION_STATUS_SUCCESS) {
        style.push(...[
          'bg-blue-500',
          'border-blue-600',
          'hover:bg-blue-400',
          'text-white',
        ]);
      } else {
        style.push(...[
          'cursor-default',
          'bg-blue-400',
          'border-blue-500',
          'text-gray-100',
        ]);
      }

      return style.join(' ');
    },
  },

  methods: {
    testConnection () {
      if (!this.instance.address || !this.instance.port || this.connectionStatus === CONNECTION_STATUS_TESTING) { return; }
      this.connectionStatus = CONNECTION_STATUS_TESTING;

      this.$dynamicApi(this.instance.address, this.instance.port).getStatus().then((res) => {
        if (res.status === 'OK' && res.version !== undefined) {
          this.connectionStatus = CONNECTION_STATUS_SUCCESS;
          return;
        }

        this.connectionStatus = CONNECTION_STATUS_FAILED;
      }).catch((error) => {
        console.error(error);
        this.connectionStatus = CONNECTION_STATUS_FAILED;
      });
    },
    addInstance () {
      this.$store.dispatch('instances/addInstance', this.instance).then((instance) => {
        this.$router.push('/instances/' + instance.id);
      });
    },
  },
};
</script>
