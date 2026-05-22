import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
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
    },
    {
      name: "John",
      added_on: (new Date()).getTime(),
      instructor: true
    },
    {
      name: "Sara",
      added_on: (new Date()).getTime(),
      instructor: false
    }
  ];
  peopleTest


  constructor() { }

  get() {
    return this.people;
  }

  add(person) {
    person.added_on = (new Date()).getTime();
    this.people.push(person);
    
    console.log(this.people);
    // uh oh!!!
  }

  delete(del_person){
    // delete it from people

    this.people = this.people.filter(p => p.name !== del_person)
    //console.log(this.people)
    return this.people;
  }
}
