import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http : HttpClient) { }

  getShoppingCart()
  {
    return this.http.get("http://localhost:3000/getshoppingcart")
  }
  getIncrement(id:any)
  {
    return this.http.post(`http://localhost:3000/cart/incrementpizza/${id}`,{})
  }
  getDecrement(id:any)
  {
    return this.http.delete(`http://localhost:3000/cart/decrementpizza/${id}`,{})
  }

  deleteAll(id:any)
  {
    return this.http.delete(`http://localhost:3000/cart/deletepizza/${id}`,{})
  }
  deletecart()
  {
    return this.http.delete("http://localhost:3000/cart/deletecart",{})
  }

}
