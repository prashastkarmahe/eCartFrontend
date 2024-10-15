import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eCartFrontend';
  isCustomerLoggedIn:boolean=UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean=UserStorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit():void{
    this.router.events.subscribe(event=>{
      this.isAdminLoggedIn=UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn=UserStorageService.isCustomerLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
