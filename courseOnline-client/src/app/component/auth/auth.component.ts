// import { Component, OnInit, signal } from '@angular/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { merge } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { User } from '../../models/user';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UserService } from '../../services/user/user.service';
// import {MatCardModule} from '@angular/material/card';
// import { Route, Router } from '@angular/router';
// import { UserDetailsService } from '../../services/userDetails/user-details.service';

// @Component({
//   selector: 'app-auth',
//   imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
//   templateUrl: './auth.component.html',
//   styleUrl: './auth.component.css'
// })
// export class AuthComponent implements OnInit {

// //   constructor(private userService: UserService,
// //     private userDet: UserDetailsService,
// //      private fb: FormBuilder, private router: Router) {
// //     merge(this.email.statusChanges, this.email.valueChanges)
// //       .pipe(takeUntilDestroyed())
// //       .subscribe(() => this.updateErrorMessage());

// //   }
// //   status: 'register' | 'login' | 'none' = 'none';
// //   user!: User ; 
// //   readonly email = new FormControl('', [Validators.required, Validators.email]);
// //   form!: FormGroup;

// //   ngOnInit() {
// //     this.form = this.fb.group({
// //         name: ['', Validators.required],
// //         email: ['', [Validators.required, Validators.email]],
// //         password: ['', Validators.required],
// //         role: [''] 
// //     });

// //     this.status = this.userService.status;

// //     this.email.statusChanges.subscribe(() => this.updateErrorMessage());
// //     this.email.valueChanges.subscribe(() => this.updateErrorMessage());
// // }

// // async submit() {
// //   debugger;
// //     this.user = { ...this.form.value }; 
    
// //     if (this.user.role == 'teacher') {
// //         this.userService.isTeacher = true;
// //     }

// //     if (this.form.valid)
// //       {
// //         this.userService.addUser(this.form.value as Partial<User>).subscribe({
// //           next: (response: Partial<User>) => {
// //             debugger;
// //             this.userDet.setUser(response);
// //             console.log(this.user);
// //            this.router.navigate(['/courses']);
// //           },
// //           error: (err) => {
// //             alert("can't register");
// //           }
// //         });
// //       }
// // }

// //   errorMessage = signal('');

// //   updateErrorMessage() {
// //     if (this.email.hasError('required')) {
// //       this.errorMessage.set('You must enter a value');
// //     } else if (this.email.hasError('email')) {
// //       this.errorMessage.set('Not a valid email');
// //     } else {
// //       this.errorMessage.set('');
// //     }
// //   }

// //   hide = signal(true);
  
// //   clickEvent(event: MouseEvent) {
// //     this.hide.set(!this.hide());
// //     event.stopPropagation();
// //   }


// // }



import { Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserDetailsService } from '../../services/userDetails/user-details.service';

@Component({
  selector: 'app-auth',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(private userService: UserService, private userDetail:UserDetailsService,private fb: FormBuilder,private router: Router) {

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  status: 'register' | 'login' | 'none' = 'none';
  user!: User ; 
 readonly email = new FormControl('', [Validators.required, Validators.email]);
  // form!: FormGroup;



  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });
  

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [''] 
    });
    this.status = this.userService.status;
  }
  submit() {
    
    // this.user = { ...this.form.value }; 
    // if (this.userService.status === 'register') {
    //   this.userService.addUser(this.user);
    // }
    // else if(this.userService.status == 'login'){
    //   this.userService.addUser(this.user);
    // }
    
    
    if (this.form.valid)
      {
        this.userService.addUser(this.form.value as Partial<User>).subscribe({
          next: (response:Partial<User>) => {
            console.log(response);
            this.userDetail.setUser(response);
            console.log(this.userDetail);
             this.router.navigate(['/courses']);

          },
          error: (err) => {
            alert(err);
          }
        });
      }
  }

  errorMessage = signal('');

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}


