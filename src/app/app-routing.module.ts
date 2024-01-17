import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductComponent } from './product/product.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'signup', component: SignUpScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
