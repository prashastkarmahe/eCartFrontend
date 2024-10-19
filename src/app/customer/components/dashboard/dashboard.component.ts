import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products:any[]=[];
  searchProductForm!:FormGroup;

  constructor(
    private customerService:CustomerService,
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
    this.customerService.getAllProducts().subscribe(res=>{
      res.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      });
    });
  }

  submitForm(){
    this.products=[];
    const title=this.searchProductForm.get('title')!.value;

    this.customerService.getAllProductByName(title).subscribe(res=>{
      res.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.byteImg;
        this.products.push(element);
      });
    });
  }

  addToCart(id:any){
    this.customerService.addToCart(id).subscribe(
      res=>{
        console.log("Product added to cart successfully !!!");
        this.snackBar.open("Product added to cart successfully","Close",{duration:5000});
      },
      err=>{
        console.error("Product already in cart,quantity increased: ", err);
        this.snackBar.open("Product already in cart,quantity increased", "OK", { duration: 5000 });
      }
    );
  }
}
