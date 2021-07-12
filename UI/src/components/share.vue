<template>
  <div>
    <p>Slate</p>
    <input
      v-model="user"
      type="text"
      name=""
      id="serInput"
      placeholder="name"
      required
    />
    <!-- <input
      v-model="code"
      type="text"
      name=""
      id="roomCodeInput"
      placeholder="room code"
    /> -->
    <!-- <p>{{ user }} will join {{ code }}</p> -->
    <router-link :to="{ name: 'Master', query: { id: code, name: user } }">
      <!-- <button type="submit" @click="start">join</button> -->
      <button>start</button>
    </router-link>
  </div>
</template>

<script>
// import master from "../components/Master.vue";
// import io from "socket.io-client";
export default {
  name: "share",
  components: {
    // master,
  },
  data: () => ({
    // socket: io.connect("http://localhost:4000"),
    code: "",
    user: "",
  }),
  methods: {
    // start() {
    //   let username = this.user;
    //   let code = this.code;
    //   console.log("user: ", this.user, " code: ", this.code);
    //   this.$socket.emit("joinRoom", { user: username, room: code });
    // },
  },
  mounted() {
    let idx = ("" + window.location.href).indexOf("id=") + 3;
    this.code = ("" + window.location.href).substring(idx);
  },
};
</script>

<style>
</style>