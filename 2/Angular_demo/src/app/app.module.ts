import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PeopleItemComponent } from './people-item/people-item.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { FavDirective } from './fav.directive';
import { ColorsDirective } from './colors.directive';
import { CountPeoplePipe } from './count-people.pipe';
import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { SearchPipe } from './search.pipe';
import { RoutingModule } from './routing.module';
import { PersonEditFormComponent } from './person-edit-form/person-edit-form.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [ // to make it available to other components in the application.
    AppComponent,
    PeopleItemComponent,
    PeopleListComponent,
    FavDirective,
    ColorsDirective,
    CountPeoplePipe,
    PersonAddFormComponent,
    SearchPipe,
    PersonEditFormComponent,
    LoginComponent
  ],
  imports: [ // modules imported from other exported locations
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
