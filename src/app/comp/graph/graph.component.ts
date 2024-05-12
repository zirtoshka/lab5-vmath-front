import {Component} from '@angular/core';
import * as JXG from 'jsxgraph';
import {GeometryElement} from "jsxgraph";
import {Point} from "../../../Point";
import {Respon} from "../../response";

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})

export class GraphComponent {
  board!: JXG.Board;
  lines: GeometryElement[] = [];
  maxBoard!:number;


  ngOnInit() {
    this.board = this.boardInit(5);
  }

  linearApproxDraw(ab: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return ab[0]*x+ab[1];
    }, left, right], {
      strokeColor: '#ff0000',
      strokeWidth: 2// Красный цвет для линии графика
    }));
  }
  squareApproxDraw(abc: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return abc[0]+abc[1]*x+abc[2]*x*x;
    }, left, right], {
      strokeColor: '#ff9100',
      strokeWidth: 2
    }));
  }

  thirdApproxDraw(ind: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return ind[0]+ind[1]*x+ind[2]*x*x+ind[3]*Math.pow(x,3);
    }, left, right], {
      strokeColor: '#f7ff00',
      strokeWidth: 2
    }));
  }

  powerApproxDraw(ind: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return ind[0]*Math.pow(x,ind[1]);
    }, left, right], {
      strokeColor: '#00ff3c',
      strokeWidth: 2
    }));
  }

  exponentApproxDraw(ind: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return ind[0]*Math.exp(x*ind[1]);
    }, left, right], {
      strokeColor: '#0015ff',
      strokeWidth: 2
    }));
  }

  logarithmicApproxDraw(ind: number[], left:number, right:number){
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return ind[0]*Math.log(x)+ind[1];
    }, left, right], {
      strokeColor: '#8c00ff',
      strokeWidth: 2
    }));
  }

  pointDraw(xy: number[]){
        this.lines.push(this.board.create('point', [xy[0], xy[1]], {
          name: '', fixed: true, color: "red", fillOpacity: 1, visible: true,
          strokewidth: 1
        }));
  }
  allPointsDraw(point: Point){


    this.maxBoard = this.maxBoardAbs(point.x,point.y);
    this.cleanBoard();
    this.board = this.boardInit(this.maxBoard+3);

    let n=point.x.length;
    for (let i = 0; i < n ; i++) {
      this.pointDraw([point.x[i],point.y[i]]);
    }

  }
  approxDraw(resp: Respon){
    // this.linearApproxDraw(resp.linear,-this.maxBoard-4,this.maxBoard+4);
    // this.squareApproxDraw(resp.square,-this.maxBoard-4,this.maxBoard+4);
    // this.thirdApproxDraw(resp.third,-this.maxBoard-4,this.maxBoard+4);
    // this.powerApproxDraw(resp.power,-this.maxBoard-4,this.maxBoard+4);
    // this.exponentApproxDraw(resp.exponent,-this.maxBoard-4,this.maxBoard+4);
    this.logarithmicApproxDraw([1,2],-this.maxBoard-4,this.maxBoard+4);


  }

  cleanBoard(){
    for (const object of this.lines) {
      this.board.removeObject(object);
    }
  }

  boardInit(a:number) {
    // -5, 5, 5, -5
    return JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-a, a, a, -a],
      grid: true,
      showCopyright: false,
      axis: true,
      defaultAxes: {
        x: {
          ticks: {
            drawZero: true,
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          name: 'X',
          withLabel: true,
          color: 'black',
          label: {
            position: 'rt',
            offset: [7, 10],
            anchorX: 'right',
            color: 'black'
          }
        },
        y: {
          ticks: {
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          color: 'black',
          withLabel: true,
          name: 'Y',
          label: {
            position: 'rt',
            offset: [-15, 10],
            anchorY: 'top',
            color: "black",

          }
        }
      },
      description: 'super-puper graph',


    });
  }


  maxBoardAbs(arr1:number[], arr2:number[]):number{
    console.log(2)
    const maxAbsValue = Math.max(
        Math.max(...arr1.map(Math.abs)),
        Math.max(...arr2.map(Math.abs))
    );
    console.log(3)
    return maxAbsValue;
  }
}
