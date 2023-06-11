import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

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
import { ErrorPageComponent } from './pages/sub/error-page/error-page.component';
import { AdminDashBoardComponent } from './pages/admin/admin-dash-board/admin-dash-board.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { BaseAdminComponent } from './layouts/admin/base-admin/base-admin.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { IntroducePageComponent } from './pages/client/introduce-page/introduce-page.component';
import { ContactPageComponent } from './pages/client/contact-page/contact-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogSearchComponent } from './pages/sub/dialog-search/dialog-search.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';
import { HeaderAdminComponent } from './layouts/admin/header-admin/header-admin.component';
import { NavAdminComponent } from './layouts/admin/nav-admin/nav-admin.component';
import { FooterAdminComponent } from './layouts/admin/footer-admin/footer-admin.component';
import { AdminCommentComponent } from './pages/admin/admin-comment/admin-comment.component';
import { AdminContactComponent } from './pages/admin/admin-contact/admin-contact.component';
import { ErrorAdminPageComponent } from './pages/sub/error-admin-page/error-admin-page.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { InformationComponent } from './pages/auth/information/information.component';
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
    DialogSearchComponent,
    AdminCategoryComponent,
    AdminOrderComponent,
    HeaderAdminComponent,
    NavAdminComponent,
    FooterAdminComponent,
    AdminCommentComponent,
    AdminContactComponent,
    ErrorAdminPageComponent,
    VerifyEmailComponent,
    InformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
