<template>
  <div class="home">
    <h1
      class="text-center m-5"
      v-show="!$auth.isAuthenticated"
      :style="{color:color}"
    >Please log in to access the bug logs!</h1>
    <div class="container-fluid" v-show="$auth.isAuthenticated">
      <div class="row">
        <!-- ADD BUG FORM -->
        <div class="col-12 mt-3" v-show="bugForm">
          <form class="form" @submit.prevent="addBug" v-if="$auth.isAuthenticated && bugForm">
            <div class="form-group">
              <input
                type="text"
                name="title"
                class="rounded px-2"
                v-model="newBug.title"
                placeholder="Bug Title..."
                style="width:100%;"
                required
              />
              <textarea
                type="text"
                name="description"
                class="rounded px-2"
                v-model="newBug.description"
                placeholder="Bug Description..."
                style="width:100%;height:15em;"
                required
              />
              <button class="btn btn-outline-primary shadow" type="submit">Submit Bug</button>
              <button
                class="btn btn-outline-danger ml-2 shadow"
                type="button"
                @click="toggleBugForm"
              >Cancel</button>
            </div>
          </form>
        </div>
        <!-- BUG FORM TOGGLE -->
        <div class="col-12 d-flex justify-content-end mt-3" v-if="!bugForm">
          <button
            class="btn btn-outline-primary shadow"
            @click="toggleBugForm"
            v-if="$auth.isAuthenticated"
          >Report Bug</button>
        </div>
      </div>
      <!-- DISPLAY BUG COMPONENT -->
      <div class="row d-flex mt-2">
        <div class="col-3 text-center font-weight-bold mb-2">Title</div>
        <div class="col-3 text-center font-weight-bold mb-2">Created By</div>
        <div class="col-2 text-center font-weight-bold mb-2">
          <i class="fas fa-recycle action" @click="resetFilter"></i>
          Closed
          <i class="fas fa-filter action" @click="toggleFilter"></i>
        </div>
        <div class="col-4 text-center font-weight-bold mb-2">
          <i class="fas fa-sort-up action" @click="bugSortAsc"></i>&nbsp;Last Updated
          <i class="fas fa-sort-down action" @click="bugSortDesc"></i>
        </div>

        <div style="width:100%;" v-if="this.closedFilter === 'All'">
          <bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
        </div>
        <div style="width:100%;" v-else-if="this.closedFilter === 'Closed'">
          <bug v-for="bug in bugsClosed" :key="bug.id" :bug="bug" />
        </div>
        <div style="width:100%;" v-else-if="this.closedFilter === 'Open'">
          <bug v-for="bug in bugsOpen" :key="bug.id" :bug="bug" />
        </div>

        <!-- <bug v-for="bug in bugs" :key="bug.id" :bug="bug" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "@/components/BugComponent.vue";
export default {
  name: "home",
  data() {
    return {
      color: "#F00",
      bugForm: false,
      closedFilter: "All",
      sort: true,
      newBug: {}
    };
  },
  mounted() {
    this.$store.dispatch("getBugList");
    //  this.$store.dispatch("getBugList").sort((a, b) => a.updatedAt - b.updatedAt);
  },
  methods: {
    toggleBugForm() {
      this.bugForm = !this.bugForm;
    },
    toggleFilter() {
      if (this.closedFilter == "Open") {
        this.closedFilter = "Closed";
      } else {
        this.closedFilter = "Open";
      }
    },
    resetFilter() {
      this.closedFilter = "All";
    },
    toggleSort() {
      if (this.sort == "desc") {
        this.sort = "asc";
      } else {
        this.sort = "desc";
      }
    },
    addBug() {
      this.$store.dispatch("addBug", { ...this.newBug });
      this.newBug = {};
      this.bugForm = false;
    },
    bugSortAsc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return -1;
        if (a.updatedAt > b.updatedAt) return 1;
        return 0;
      }
      return this.bugs.sort(compare);
    },
    bugSortDesc() {
      function compare(a, b) {
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt > b.updatedAt) return -1;
        return 0;
      }
      return this.bugs.sort(compare);
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    bugsOpen() {
      return this.$store.state.bugs.filter(bc => bc.closed == false);
    },
    bugsClosed() {
      return this.$store.state.bugs.filter(bc => bc.closed == true);
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