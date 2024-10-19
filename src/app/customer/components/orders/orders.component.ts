import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  myOrders:any;


  constructor(
    private custormerService:CustomerService,
    private dialog:MatDialog
  ){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.custormerService.getOrdersByUserId().subscribe(res=>{
      this.myOrders=res;
    });
  }
  getOrderDetails(orderId:number){
    console.log(orderId);
    this.dialog.open(OrderDetailsComponent,{
      data:{orderId:orderId}
    });
  }
}
