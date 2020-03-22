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
  showTable: boolean = false;

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
    this.checkProjects();

  }

  checkProjects() {
    if (this.projects.length === 0) {
      return this.showTable = false
    }
    else {
      return this.showTable = true
    }
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
    this.applicationService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    })
  }


  // TODO 2: Sauvegarder les informations d'un projet grâce formulaire
  // -> Appeler le backend pour créer le projet avec les bonnes informations
  // -> Ne pas oublier d'ajouter l'username de l'utilisateur
  // -> Après avoir sauvegarder le projet, l'ajouter  dans `this.projects`
  onSubmit() {
    let name = this.name.value;
    let amount = this.amount.value;
    let description = this.description.value;
    let user = this.user.username
    this.applicationService.saveProject(name, amount, description, user).subscribe(project => this.projects.push(project)
    )
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }

}



