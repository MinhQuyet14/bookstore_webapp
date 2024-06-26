import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-confirm/oder.detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenIntercepter } from './intercepters/token.intercepter';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order/order.admin.component';
import { ProductAdminComponent } from './components/admin/product/product.admin.component';
import { DetailOrderAdminComponent } from './components/admin/detail-order/detail.order.admin.component';
import { DetailProductAdminComponent } from './components/admin/detail-product/detail.product.admin.component';
import { SoldProductAdminComponent } from './components/admin/sold-product/sold.product.admin.component';
import { UserAdminComponent } from './components/admin/user/user.admin.component';
import { AddProductAdminComponent } from './components/admin/add-product/add.product.admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailProductComponent,
    OrderComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    UserProfileComponent,
    AdminComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    DetailOrderAdminComponent,
    DetailProductAdminComponent,
    SoldProductAdminComponent,
    UserAdminComponent,
    AddProductAdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgComponentOutlet,
    CommonModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepter,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent,
    //HomeComponent,
    //DetailProductComponent,
    //OrderComponent,
    //OrderDetailComponent,
    //LoginComponent,
    //RegisterComponent,
    //UserProfileComponent,
    //AdminComponent
  ]
})
export class AppModule { }
