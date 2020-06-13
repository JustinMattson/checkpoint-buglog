<template>
  <div class="home">
    <main>
      <h1
        class="text-center m-5"
        v-if="!$auth.isAuthenticated"
        :style="{color:color}"
      >Please log in to access the bug logs!</h1>
      <div class="container-fluid" v-if="$auth.isAuthenticated">The rest of the page</div>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      color: "#F00"
    };
  }
};
</script>

<style scoped>
main {
}
</style>