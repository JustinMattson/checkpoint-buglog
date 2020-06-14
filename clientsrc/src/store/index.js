import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    foundBug: {},
    notes: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    addBug(state, bug) {
      state.bugs.push(bug);
    },
    // FIXME updateBug is not forcing render of udpated data.
    // Is Closed status and Last Updated should update - why?
    updateBug(state, update) {
      let foundBug = state.bugs.find((b) => b.id == update.id);
      foundBug = update;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
    setNotes(state, notes) {
      Vue.set(state.notes, notes.bugId, notes.data);
    },
    addNote(state, note) {
      state.notes[note.bugId].push(note);
    },
    removeNote(state, note) {
      let index = state.notes[note.bug].findIndex((n) => n.id == note.id);
      state.notes[note.bug].splice(index, 1);
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },

    //#region BUGs
    async getBugList({ commit, dispatch }) {
      try {
        await api.get("bugs").then((res) => {
          commit("setBugs", res.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBug({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addBug({ commit, dispatch }, bugData) {
      try {
        await api.post("bugs", bugData).then((serverBoard) => {
          dispatch("getBugList");
        });
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit, dispatch }, update) {
      try {
        let id = update.id;
        let res = await api.put("bugs/" + id, update);
        commit("updateBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async closeBug({ commit, dispatch }, update) {
      try {
        let id = update.id;
        let user = update.email;
        let res = await api.delete("bugs/" + id, update);
        commit("updateBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region NOTES
    async getNotes({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id + "/notes");
        commit("setNotes", { bugId: id, data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async addNote({ commit, dispatch }, data) {
      try {
        let res = await api.post("notes", data);
        commit("addNote", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit, dispatch }, note) {
      try {
        let res = await api.delete("notes/" + note.id);
        commit("removeNote", note);
      } catch (error) {
        console.error(error);
      }
    },
    //#region

    //#region PROFLIE
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateProfile({ commit, dispatch }, dataObj) {
      try {
        let res = await api.put("profile/" + dataObj.id, dataObj);
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  },
});
