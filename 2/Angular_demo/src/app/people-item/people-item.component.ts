import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'person-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.css']
})
export class PeopleItemComponent implements OnInit {

  @Input() person: any;
  @Output() delete = new EventEmitter()
  
  constructor(private router: Router) { 
    
  }

  age(a:number) {
    return 10
  }

  onDelete(evt:any,ind:string){
    evt["ind"] = ind
    console.log(evt);
    this.delete.emit(evt)
  }

  // ------------ ADD --------------------- //
  onEdit(evt:any,ind:string){
    this.router.navigate(['/edit', ind]);
  }

  getInstructor(person:{instructor:boolean}):boolean{
    return person.instructor
  }

  ngOnInit(): void {
    
  }

}
