import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HasRoleGuard } from './has-role.guard';

import { BaseClientComponent } from './layouts/client/base-client/base-client.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { ProductPageComponent } from './pages/client/product-page/product-page.component';
import { ProductDetailComponent } from './pages/client/product-detail/product-detail.component';
import { SearchPageComponent } from './pages/client/search-page/search-page.component';
import { CartPageComponent } from './pages/client/cart-page/cart-page.component';
import { PayPageComponent } from './pages/client/pay-page/pay-page.component';

import { BaseAdminComponent } from './layouts/admin/base-admin/base-admin.component';
import { AdminDashBoardComponent } from './pages/admin/admin-dash-board/admin-dash-board.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';

import { ErrorPageComponent } from './pages/sub/error-page/error-page.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { IntroducePageComponent } from './pages/client/introduce-page/introduce-page.component';
import { ContactPageComponent } from './pages/client/contact-page/contact-page.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';
import { AdminCommentComponent } from './pages/admin/admin-comment/admin-comment.component';
import { AdminContactComponent } from './pages/admin/admin-contact/admin-contact.component';
import { ErrorAdminPageComponent } from './pages/sub/error-admin-page/error-admin-page.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { InformationComponent } from './pages/auth/information/information.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'signIn', pathMatch: 'full' },
      { path: 'signIn', component: SignInComponent },
      { path: 'signUp', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'reset-password/:randomString',
        component: ResetPasswordComponent,
      },
      {
        path: 'verify-email/:verifyCode',
        component: VerifyEmailComponent,
      },
    ],
  },

  {
    path: '',
    component: BaseClientComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'product', component: ProductPageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'cart/pay', component: PayPageComponent },
      { path: 'productDetail/:id', component: ProductDetailComponent },
      { path: 'search/:keyword', component: SearchPageComponent },
      { path: 'introduce', component: IntroducePageComponent },
      { path: 'contact', component: ContactPageComponent },
      {
        path: 'information',
        component: InformationComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: BaseAdminComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: 'admin',
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashBoardComponent },
      { path: 'products', component: AdminProductComponent },
      { path: 'users', component: AdminUserComponent },
      { path: 'categories', component: AdminCategoryComponent },
      { path: 'comments', component: AdminCommentComponent },
      { path: 'orders', component: AdminOrderComponent },
      { path: 'contacts', component: AdminContactComponent },
    ],
  },

  {
    path: 'unauthorized',
    component: ErrorAdminPageComponent,
  },

  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
