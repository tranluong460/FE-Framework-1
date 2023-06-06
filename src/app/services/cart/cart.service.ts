import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    // Khởi tạo giỏ hàng từ session nếu có
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  // Thêm một sản phẩm vào giỏ hàng
  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        product: product,
        quantity: 1
      };
      this.cartItems.push(newItem);
    }
    this.saveCartItemsToSession();
  }

  // Tăng số lượng sản phẩm trong giỏ hàng dựa vào ID
  increaseQuantity(productId: any): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.saveCartItemsToSession();
    }
  }

  // Giảm số lượng sản phẩm trong giỏ hàng dựa vào ID
  decreaseQuantity(productId: any): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveCartItemsToSession();
    }
  }
  // Tính tổng giá sản phẩm trong giỏ hàng
  calculateTotalPrice(): any {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      console.log(item);
      const product = this.cartItems.find(p => p.id === item.productId);
      if (product) {
        totalPrice = product.product.price * item.quantity;
      }
    }
    return totalPrice;
  }
  // tinh tong gia cac san pham
  totalPrice() {
    let sumPrice = 0
    for (let item of this.cartItems) {
      sumPrice += this.calculateTotalPrice()
    }
    return sumPrice

  }
  // Xóa một sản phẩm khỏi giỏ hàng
  removeFromCart(product: any): void {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItemsToSession();
    }
  }

  // Lấy danh sách các sản phẩm trong giỏ hàng
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Lấy tổng số lượng sản phẩm trong giỏ hàng
  getCartTotal(): number {
    return this.cartItems.length;
  }

  // Xóa toàn bộ các sản phẩm khỏi giỏ hàng
  clearCart(): void {
    this.cartItems = [];
    this.saveCartItemsToSession();
  }

  // Lưu thông tin giỏ hàng vào session
  private saveCartItemsToSession(): void {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
