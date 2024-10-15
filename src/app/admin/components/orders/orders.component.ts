import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders:any;

  constructor(
    private adminService:AdminService,
    private snackbar:MatSnackBar
  ){}

  ngOnInit(){
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res=>{
      this.orders=res;
    });
  }

  changeOrderStatus(orderId:number,status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      if(res.id != null){
        this.snackbar.open('Order Status Changed Successfully','Close',{duration:5000});
        this.getPlacedOrders();
      }
      else{
        this.snackbar.open('Something went wrong while changing order status','Close',{duration:5000});
      }
    });
  }
}
