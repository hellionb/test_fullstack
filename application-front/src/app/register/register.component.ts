import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApplicationService} from '../service/application.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private applicationService: ApplicationService, private router: Router) {
    this.email = new FormControl('');
    this.username = new FormControl('');
    this.password = new FormControl('');

    this.formGroup = new FormGroup({
      email: this.email,
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {
  }

  // register new user
  onSubmit() {
    // validate email
    if ((this.validateEmail(this.email.value)) && (this.username) && (this.password)) {
      this.applicationService.register(this.username.value, this.password.value, this.email.value).subscribe((response) => {
          sessionStorage.setItem('user', JSON.stringify(response.body['username']));
          this.router.navigate(['home']);
          Swal.fire('Inscription réussie', 'Vous êtes à présent connecté', 'success');
        },
        (error) => { //
          // console.log(error.status);
          Swal.fire('Inscription échouée !', 'Cet utilisateur exite déjà', 'warning');
        });
    } else {
      Swal.fire('Format incorrect', 'Veuillez corriger votre formulaire', 'warning');
    }
  }

  // source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  /**
   * validate email format
   * @param email
   */
  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

}
