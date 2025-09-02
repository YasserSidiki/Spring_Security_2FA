import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {CodeInputModule} from 'angular-code-input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-activate-account',
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss'
})
export class ActivateAccount {
    message = '';
    isOkay = true;
    submitted = false;

    constructor(
      private router: Router,
      private authService : AuthenticationService
    ) {
    }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: any) {
      this.confirmAccount(token);
  }

  private confirmAccount(token: string) {
      this.authService.confirm(
        {token}
      ).subscribe({
        next: () => {
            this.message = 'Your account has been activated.\nNow you can login';
            this.submitted = true;
            this.isOkay = true;
          },
        error: () => {
          this.message = 'Token has expired or is invalid';
          this.submitted = true;
          this.isOkay = false;
        }
        }
      );
  }


}
