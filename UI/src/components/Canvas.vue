<template>
    <div>
        <canvas :id="canvasId" class="canvas-style" v-on:mousedown="draw"
        />
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
            path: null,
            scope: null,
            socket: io.connect("http://localhost:4000"),
            isDrawing: false,
            sessionId: null
        }),
        methods: {
            reset() {
                console.log('reset');
                this.scope.project.activeLayer.removeChildren();
            },
            pathCreate(scope) {
                console.log('path created');
                scope.activate();
                return new paper.Path({
                    strokeColor: "#000000",
                    strokeJoin: 'round',
                    strokeWidth: 1.5
                })
            },
            createTool(scope) {
                console.log('create tool');
                scope.activate();
                return new paper.Tool();
            },
            draw() {
                console.log('obj ',this.socket,' session id ', this.socket.id);
                // var canvas = document.getElementById(`${this.canvasId}`);
                // console.log('inside draw()');
                // in order to access functions in nested tool
                let self = this;

                // create drawing tool
                this.tool = this.createTool(this.scope);

                this.tool.onMouseDown = (event) => {
                    // init path
                    self.path = self.pathCreate(self.scope);
                    // add point to path
                    self.path.add(event.point);
                    this.socket.emit("send", {point:event.point, name:'start'});
                    console.log('data sent started');
                };

                this.tool.onMouseDrag = (event) => {
                    self.path.add(event);
                    this.socket.emit("send", {point:event.point, name:'continue'});
                    console.log('data sent continue', event.point);
                };
                
                this.tool.onMouseUp = (event) => {
                    self.path.add(event.point);
                    this.socket.emit("send", {point:event.point, name:'finish'});
                    console.log('data sent finish');
                }
                this.socket.on('draw',data => {
                    this.drawOther(data);
                });
            },

            drawOther(data) {
                let self = this;
                if(data.name === 'start') {
                this.tool = this.createTool(this.scope);
                }

                if(data.name === 'start') {
                    // init path
                    self.path = self.pathCreate(self.scope);
                    // add point to path
                    self.path.add(data.point);
                    console.log('data recived start');
                } else if(data.name === 'continue') {
                    self.path.add(data.point);
                    console.log('data recived continue');
                } else if(data.name === 'finish') {
                    self.path.add(data.point);
                    console.log('data recived finish');
                }
            },
        },
        mounted() {
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasId);
            this.draw();
            this.sessionId = this.socket.id;
            // console.log('seesion id ', this.sessionId);
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
