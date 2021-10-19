import { BrandEditComponent } from './../brand-edit/brand-edit.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryAddComponent } from 'src/app/category/category-add/category-add.component';
import { CategoryEditComponent } from 'src/app/category/category-edit/category-edit.component';
import { BrandAddComponent } from '../brand-add/brand-add.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
brands =[]
  constructor(
    private modalservice:NgbModal,
    private toastr :ToastrService,
      private service :BrandService) { }
 
  ngOnInit(): void {
    this.loadBrands()
  }
loadBrands(){
  const observable=this.service.getBrands()
  observable.subscribe(response =>{
    if(response['status']=='success'){
      this.brands=response['data']
    }else{
      this.toastr.error(response['error'])
    }
  })
}


onAdd(){
  const modalref= this.modalservice.open(BrandAddComponent)
  modalref.result.finally( ()=>{
    this.loadBrands()
  })
 }

 onEdit(brand){
   const modalref= this.modalservice.open(BrandEditComponent)

   const component= modalref.componentInstance as BrandEditComponent
   component.title=brand.title
   component.description=brand.description
   component.id=brand.id

   modalref.result.finally( ()=>{
     this.loadBrands()
   })
 }

 onDelete(brand){
   const observable=this.service.deleteBrand(brand['id'])
   observable.subscribe(response =>{
     if(response['status']=='success'){
      this.loadBrands()
     }else{
       this.toastr.error(response['error'])
     }
   })
 }
}
