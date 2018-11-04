import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router'
import { OrdersService } from '../../services/orders.service'
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor( private loginService: LoginService, 
  			   private ordersService: OrdersService, 
  			   private router: Router,
  			   private productsService: ProductsService ) { 

  	this.loginService.checkLogin()
  	.subscribe(data => {
		if (data) {
			this.loginService.user = data;
			this.ordersService.sendCart(this.loginService.user['_id']);
			this.productsService.setProdsSubject();
		} else {
			this.router.navigate(['/login']);
		}
	})
  }

  ngOnInit() {
  }

}
