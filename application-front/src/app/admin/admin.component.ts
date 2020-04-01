import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { error } from 'protractor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];


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

  openProjectList(ownerUsername:string) {
    this.applicationService.userToLoad = ownerUsername;
    this.router.navigate(['/projects']);
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
        this.applicationService.deleteUser(id).subscribe( data => {
          let updatedUsers = this.users.filter((user) => user.id !== id);
          this.users = updatedUsers;
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );
        },
        error => {
          Swal.fire(error);
        }
        );
      }
    });
  }
}
