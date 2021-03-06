import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
 { path: 'home',
    component: HomeComponent,
    children:[
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    ],
    canActivate:[AuthService]
  },
    

    {path:'auth',loadChildren:()=>import('./auth/auth.module').then (m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
