import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public prodsInStore: number = 0;
	public allProductsUrl: string = 'http://localhost:3000/products/';
	public allCategoriesUrl: string = 'http://localhost:3000/products/categories';
	public oneCategoryUrl: string = 'http://localhost:3000/products/category/';
	public prodsCountUrl: string = 'http://localhost:3000/products/count/';
  public products;
  public productsSubject = new BehaviorSubject(null);
  public updateProdUrl: string = 'http://localhost:3000/products/';
  public addProdUrl: string = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) { }

    setProdsSubject() {
      this.http.get<any>(this.allProductsUrl)
      .subscribe(
           data => {
             // this.products = data;
             this.productsSubject.next(data);
           }
        );
    }

    setProdsSubjectByCat(id: string){
       this.http.get<any>(this.oneCategoryUrl + id)
      .subscribe(
           data => {
             // this.products = data;
             this.productsSubject.next(data);
           }
        );
    }

    resetProds() {
         // this.products = null;
         this.productsSubject.next(null);
    }

    getProdsSubject() {
      return this.productsSubject.asObservable();
    }

    getAllProds(): Observable<any> {
    	return this.http.get<any>(this.allProductsUrl);
  	}

  	getAllCategories(): Observable<any> {
    	return this.http.get<any>(this.allCategoriesUrl);
  	}

  	getOneProduct(id: string): Observable<any> {
  		return this.http.get<any>(this.allProductsUrl + id);
  	}

  	getProdByCategory(id: string): Observable<any> {
  		return this.http.get<any>(this.oneCategoryUrl + id);
  	}

    getProdsCount() {
      return this.http.get<any>(this.prodsCountUrl);
    }

    update(id: string, prod): Observable<any> {
      return this.http.put<any>(this.updateProdUrl + id, prod, httpOptions);
    }

    add(prod): Observable<any> {
      return this.http.post<any>(this.addProdUrl, prod,  httpOptions);
    }
}

