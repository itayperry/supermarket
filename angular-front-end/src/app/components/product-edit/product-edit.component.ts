import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms';
import { Category } from '../../models/category';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
	public categoriesInfo: Category[]
	public subscription: Subscription;
	public product;
	public validPrice: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) { }

  ngOnInit() {
  	this.route.paramMap.subscribe((params: ParamMap) => {
  		this.subscription = this.productsService.getProdsSubject().subscribe(data => {
  			if (data) {
				this.product = this.productsService.products.find(product => product['_id'] === params.get('product_id'));
				console.log(this.product)
  			}
  		});
	});
  	this.productsService.getAllCategories().subscribe(data => this.categoriesInfo = data);
  }

  closePop(){
  	this.router.navigate(['/admin-control'])
  }

  modalClick($event) {
  	$event.target == document.querySelector('.popup_container') ?
  		this.closePop() : "";
  }

  onSubmit(form: NgForm) {
  	this.validPrice = false;
  	if (form.valid) {
  		if (form.value.price > 0) {
		  	var img = document.querySelector('.image'); 
			if (img instanceof HTMLImageElement) {
		   		form.value.imageUrl = img.src;
			}	
		  	console.log(form.value);
		  	this.productsService.update(this.product._id, form.value).subscribe(data => this.closePop())
		  	var index = this.productsService.products.findIndex(product => product._id === this.product._id);
		  	form.value._id = this.product._id;
		  	this.productsService.products[index] = form.value;
		  	console.log(this.productsService.products)
  		} else {
  			this.validPrice = true;
  		}
  	}
  }

  updateImage($event) {
  	// console.log($event.target.value)
  	// console.log('someone is touching the image\'s url')
  	var img = document.querySelector('.image'); 
	if (img instanceof HTMLImageElement) {
   		img.src = $event.target.value;
	}	
  }
  
  defaultImage($event) {
  	$event.target.src = "assets/images/supermarket-default.jpg";
  }

}