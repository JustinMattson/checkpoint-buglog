<template>
  <div class="bug container-fluid">
    <!-- This is the component that will draw each bug item.
    Embedded within this componet will be the notes component.-->
    <router-link :to="{ name: 'bug', params: { bugId: bug.id}}">
      <div class="row border border-info mx-1">
        <div class="col-3">{{bug.title}}</div>
        <div class="col-3 align-self-center">{{bug.creator.name}}</div>
        <div class="col-2 text-center align-self-center">{{bug.closed}}</div>
        <div class="col-4 text-right align-self-center">{{prettyDate}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Note from "@/components/NoteComponent.vue";
export default {
  name: "bug",
  props: ["bug"],
  data() {
    return {
      prettyDate: new Date(this.bug.updatedAt).toLocaleDateString("eu-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
  },
  computed: {
    // notes() {
    //   return this.$Store.state.notes[this.bug.id];
    // }
  },
  methods: {},
  components: {
    Note
  }
};
</script>


<style scoped>
</style>