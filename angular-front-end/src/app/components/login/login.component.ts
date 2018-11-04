import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { ProductsService } from '../../services/products.service'
import { OrdersService } from '../../services/orders.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private productsService: ProductsService, private ordersService: OrdersService) { }
  loginValidate: boolean = false;
  ngOnInit() {
    this.productsService.getProdsCount().subscribe(data => this.productsService.prodsInStore = data);
    this.ordersService.getOrdersCount().subscribe(data => this.ordersService.ordersInStore = data)
  }

  onSubmit(form: NgForm) {
    this.loginService.login(JSON.stringify(form.value)).subscribe(
      data => {
        if (data) {
          this.loginValidate = false;
          this.loginService.username = data.name;
          this.loginService.user = data;
          this.loginService.isManager = (data.role == "manager") ? true : false;
          //this.loginService.emitToHeader(data.name);
          this.loginService.isLoggedIn = true;
        } else {
          this.loginService.isLoggedIn = false;
          this.loginValidate = true;
        }
      }
    );
  }

}