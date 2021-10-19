import { CategoryService } from './../category.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  title=''
  description =''
  constructor(
    private service:CategoryService,
    private modal :NgbActiveModal,
    private toastr :ToastrService
  ) { }

  ngOnInit(): void {
  }

  onAdd(){
    if(this.title.length==0){
      this.toastr.warning('Please enter title')
    }else if(this.description.length==0){
      this.toastr.warning('please enter description')
    }
    else{
      this.service.
      addCategory(this.title,this.description).
      subscribe(response =>{
        this.modal.dismiss('ok')
      })
    }
  }


  onCancel(){
  this.modal.dismiss('Cancel')
  }

}
