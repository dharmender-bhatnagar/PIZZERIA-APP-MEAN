import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildurpizzaService {

  constructor(private http: HttpClient) { }

  getingredients(){
    return this.http.get("http://localhost:3000/fetchingredients");
  }

  postcustom(data:any)
  {
    const postdata = {data}
    return this.http.post("http://localhost:3000/cart/custom",postdata);
  }

}
