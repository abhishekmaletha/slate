<template>
  <div>
    <p>room id is rebels</p>
    <input
      v-model="user"
      type="text"
      name=""
      id="serInput"
      placeholder="name"
    />
    <input
      v-model="code"
      type="text"
      name=""
      id="roomCodeInput"
      placeholder="room code"
    />
    <p>{{ user }} will join {{ code }}</p>
    <router-link to="/master">
      <button @click="start">join</button></router-link
    >
  </div>
</template>

<script>
// import master from "../components/Master.vue";
// import io from "socket.io-client";
export default {
  name: "landing",
  components: {
    // master,
  },
  data: () => ({
    // socket: io.connect("http://localhost:4000"),
    code: "",
    user: "",
  }),
  methods: {
    start() {
      let username = this.user;
      let code = this.code;
      console.log("user: ", this.user, " code: ", this.code);
      this.$socket.emit("joinRoom", { user: username, room: code });
    },
  },
  mounted() {
    console.log("global ", this.$globalVariable);
  },
};
</script>

<style>
</style>