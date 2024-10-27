import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from '../authsrv.service';
import { iUser } from '../../interfaces/i-user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  formvalid = false

  constructor(private authSvc: AuthsrvService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.form.valid) {
      this.authSvc.register(this.form.value)
        .subscribe(res => {
          console.log('Registrazione andata a buon fine');
          this.router.navigate(['auth/']);
        });
    }
    else {
      this.formvalid = true
      console.log("not valid")
    }
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid
   }
   isTouched(fieldName: string) {
     return this.form.get(fieldName)?.touched
   }

  isInValidTouched(fieldName:string){
    return !this.isValid(fieldName) && this.isTouched(fieldName)
  }

}
