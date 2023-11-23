import { AbstractControl } from '@angular/forms';

// This code defines a static method called addition that takes three string parameters: target, sourceOne, and sourceTwo. It returns a validator function that can be used in Angular Reactive Forms.

// The validator function checks if the sum of two input values (firstNumber and secondNumber) is equal to the value of a third input (sum). If the sum is correct, it returns null (indicating no validation errors). Otherwise, it returns an object with a property addition set to true (indicating a validation error).

// The code snippet defines a static method called addition in the MathValidators class. This method is used to create a custom validator function for Angular Reactive Forms.

// The addition method takes three string parameters: target, sourceOne, and sourceTwo. These parameters represent the names of form control fields that are used in the validation.

// The method returns a validator function that takes an AbstractControl parameter, which represents the form control being validated. This function is executed whenever the form control value changes.

// Inside the validator function, the values of the form controls specified by target, sourceOne, and sourceTwo are extracted using the form.value property.

// The validator function then checks if the sum of firstNumber and secondNumber is equal to the integer value of sum. If the sum is correct, meaning the addition is valid, the function returns null, indicating that there are no validation errors.

// However, if the sum is not correct, indicating an invalid addition, the function returns an object with a property addition set to true. This indicates a validation error, and Angular will apply the appropriate error handling logic.

// In summary, this code snippet creates a custom validator function that validates the correctness of an addition operation based on the values of specified form controls.

// A static method is a method that belongs to a class rather than an instance of the class. It can be accessed directly on the class itself, without the need to create an instance of the class.

// Static methods are defined using the static keyword in the method declaration. They are typically used for utility functions or operations that are related to the class as a whole, rather than specific instances of the class.

// Since static methods are not tied to any particular instance of the class, they cannot access instance-level properties or methods. They can only access other static members of the class (instead of creating an instance with new Keyword we use static keyword and then we can call the static method just like this: MathValidators.addition('answer', 'a', 'b')

// In the code snippet you provided, the addition method is a static method of the MathValidators class. It can be called directly on the class itself, without the need to create an instance of the MathValidators class.

export class MathValidators {
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];

      if (firstNumber + secondNumber === parseInt(sum)) {
        return null;
      }

      return { addition: true };
    };
  }
}
