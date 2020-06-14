<template>
  <div class="home">
    <main>
      <h1
        class="text-center m-5"
        v-if="!$auth.isAuthenticated"
        :style="{color:color}"
      >Please log in to access the bug logs!</h1>
      <div class="container-fluid" v-if="$auth.isAuthenticated">
        <div class="row">
          <!-- ADD BUG FORM -->
          <div class="col-12 mt-3" v-show="bugForm">
            STUPID FORM
            <!-- <form class="d-inline" @submit.prevent="addBug">
              <input type="text" name="title" v-model="newBug.title" placeholder="Bug Title..." />
              <input
                type="textarea"
                name="description"
                v-model="newBug.description"
                placeholder="Bug Description..."
              />
              <button type="submit" class="btn btn-outline-primary">Submit</button>
            </form>-->
          </div>

          <div class="col-12 d-flex justify-content-end mt-3" v-if="!bugForm">
            <button
              class="btn btn-outline-primary"
              @click="toggleBugForm"
              v-if="$auth.isAuthenticated"
            >Report Bug</button>
          </div>
          <div class="col-12 d-flex justify-content-end mt-3" v-if="bugForm">
            <button
              class="btn btn-outline-primary"
              @click="toggleBugForm"
              v-if="$auth.isAuthenticated"
            >Submit Bug</button>
          </div>
        </div>

        <div class="row d-flex mt-2">
          <div class="col-3 text-center font-weight-bold mb-2">Title</div>
          <div class="col-3 text-center font-weight-bold mb-2">Created By</div>
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
      color: "#F00",
      bugForm: false
      // newBug: {
      //   bugId: this.bug.id
      // }
    };
  },
  mounted() {
    this.$store.dispatch("getBugList");
  },
  methods: {
    toggleBugForm() {
      this.bugForm = !this.bugForm;
    }
    // addBug() {
    //   this.$store.dispatch("addBug", { ...this.newBug });
    //   this.newBug = {
    //     bugId: this.bug.id
    //   };
    // }
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