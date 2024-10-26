import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from '../auth/authsrv.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  logged = false;

  constructor(private authSrv: AuthsrvService) {}

  isMenuOpen: boolean = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe(isLoggedIn => {
      this.logged = isLoggedIn;
    });


  }


}
