
var stx = 0;
var sty = 0;
var group = new Group();
function onMouseDown(event) {

    stx = event.point.x;
    sty = event.point.y;
    // console.log(stx," ",sty);

}

function onMouseDrag(event) {
    group.removeChildren()
    var myCircle = new Path.Circle(new Point(stx, sty), (stx - event.point.x));
    myCircle.strokeColor = 'black';
    group.addChild(myCircle);
    // myPath.selected = true;
}
function onMouseUp(event) {

    var myCircle = new Path.Circle(new Point(stx, sty), (stx - event.point.x));
    myCircle.strokeColor = 'black';
}
