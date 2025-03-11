import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatMenuModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  
constructor(private userService: UserService, private router: Router){}
isLogin: boolean = false;
loginState: 'login' | 'logout' = 'login';

ngOnInit(): void {
  if(this.userService.status != 'none')
    this.isLogin = true;
}
navToHome(){
  this.router.navigate(['/']);
}
navToCourses(){
  this.router.navigate(['/courses']);
}
login(){
  this.userService.status = 'login';
  this.loginState = 'logout'

  this.router.navigate(['/auth']);
  }
}
