import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { ProductPageComponent } from './pages/client/product-page/product-page.component';
import { HeaderClientComponent } from './layouts/client/header-client/header-client.component';
import { FooterClientComponent } from './layouts/client/footer-client/footer-client.component';
import { BaseClientComponent } from './layouts/client/base-client/base-client.component';
import { CartPageComponent } from './pages/client/cart-page/cart-page.component';
import { PayPageComponent } from './pages/client/pay-page/pay-page.component';
import { ProductDetailComponent } from './pages/client/product-detail/product-detail.component';
import { SearchPageComponent } from './pages/client/search-page/search-page.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ErrorPageComponent } from './pages/error/error-page/error-page.component';
import { AdminDashBoardComponent } from './pages/admin/admin-dash-board/admin-dash-board.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { BaseAdminComponent } from './layouts/admin/base-admin/base-admin.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { IntroducePageComponent } from './pages/client/introduce-page/introduce-page.component';
import { ContactPageComponent } from './pages/client/contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductPageComponent,
    HeaderClientComponent,
    FooterClientComponent,
    BaseClientComponent,
    CartPageComponent,
    PayPageComponent,
    ProductDetailComponent,
    SearchPageComponent,
    SignInComponent,
    SignUpComponent,
    ErrorPageComponent,
    AdminDashBoardComponent,
    AdminProductComponent,
    AdminUserComponent,
    BaseAdminComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    IntroducePageComponent,
    ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
