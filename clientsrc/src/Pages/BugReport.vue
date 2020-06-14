<template>
  <div class="bugreport container-fluid">
    <h1 class="mt-3">{{bug.title}}</h1>
    <div>
      <b>Reported by: {{bug.creator.name}}</b>
    </div>
    <div>Description:</div>
    <div class="bg-white">{{bug.description}}</div>
    <small>{{bug.id}} Last Updated: {{bug.updatedAt}}</small>

    <!-- NOTES section -->
    <div class="row border mx-1 mt-3">
      <div class="col-3 align-self-center">Reported By</div>
      <div class="col-8">Message</div>
      <div class="col-1 text-center align-self-center">Delete</div>
    </div>
    <note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>


<script>
import Note from "@/components/NoteComponent.vue";
export default {
  name: "bugreport",
  props: ["notes", "bug"],
  data() {
    return {};
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
  methods: {},
  components: {
    Note
  }
};
</script>


<style scoped>
</style>