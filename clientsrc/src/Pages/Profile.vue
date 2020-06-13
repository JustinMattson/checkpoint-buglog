<template>
  <div class="profile text-center container">
    <!-- <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>-->
    <h1>
      Welcome
      <span :style="{color:color}">{{ profile.name }}</span>
    </h1>
    <img class="rounded-circle shadow" :src="profile.picture" @click="toggleEdit" />
    <p>
      {{ profile.email }}
      <br />
      <!-- Last Updated: {{prettyDate}}
      <br />-->
      <!-- <span class="text-danger" :style="{fontSize:fontSize}">{{profile.id}}</span> -->
    </p>
    <p class="text-muted">Click on profile image to edit user profile.</p>

    <form class="form" v-if="edit" style="width:100%;" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="name"
          v-model="profile.name"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="Name..."
          required
        />
        <input
          type="text"
          name="picture"
          v-model="profile.picture"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="ImgUrl..."
          required
        />
        <button type="submit" class="btn btn-warning my-2 shadow">Submit</button>
        <!-- <p class="text-warning">* Please refresh page after clicking submit.</p> -->
      </div>
    </form>
    <div id="profile-object" class="text-left text-muted" :style="{fontSize:fontSize}">
      <div>
        __v: {{profile.__v}}
        <br />
        _id: "{{profile.id}}"
        <br />
        createdAt: "{{profile.createdAt}}"
        <br />
        email: "{{profile.email}}"
        <br />
        id: "{{profile.id}}"
        <br />
        name: "{{profile.name}}"
        <br />
        picture: "{{profile.picture}}"
        <br />
        subs: {{profile.subs}}
        <br />
        updatedAt: {{profile.updatedAt}}"
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      fontSize: "10px",
      color: "#808"
      // prettyDate: new Date(this.profile.createdAt).toLocaleDateString("eu-US", {
      //   year: "numeric",
      //   month: "short",
      //   day: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit"
      // })
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", this.profile);
      this.edit = false;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    toggleMyBlogs() {
      this.myBlogs = !this.myBlogs;
    },
    toggleMyComments() {
      // NOTE may need to enable debugger here to get the button to function again.
      // debugger
      this.myComments = !this.myComments;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 150px;
  max-height: 150px;
}
</style>
