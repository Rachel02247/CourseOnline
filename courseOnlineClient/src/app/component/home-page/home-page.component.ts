import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private userService: UserService, private router: Router){}
  getStarted(){
    this.userService.status = 'register';
    this.router.navigate(['/auth']);
  }
}
