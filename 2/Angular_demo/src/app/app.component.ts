import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PeopleApp';
  author = 'Bobby Chan'

  getCopyrightString() {
    return `Copyright &#169; ${this.author}`
  }
}
