import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent {
  errorMessage: string = '';
  products: any[] = [];
  product: any;
  p: number = 1;
  cate: any;
  pro: any;

  // add product
  formProduct = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    original_price: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    short_description: ['', [Validators.required]],
    description: ['', [Validators.required]],
    images: this.fb.array([
      this.fb.group({
        base_url: ['', [Validators.required]],
        is_gallery: true,
        label: null,
        large_url: ['', [Validators.required]],
        medium_url: ['', [Validators.required]], // Kiểm tra trường này
        position: null,
        small_url: ['', [Validators.required]],
        thumbnail_url: ['', [Validators.required]],
      }),
    ]),
    brand: ['', Validators.required],
    specifications: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        attributes: this.fb.array([
          this.fb.group({
            code: [''],
            name: [''],
            value: [''],
          }),
        ]),
      }),
    ]),
  });

  get imageArray() {
    return this.formProduct.get('images') as FormArray;
  }

  constructor(
    private productsService: ProductsService,
    private cateService: CategoryService,
    private fb: FormBuilder,
    private router: ActivatedRoute
  ) {
    this.productsService.getAllProducts().subscribe((product) => {
      this.products = product.data;
    });

    this.cateService.getAllCategories().subscribe((category) => {
      this.cate = category.data;
    });
  }

  getItemById(id: any) {
    this.productsService.getProduct(id).subscribe((pro) => {
      this.product = pro.data;
    });
  }

  removeItem(id: any) {
    this.productsService
      .deleteProduct(id)
      .subscribe(() => window.location.reload());
  }

  onHandleAdd() {
    let images: any[] = [];
    let specifications: any[] = [];
    if (this.formProduct.value.specifications) {
      specifications = this.formProduct.value.specifications.map(
        (spec: any) => {
          const attributes = spec.attributes.map((attribute: any) => ({
            code: '12345',
            name: 'Bộ nhớ',
            value: '4GB',
          }));

          return {
            name: 'Thông số kỹ thuật',
            attributes: attributes,
          };
        }
      );
    }
    if (this.formProduct.value.images) {
      images = this.formProduct.value.images.map((image: any) => ({
        base_url: image.base_url || '',
        is_gallery: true,
        label: null,
        large_url: image.large_url || '',
        medium_url: image.medium_url || '',
        position: null,
        small_url: image.small_url || '',
        thumbnail_url: image.thumbnail_url || '',
      }));
    }

    const product: any = {
      name: this.formProduct.value.name || '',
      price: this.formProduct.value.price || 0,
      original_price: this.formProduct.value.original_price || 0,
      quantity: this.formProduct.value.quantity || 0,
      short_description: this.formProduct.value.short_description || '',
      description: this.formProduct.value.description || '',
      images: images,
      brand: this.formProduct.value.brand || '', // Lưu brand dưới dạng id
      specifications: specifications,
    };

    this.productsService.createProduct(product).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log('Error', error.error.message);
        if (Array.isArray(error.error.message)) {
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

  updateProById(id: string) {
    this.productsService.getProduct(id).subscribe((product) => {
      this.pro = product.data;

      if (this.pro && this.pro.images) {
        this.formProduct.patchValue({
          name: this.pro.name,
          price: this.pro.price,
          original_price: this.pro.original_price,
          quantity: this.pro.quantity,
          short_description: this.pro.short_description,
          description: this.pro.description,
          images: [
            {
              base_url: this.pro.images?.[0].base_url || '',
              is_gallery: true,
              label: null,
              large_url: this.pro.images?.[0].large_url || '',
              medium_url: this.pro.images?.[0].medium_url || '',
              position: null,
              small_url: this.pro.images?.[0].small_url || '',
              thumbnail_url: this.pro.images?.[0].thumbnail_url || '',
            },
          ],
          brand: this.pro.brand._id,
          specifications: [
            {
              name: 'Bộ nhớ',
              attributes: [
                {
                  code: '12345',
                  name: 'Bộ nhớ',
                  value: '4GB',
                },
              ],
            },
          ],
        });
      }
    });
  }
  // edit
  onHandleUpdate() {
    const product: any = {
      _id: this.pro._id,
      name: this.formProduct.value.name || '',
      price: this.formProduct.value.price || 0,
      original_price: this.formProduct.value.original_price || 0,
      quantity: this.formProduct.value.quantity || 0,
      short_description: this.formProduct.value.short_description || '',
      description: this.formProduct.value.description || '',
      images: [
        {
          base_url: this.formProduct.value.images?.[0].base_url || '',
          is_gallery: true,
          label: null,
          large_url: this.formProduct.value.images?.[0].large_url || '',
          medium_url: this.formProduct.value.images?.[0].medium_url || '',
          position: null,
          small_url: this.formProduct.value.images?.[0].small_url || '',
          thumbnail_url: this.formProduct.value.images?.[0].thumbnail_url || '',
        },
      ],
      brand: this.formProduct.value.brand,
      specifications: [
        {
          name: 'Bộ nhớ',
          attributes: [
            {
              code: '12345',
              name: 'Bộ nhớ',
              value: '4GB',
            },
          ],
        },
      ],
    };
    this.productsService.updateProduct(product).subscribe(
      (item) => {
        window.location.reload();
      },
      (error) => {
        console.log('Error', error.message);
        if (Array.isArray(error.error.message)) {
          this.errorMessage = error.error.message[0];
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
