import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailComponent } from "./components/order-confirm/oder.detail.component";
import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./components/user-profile/user.profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuardFn } from "./components/guards/auth.guard";
import { AdminGuardFn } from "./components/guards/admin.guard";
import { OrderAdminComponent } from "./components/admin/order/order.admin.component";
import { ProductAdminComponent } from "./components/admin/product/product.admin.component";
import { CategoryAdminComponent } from "./components/admin/category/category.admin.component";
import { DetailOrderAdminComponent } from "./components/admin/detail-order/detail.order.admin.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products/:id', component: DetailProductComponent},
    {path: 'orders', component: OrderComponent},
    {path: 'orders/:id', component: OrderDetailComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'admin/orders', component: OrderAdminComponent},
    {path: 'admin/products', component: ProductAdminComponent},
    {path: 'admin/categories', component: CategoryAdminComponent},
    {path: 'admin/orders/:id', component: DetailOrderAdminComponent},


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}