<template>
    <div>
        <canvas :id="canvasId" class="canvas-style" v-on:mousedown="freeHand" resize/>
    </div>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
    const paper = require('paper');
    import io from "socket.io-client";
    export default {
        name: "Canvas",
        props: ['canvasId'],
        data: () => ({
            socket: io.connect("http://localhost:4000"),
            setCanvas: false
        }),
        methods: {
            intiate () {
                console.log('hello');
                var canvas = document.getElementById(this.canvasId);
                // Create an empty project and a view for the canvas:
                paper.setup(canvas);
            },
            freeHand () {
                if (!this.setCanvas) {
                    this.intiate();
                    this.setCanvas = true;
                }
                // Create a Paper.js Path to draw a line into it:
                var path = new paper.Path();
                // Give the stroke a color
                path.strokeColor = 'black';
                // Draw the view now:
                paper.view.draw();
                // Create a simple drawing tool:
		        // var tool = new paper.Tool();
                var tool = new paper.Tool();
		
                tool.onMouseDown = (event) => {
                    console.log('points ', event.point);
			        path = new paper.Path();
			        path.strokeColor = 'black';
			        path.add(event.point);
		        }

		        tool.onMouseDrag = (event) => {
                    console.log('points ', event.point);
			        path.add(event.point);
		        }

                tool.onMouseUp = (event) => {
                    console.log('points ', event.point);
                    path.add(event.point);
                }
            },
        },
        mounted() {
            // this.intiate();
            this.freeHand();
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
