import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMsg = '';
  unameFeedbackMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // It's good practice to put initialization logic in ngOnInit
  }

  login() {
    this.errorMsg = '';
    if (this.username.trim().length === 0) {
      this.errorMsg = 'Username is required';
      return;
    }

    if (this.password.trim().length === 0) {
      this.errorMsg = 'Password is required';
      return;
    }

    if (this.username.trim().length < 5) {
      this.unameFeedbackMsg = 'Username must contain at least 5 characters';
      return;
    } else if (this.username.trim().length > 16) {
      this.unameFeedbackMsg = 'Username must contain less than 17 characters';
      return;
    } else {
      this.unameFeedbackMsg = '';
    }

    const res = this.auth.login(this.username, this.password);

    if (res === 200) {
      this.router.navigate(['home']);
    } else if (res === 403) {
      this.errorMsg = 'Invalid Credentials';
    }
  }
}
