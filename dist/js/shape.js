//画矩形
let Rect = function(_opt){
    this.x = _opt.x;
    this.y = _opt.y;
    this.ex = _opt.ex;
    this.ey = _opt.ey;
    this.color = _opt.color || '#000';
    this.type = _opt.type || 'stroke';
    this.shape = 'rect';
}

Rect.prototype = {
    draw: function(_ctx){ 
        let type = 'stroke';
        let color = '#000'; 
        _ctx.save(); 
        _ctx[this.type + 'Style'] = this.color;
        _ctx.beginPath();
        _ctx.rect(this.x, this.y, this.ex-this.x, this.ey-this.y);
        _ctx.closePath();
        _ctx[type]();
        _ctx.restore();
    },
}


//画圆形
let Arc = function(_opt){
    this.x = _opt.x;
    this.y = _opt.y;
    this.ex = _opt.ex;
    this.ey = _opt.ey;
    this.color = _opt.color || '#000';
    this.type = _opt.type || 'stroke';
    this.shape = 'arc';
}

Arc.prototype = {
    draw: function(_ctx){

        let unit = Math.PI / 180;
        let r = count2PointDistance(this.x, this.y, this.ex, this.ey);
        _ctx.save();
        _ctx[this.type + 'Style'] = this.color;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, r, 0, 360);      //start * unit, end * unit
        _ctx.closePath();
        _ctx[this.type]();
        _ctx.restore();
        
    }
}


 /* 计算两点之间的距离 */
function count2PointDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}


//形状工厂
let Shape = function(_opt){
    let shapeObject;
    switch(_opt.shape){
        case 'rect':
            shapeObject = new Rect(_opt);
            break;
        case 'arc':
            shapeObject = new Arc(_opt);
            break;
    }
    return shapeObject;
}