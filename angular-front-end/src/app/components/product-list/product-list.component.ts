import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service'
import { OrdersService } from '../../services/orders.service'
import { Subscription } from 'rxjs'
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	public subscription: Subscription;
	public categoriesInfo: Category[]
	public productsSearchData: Product[]

	constructor(private productsService: ProductsService, private ordersService: OrdersService, private loginService: LoginService) {}

	ngOnInit() {
		this.subscription = this.productsService.getProdsSubject().subscribe(data => {
		  	if (data && !this.ordersService.checkoutPage) {
		  		this.productsService.products = data;
		  		this.productsSearchData = data;
		  		// 	why use this.productsSearchData? when someone searches for a product the 
				// 	list that's rendered changes but when the user 
				// 	keeps on typing we still need the original database list that hasn't changed
			} else {
				//null will appear first and then it will be triggered - data will be fetched
		  	}
		});
		this.productsService.getAllCategories().subscribe(data => this.categoriesInfo = data);
	}

	sortByCategory($event) {
    	var searchInput = (<HTMLInputElement>document.querySelector('#search'));
    	searchInput.value = "";
	   	if ($event.target.innerText == 'All Products') {
	   		this.productsService.setProdsSubject(); //This will trigger the subscription on ngOnInit
     	} else {
	  		var result = this.categoriesInfo.find(category => category.name === $event.target.innerText)
	  		this.productsService.setProdsSubjectByCat(result['_id']); //This will trigger the subscription on ngOnInit
     	}
	}

	onInputSearch(value) {
		var searchValue = value
		var results = [];
		for (var i = 0; i < this.productsSearchData.length; i++) {
			if(this.productsSearchData[i].name.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
				results.push(this.productsSearchData[i])
			}
		}
		this.productsService.products = results;
	}
}
