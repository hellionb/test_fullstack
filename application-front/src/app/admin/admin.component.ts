import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:User[];

  constructor(private router: Router, private applicationService: ApplicationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.applicationService.getUsers().subscribe((results => {
      this.users = results;
    }));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }

  openProjectList(ownerUsername){
    console.log('this is selected id ', ownerUsername)
    this.applicationService.userToLoad = ownerUsername;
    this.router.navigate(['/projects']);

  }

}
