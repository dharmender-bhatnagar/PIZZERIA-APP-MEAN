import { Component } from '@angular/core';
import { OrderPizzaService } from 'src/app/MyServices/order-pizza.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css']
})
export class OrderPizzaComponent {
  restext: any
  constructor(private orderpizzaservice: OrderPizzaService) {
    this.orderpizzaservice.getPizzas().subscribe((res: any) => {
      this.restext = res
    })

  }

  addtocart(data: any) {
    this.orderpizzaservice.postpizzas(data).subscribe((res:any)=>{
      console.log(res)
      alert("Item Added to Cart.")
    })
  }

}
