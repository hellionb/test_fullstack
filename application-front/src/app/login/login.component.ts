import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../service/application.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

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

  // manage login
  onSubmit() {
    this.applicationService.login(this.username.value, this.password.value).subscribe(
      (response) => {
        sessionStorage.setItem('user', JSON.stringify(response.body['username']));
        this.router.navigate(['/home']);
        Swal.fire('Connexion réussie', 'Vous êtes à présent connecté', 'success');
      },
      (error) => { //
        // console.log(error.status);
        Swal.fire('Connexion échouée', 'Vous n\'êtes pas connecté, veuillez réessayer', 'warning');

      });
  }
}
