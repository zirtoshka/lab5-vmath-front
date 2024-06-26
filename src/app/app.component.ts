import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PointsComponent} from "./comp/points/points.component";
import {GraphComponent} from "./comp/graph/graph.component";
import {AppService} from "./app.service";
import {NgForOf} from "@angular/common";
import {FilikComponent} from "./comp/filik/filik.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PointsComponent, GraphComponent, NgForOf, FilikComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab5-vmath-front';
  constructor(public appService:AppService) {
  }
}
