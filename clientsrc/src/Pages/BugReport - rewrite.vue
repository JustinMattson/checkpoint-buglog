<template>
  <div class="bugreport"></div>
</template>


<script>
export default {
  name: "bugreport",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>