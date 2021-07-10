<template>
  <div>
    <canvas
      :id="canvasId"
      class="canvas-style"
      v-on:mousedown="freeHandOwn"
      resize
    />
  </div>
</template>

<script>
// TODO: move all of this logic to master
// packages
const paper = require("paper");
import io from "socket.io-client";
import { Point } from "paper/dist/paper-core";
export default {
  name: "Canvas",
  props: ["canvasId"],
  data: () => ({
    socket: io.connect("http://localhost:4000"),
    setCanvas: false,
    patha: null,
  }),
  methods: {
    intiate() {
      console.log("hello");
      var canvas = document.getElementById(this.canvasId);
      // Create an empty project and a view for the canvas:
      paper.setup(canvas);
    },
    freeHandOwn() {
      if (!this.setCanvas) {
        this.intiate();
        this.setCanvas = true;
      }
      // Create a Paper.js Path to draw a line into it:
      var path = null;
      paper.view.draw();
      var tool = new paper.Tool();

      tool.onMouseDown = (event) => {
        // console.log('points ', event.point);
        // path = new paper.Path();
        path = new paper.Path();
        path.strokeColor = "black";
        path.add(event.point);
        console.log("data sent start");
        this.socket.emit("send", {
          point: event.point,
          name: "start",
          id: "maletha",
        });
      };

      tool.onMouseDrag = (event) => {
        // console.log('points ', event.point);
        path.add(event.point);
        console.log("data sent continue");
        this.socket.emit("send", {
          point: event.point,
          name: "continue",
          id: "maletha",
        });
      };

      tool.onMouseUp = (event) => {
        // console.log('points ', event.point);
        path.add(event.point);
        console.log("data sent finish");
        this.socket.emit("send", {
          point: event.point,
          name: "finish",
          id: "maletha",
        });
      };

      this.socket.on("draw", (data) => {
        this.freeHandOther(data);
      });
    },
    freeHandOther(data) {
      if (!this.setCanvas) {
        this.intiate();
        this.setCanvas = true;
      }
      if (data) {
        var x = data.point[1];
        var y = data.point[2];
        if (data.name === "start") {
          this.patha = new paper.Path();
          this.patha.strokeColor = "black";
          this.patha.add(new Point(x, y));
        } else if (data.name === "continue") {
          this.patha.add(new Point(x, y));
          console.log(`data recieving`, x, " ", y);
        } else if (data.name === "finish") {
          // this.patha.add(new Point(x, y));
          this.patha = null;
        }
        paper.view.draw();
      }
    },
  },
  mounted() {
    // this.intiate();
    this.freeHandOwn();
    this.freeHandOther();
    // this.patha = new paper.Path();
    // this.patha.strokeColor = 'black';
  },
};
</script>

<style scoped>
.canvas-style {
  cursor: crosshair;
  width: 100% !important;
  height: 500px !important;
  border: 5px solid black;
  border-radius: 10px;
  display: block;
  margin: auto;
  box-shadow: 0 10px 8px -8px black;
}
</style>
