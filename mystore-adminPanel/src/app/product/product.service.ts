


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private url = 'http://localhost:4000/product';
  constructor(private http: HttpClient) {
  }
  getProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    };

    return this.http.get(this.url, httpOptions);
  }
  addProduct(title:string,description:string,price:string,category:number,brand:number,image:any){
    const body=new FormData()

    body.append("title",title)
    body.append("description", description)
    body.append("price", price)
    body.append("categoryId", '' + category)
    body.append("brandId", '' + brand)
    body.append("photo", image)

    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }
    return this.http.post(this.url,body,httpOptions)
  }
}
