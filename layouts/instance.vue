<template>
  <div ref="main" :class="mainClass">
    <div v-if="loading" class="h-screen w-full bg-gray-300">
      <div class="w-full text-center ml-auto mr-auto text-blue-500">
        <font-awesome-icon
          :icon="['fas', 'spinner']"
          spin
          size="5x"
          class="mt-16"
        />
      </div>
    </div>
    <div v-else :class="bodyClass">
      <Navbar />
      <Nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Instance/Navbar";
export default {
  components: {
    Navbar,
  },
  data () {
    return {
      loading: true,
      sidebarOpen: false,
      lightingMode: 'dark',
    };
  },

  computed: {
    topnavClass () {
      let style = [
        'flex-shrink-0',
      ];

      return style.join(' ');
    },
    bodyClass () {
      let style = [
        'antialiased',
        'sm:subpixel-antialiased',
        'md:antialiased',
        'dark:bg-cool-gray-900',
        'dark:text-gray-100',
        'w-full',
      ];

      return style.join(' ');
    },
    mainClass () {
      return 'light';
    },
  },

  methods: {
    toggleSidebar () {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleLightingMode (mode) {
      this.lightingMode = mode;
      if (process.client) {
        localStorage.setItem('lightingMode', mode);
      }
    },
    openSidebar () {
      this.sidebarOpen = true;
    },
  },

  mounted () {
    if (process.client) {
      this.lightingMode = localStorage.getItem('lightingMode') || 'light';
    }

    const instanceId = this.$route.params.id;
    if (!instanceId) { this.$router.push('/'); }

    const instance = this.$store.getters['instances/getInstance'](instanceId);
    if (!instance) { this.$router.push('/'); }

    this.$store.dispatch('api/getConfig', this.$dynamicApi(instance.address, instance.port)).then(() => {
      this.loading = false;
    });
  },
};
</script>
