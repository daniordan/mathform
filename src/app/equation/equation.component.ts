import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    // apply the custom validator to the entire formGroup because we need all the properties a, b, answer (not just on a formControl)
    [MathValidators.addition('answer', 'a', 'b')]
  );

  constructor() {}

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  // This code snippet is written in TypeScript and it is an implementation of the ngOnInit() method, which is a lifecycle hook in Angular.

  // In this code, we are subscribing to the statusChanges observable of the mathForm object. Whenever the status of the form changes to 'VALID', the code inside the subscription block will be executed.

  // Inside the subscription block, we are calculating the time taken per solution by subtracting the start time from the current time and dividing it by the number of solutions solved. We then update the secondsPerSolution variable with this value.

  // We also generate new random numbers for the a and b form fields, and reset the answer field to an empty string using the mathForm.setValue() method.
  ngOnInit() {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(100),
        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
