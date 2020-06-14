<template>
  <div class="note">
    <div class="row border border-primary mx-1">
      <div class="col-3 align-self-center">{{note.creator.name}}</div>
      <div class="col-8">{{note.content}}</div>
      <div class="col-1 text-center align-self-center">
        <i class="far fa-trash-alt text-danger action" @click="deleteNote"></i>
      </div>
      <div class="col-12">lets try a form here.</div>
    </div>
  </div>
</template>


<script>
import swal from "sweetalert";
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
    deleteNote() {
      swal({
        title: "Are you sure?",
        text: "Click 'Ok' to confirm you wish to delete Note",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteNote", this.note);
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Delete cancelled");
        }
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>