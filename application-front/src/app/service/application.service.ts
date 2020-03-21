import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../model/user.model';




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

  getUsers(): Observable<any> {
    return this.http.get(`${this.placeholder}/users`);
  }

  saveProject() { }
  getProjects() { }

}
