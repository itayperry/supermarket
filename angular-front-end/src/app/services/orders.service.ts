import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
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
export class OrdersService {
  public ordersInStore: number = 0;
	public checkoutPage: boolean = false;
	public cart: any = null;
	public productsInCart = {}
	public allOrdersUrl: string = 'http://localhost:3000/products/'
	public OrderUrl: string = 'http://localhost:3000/products/categories'
	public OrderByClientIdUrl: string = 'http://localhost:3000/ordersForClient/'
	public deleteCartUrl: string = 'http://localhost:3000/cart/delete/';
	public updateCartUrl: string = 'http://localhost:3000/orders/';
	public createCartUrl: string = 'http://localhost:3000/orders/';
	public checkDateUrl: string = 'http://localhost:3000/order/checkDate/';
	public verifyOrderUrl: string = 'http://localhost:3000/orders/';
  public ordersCountUrl: string = 'http://localhost:3000/orders/count/';
	bSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getOneOrder(id: string): Observable<any> {
		return this.http.get<any>(this.OrderByClientIdUrl + id);
	}

	sendCart(id: string) {
		this.http.get<any>(this.OrderByClientIdUrl + id)
  	.subscribe(
       	data => {
       		this.cart = data;
       		this.bSubject.next(this.cart);
       	}
      );
	}

	reset() {
       this.cart = null;
       this.bSubject.next(this.cart);
	}

	get() {
		return this.bSubject.asObservable();
	}

	removeProduct(index) {
		this.cart.items.splice(index, 1);
		this.updateTotal();
	}

	updateTotal() {
		var count = 0;
		for (var i = 0; i < this.cart.items.length; ++i) {
			count = count + Number(this.cart.items[i].generalPrice)
		}
		this.cart.order.subtotal = count.toFixed(2);
		if (this.cart.items.length == 0) {
			this.delete(this.cart._id)
			.subscribe(data => {
				this.cart = null;
			})
	  } else {
		  this.update(this.cart['_id'], this.cart).subscribe(data => console.log('updated'))
	  }
	}

  delete(id: string): Observable<any> {
  	return this.http.delete<any>(this.deleteCartUrl + id);
	}

	update(id: string, cart): Observable<any> {
		return this.http.put<any>(this.updateCartUrl + id, cart, {withCredentials: true});
	}

	create(cart): Observable<any> {
		return this.http.post<any>(this.createCartUrl, cart, httpOptions);
	}

	checkShippingDateLimit(date: object) {
		return this.http.post<any>(this.checkDateUrl, date, httpOptions);
	}

	verifyOrder(id: string, order: object): Observable<any> {
		return this.http.post<any>(this.verifyOrderUrl + id, order, httpOptions);
	}

  getOrdersCount() {
    return this.http.get<any>(this.ordersCountUrl);
  }
}
