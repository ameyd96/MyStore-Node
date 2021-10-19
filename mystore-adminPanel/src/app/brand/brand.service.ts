import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url ='http://localhost:4000/brand'
  constructor(private http : HttpClient) { }
  getBrands() {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  addBrand(title: string, description: string) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      title: title,
      description: description
    }

    return this.http.post(this.url, body, httpOptions)
  }

  editBrand(id:number,title: string, description: string) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      title: title,
      description: description
      
    }

    return this.http.put(this.url + "/" +id, body, httpOptions)
  }
  deleteBrand(id:number) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

   

    return this.http.delete(this.url + '/' + id, httpOptions)
  }

}
