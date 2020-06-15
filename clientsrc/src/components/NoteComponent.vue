<template>
  <div class="note">
    <div class="row border rounded border-success m-1 shadow bg-white">
      <div class="col-3 align-self-center">{{note.creatorEmail}}</div>
      <div class="col-8">{{note.content}}</div>
      <div class="col-1 text-center align-self-center">
        <i
          class="far fa-trash-alt text-danger action"
          @click="deleteNote"
          v-show="!bug.closed && note.creatorEmail == profile.email"
        ></i>
      </div>
      <!-- REVIEW if time permits, updating a comment is not required by the user story -->
      <!-- <div class="col-12">
        <form class="form-inline">
          <div class="form-group">
            <label for></label>
            <input type="text" name id class="form-control" placeholder aria-describedby="helpId" />
            <small id="helpId" class="text-muted">Help text</small>
          </div>
        </form>
      </div>-->
    </div>
  </div>
</template>


<script>
import swal from "sweetalert";
export default {
  name: "note",
  // props: ["note", "bug"],
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
  mounted() {},
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    profile() {
      return this.$store.state.profile;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    deleteNote() {
      swal({
        title: "Are you sure?",
        text: "Click 'Ok' to confirm you wish to delete this Note.",
        icon: "error",
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