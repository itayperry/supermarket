import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { OrdersService} from '../../services/orders.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	cart = [];
	subscription: Subscription;
  public validShippmentDate: boolean = false;
  public today = new Date().toISOString().substr(0, 10);
  public minDate = new Date(); //limit to current day - today
  public creditCardValidation: boolean = false;
  public purchaseCompleted: boolean = false;
  public creditCardRegex: any = /^[0-9]{9,16}$/;

	constructor(private loginService: LoginService, private ordersService: OrdersService, private router: Router) {
	 	 this.loginService.checkLogin().subscribe(data => {
			if (data) {
	        	this.loginService.user = data;
	        	this.ordersService.sendCart(this.loginService.user._id);
	        	this.ordersService.checkoutPage = true;
			} else {
	      		this.router.navigate(['/login']);
	    	}
	  })
	}

  ngOnInit() {

  }
  onSubmit(form) {
    this.creditCardValidation = false;
  	this.creditCardValidation = (this.creditCardRegex).test(form.value.creditCard) ? false : true;
  	if (form.valid && !this.creditCardValidation) {
	  	var dateInserted = form.value.date;
	  	var date = [dateInserted.getFullYear(), dateInserted.getMonth() + 1, dateInserted.getDate()].join('-')
	  	var dateObj = {date: date}
	  	this.ordersService.checkShippingDateLimit(dateObj).subscribe(data => {
	  			console.log(data)
	  		if (data < 3) {
	  			console.log('finished')
	  			this.ordersService.verifyOrder(this.ordersService.cart._id, form.value)
	  			.subscribe(data => {
	  				this.purchaseCompleted = true;
		  			this.ordersService.checkoutPage = false;
					this.ordersService.reset();
	  			})
	  		} else {
          this.validShippmentDate = true;
	  			console.log('No Available shippments - please change date')
	  		}
	  	})
  	} else {
  		console.log('something\'s wrong')
  	}


  }

  	toMainPage() {
  		this.router.navigate(['/login']);
  	}

}
