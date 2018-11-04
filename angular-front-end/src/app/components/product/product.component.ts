import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { OrdersService } from '../../services/orders.service';
import { Subscription } from 'rxjs'
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	@Input() product: Product;
	public isProductInCart = false
	public value: number;
	public subscription: Subscription;

  constructor(
		private ordersService: OrdersService, 
	  	private loginService: LoginService, 
	  	private route: ActivatedRoute, 
	  	private router: Router
  ) { 
  	setTimeout(()=> {
		this.ordersService.checkoutPage = false;
	}, 0);
  }

	ngOnInit() {
		this.subscription = this.ordersService.get().subscribe(data => {
		  		if (data && !this.ordersService.checkoutPage) {
		  			this.ordersService.cart = data;
					var id = this.product['_id']
					var index = this.ordersService.cart.items.findIndex(el => el.productId === id);
			  		if ((index !== -1)) { //product exists in cart
				  		var quantity = this.ordersService.cart.items[index].quantity;
			  			this.isProductInCart = true;
			  			setTimeout(function() { 
			  				var input = (<HTMLInputElement>document.querySelector("[data-productId='" + id + "\'"))
			  				input.value = quantity;
			  			}, 0);
			  		}
		  		} else {
					//null will appear first and then it will be triggered - data will be fetched
		  		}
		});
	}

    changeProdStatus() {
  		this.isProductInCart = !this.isProductInCart;
  		if (this.isProductInCart) { //new product in the cart
  			this.value = 1;
  			if (this.ordersService.cart == null) {
  				this.createNewCart() 
  			} else {
		  		this.createProdInCart()
  			}
  		} else {
  			//do nothing
  		}
    }

    onChange(searchValue : string ) { //this is limited 
    	if (Number(searchValue) <= 15 && Number(searchValue) > 0) {
    		this.value = Math.round(Number(searchValue) * 100) / 100;
    	} else if (Number(searchValue) > 15) {
    		var input = (<HTMLInputElement>document.querySelector("[data-productId='" + this.product['_id'] + "\'"))
			input.value = '15';
			this.value = 15;
    	} else {
    	    this.value = 0;
    	}
    	if (this.ordersService.cart) {
			this.updateProdInCart();
    	} else if (this.value > 0) {
    		this.createNewCart();
    	}
	}

	add($event) {
		var numInput = $event.target.parentElement.childNodes[1].value;
		this.value = Number(numInput);
		if (this.value < 15 && this.value > 0) {
			this.value++;
			$event.target.parentElement.childNodes[1].value = Math.round(this.value * 100) / 100;
			if (this.ordersService.cart) {
				this.updateProdInCart();
			} else {
				this.createNewCart();
			}
    	}
	}

	substract($event) {
		var numInput = $event.target.parentElement.childNodes[1].value;
		if (Number(numInput) > 1) {
			this.value = Math.round(Number(numInput) * 100) / 100;
			this.value--;
			$event.target.parentElement.childNodes[1].value = Math.round(this.value * 100) / 100;
		} else {
			this.value = 0;
			this.changeProdStatus();
		}
		if (this.ordersService.cart) {
			this.updateProdInCart();
		} else {
			this.createNewCart();
		}
	}

	updateProdInCart() {
		this.value = Number(this.value)
		let id = this.product['_id']
		var index = this.ordersService.cart.items.findIndex(item => item.productId === id);
  		if (index !== -1) { //product is in cart
			if (this.value > 0) {
				this.ordersService.cart.items[index].quantity = Math.round(this.value * 100) / 100;
				this.ordersService.cart.items[index].generalPrice = Number((this.value * Number(this.product.price)).toFixed(2));
				this.ordersService.updateTotal()
			} else {
				this.ordersService.removeProduct(index);
			}
  		} else {
  			if (this.value > 0) {
				this.createProdInCart();
			} else {
				//do nothing
			}
  		}

	}

	createProdInCart() {
		var cartProd = {
	  		productId: this.product['_id'],
	  		quantity: Math.floor(this.value * 100) / 100,
	  		generalPrice: Number((this.value * Number(this.product.price)).toFixed(2)),
	  		productInfo: this.product

	  	}
	  	this.ordersService.cart.items.push(cartProd);
	  	this.ordersService.updateTotal();
	}

	createNewCart(){
		this.ordersService.cart = {
			customerId: this.loginService.user['_id'],
    		items: [
    			{
    				productId: this.product._id,
        			quantity: Math.round(this.value * 100) / 100, 
        			generalPrice: Number(this.product.price),
        			productInfo: this.product
        		}
    		],
    		order:  {
				subtotal: Number((this.value * Number(this.product.price)).toFixed(2)),
				city: this.loginService.user.city, 
				street: this.loginService.user.street, 
				shippingDate: 'none', 
				orderDate: "none", 
				lastDigits: "none",
				checkout: false
			}
    	}	
    	console.log(this.ordersService.cart)
    	this.ordersService.create(this.ordersService.cart)
    		.subscribe(data => 
    			this.ordersService.cart['_id'] = data
    		)
	}

    showEditForm() {
  		this.router.navigate(['edit/' + this.product._id], {relativeTo: this.route});
    }

}