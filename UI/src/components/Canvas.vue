<template>
  <div>
    <canvas
      :id="canvasId"
      class="canvas-style"
      v-on:mousedown="drawOwn"
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
    path_other: null,
    group_rectangle: null,
    mode: "freeHand",
    circle: null,
    center: null,
    radius: null,
    new_radius: null,
  }),
  methods: {
    rectangleMode() {
      console.log("rectangleOwn");
      this.mode = "rectangle";
    },
    freeHandMode() {
      console.log("free hand mode");
      this.mode = "freehand";
    },
    circleMode() {
      console.log("free hand mode");
      this.mode = "circle";
    },
    intiate() {
      console.log("hello");
      var canvas = document.getElementById(this.canvasId);
      // Create an empty project and a view for the canvas:
      paper.setup(canvas);
    },
    drawOwn() {
      if (!this.setCanvas) {
        this.intiate();
        this.setCanvas = true;
      }
      // Create a Paper.js Path to draw a line into it:
      var path = null;
      paper.view.draw();
      var tool = new paper.Tool();
      var start_x = 0;
      var start_y = 0;
      var group = new paper.Group();
      tool.onMouseDown = (event) => {
        console.log("msdown free hand");
        if (this.mode === "freehand") {
          path = new paper.Path();
          path.strokeColor = "black";
          path.add(event.point);
          console.log("data sent start");
          this.socket.emit("send", {
            point: event.point,
            name: "start",
            mode: "freehand",
          });
        } else if (this.mode === "rectangle") {
          start_x = event.point.x;
          start_y = event.point.y;
          this.socket.emit("send", {
            point: [start_x, start_y],
            name: "start",
            mode: "rectangle",
          });
        } else if (this.mode === "circle") {
          start_x = event.point.x;
          start_y = event.point.y;
          this.socket.emit("send", {
            point: [start_x, start_y],
            name: "start",
            mode: "circle",
          });
        }
      };

      tool.onMouseDrag = (event) => {
        if (this.mode === "freehand") {
          path.add(event.point);
          console.log("data sent continue");
          this.socket.emit("send", {
            point: event.point,
            name: "continue",
            mode: "freehand",
          });
        } else if (this.mode === "rectangle") {
          group.removeChildren();
          var rectangle = new paper.Rectangle(
            new Point(start_x, start_y),
            new Point(event.point)
          );
          var myPath = new paper.Path.Rectangle(rectangle);
          myPath.fillColor = "#e9e9ff";
          group.addChild(myPath);
          this.socket.emit("send", {
            point: event.point,
            name: "continue",
            mode: "rectangle",
          });
        } else if (this.mode === "circle") {
          group.removeChildren();
          var myCircle = new paper.Path.Circle(
            new Point(start_x, start_y),
            start_x - event.point.x
          );
          myCircle.strokeColor = "black";
          group.addChild(myCircle);
          this.socket.emit("send", {
            point: event.point,
            name: "continue",
            mode: "circle",
          });
        }
      };

      tool.onMouseUp = (event) => {
        if (this.mode === "freehand") {
          path.add(event.point);
          console.log("data sent finish");
          this.socket.emit("send", {
            point: event.point,
            name: "finish",
            mode: "freehand",
          });
        } else if (this.mode === "rectangle") {
          var rectangle = new paper.Rectangle(
            new Point(start_x, start_y),
            new Point(event.point)
          );
          var pathRect = new paper.Path.Rectangle(rectangle);
          pathRect.fillColor = "#e9e9ff";
          pathRect.selected = true;
          this.socket.emit("send", {
            point: event.point,
            name: "finish",
            mode: "rectangle",
          });
        } else if (this.mode === "circle") {
          var myCircle = new paper.Path.Circle(
            new Point(start_x, start_x),
            start_x - event.point.x
          );
          myCircle.strokeColor = "black";
        }
      };

      this.socket.on("draw", (data) => {
        this.drawOther(data);
      });
    },
    drawOther(data) {
      if (!this.setCanvas) {
        this.intiate();
        this.setCanvas = true;
      }
      if (data && data.mode === "freehand") {
        var x = data.point[1];
        var y = data.point[2];
        if (data.name === "start") {
          this.path_other = new paper.Path();
          this.path_other.strokeColor = "black";
          this.path_other.add(new Point(x, y));
        } else if (data.name === "continue") {
          this.path_other.add(new Point(x, y));
          console.log(`data recieving`, x, " ", y);
        } else if (data.name === "finish") {
          // this.path_other.add(new Point(x, y));
          this.path_other = null;
        }
        paper.view.draw();
      } else if (data && data.mode === "rectangle") {
        console.log("rectangle data recieved");
        if (data.name === "start") {
          (this.group_rectangle = new paper.Group()),
            (this.path_other = {
              start_x: data.point[0],
              start_y: data.point[1],
            });
          console.log("path_Other", this.path_other);
        } else if (data.name === "continue") {
          this.group_rectangle.removeChildren();
          var rectangle = new paper.Rectangle(
            new Point(this.path_other.start_x, this.path_other.start_y),
            new Point(data.point[1], data.point[2])
          );
          var myPath = new paper.Path.Rectangle(rectangle);
          myPath.fillColor = "#e9e9ff";
          this.group_rectangle.addChild(myPath);
        } else if (data.name === "finish") {
          this.path_other = null;
          this.group_rectangle = null;
        }
      }
    },
  },
  mounted() {
    this.intiate();
    this.drawOwn();
    this.drawOther();
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
