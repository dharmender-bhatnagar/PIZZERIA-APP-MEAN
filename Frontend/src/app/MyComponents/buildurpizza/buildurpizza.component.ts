// import { Component } from '@angular/core';
// import { BuildurpizzaService } from 'src/app/MyServices/buildurpizza.service';

// @Component({
//   selector: 'app-buildurpizza',
//   templateUrl: './buildurpizza.component.html',
//   styleUrls: ['./buildurpizza.component.css']
// })
// export class BuildurpizzaComponent {
//   restext:any
//   constructor(private buildurpizzaservice :BuildurpizzaService){
//     this.buildurpizzaservice.getingredients().subscribe((res:any)=>{
//       this.restext = res
//     })
//   }
//   selectIngredients:String[] = []
//   customPrice:any=0
//   veg:any
//   a: any
//   uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

//   checkingredients(checked:any,price:any)
//   {
   
//    // console.log(this.veg)
//     if(this.selectIngredients.includes(checked)){
//       this.selectIngredients = this.selectIngredients.filter(item=>item !== checked)
//       this.customPrice = this.customPrice-price
//     }
//     else{
//       this.selectIngredients.push(checked)
//       //console.log(this.selectIngredients)
//       this.customPrice = this.customPrice+price
//       //console.log(this.customPrice)
//     }
//     this.a = document.getElementById("price")
//     this.a.innerHTML = "Total Cost : &#8377;" + this.customPrice
//   }


//   custombtn()
//   {
//     this.veg="veg"
//     if(this.selectIngredients.includes("Chicken"))
//     {
//       this.veg = "nonveg"
//     }
//     // console.log(this.veg)
//     const data = {
//       "id": `${this.uniqueId}`,
//       "name":"Custom Pizza",
//       "price": this.customPrice,
//       "type":this.veg,
//       "image": "https://blondiespizza.com/wp-content/uploads/2022/07/custom-pizza.png",
//       "description":"Custom Pizza",
//       "topping": this.selectIngredients
//     }
//     this.buildurpizzaservice.postcustom(data).subscribe((res:any)=>{
//       console.log(res)
//       alert("Item Added to Cart.")
//     })
//   }
// }



import { Component,OnInit } from '@angular/core';
import { BuildurpizzaService } from 'src/app/MyServices/buildurpizza.service';
import { ShoppingCartService } from 'src/app/MyServices/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildurpizza',
  templateUrl: './buildurpizza.component.html',
  styleUrls: ['./buildurpizza.component.css']
})
export class BuildurpizzaComponent implements OnInit {
  restext:any
  cart:any
  constructor(private buildurpizzaservice :BuildurpizzaService , private shoppingcart : ShoppingCartService,private router:Router){}
    
  

  ngOnInit(){
    this.fetchdata();
  }

  fetchdata()
  {
    this.buildurpizzaservice.getingredients().subscribe((res:any)=>{
      this.restext = res
      console.log("restext : "+this.restext)
    })

    this.shoppingcart.getShoppingCart().subscribe((res)=>{
      this.cart = res
      console.log("Cart1 :"+this.cart)
    })
  }


  selectIngredients:String[] = []
  customPrice:any=0
  veg:any
  a: any

  checkingredients(checked:any,price:any)
  {
   
   // console.log(this.veg)
    if(this.selectIngredients.includes(checked)){
      this.selectIngredients = this.selectIngredients.filter(item=>item !== checked)
      this.customPrice = this.customPrice-price
    }
    else{
      this.selectIngredients.push(checked)
      //console.log(this.selectIngredients)
      this.customPrice = this.customPrice+price
      //console.log(this.customPrice)
    }
    this.a = document.getElementById("price")
    this.a.innerHTML = "Total Cost : &#8377;" + this.customPrice
  }


  custombtn()
  {
    if(this.cart.length === 0)
    {
        alert("Please add Pizza to Cart First.")
        this.router.navigate([`order`])
    }
    else 
    {
      this.veg="veg"
      if(this.selectIngredients.includes("Chicken"))
      {
        this.veg = "nonveg"
      }
      // console.log(this.veg)
      const data = {
        "price": this.customPrice,
        "type":this.veg,
        "topping": this.selectIngredients
      }
      this.buildurpizzaservice.postcustom(data).subscribe((res:any)=>{
      console.log(res)
      })
      this.router.navigate([`cart`])
    }
  }
}
