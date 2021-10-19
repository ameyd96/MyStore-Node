import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url ='http://localhost:4000/user'
  constructor(private http:HttpClient) { }

  getUsers() {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  changeStatus(id: number, status: number) {
    
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      status: status
    }

    return this.http.put(this.url + "/change-status/" + id, body, httpOptions)
  }
}

