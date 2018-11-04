import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers:
  	new HttpHeaders(
  	{
  		'Content-Type': 'application/json'
  	}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	// public name: string = "Guest"
	public loginUrl: string = 'http://localhost:3000/users/login'
	public logoutUrl: string = 'http://localhost:3000/users/logout'
	public checkSessionUrl: string = 'http://localhost:3000/dashboard'
	public emailUrl: string = 'http://localhost:3000/users/email'
	public newUserUrl: string = 'http://localhost:3000/users'
  	//@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
	public username = "Guest"
	public isLoggedIn: boolean;
	public userId: string;
	public user: any;
  public isManager: boolean = false; 
  
  constructor(private http: HttpClient) {
  	this.checkLogin()
  	.subscribe(data => {
		  if (data) {
			  this.username = data.name
        this.isManager = (data.role == "manager") ? true : false;
			  //this.userId = data['_id']
			  this.isLoggedIn = true;
			  this.user = data;
		  } else {
			  this.isLoggedIn = false;
		  }
	  })
  }
    // emitToHeader(name: string): void {
    //     this.getLoggedInName.emit(name);
    // }

    // logout(): void {
    //     this.getLoggedInName.emit('Sign In');
    // }
    logout(): Observable<any> {
    	return this.http.get<any>(this.logoutUrl, httpOptions);
    }

	  login(user: Object): Observable<any> {
    	return this.http.post<any>(this.loginUrl, user, httpOptions);
  	}

  	checkLogin(): Observable<any> {
    	return this.http.get<any>(this.checkSessionUrl, {withCredentials: true});
  	}

  	findEmail(email: string): Observable<any> {
    	return this.http.post<any>(this.emailUrl, {email}, httpOptions);
  	}

  	addUser(newUser: any): Observable<any> {
  		return this.http.post<any>(this.newUserUrl, newUser, httpOptions);
  	}


}

			// console.log(data.name)
			// this.name = data.name
			// console.log('1')

  	// updateInfoAfterLogin(id: string): Observable<any> {

  	// }

        //return true;
        // if (successfulLogIn(email, password)) {
        //     this.getLoggedInName.emit(fullName);
        //     return true;
        // } else {
        //     this.getLoggedInName.emit('Sign In');
        //     return false;
        // }
