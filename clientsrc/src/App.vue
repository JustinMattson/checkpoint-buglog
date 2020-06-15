<template>
<div id="app">
  <body>
    <header>
      <navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer class="text-center text-light bg-dark p-2">
      <span style="height:15px">
        Made with
        <img src="../src/assets/logo.png" style="height: 1em" /> by Justin Mattson
      </span>
    </footer>
  </body>
</div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      //NOTE if you want to do something everytime the user logs in, do so here
      //this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$store.dispatch("getBugList");
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header {
  min-height: 1vh;
}
main {
  flex-grow: 1;
}
footer {
  min-height: 1vh;
}
.action {
  cursor: pointer;
}
</style>
