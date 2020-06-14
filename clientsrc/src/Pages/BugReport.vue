<template>
  <div class="bugreport container-fluid">
    <h1 class="mt-3">{{bug.title}}</h1>
    <div>
      <b>Reported by: {{bug.creator.name}}</b>
    </div>
    <div>Description:</div>
    <div class="bg-white">{{bug.description}}</div>
    <span class="d-flex justify-content-between">
      <small>{{bug.id}}</small>
      <small>Last Updated: {{bug.updatedAt}}</small>
      <i class="fas fa-plus text-success action" @click="toggleNote">Add Note</i>
    </span>

    <!-- ADD NOTES FORM-->
    <form class="form mt-3" @submit.prevent="addNote" v-if="$auth.isAuthenticated && noteForm">
      <div class="form-group">
        <textarea
          type="text"
          name="noteMessage"
          v-model="newNote.content"
          placeholder="Note Message..."
          style="width:100%;height:5em;"
          required
        />
        <!-- <input type="text" v-model="newNote.creatorEmail" placeholder="email here.." /> -->
        <button class="btn btn-outline-success" type="submit">Add Note</button>
        <button class="btn btn-outline-danger ml-2" type="button" @click="toggleNote">Cancel</button>
      </div>
    </form>

    <!-- NOTES section -->
    <div class="row border mx-1 mt-3">
      <div class="col-3 align-self-center">Reported By</div>
      <div class="col-8">Message</div>
      <div class="col-1 text-center align-self-center">Delete</div>
    </div>
    {{profile.email}}
    <note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>


<script>
import Note from "@/components/NoteComponent.vue";
export default {
  name: "bugreport",
  props: ["notes", "profile"],
  data() {
    return {
      noteForm: false,
      newNote: {
        bug: this.$route.params.bugId
        // creatorEmail: this.profile.email
      }
    };
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
      return this.$store.state.notes[this.bug.id];
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
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>