import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router'
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private ordersService: OrdersService) {}

  ngOnInit() {}

  logout() {
  	this.loginService.logout().subscribe(data => {
  		console.log(data);
  		this.ordersService.reset();
      this.loginService.isManager = false;
  		this.loginService.username = "Guest";
  		this.loginService.isLoggedIn = false;
  		this.router.navigate(['/login']);
  	})
  }
}