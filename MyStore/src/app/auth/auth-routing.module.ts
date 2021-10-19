import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : 'signin', component :SigninComponent},
  {path : 'signup', component :SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
