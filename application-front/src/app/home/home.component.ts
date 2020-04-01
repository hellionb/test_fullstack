import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { Project } from '../model/project.model';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserType } from '../model/userType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: User;
  private projects: Project[];
  formGroup: FormGroup;
  name: FormControl;
  amount: FormControl;
  description: FormControl;
  showTable = false;
  showUserListBtn = false;

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
    this.getUserProjects();
  }

  getUser() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.type === UserType.ADMIN) {
      this.showUserListBtn = true;
    }
    if (this.user === null) {
      this.router.navigate(['login']);
    }
  }

  // TODO 1: Récupérer la liste des projets lié à cette utilisateur
  // Cette fonction ne fait rien pour l'instant
  // -> Il faut remplir la liste de projet `this.projects`
  getUserProjects() {
    this.applicationService.getProjects(this.user.username).subscribe(results => this.projects = results);
  }

  // TODO 2: Sauvegarder les informations d'un projet grâce formulaire
  // -> Appeler le backend pour créer le projet avec les bonnes informations
  // -> Ne pas oublier d'ajouter l'username de l'utilisateur
  // -> Après avoir sauvegarder le projet, l'ajouter  dans `this.projects`
  onSubmit() {
    let ownerUsername = this.user.username;
    let name = this.name.value;
    let amount = this.amount.value;
    let description = this.description.value;
    this.applicationService.saveProject(ownerUsername, name, amount, description).subscribe(project => this.projects.push(project));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.applicationService.deleteProject(id).subscribe();
        let updatedProjects = this.projects.filter((project) => project.id !== id);
        this.projects = updatedProjects;
        Swal.fire(
          'Deleted!',
          'Your project has been deleted.',
          'success'
        );
      }
    });
  }
}




