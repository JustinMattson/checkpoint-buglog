<template>
  <div class="bugReport container-fluid">
    <h1 class="m-2">{{bug.title}}</h1>
    <div class="m-2 d-flex justify-content-between">
      <span>Submitted by: {{bug.creator.name}}</span>
      <span>Is Closed: {{bug.closed}}</span>
    </div>
    <!-- Bug Description -->
    <div class="row m-2">
      <div class="col-6 text-left text-muted">Details</div>
      <div class="col-6 text-right">
        <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>
      </div>
      <div class="col-12 border border-secondary">{{bug.description}}</div>
      <small class="text-muted ml-2">{{bug.id}}</small>
    </div>
    <div class="col-12 text-right">
      <button class="btn btn-outline-danger justify-right" @click="closeBug">Close</button>
    </div>
    <!-- Bug Notes -->
    <h3 class="m-2">Notes:</h3>
    <div class="row m-2">
      <div class="col-3 text-left font-weight-bold mb-2">Name</div>
      <div class="col-7 tex-left font-weight-bold mb-2">Message</div>
      <div class="col-2 text-right font-weight-bold mb-2 pl-0">Delete</div>
    </div>
    <note v-for="note in notes" :key="note.id" :note="note" />
    <div class="col-12 text-right m-2">
      <i class="fas fa-plus text-success action" @click="toggleNote">Add Note</i>
      <!-- <i class="fas fa-plus text-success action">Add Note</i> -->

      <!-- NEW NOTE FORM -->
      <!-- <form class="d-inline" v-if="noteForm" @submit.prevent="createNote"> -->
      <!-- <form class="d-inline" @submit.prevent="createNote">
        <input type="textarea" name="content" v-model="note.content" placeholder="Note Body..." />
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </form>-->
    </div>
  </div>
</template>


<script>
import Note from "@/components/NoteComponent.vue";
export default {
  name: "bugReport",
  props: [],
  data() {
    return {
      fontSize: "10px",
      color: "#aaa",
      edit: false,
      noteForm: false,
      note: {
        bugId: this.bug.id
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
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    // toggleNoteForm() {
    //   this.newNoteForm = !this.newNoteForm;
    // },
    addBug() {
      this.edit = false;
    },
    closeBug() {},
    createNote() {
      this.$store.dispatch("addNote", { ...this.note });
      this.note = {
        bugId: this.bug.id
      };
    },
    toggleNote() {
      this.noteForm = !this.noteForm;
    }
  },
  components: {
    Note
  }
};
</script>


<style scoped>
</style>