import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	cart: any;
	subscription: Subscription;
  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit() {}
  
  backToShopping() {	
		this.ordersService.checkoutPage = false;
		this.router.navigate(['/shopping']);
	}

	toCheckout() {	
		if (this.ordersService.cart) {	
			setTimeout(()=> {
		  		this.ordersService.checkoutPage = true;
			}, 0);
			this.router.navigate(['/checkout']);
    	}
	}
}

