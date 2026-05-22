import { Component, OnInit } from '@angular/core';

// -------------- ADD --------------------- //
import { PeopleService } from '../people.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  people
  query = "";

  // -------- ADD -------------- //
  constructor(private ps: PeopleService, private authService: AuthService){

    // this.people = [
    //   {
    //     name: "Bobby",
    //     added_on: (new Date()).getTime(),
    //     instructor: true
    //   },
    //   {
    //     name: "Steve",
    //     added_on: (new Date()).getTime(),
    //     instructor: false
    //   },
    //   {
    //     name: "John",
    //     added_on: (new Date()).getTime(),
    //     instructor: true
    //   },
    //   {
    //     name: "Sara",
    //     added_on: (new Date()).getTime(),
    //     instructor: false
    //   }
    // ];
   }
  
   onPersonDelete(evt:{ind:string}){
    console.log(`parent component: person ${evt.ind} just deleted`);
   
    let per = evt.ind
    //this.people = this.people.filter(p => p.name !== per)
    
    this.people = this.ps.delete(per)
  }

  ngOnInit(): void {
    this.people = this.ps.get()
  }

  onLogout(): void {
    this.authService.logout();
  }

}
