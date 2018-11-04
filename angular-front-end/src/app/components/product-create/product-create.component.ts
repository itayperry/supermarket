import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
		public categoriesInfo: Category[]
		public validPrice: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) { }

  ngOnInit() {
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
		  	this.productsService.add(form.value).subscribe(data => {
		  		this.productsService.setProdsSubject();
		  		this.closePop()
		  	});
  		} else {
  			this.validPrice = true;
  		}
  	}
  }

  updateImage($event) {
  	var img = document.querySelector('.image'); 
	if (img instanceof HTMLImageElement) {
   		img.src = $event.target.value;
	}	
  }
  
  defaultImage($event) {
  	$event.target.src = "assets/images/supermarket-default.jpg";
  }

}
