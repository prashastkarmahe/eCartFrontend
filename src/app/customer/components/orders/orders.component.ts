import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  myOrders:any;

  constructor(
    private custormerService:CustomerService
  ){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.custormerService.getOrdersByUserId().subscribe(res=>{
      this.myOrders=res;
    });
  }
}
