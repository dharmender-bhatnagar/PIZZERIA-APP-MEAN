import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderPizzaService {

  constructor(private http: HttpClient) { }

  getPizzas()
  {
    return this.http.get("http://localhost:3000/fetchpizza")
  }
  postpizzas(data:any)
  {
    const postdata = {data}
    return this.http.post("http://localhost:3000/cart/addpizza",postdata,{responseType:'text'})
  }
}
