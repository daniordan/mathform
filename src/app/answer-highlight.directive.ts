import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  // use dependency injection to reference (and bind the directive to the component elements / properties) the 'input' element and the FormControl 'answer' property
  // NgControl = A base class that all FormControl-based directives extend. It binds a FormControl object to a DOM element.
  constructor(private el: ElementRef, private controlName: NgControl) {}

  ngOnInit() {
    // use this this.controlName?.control?.parent?.valueChanges syntax to access the parent FormGroup starting from FormControl
    // use RxJs pipe with valueChanges Observable (to watch for values that are changing in our 'answer' form) to emit events and then subscribe the Observer (the value resulted from the pipe processing)
    this.controlName?.control?.parent?.valueChanges
      // The syntax { a, b, answer } is called object destructuring in JavaScript/TypeScript. It allows you to extract specific properties from an object and assign them to variables with the same name. (e.g. of valueChanges object: {a: 8, b: 9, answer: "17"})
      // In this line of code, it is extracting the a, b, and answer properties from an object received in the valueChanges stream. These properties will then be used in the calculation inside the map operator.
      .pipe(map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))))
      // alternative with filter operator instead of map operator: filter (value => value < 0.2)
      .subscribe((value) => {
        // console.log(value);
        if (value < 0.2) {
          // add new class to the DOM element
          this.el.nativeElement.classList.add('close');
        } else {
          //  remove new class in case condition false
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
