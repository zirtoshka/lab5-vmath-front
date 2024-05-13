import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {AppService} from "../../app.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Respon} from "../../response";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

import {max} from "rxjs";
import {Point} from "../../../Point";


@Component({
  selector: 'app-points',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})


export class PointsComponent {
  private appService = inject(AppService);


  @Output() choseEvent = new EventEmitter<Respon>();
  @Output() newPointEvent = new EventEmitter<Point>();


  pointsForm: FormGroup[] = [];
  readonly maxPoints = 12;
  readonly minPoints = 2;

  xValue :FormGroup;

  constructor(private fb: FormBuilder) {

    for (let i = 0; i < this.minPoints; i++) {
      this.addPoint();
    }
    this.xValue=fb.group({
      xValue: [0, [Validators.required, Validators.pattern('-?\\d+([\\.,]\\d+)?')]]
    })


  }

  addPoint() {
    if (this.pointsForm.length < this.maxPoints) {
      const pointFormGroup = this.fb.group({
        x: [0, [Validators.required, Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
        y: [0, [Validators.required, Validators.pattern('-?\\d+([\\.,]\\d+)?')]],

      });
      this.pointsForm.push(pointFormGroup);
      if (pointFormGroup.value.x != undefined && pointFormGroup.value.y != undefined) {
        // this.newPointEvent.emit([pointFormGroup.value.x, pointFormGroup.value.y]);
      }

    }
  }

  removePoint(index: number) {
    this.pointsForm.splice(index, 1);
  }

  checkPoints() {
    if (this.pointsForm.length > this.maxPoints || this.pointsForm.length < this.minPoints) return false;
    return this.pointsForm.every(pointForm => pointForm.valid);

  }

  sendPoints() {

    let x: number[] = [];
    let y: number[] = [];
    let interpolX=this.xValue.value.xValue;
    this.pointsForm.every(point => x.push(point.value.x));
    this.pointsForm.every(point => y.push(point.value.y));

    this.appService.interpolRequest({x, y, interpolX}).subscribe({
      next: (response) => {
        this.choseEvent.emit(response);
        this.newPointEvent.emit({x, y});

        this.appService.dataUser = this.appService.getStringRes(response);

      },
      error: (error) => {
        if (error.status === 400) {
          alert("я не могу посчитать( точки одинаковые");
          this.appService.dataUser = ["я не могу посчитать( точки одинаковые"];
        } else {
          console.error(error);
          this.appService.dataUser = error;
        }
      }
    })
  }

  protected readonly input = input;
  protected readonly isNaN = isNaN;
}
