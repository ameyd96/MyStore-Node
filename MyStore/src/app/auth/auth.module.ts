import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
 import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    SigninComponent, 
    SignupComponent],
  
  imports: [
    
    AuthRoutingModule,
   HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [ AuthService ]
})
export class AuthModule { }
