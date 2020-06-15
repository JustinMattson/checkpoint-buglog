<template>
  <div class="bug container-fluid">
    <!-- This is the component that will draw each bug item.
    Embedded within this componet will be the notes component.-->
    <!-- V-SHOW BUG OPEN -->
    <div class="row border rounded border-primary m-1 bg-white shadow" v-show="!bug.closed">
      <div class="col-3">
        <router-link :to="{ name: 'bug', params: { bugId: bug.id}}">{{bug.title}}</router-link>
      </div>
      <div class="col-3 pl-5 align-self-center">{{bug.creator.name}}</div>
      <div class="col-2 text-center align-self-center">
        {{bug.closed}}&nbsp;
        <i
          class="fas fa-pencil-alt action"
          v-if="!bug.closed && bug.creatorEmail == profile.email"
          @click="toggleEdit"
        ></i>
      </div>
      <div class="col-4 text-right align-self-center">{{prettyUpdatedAt}}</div>
    </div>
    <!-- V-SHOW BUG CLOSED -->
    <div
      class="row border border-info mx-1"
      v-show="bug.closed"
      :style="{color:isClosed.color,backgroundColor:bgColor}"
    >
      <div class="col-3">
        <router-link :to="{ name: 'bug', params: { bugId: bug.id}}">{{bug.title}}</router-link>
      </div>
      <div class="col-3 pl-5 align-self-center">{{bug.creator.name}}</div>
      <div class="col-2 text-center align-self-center">
        {{bug.closed}}
        <i
          class="fas fa-pencil-alt action"
          v-if="!bug.closed && bug.creatorEmail == profile.email"
          @click="toggleEdit"
        ></i>
      </div>
      <div class="col-4 text-right align-self-center">
        <!-- Found the updatedAt and closedDate are the same if bug.closed -->
        <!-- {{prettyUpdatedAt}}<br /> -->
        {{prettyClosedDate}}
      </div>
    </div>
    <!-- EDIT BUG FORM -->
    <div v-if="edit">
      <form class="form" @submit.prevent="editBug">
        <div class="form-group">
          <input
            type="text"
            name="title"
            class="rounded px-2"
            v-model="bug.title"
            placeholder="Bug Title..."
            style="width:100%;"
            required
          />
          <textarea
            type="text"
            name="description"
            class="rounded px-2"
            v-model="bug.description"
            placeholder="Bug Description..."
            style="width:100%;height:15em;"
            required
          />
          <span class="d-flex justify-content-between">
            <span>
              <button class="btn btn-outline-primary shadow" type="submit">Update Bug</button>
              <button
                class="btn btn-outline-danger shadow ml-2"
                type="button"
                @click="toggleEdit"
              >Cancel</button>
            </span>
            <button class="btn btn-outline-success shadow" type="button" @click="closeBug">Close Bug</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Note from "@/components/NoteComponent.vue";
import swal from "sweetalert";
export default {
  name: "bug",
  props: ["bug"],
  data() {
    return {
      isClosed: {
        color: "#999"
      },
      bgColor: "#DDF",

      prettyUpdatedAt: new Date(this.bug.updatedAt).toLocaleDateString(
        "eu-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      ),
      prettyClosedDate: new Date(this.bug.closedDate).toLocaleDateString(
        "eu-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      ),
      edit: false
    };
  },

  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    editBug() {
      let data = this.$store.dispatch("editBug", this.bug);
      this.prettyUpdatedAt = this.bug.updatedAt;
      this.edit = false;
    },
    closeBug() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to close this Bug.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let data = this.$store.dispatch("closeBug", this.bug);

          swal("Poof! Your comment has been closed!", {
            icon: "success"
          });
          this.prettyClosedDate = this.bug.closedDate;
          this.edit = false;
        } else {
          swal("Close cancelled");
        }
      });
      this.bug.closed = true;
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>