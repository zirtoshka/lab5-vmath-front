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
  maxBoard!: number[];


  ngOnInit() {
    this.board = this.boardInit([-5, 5, 5, -5]);
  }


  interpolationDraw(resp: Respon) {
    let ind = resp.grafiki;
    this.maxBoard = this.maxBoardAbs(ind[0], ind[1]);
    this.cleanBoard();
    this.board = this.boardInit(this.maxBoard);

    this.lines.push(this.board.create('curve', [ind[0], ind[1]], {
      dash: 2, strokeColor: 'black', strokeWidth: 5
    }));

    this.lines.push(this.board.create('curve', [ind[0], ind[2]], {
      dash: 2, strokeColor: 'yellow', strokeWidth: 2
    }));

    // for (let i = 0; i < ind[0].length; i++) {
    //   this.lines.push(this.board.create('point', [ind[0][i], ind[1][i]], {
    //     name: '', fixed: true, color: "green", fillOpacity: 1, visible: true,
    //     strokewidth: 1, size:5
    //   }));
    //
    // }
    // for (let i = 0; i < ind[0].length; i++) {
    //
    //   this.lines.push(this.board.create('point', [ind[0][i], ind[2][i]], {
    //     name: '', fixed: true, color: "yellow", fillOpacity: 1, visible: true,
    //     strokewidth: 1, size:2
    //   }));
    //
    // }

  }

  pointDraw(xy: number[]) {
    this.lines.push(this.board.create('point', [xy[0], xy[1]], {
      name: '', fixed: true, color: "green", fillOpacity: 1, visible: true,
      strokewidth: 1
    }));
  }

  allPointsDraw(point: Point) {

    let n = point.x.length;
    for (let i = 0; i < n; i++) {
      this.pointDraw([point.x[i], point.y[i]]);
    }

  }


  cleanBoard() {
    for (const object of this.lines) {
      this.board.removeObject(object);
    }
  }

  boardInit(boardData: number[]) {
    // -5, 5, 5, -5
    return JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [boardData[0], boardData[1], boardData[2], boardData[3]],
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


  maxBoardAbs(arr1: number[], arr2: number[]): number[] {

    let a = Math.floor(Math.min(...arr1.map(Math.abs)))-0.1;
    let b = Math.ceil(Math.max(...arr2.map(Math.abs)))+0.1;
    let c = Math.ceil(Math.max(...arr1.map(Math.abs)))+0.1;
    let d = Math.floor(Math.min(...arr2.map(Math.abs)))-0.1;
    if (a > -0.8) {
      a = -0.8;
    }
    if (c < 0.8) {
      c = 0.8;
    }
    if (b < 0.8) {
      b = 0.8;
    }
    if (d >= 0) {
      d = -0.8;
    }


    return [a, b, c, d];
  }
}
