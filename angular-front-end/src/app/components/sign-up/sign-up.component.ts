import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
	public stage1: boolean = false;
	public stage2: boolean = true;
	passwordConfirm: boolean = false;
	emailValidation: boolean = false;
	emailExists: boolean = false;
	cities: Array<string> = [
	    "Jerusalem",
		"Haifa",
		"Tel Aviv",
		"Ashdod",
		"Rishon LeZiyon",
		"Petah Tiqwa",
		"Beersheba",
		"Netanya",
		"Holon",
		"Bené Beraq",
		"Bat Yam"
  	];
  	emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  next(form: NgForm) {
  	this.isValidEmail(form.value.username);
  	this.matchPasswords(form.value.password, form.value.confirmed_password);
  	if (!this.emailValidation) {
		this.loginService.findEmail(form.value.username).subscribe(
	    	data => {
	      		this.emailExists = (data !== null) ? true : false; //checks for duplicity
				if (!this.emailExists && !this.passwordConfirm) {
					this.toggleStages();
			}
	    })
	}
  }

  onSubmit(form: NgForm) {
    if (form.valid) {    
      this.loginService.addUser(form.value).subscribe(res => {
      	this.loginService.isLoggedIn = true
      	this.loginService.username = form.value.name;
      	this.loginService.checkLogin()
    		.subscribe(data => {
    			this.loginService.user = data;
  		})
      	this.router.navigate(['/login']);
      })
    }
  }

  isValidEmail(email: string): boolean {
  	return this.emailValidation = (this.emailRegex).test(email) ? false : true;
  }

  matchPasswords(pass: string, passConf: string) {
  	return this.passwordConfirm = (pass === passConf && pass !== "") ? false : true;
  }

  toggleStages(): void {
  	this.stage1 = !this.stage1;
  	this.stage2 = !this.stage2;
  }
}