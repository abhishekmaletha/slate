
var stx=0;
var sty=0;
var group = new Group();
function onMouseDown(event) {
   
   stx=event.point.x;
   sty=event.point.y;
   console.log(stx," ",sty);
   
}

function onMouseDrag(event) {
    group.removeChildren()
    var rectangle = new Rectangle(new Point(stx, sty), new Point(event.point));
    var myPath = new Path.Rectangle(rectangle);
    myPath.fillColor = '#e9e9ff';
    group.addChild(myPath);
    // myPath.selected = true;
}
function onMouseUp(event) {

    var rectangle = new Rectangle(new Point(stx, sty), new Point(event.point));
    var path = new Path.Rectangle(rectangle);
    path.fillColor = '#e9e9ff';
    path.selected = true;
}
