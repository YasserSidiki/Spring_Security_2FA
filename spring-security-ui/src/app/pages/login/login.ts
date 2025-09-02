import { Component } from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {Token} from '../../services/token/token';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
    authRequest: AuthenticationRequest = {email:'', password:''};
    errorMsg: Array<string> = [];

    constructor(
      private router: Router,
      private authService: AuthenticationService,
      private tokenService: Token
    ) {

    }

  login() {
      this.errorMsg = [];
      this.authService.authenticate(
        {
          body: this.authRequest
        }
      ).subscribe({
        next: (res) => {
          if (res instanceof Blob) {
            res.text().then((text) => {
              const json = JSON.parse(text);
              this.tokenService.token = json.token;
              this.router.navigate(['dashboard']);
            });
          } else if (res.token) {
            this.tokenService.token = res.token;
            this.router.navigate(['dashboard']);
          }
        }
        ,
        error: async (err) => {
          console.log('Raw error:', err);

          let errorBody: any = err.error;

          // If the error is a Blob, parse it
          if (err.error instanceof Blob && err.error.type === 'application/json') {
            const text = await err.error.text();
            try {
              errorBody = JSON.parse(text);
            } catch (parseErr) {
              console.error('Failed to parse error JSON', parseErr);
            }
          }

          // Now display the messages
          if (errorBody?.validationErrors) {
            this.errorMsg = errorBody.validationErrors;
          } else if (errorBody?.error) {
            this.errorMsg = [errorBody.error];
          } else {
            this.errorMsg = ['An unknown error occurred'];
          }
        }

      });
  }

  register() {
      this.router.navigate(['register'])
  }
}
