import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './admins/signin/signin.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandAddComponent } from './brand/brand-add/brand-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent,
    BrandListComponent,
    BrandAddComponent,
    UserListComponent,
    CategoryEditComponent,
    BrandEditComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
