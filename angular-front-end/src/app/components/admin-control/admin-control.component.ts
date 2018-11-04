import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { LoginService } from '../../services/login.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {

  constructor(private productsService: ProductsService, 
  	private loginService: LoginService, 
  	private router: Router,
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loginService.checkLogin()
  	.subscribe(data => {
      this.loginService.isManager = (data.role == "manager") ? true : false;
		if (this.loginService.isManager) {
			this.productsService.setProdsSubject();
		} else {
			this.router.navigate(['/login']);
		}
	})
  }

  showCreationForm() {
    this.router.navigate(['create-product'], {relativeTo: this.route});
  }

}
