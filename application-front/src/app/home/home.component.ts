import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {ApplicationService} from '../service/application.service';
import {Project} from '../model/project.model';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: User;
  private projects: any;

  formGroup: FormGroup;
  name: FormControl;
  amount: FormControl;
  description: FormControl;
  ownerUsername: string;

  constructor(private router: Router, private applicationService: ApplicationService) {
    this.name = new FormControl('');
    this.amount = new FormControl('');
    this.description = new FormControl('');

    this.formGroup = new FormGroup({
      name: this.name,
      amount: this.amount,
      description: this.description
    });
  }

  ngOnInit() {
    this.getUser();
    this.getUserProjects(JSON.parse(sessionStorage.getItem('user')));
  }

  getUser() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigate(['login']);
    }
  }

  /**
   * call getProjects service to get all project of a user
   * @param username
   */
  getUserProjects(username: string) {
    this.projects = [];
    this.ownerUsername = JSON.parse(sessionStorage.getItem('user'));
    this.applicationService.getProjects(this.ownerUsername)
      .subscribe((response) => {
          for (let r in response.body) {
            console.log('reponsesss : ' + response.body[r]['name']);
            this.projects.push(response.body[r]);
          }
        }, (error) => { //
          // console.log(error.status);
          Swal.fire('Problème affichage ', 'Oops', 'warning');
        });
  }

  onSubmit() {
    this.ownerUsername = JSON.parse(sessionStorage.getItem('user'));
    this.applicationService.saveProject(this.name.value, this.amount.value, this.description.value, this.ownerUsername)
      .subscribe((response) => {
          console.log(response.status);
          Swal.fire('Enregistrement réussi !', 'Projet ajouté', 'success');
        },
        (error) => { //
          // console.log(error.status);
          Swal.fire('Enregistrement échoué !', 'Oops', 'warning');
        });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }
}
