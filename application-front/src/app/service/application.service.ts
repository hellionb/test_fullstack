import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';




@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/application';

  public placeholder = 'https://jsonplaceholder.typicode.com';

 
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const url = this.baseUrl + '/login';
    return this.http.post<User>(url, { username, password }, this.httpOptions)
  }

  register(username: string, password: string, email: string): Observable<User> {
    const url = this.baseUrl + '/register';
    return this.http.post<User>(url, { username, password, email }, this.httpOptions);
  }



  /**
   * TODO Implémenter les requêtes pour la sauvegarde et le chargement des projets
   * -> Il faut s'inspirer des fonctions ci-dessus
   */

  saveProjects(id: number,name: string, amount: number,  description: string, ownerUsername: string): Observable<Project> {
    const url = this.baseUrl + '/save';
    return this.http.post<Project>(url, { id, name, amount, description, ownerUsername }, this.httpOptions)
  }

  getProjects(id: number,name: string, amount: number,  description: string, ownerUsername: string): Observable<Project> {
    const url = this.baseUrl + '/projects';
    return this.http.get<Project>(url, {responseType: 'json'})
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.placeholder}/users`);
  }


}
