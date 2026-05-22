import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Router } from '@angular/router'; // ------- ADD ---------- //

@Component({
  selector: 'app-person-add-form',
  templateUrl: './person-add-form.component.html',
  styleUrls: ['./person-add-form.component.css']
})
export class PersonAddFormComponent implements OnInit {

  form: FormGroup

  constructor(private ps: PeopleService, private router: Router) { 
    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        this.forbiddenNameValidator // <-- Here's how you pass in the custom validator.
      ]),
      instructor: new FormControl(false)
    }

    this.form = new FormGroup(formControls, {validators: [this.formValidator]})
  }

  // if null then pass
  forbiddenNameValidator(control: FormControl) {
    var invalid_names = ['stupid','freaking','hell','ohmygod', 'idiot'];
    if (invalid_names.includes(control.value.trim())) {
      return { name_error: "Your name cannot be " + control.value.trim() }
    }
    else {
      return null
    }
  }

  // return null if valid
  formValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const ins = control.get('instructor');
    const valid_instructor_names = ['bobby','steve']
    return valid_instructor_names.includes(name.value.trim()) && ins.value || !ins.value ? null : { form_error: true };
  };

  ngOnInit(): void {
  }

  onSubmit(newPerson){
    console.log(newPerson);
    // add it to the list of people
    this.ps.add(newPerson)

    // ----------------- ADD ------------------- //
    this.router.navigate(["/"]) // more path ("/","add","people")
  }

}
