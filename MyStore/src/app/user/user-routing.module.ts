import { ProfileComponent } from './profile/profile.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressAddComponent } from './address-add/address-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressEditComponent } from './address-edit/address-edit.component';

const routes: Routes = [
  {path :'address-add', component :AddressAddComponent},
  {path :'address-list', component :AddressListComponent},
  {path :'address-edit', component :AddressEditComponent},
  {path :'profile', component :ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
