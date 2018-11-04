import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminControlComponent } from './components/admin-control/admin-control.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
// import { HeaderComponent } from './header/header.component';

export function getRoutes (): Routes {
	return [
	 //  {
	 //    path: '', redirectTo: 'home', pathMatch: 'full'
	 //  },
	  {
		path: 'login', component: LoginComponent
	  },
	  {
	    path: '', redirectTo: 'login', pathMatch: 'full'
	  },
	  {
		path: 'sign-up', component: SignUpComponent
	  },
	  {
	    path: 'shopping', component: ShoppingComponent
	  },
	  {
	    path: 'checkout', component: CheckoutComponent
	  },
	  {
	    path: 'admin-control', component: AdminControlComponent,
	        children: [
		      { path: 'edit/:product_id', component: ProductEditComponent },
		      { path: 'create-product', component: ProductCreateComponent }
    		]
	  },	  
	  // {
	  //   path: 'add-todo', component: AddTodoComponent
	  // },
	  // {
	  //   path: 'email/:email_id', component: EmailComponent
	  // },
	  // {
	  //   path: 'add-email', component: AddFormComponent
	  // },
	  // {
	  //   path: '**', component: NotFoundComponent
	  // }
	]
}