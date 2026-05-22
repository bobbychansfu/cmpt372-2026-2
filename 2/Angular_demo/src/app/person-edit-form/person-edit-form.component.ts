import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // ---- add ---- //

@Component({
  selector: 'app-person-edit-form',
  templateUrl: './person-edit-form.component.html',
  styleUrls: ['./person-edit-form.component.css']
})
export class PersonEditFormComponent implements OnInit {

  name
  constructor(private ActivatedRoute: ActivatedRoute) { } // Add ------------//

  // ------------------- ADD --------------------------- //
  ngOnInit(): void {
    this.name = this.ActivatedRoute.snapshot.paramMap.get('name');
    console.log(this.name);
    // populate the form with this person
  }

}
