<template>
  <div>
    <!-- button toggles -->
    <div class="row mt-5">
      <div class="col-5" />
      <div class="col-2">
        <p>share this link to collab: {{ url }}</p>
        <button class="btn btn-primary btn-block" @click.prevent="reset">
          CLEAR
        </button>
        <button class="btn btn-primary btn-block" @click="freehand">
          free hand
        </button>
        <button class="btn btn-primary btn-block" @click="rectangle">
          Rectangle
        </button>
        <button class="btn btn-primary btn-block" @click="circle">
          Circle
        </button>
      </div>
      <div class="col-5" />
    </div>

    <!-- canvas single -->
    <div class="row mt-5">
      <div class="col-2" />
      <div class="col-8">
        <Canvas :canvas-id="'canvas-one'" ref="childCanvas" />
      </div>
      <div class="col-2" />
    </div>
  </div>
</template>

<script>
import Canvas from "../components/Canvas";
export default {
  name: "Master",
  data: () => ({
    buttons: ["Simple", "Separate", "Replicated"],
    single: true,
    url: "",
  }),
  methods: {
    reset() {
      this.$refs.childCanvas.reset();
    },
    rectangle() {
      this.$refs.childCanvas.rectangleMode();
    },
    freehand() {
      this.$refs.childCanvas.freeHandMode();
    },
    circle() {
      this.$refs.childCanvas.circleMode();
    },
  },
  components: {
    Canvas,
  },
  mounted() {
    // console.log(window.location.href);
  },
  created() {
    let idxId = ("" + window.location.href).indexOf("id=") + 3;
    let idxName = ("" + window.location.href).indexOf("name=") - 1;
    this.url =
      process.env.VUE_APP_SHARE +
      ("" + window.location.href).substring(idxId, idxName);
    let roomId = ("" + window.location.href).substring(idxId, idxName);
    let userName = ("" + window.location.href).substring(idxName + 6);
    this.$socket.emit("joinRoom", { user: userName, room: roomId });
    console.log(roomId, " ", userName);
    console.log('url : ', this.url);
  },
};
</script>

<style scoped>
</style>
