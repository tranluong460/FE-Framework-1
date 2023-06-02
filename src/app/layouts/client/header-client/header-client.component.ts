import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css'],
})
export class HeaderClientComponent {

  cates: any
  
  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(cate => this.cates = cate);
  }
}
