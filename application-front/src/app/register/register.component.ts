import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  email: FormControl;
  username: FormControl;
  password: FormControl;
  formValid = false;
  public users = [];


  constructor(private applicationService: ApplicationService, private router: Router) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.formGroup = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // TODO Gérer les échecs d'inscription
    // Losqu'un utilisateur existe déjà, cette requête ne devrait pas fonctionner,
    // Il faut donc afficher le bon message d'erreur avec une alerte via `Swal`
    // Il faut avoir un formulaire valide: mail valide et pas de champs vides
    this.applicationService.register(this.username.value, this.password.value, this.email.value).subscribe((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home']);
      Swal.fire('Inscription réussie', 'Vous êtes à présent connecté', 'success');
    },
    error=>{
      Swal.fire(`Please check your username or password! error has occured ${error.message}` )
    });
  } 
}
  






