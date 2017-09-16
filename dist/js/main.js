
var canvas = document.getElementById('palette');
var ctx = canvas.getContext('2d');

var canvas_back =  document.getElementById("palette_back");
var ctx_back = canvas_back.getContext('2d');

let globalArr = [];
let c_shape = '';
let drawingObject = new Object();
let drawing = false;
let draggingObject = new Object();
//鼠标事件
canvas.onmousedown = function(devent){
    var dx = devent.offsetX;
    var dy = devent.offsetY;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(c_shape == ''){
        for(let i=0; i<globalArr.length;i++){
            //globalArr[i].color = 'rgba(0,0,0,0)'
            globalArr[i].draw(ctx_back);
            if(ctx_back.isPointInPath(dx,dy)){
                draggingObject = {
                    index: i,
                    px: dx,
                    py: dy
                };
            }
            
        }
    }else{
        drawing = true;
        let color = document.getElementById('color').value
        drawingObject = new Shape({x:dx, y:dy, color: color, type:'stroke',shape: c_shape});
    }
    

};

canvas.onmousemove = function(mevent){
    var mx = mevent.offsetX;
    var my = mevent.offsetY;
    if(drawing){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    if(JSON.stringify(drawingObject)!="{}"){
        drawingObject.ex = mx;
        drawingObject.ey = my;
        drawingObject.draw(ctx);
    }
    if(JSON.stringify(draggingObject)!="{}"){
        let draggingIndex = draggingObject.index;
        let offsetX = mx - draggingObject.px,
            offsetY = my - draggingObject.py;
        globalArr[draggingIndex].x =  offsetX + globalArr[draggingIndex].x;
        globalArr[draggingIndex].y =  offsetY+ globalArr[draggingIndex].y;
        globalArr[draggingIndex].ex = offsetX + globalArr[draggingIndex].ex;
        globalArr[draggingIndex].ey = offsetY + globalArr[draggingIndex].ey;
        draggingObject.px = mx;
        draggingObject.py = my;
        ctx_back.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<globalArr.length;i++){
            globalArr[i].draw(ctx_back);
        }
    }
}
canvas.onmouseup = function(uevent){
    var ux = uevent.offsetX;
    var uy = uevent.offsetY;
    drawing = false;
    draggingObject = new Object();
    if(JSON.stringify(drawingObject)!="{}"){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawingObject.draw(ctx_back);
        globalArr.push(drawingObject);
        drawingObject = new Object();
        console.log(globalArr)
    }
}

// 页面操作
function toChoseF(){
    c_shape = '';
}
function addRectF(){
    c_shape = 'rect';
}
function addArcF(){
    c_shape = 'arc';
}

