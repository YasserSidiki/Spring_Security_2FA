import { Component } from '@angular/core';
import {RegistrationRequest} from '../../services/models/registration-request';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
 registerRequest: RegistrationRequest = {email: '', firstName: '', lastName: '', password: ''};
 errorMsg: Array<string>= [];

 constructor(
   private router: Router,
   private authService: AuthenticationService,
 ) {

 }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}
