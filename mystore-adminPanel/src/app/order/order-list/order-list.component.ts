import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = []

  constructor(
    private toastr: ToastrService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.orderService
      .getOrders()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.orders = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      })
  }

  onUpdateStatus(order, state) {
    this.orderService
      .updateStatus(order.id, state)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.toastr.success('Succesfully updated order state')
          this.loadOrders()
        } else {
          this.toastr.error(response['error'])
        }
    })
}

}
