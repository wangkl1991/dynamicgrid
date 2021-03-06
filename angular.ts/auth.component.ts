import { Component, OnInit } from '@angular/core';
import { Circle } from './Circle';
import { Line } from './Line'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  displayTab = 'singin';
  //KAILUN'S CODE 
  public width;
  public height;
  public canvas;
  public ctx;
  public HEIGHT;
  public WIDTH;
  circleArr = [];
  public POINT: number  = 35;
  

  constructor() {
    this.canvas = <HTMLCanvasElement> document.createElement('canvas');
    //this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = window.innerHeight;
    this.canvas.widht = window.innerWidth;
    this.HEIGHT = this.canvas.height;
    this.WIDTH = this.canvas.width;
    // document.body.appendChild(this.canvas);
   }


  ngOnInit() {
    this.init();
    this.animation();
    setTimeout(function() {
      debugger
      $('#authBody').append(this.canvas);
    }.bind(this), 5000);
    
  }


  ChangeDisplay(arg) {
    this.displayTab = arg;
  }

  animation(){
    setInterval(function () {
      for (var i = 0; i < this.POINT; i++) {
        var cir = this.circleArr[i];
        cir.x += cir.moveX;
        cir.y += cir.moveY;
        if (cir.x > this.WIDTH) cir.x = 0;
        else if (cir.x < 0) cir.x = this.WIDTH;
        if (cir.y > this.HEIGHT) cir.y = 0;
        else if (cir.y < 0) cir.y = this.HEIGHT;  
      }
        this.draw();
    }.bind(this), 16);
  }

  init(){
    for (var i= 0; i <this.POINT; i++){
      this.circleArr.push(this.drawCricle(this.ctx, this.num(this.WIDTH, 0), this.num(this.HEIGHT, 0), this.num(15,2), this.num(10, -10)/40, this.num(10, -10)/40));
    }
    this.draw();
    
  }

  num(max, _min){
    var min = arguments[1] || 0;
    return Math.floor(Math.random()*(max-min+1)+min);
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.POINT; i++) {
      this.createCricle(this.ctx, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i].r);
    }
    for (var i = 0; i < this.POINT; i++) {
      for (var j = 0; j < this.POINT; j++) {
        if (i + j < this.POINT) {
          var A = Math.abs(this.circleArr[i+j].x - this.circleArr[i].x),
            B = Math.abs(this.circleArr[i+j].y - this.circleArr[i].y);
          var lineLength = Math.sqrt(A*A + B*B);
          var C = 1/lineLength*7-0.009;
          var lineOpacity = C > 0.03 ? 0.03 : C;
          if (lineOpacity > 0) {
            this.drawLine(this.ctx, this.circleArr[i].x, this.circleArr[i].y, this.circleArr[i+j].x, this.circleArr[i+j].y, lineOpacity);
          }
        }
      }
    }
  }



drawCricle(ctx, x, y, r, moveX, moveY ){
  var circle = new Circle(x, y ,r, moveX, moveY)
  
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
  ctx.strokeStyle = '#0000ff',
  ctx.strokeWidth = 1,
  ctx.fillStyle = '#D4D4D4';
  ctx.closePath()
  ctx.fill()
  return circle;

}

createCricle(ctx, x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  ctx.closePath()
  ctx.fill();
}

drawLine (ctx, x, y, _x, _y, o ){
  var line = new Line (x, y, _x, _y, o)
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 0, 0, '+ o +')';
  ctx.moveTo(line.beginX, line.beginY);
  ctx.lineTo(line.closeX, line.closeY);
  ctx.closePath();
  ctx.stroke();

}
}