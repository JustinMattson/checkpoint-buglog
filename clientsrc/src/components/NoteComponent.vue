<template>
  <div class="note">
    <div class="row border border-primary mx-1">
      <div class="col-3 align-self-center">{{note.creator.name}}</div>
      <div class="col-8">{{note.content}}</div>
      <div class="col-1 text-center align-self-center">
        <i class="fas fa-trash-alt text-danger action" @click="deleteNote"></i>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "note",
  props: ["note"],
  data() {
    return {
      edit: false,
      prettyDate: new Date(this.note.updatedAt).toLocaleDateString("eu-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
  },
  computed: {},
  methods: {
    deleteNote() {}
  },
  components: {}
};
</script>


<style scoped>
</style>