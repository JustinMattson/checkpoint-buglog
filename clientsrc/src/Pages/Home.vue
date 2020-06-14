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
            <form class="form" @submit.prevent="addBug" v-if="$auth.isAuthenticated && bugForm">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  v-model="newBug.title"
                  placeholder="Bug Title..."
                  style="width:100%;"
                  required
                />
                <textarea
                  type="text"
                  name="description"
                  v-model="newBug.description"
                  placeholder="Bug Description..."
                  style="width:100%;height:15em;"
                  required
                />
                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                <i class="far fa-paper-plane action" type="submit">Send it</i>
                <!-- <div class="col-12 d-flex justify-content-end mt-3" v-if="bugForm"> -->
                <button class="btn btn-outline-primary" type="submit">Submit Bug</button>
                <!-- </div> -->
              </div>
            </form>
          </div>

          <div class="col-12 d-flex justify-content-end mt-3" v-if="!bugForm">
            <button
              class="btn btn-outline-primary"
              @click="toggleBugForm"
              v-if="$auth.isAuthenticated"
            >Report Bug</button>
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
      // fontSize: "10px",
      color: "#F00",
      bugForm: false,
      newBug: {}
    };
  },
  mounted() {
    this.$store.dispatch("getBugList");
  },
  methods: {
    toggleBugForm() {
      this.bugForm = !this.bugForm;
    },
    addBug() {
      this.$store.dispatch("addBug", { ...this.newBug });
      this.newBug = {};
      this.bugForm = false;
    }
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