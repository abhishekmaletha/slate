<template>
  <div>
    <p>Slate</p>
    <input
      v-model="user"
      type="text"
      name=""
      id="serInput"
      placeholder="name"
    />
    <!-- <input
      v-model="code"
      type="text"
      name=""
      id="roomCodeInput"
      placeholder="room code"
    /> -->
    <p>{{ user }} will join {{ code }}</p>
    <router-link :to="{ name: 'Master', query: { id: code, name: user } }">
      <!-- <button @click="start">join</button> -->
      <button>start</button>
    </router-link>
  </div>
</template>

<script>
// import master from "../components/Master.vue";
// import io from "socket.io-client";
var uniqid = require("uniqid");
export default {
  name: "landing",
  components: {
    // master,
  },
  data: () => ({
    // socket: io.connect("http://localhost:4000"),
    code: "maletha",
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
    this.code = uniqid();
  },
};
</script>

<style>
</style>