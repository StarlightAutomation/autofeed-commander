<template>
  <div class="w-full md:w-2/3 ml-auto mr-auto md:px-0 px-3">
    <h1 class="text-xl border-b border-gray-300 pb-3 mb-5 mt-5">
      Instances
    </h1>
    <div v-if="instances.length > 0" class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="instance in instances" :key="instance.id">
          <InstanceCard
            :instance="instance"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-5">
      <i>No instances yet.</i>
    </div>
  </div>
</template>
<script>
import InstanceCard from "~/components/InstanceCard";
export default {
  name: 'IndexPage',
  components: { InstanceCard },
  computed: {
    instances () {
      return this.$store.getters['instances/instances'];
    },
  },
};
</script>
