<template>
  <div class="bugreport container-fluid">
    <div class="d-flex justify-content-between">
      <span class="mt-3" style="fontSize:24pt;">
        <b>{{bug.title}}</b>
      </span>
      <span class="mt-3 text-danger" style="fontSize:24pt;" v-show="bug.closed">
        {{status}}
        <!-- <br />
        <small>{{bug.closed}}</small>-->
      </span>
      <span class="mt-3 text-success" style="fontSize:24pt;" v-show="!bug.closed">
        {{status}}
        <!-- <br />
        <small>{{bug.closed}}</small>-->
      </span>
      <!-- <span class="mt-3" style="fontSize:24pt;">{{this.status}}</span> -->
    </div>

    <div class="d-flex justify-content-between">
      <span v-if="bug.creator">
        <b>Reported by: {{bug.creator.name}}</b>
      </span>
      <span>
        <i
          class="fas fa-virus-slash text-warning action text-shadow"
          @click="closeBug"
          v-show="!bug.closed && profile.email == bug.creatorEmail"
        >&nbsp;Kill</i>
      </span>
    </div>
    <div>Description:</div>
    <div class="bg-white rounded border border-secondary px-2 shadow">{{bug.description}}</div>
    <span class="d-flex justify-content-between">
      <!-- <small>{{bug.id}}</small> -->
      <small>Last Updated: {{bug.updatedAt}}</small>
      <i class="fas fa-plus text-success action" @click="toggleNote" v-show="!bug.closed">Add Note</i>
    </span>

    <!-- ADD NOTES FORM-->
    <form
      class="form mt-3 rounded"
      @submit.prevent="addNote"
      v-if="$auth.isAuthenticated && noteForm"
    >
      <div class="form-group">
        <textarea
          type="text"
          name="noteMessage"
          class="rounded px-2"
          v-model="newNote.content"
          placeholder="Note Message..."
          style="width:100%;height:5em;"
          required
        />
        <!-- <input type="text" v-model="newNote.creatorEmail" placeholder="email here.." /> -->
        <button class="btn btn-outline-success shadow" type="submit">Add Note</button>
        <button class="btn btn-outline-danger ml-2 shadow" type="button" @click="toggleNote">Cancel</button>
      </div>
    </form>

    <!-- NOTES section -->
    <div class="row border mx-1 mt-3" style="font-weight:bold;">
      <div class="col-3 align-self-center">Reported By</div>
      <div class="col-8">Message</div>
      <div class="col-1 text-right align-self-center pl-0 pr-3">Delete</div>
    </div>
    <!-- {{profile.email}} -->
    <note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>


<script>
import Note from "@/components/NoteComponent.vue";
export default {
  name: "bugreport",
  props: [],
  data() {
    return {
      noteForm: false,
      status: "",
      newNote: {
        bug: this.$route.params.bugId
        // creatorEmail: this.profile.email
      }
    };
  },
  onRouterLeave(to, from, next) {
    commit("setActiveBug", {});
    status = "";
    next();
  },
  async mounted() {
    await this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
    this.bug.closed ? (this.status = "Closed") : (this.status = "Open");
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    toggleNote() {
      this.noteForm = !this.noteForm;
    },
    addNote() {
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = {
        bug: this.$route.params.bugId
        // email: this.profile.email
      };
      this.noteForm = false;
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
          let data = this.$store.dispatch("closeBug", this.bug);

          swal("Poof! Your comment has been closed!", {
            icon: "success"
          });
          this.bug.closed = true;
          this.status = "Closed";
        } else {
          swal("Close cancelled");
        }
      });
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
.text-shadow {
  text-shadow: 1px 1px black;
}
</style>