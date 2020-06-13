<template>
  <div class="home">
    <main>
      <h1
        class="text-center m-5"
        v-if="!$auth.isAuthenticated"
        :style="{color:color}"
      >Please log in to access the bug logs!</h1>
      <div class="container-fluid" v-if="$auth.isAuthenticated">
        <div class="row d-flex mt-2">
          <div class="col-3 text-center font-weight-bold mb-2">Title</div>
          <div class="col-3 text-center font-weight-bold mb-2">Created By}}</div>
          <div class="col-2 text-center font-weight-bold mb-2">Is Open</div>
          <div class="col-4 text-center font-weight-bold mb-2">Last Updated</div>
          <bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Bug from "@/components/BugComponent.vue";
export default {
  name: "home",
  data() {
    return {
      color: "#F00"
    };
  },
  mounted() {
    this.$store.dispatch("getBugList");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    myProfile() {
      return this.$store.state.profile;
    }
  },
  components: {
    Bug
  }
};
</script>

<style scoped>
</style>