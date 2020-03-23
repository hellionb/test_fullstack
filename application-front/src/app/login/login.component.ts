import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private applicationService: ApplicationService, private router: Router) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    // TODO Gérer les échecs de connexion
    // Losque les informations ne sont pas bonnes et que le backend renvoie une erreur,
    // Il faut afficher le bon message d'erreur avec une alerte via `Swal`
    this.applicationService.login(this.username.value, this.password.value).subscribe(
      user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
        Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
      },
      error => {
        if (error !instanceof HttpErrorResponse) {
          Swal.fire('Check yor username and password');
        }
        else {
          Swal.fire('there has been error')
        }
      })
  }

}
