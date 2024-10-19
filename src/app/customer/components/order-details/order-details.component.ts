import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  cartItems:any[];
  totalAmount: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService:CustomerService
  ){
    console.log(this.data);
    this.getCartByOrderId();
  }


  getCartByOrderId(){
    this.customerService.getCartByOrderId(this.data.orderId).subscribe(res=>{
      this.cartItems=res;
      this.calculateTotalAmount();
    })
  }
  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
