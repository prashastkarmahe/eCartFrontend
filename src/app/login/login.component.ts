import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  hidePassword:boolean=true;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private snackBar:MatSnackBar,
    private router:Router
  ){}

  ngOnInit():void{
    this.loginForm=this.formBuilder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit():void{
    const username=this.loginForm.get('email')!.value;
    const password=this.loginForm.get('password')!.value;


    this.authService.login(username,password).subscribe(
      (res)=>{
        console.log("Logged in as : "+username);
        if(UserStorageService.isAdminLoggedIn())this.router.navigateByUrl('admin/dashboard');
        else if(UserStorageService.isCustomerLoggedIn())this.router.navigateByUrl('customer/dashboard');
      },
      (error)=>{
        this.snackBar.open('Bad Credientials','ERROR',{duration:5000});
      }
    )
  }
}
