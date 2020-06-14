<template>
  <div class="bug container-fluid">
    <!-- This is the component that will draw each bug item.
    Embedded within this componet will be the notes component.-->
    <div class="row border border-info mx-1" v-if="!bug.closed">
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
      <div class="col-4 text-right align-self-center">{{prettyDate}}</div>
    </div>
    <div class="row border border-info mx-1" v-if="bug.closed" :style="{color:isClosed.color}">
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
      <div class="col-4 text-right align-self-center">{{prettyDate}}</div>
    </div>
    <!-- EDIT BUG FORM -->
    <div v-if="edit">
      <form class="form" @submit.prevent="editBug">
        <div class="form-group">
          <input
            type="text"
            name="title"
            v-model="bug.title"
            placeholder="Bug Title..."
            style="width:100%;"
            required
          />
          <textarea
            type="text"
            name="description"
            v-model="bug.description"
            placeholder="Bug Description..."
            style="width:100%;height:15em;"
            required
          />
          <span class="d-flex justify-content-between">
            <button class="btn btn-outline-primary" type="submit">Update Bug</button>
            <button class="btn btn-outline-success" type="button" @click="closeBug">Close Bug</button>
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
      prettyDate: new Date(this.bug.updatedAt).toLocaleDateString("eu-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      edit: false
    };
  },
  // mounted() {
  //   isClosed = this.bug.closed;
  // },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
    // notes() {
    //   return this.$Store.state.notes[this.bug.id];
    // }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    editBug() {
      this.$store.dispatch("editBug", this.bug);
      this.edit = false;
    },
    closeBug() {
      // Icon is not showing
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to close this Bug.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("closeBug", this.bug);
          swal("Poof! Your comment has been closed!", {
            icon: "success"
          });
        } else {
          swal("Close cancelled");
        }
      });

      this.edit = false;
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>