import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { Router } from '@angular/router';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user!: iUser

  constructor(private authSrv : AuthsrvService, private router: Router){}
  ngOnInit(): void {

   this.authSrv.user$.subscribe( user => {
    if (user) this.user = user
   })

  }

  logout(){
    this.authSrv.logout()
    this.router.navigate(['auth'])
  }

}
