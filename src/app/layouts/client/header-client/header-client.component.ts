import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from 'src/app/pages/sub/dialog-search/dialog-search.component';
@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css'],
})
export class HeaderClientComponent {
  cates: any;
  search: any;
  cart: any;
  user: any;
  isLoggedIn: boolean;

  constructor(
    private categoryService: CategoryService,
    private matDialog: MatDialog
  ) {
    this.categoryService
      .getAllCategories()
      .subscribe((cate) => (this.cates = cate.data));

    const cartData = sessionStorage.getItem('cart');
    this.cart = cartData
      ? JSON.parse(cartData)
      : { products: [], totalPrice: 0 };

    const info: any = localStorage.getItem('user');
    this.isLoggedIn = info !== null && info !== '';
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogSearchComponent, {
      data: { search: this.search },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.href = '/search/' + result;
    });
  }
}
