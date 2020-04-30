import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { Project } from '../model/project.model';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

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
    if (this.user === null) {
      this.router.navigate(['login']);
    }
  }

  // TODO 1: Récupérer la liste des projets lié à cette utilisateur
  // Cette fonction ne fait rien pour l'instant
  // -> Il faut remplir la liste de projet `this.projects`
  getUserProjects() {
    this.projects = [];
    if(this.user !== null){
    this.applicationService.getProjects(this.user.username).subscribe(
      (projects) => {
        this.projects = projects;
      },
      response => {
        Swal.fire('Erreur de chargement de projets', 'Erreur de chargement des projets', "error");
      }
    );
    }
  }

  // TODO 2: Sauvegarder les informations d'un projet grâce formulaire
  // -> Appeler le backend pour créer le projet avec les bonnes informations
  // -> Ne pas oublier d'ajouter l'username de l'utilisateur
  // -> Après avoir sauvegarder le projet, l'ajouter  dans `this.projects`
  onSubmit() {
    const {name,amount,description} = this;
    this.applicationService.saveProject(name.value,amount.value,description.value,this.user.username).subscribe(
      (project) => {
        this.projects.push(project);
      },
      response => {
        //erreurs
      }
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }
}
