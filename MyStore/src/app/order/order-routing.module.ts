import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path :'history' ,component: OrderHistoryComponent},
  {path :'preview' ,component: OrderPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
