npm install -g '@angular/cli'   -- @ means scoped package

ng new AngApp

cd AngApp

ng serve -o     // opens the server in a browser

go to index.html -- <app-root>

go to main.ts - we are importing app.module.ts

slide 26
open app.module.ts
bootstrap: [AppComponent] - start of the application or the root component
talk about declaration vs imports

slide 27
- browser module

slide 28
- the bootstrap, the start of the application

slide 29
go to app.component.ts
- @Component with inputs .... talk about dependency injection
- change title


slide 30
- take note of the selector

slide 31
- go to index.html

slide 32
back to app.component.ts
- 

slide 33
- talk about flat
- ng g component people-item
  - automatically added 
    CREATE src/app/person/person.component.css (0 bytes)
    CREATE src/app/person/person.component.html (21 bytes)
    CREATE src/app/person/person.component.spec.ts (626 bytes)
    CREATE src/app/person/person.component.ts (275 bytes)
    UPDATE src/app/app.module.ts (396 bytes)
- go to declarations in app.component.ts

slide 35

- 3 examples found in people-item

slide 36

- In person-component add { Input } in @angular/core

slide 39
- talk about event binding

  slide 40
- person.component.ts
 onDelete(){
    console.log("showing more details");
  }
   @Output() delete = new EventEmitter();   // ADD

   - add Output to imports


  - person.component.html add <button> tag (click)="onDelete($event)"

  slide 41
person.component.ts
- add Emitter 
app.component.html
- (delete)="onPersonDelete($event)"
  onPersonDelete(evt:any){
    console.log("parent component: someone just detailed");
    console.log(evt.person);
    // call the person delete function - write this later (hint: it's a service)
  }

slide 44
go to person.component.html
<span *ngIf="peopleInput.name === 'Bobby'"; then first else second>
</span>
<ng-template #first> ... </ng-template>
<ng-template #second> ... </ng-template>

slide 46 FOR
go to app.component.ts
- make array of people
go to app.comp.html
- <app-person *ngFor="let p of people" [personInput]="p" (delete)="..." >

slide 47 ngClass
go to person.component.html
- <p [ngClass]=" { 'instructor': personInput.instructor, 'bobby': personInput.name === 'bobby' } "
    - can even call function that returns true/false
- add css to person.comp.css

slide 48
ng g directive --skip-tests colors [appColors]
- take note of tag selector
go to person.comp.html
- <span appColors> 
- now its attached


go to person.comp.ts
- @HostBinding('class.instructor') isInstructor = true;
- @Input() set appInstructorSetter(value){
  this.instructor = value}
<span appFav [appInstructorSetter]="personInput.instructor">
  
- @HostBinding('class.background-color') bgcolor:string
-  i=0
   @HostListener('click') onMouseClick() {
    this.bgcolor = this.colors[this.i];
    this.i = ++this.i % this.colors.length
   }


slide 52
ng n pipe countPeople


forms

> ng g component --skip-tests person-add-form

- in app.modules
import { ReactiveFormsModule } from '@angular/forms';
add it to imports

in person-form.ts
import { FormGroup, FormControl } from '@angular/forms';

in peron-form html
<form 
[formGroup]="form"
(ngSubmit)="onSubmit(form.value)"
>
    
    <input name="name" type="text" placeholder="NAME" formControlName="name"> <br>
    Instructor <input name="instructor_checkbox" type="checkbox" formControlName="instructor"> <br>
    <button>SAVE</button>

</form>

- go to app-component
add <app-person-form></...>








slide 60 // ----------------- 2 way binding search ------------------ // 

APP.MODULE.TS

FormsModule and declare import

APP.COMPONENT.TS

query = ""


> ng g pipe search
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(people, searchString): any {
    return people.filter((p:any) => {
      return p.name.toLowerCase().includes(searchString.toLowerCase());
    })
  }

}




in APP.COMPONENT.HTML

  <input type="text" [(ngModel)]="query" > <br>
  {{ query }}
 
 ...
 
 
  <p>
    Number of people: {{ people | search:query | countPeople }}
  </p>

....

 *ngFor="let p of ( people | search )"
 

 
 


slide 61

PERSON-FORM.COMP.TS

import { FormGroup, FormControl, Validators } from '@angular/forms';


 name: new FormControl('',Validators.email) 
 - look at inspect (start typing something first)



PERSON-FORM.COMP.HTML

<button [disabled]="!form.valid">SAVE</button>

CSS
button:disabled {
	
}



PERSON-FORM.COMP.TS


name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        this.forbiddenNameValidator // <-- Here's how you pass in the custom validator.
      ]),

CSS

input.ng-invalid { 
    border: 2px solid red;
}


CUSTOM

PERSON-FORM.COMP.TS

  nameValidator(control: FormControl) {
    var valid_names = ['bobby','steve','jane'];
    if (valid_names.includes(control.value.trim())) {
      return null;
    }
    else {
      return { name_error: true }
    }
  }


replace

Validators.email, this.nameValidator



PERSON-FORM.COMP.HTML

    <input name="name" type="text" placeholder="NAME" formControlName="name"> 
      <span *ngIf="form.get('name').hasError('name_error')">NAME ERROR</span> 
      <br> 




change PERSON-FORM.COMP.TS 

return { name_error: valid_names }

HTML:
<span *ngIf="form.get('name').errors as name_errors"> Must be one of: {{ name_errors['name_error'] }}</span> 


SIDE NOTE:

passwordMatchValidator(form: FormGroup) {
   const password = form.controls['password'].value;
   const password_confirm = form.controls['password_confirm'].value;
   if (!password || !password_confirm) {
      return null;
   }
   return {mismatch: true};
}

{
       validators: [passwordMatchValidator]
}


formValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const ins = control.get('instructor');
    const valid_instructor_names = ['bobby','steve']
    return valid_instructor_names.includes(name.value.trim()) && ins.value || !ins.value ? null : { form_error: true };
  };




slide 64
 ng g service --skip-tests people

- people.service.ts 
talk about injectable

copy people array there

  people = [
    {
      name: "Bobby",
      added_on: (new Date()).getTime(),
      instructor: true
    },
    {
      name: "Steve",
      added_on: (new Date()).getTime(),
      instructor: false
    }
  ];
  
  
  app.component.ts
  keep
   people;
  add
   implements OnInit	
  
write get and delete

  get() {
    return this.people;
  }

  delete(person){
    // delete it from people
    return person;
  }
  
    add(person) {
    this.people.push(person);
  }


- go to app.component.ts
add the calls to the service
import { PeopleService } from './people.service';

people;

  constructor(private ps: PersonService){

  }

  ngOnInit() {
    this.people = this.ps.get();
  }
  
- go to personForm

import 
onSubmit(newPerson){

{


### ROUTING

ng g c --skip-tests person-edit-form

ng generate module routing --flat --module=app
--module=app : register it in the imports 

- In routing.module.ts

    const appRoutes:Routes = [
      { path: '', component: PeopleListComponent },
      { path: 'add', component: PersonAddFormComponent },
      { path: 'edit/:name', component: PersonEditFormComponent}
    ]

    @NgModule({
      declarations: [],
      imports: [
        RouterModule.forRoot(appRoutes)
      ],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }




- person-view file

    person;
    constructor(private ps: PersonService, private ActivatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
      let name = this.ActivatedRoute.snapshot.paramMap.get('name');
      // this.person = this.ps.getPerson(namee)
    }

- app-component
  </app-person>
  <div style="padding-bottom:2em;"><a routerLink="/add">ADD</a></div>
  
  <router-outlet></router-outlet>


- person-edit-form-component
import { ActivatedRoute } from '@angular/router';

    constructor(private ActivatedRoute: ActivatedRoute) { }

    this.name = this.ActivatedRoute.snapshot.paramMap.get('name');
    console.log(this.name);

    <p> {{ name }} </p>


- person-add-form
import { Router } from '@angular/router';

this.router.navigate(["/"])
































