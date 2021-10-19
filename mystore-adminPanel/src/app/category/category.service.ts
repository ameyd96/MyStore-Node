import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url ='http://localhost:4000/category'
  constructor(private http : HttpClient) { }
  getCategories() {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }
  addCategory(title: string, description: string) {

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

  editCategory(id:number,title: string, description: string) {

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
  deleteCategory(id:number) {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

   

    return this.http.delete(this.url + '/' + id, httpOptions)
  }

  
}
