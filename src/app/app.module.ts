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

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepter,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
    //HomeComponent,
    //DetailProductComponent,
    //OrderComponent,
    //OrderDetailComponent,
    //LoginComponent
    //RegisterComponent
  ]
})
export class AppModule { }
