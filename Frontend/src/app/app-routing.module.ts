import { ShoppingCartComponent } from './MyComponents/shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { OrderPizzaComponent } from './MyComponents/order-pizza/order-pizza.component';
import { BuildurpizzaComponent } from './MyComponents/buildurpizza/buildurpizza.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'order', component: OrderPizzaComponent },
    { path: 'build', component: BuildurpizzaComponent },
    { path: 'cart', component: ShoppingCartComponent }

];

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
