import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users=[]
  constructor(
    private toastr:ToastrService,
    private service:UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(){
    this.service.getUsers()
    .subscribe(response =>{
      if(response['status']=='success'){
        this.users=response['data']
      }else{
        this.toastr.error(response['error'])
      }
    })
  }

  updateStatus(status,id){
    this.service.changeStatus(id,status)
    .subscribe(response =>{
      if(response['status']=='success'){
        this.loadUsers()
      }else{
        this.toastr.error(response['error'])
      }
    })
  }
}
