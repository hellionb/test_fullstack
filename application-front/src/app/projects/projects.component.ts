import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private ownerUsername: string;
  private projects: Project[];

  constructor(private router: Router, private applicationService: ApplicationService) { }

  ngOnInit() {
    this.ownerUsername = this.applicationService.userToLoad;
    this.loadProjects(this.ownerUsername);
  }

  loadProjects(ownerUsername: string) {
    this.applicationService.getProjects(ownerUsername).subscribe(results => this.projects = results);
  }
}
