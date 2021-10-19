import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:4000/order'

  constructor(
    private http: HttpClient) { }

  getOrders() {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }
  updateStatus(id: number, state: number) {
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    const body = {
      status: state
    }

    return this.http.put(this.url + '/update-status/' + id, body, httpOptions)
  }
}
