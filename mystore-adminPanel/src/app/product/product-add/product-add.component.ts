import { ProductService } from './../product.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  title=''
  description=''
  price=''
  category=1
  brand=1
  image=undefined


  categories=[]
  brands=[]
  
  constructor(
    private modal: NgbActiveModal,
    private productService:ProductService,
    private toastr :ToastrService,
    private categoryService :CategoryService,
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.loadBrands()
    this.loadCategories()
  }

  loadBrands(){
    const observable=this.brandService.getBrands()
    observable.subscribe(response =>{
      if(response['status']=='success'){
        this.brands=response['data']
      }else{
        this.toastr.error(response['error'])
      }
    })
  }

  loadCategories(){
    const observable=this.categoryService.getCategories()
    observable.subscribe(response =>{
      if(response['status']=='success'){
        this.categories=response['data']
      }else{
        this.toastr.error(response['error'])
      }
    })
  }

  onImageSelected(event){
    this.image=event.target.files[0]
  }


  onAdd() {
    if (this.title.length == 0) {
      this.toastr.warning('please enter title')
    } else if (this.price.length == 0) {
      this.toastr.warning('please enter price')
    } else if (this.description.length == 0) {
      this.toastr.warning('please enter description')
    } else if (this.image == undefined) {
      this.toastr.warning('please select an image')
    } else {
      this.productService
        .addProduct(this.title, this.description, this.price, this.category, this.brand, this.image)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.modal.dismiss('ok')
          } else {
            this.toastr.error(response['error'])
          }
        })
    }
  }

  onCancel() {
    this.modal.dismiss('cancel')
  }
}
