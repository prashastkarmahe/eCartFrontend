import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products:any[]=[];
  searchProductForm!:FormGroup;

  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm=this.fb.group({
      title:[null,[Validators.required]]
    });
  }

  getAllProducts(){
    this.products=[];
    this.adminService.getAllProducts().subscribe(res=>{
      res.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      });
    });
  }

  submitForm(){
    this.products=[];
    const title=this.searchProductForm.get('title')!.value;

    this.adminService.getAllProductByName(title).subscribe(res=>{
      res.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      });
    });
  }

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe(
      (res) => {
        // if res status is 204,item has beed deleted successfully by back-end
        if (res.status === 204) {
          this.snackBar.open('Product deleted successfully', 'Close', { duration: 5000 });
          this.getAllProducts(); // Refresh the product list after deleting
        }
        else {
          //  other statuses if needed
          this.snackBar.open('Failed to delete product', 'Close', { duration: 5000 });
        }
      },
      (error) => {
        // Handle errors from the server (e.g., 404 not found)
        console.error('Error deleting product:', error);
        this.snackBar.open('An error occurred while deleting the product', 'Close', { duration: 5000 });
      }
    );
  }
}
