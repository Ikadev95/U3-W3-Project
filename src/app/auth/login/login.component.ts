import { AuthsrvService } from './../authsrv.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from '../../interfaces/i-login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formValid: boolean = true;

  constructor(private authSvc: AuthsrvService, private router: Router, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.valid) {
      const formData: iLoginRequest = this.loginForm.value;
      this.authSvc.login(formData).subscribe({
        next: (data) => {
          console.log('Login successful', data);
          this.router.navigate(['films']);
        },
        error: (err) => {
          console.error('Login error', err);
          this.formValid = false;
        }
      });
    } else {
      this.formValid = false;
      console.log('Form is invalid');
    }
  }
}
