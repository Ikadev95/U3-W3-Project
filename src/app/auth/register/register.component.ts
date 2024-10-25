import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthsrvService } from '../authsrv.service';
import { iUser } from '../../interfaces/i-user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Corretto 'styleUrl' in 'styleUrls'
})
export class RegisterComponent implements OnInit {

  form: FormGroup; // FormGroup per gestire il modulo
  formvalid = false

  constructor(private authSvc: AuthsrvService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({ // Crea il FormGroup con i controlli e le validazioni
      name: ['', Validators.required], // Nome è richiesto
      email: ['', [Validators.required, Validators.email]], // Email è richiesta e deve essere in formato email
      password: ['', Validators.required] // Password è richiesta
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.form.valid) { // Verifica se il modulo è valido
      this.authSvc.register(this.form.value) // Usa registerForm.value per ottenere i dati
        .subscribe(res => {
          console.log('Registrazione andata a buon fine');
          this.router.navigate(['auth/']); // Naviga alla pagina di autenticazione
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
