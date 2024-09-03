import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/MyServices/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  cart:any
  totalPrice:any = 0

  constructor(private shoppingcart : ShoppingCartService)
  {
    this.getdata()
  }

  getdata()
  {
    this.shoppingcart.getShoppingCart().subscribe((res:any)=>{
      this.cart = res
      console.log('CART', this.cart);
      this.totalPrice = 0
      this.cart.forEach((i:any) => {
        this.totalPrice = this.totalPrice + Number(i.price)
      });
      console.log(this.totalPrice);
      
    })
  }


  incrementbtn(id:any)
  {
    this.totalPrice = 0
    this.shoppingcart.getIncrement(id).subscribe((res)=>{
      console.log(res)
      this.getdata()
    })
  }

  decrementbtn(id:any)
  {
    this.totalPrice=0
    this.shoppingcart.getDecrement(id).subscribe((res)=>{
      console.log(res)
      this.getdata()
    })
  }

  deletebtn(id:any)
  {
    this.shoppingcart.deleteAll(id).subscribe((res)=>{
      console.log(res)
      console.log(this.totalPrice)
      this.getdata()
    })
  }
  deletedetails()
  {
    alert("Order Placed Successfully.")
    this.shoppingcart.deletecart().subscribe((res)=>{
      console.log(res)
      this.getdata()
    })
  }

}
