import { CategoryEditComponent } from './../category-edit/category-edit.component';
import { CategoryAddComponent } from './../category-add/category-add.component';
import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { title } from 'process';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories=[]
  constructor(
    private modalservice:NgbModal,
    private service :CategoryService,
    private toastr : ToastrService
  ) { }

  
  ngOnInit(): void {
    this.loadCategories()
  }
loadCategories(){
  const observable=this.service.getCategories()
  observable.subscribe(response =>{
    if(response['status']=='success'){
      this.categories=response['data']
    }else{
      this.toastr.error(response['error'])
    }
  })
}

  onAdd(){
   const modalref= this.modalservice.open(CategoryAddComponent)
   modalref.result.finally( ()=>{
     this.loadCategories()
   })
  }

  onEdit(category){
    const modalref= this.modalservice.open(CategoryEditComponent)

    const component= modalref.componentInstance as CategoryEditComponent
    component.title=category.title
    component.description=category.description
    component.id=category.id

    modalref.result.finally( ()=>{
      this.loadCategories()
    })
  }

  onDelete(category){
    const observable=this.service.deleteCategory(category['id'])
    observable.subscribe(response =>{
      if(response['status']=='success'){
       this.loadCategories()
      }else{
        this.toastr.error(response['error'])
      }
    })
  }
}
