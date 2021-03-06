import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressAddComponent } from '../address-add/address-add.component';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses = []
  constructor(
    private toastr: ToastrService,
    private service: AddressService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadAddresses()
  }

  onAdd() {
    const modalRef = this.modalService.open(AddressAddComponent, {size: 'lg'})
    modalRef.result.finally(() => {
      this.loadAddresses()
    })
  }

  loadAddresses() {
    this.service
      .getAddresses()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.addresses = response['data']
        } else {
          this.toastr.error(response['error'])
        }
      }) 
  }
  
  onDelete(address) {
    this.service
      .deleteAddress(address.id)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.loadAddresses()
        } else {
          this.toastr.error(response['error'])
        }
      })
  }
}
