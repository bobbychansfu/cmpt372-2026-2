import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonAddFormComponent } from './person-add-form/person-add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { PersonEditFormComponent } from './person-edit-form/person-edit-form.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: PeopleListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: PersonAddFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:name', component: PersonEditFormComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
