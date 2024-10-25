import { AuthsrvService } from './../authsrv.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formData:iLoginRequest = {
    email : '',
    password : ''
  }

  constructor(private authSvc : AuthsrvService, private router:Router){}

  ngOnInit(): void {
  }

  login(){
    this.authSvc.login(this.formData)
    .subscribe(data =>{
      console.log('ok')
      this.router.navigate(['films'])
    })
  }

  @ViewChild('f') form!:NgForm

    submit(form:NgForm){
      console.log('form inviato al submit',form);
      console.log(form.form.value);

      form.reset();

    }


}
