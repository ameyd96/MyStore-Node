import { ProductInfoComponent } from './product-info/product-info.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path :'cart', component: CartComponent},
  {path :'gallery', component: GalleryComponent},
  { path: 'product-info', component: ProductInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
