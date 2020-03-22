import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/application';

  public placeholder = 'https://jsonplaceholder.typicode.com';


  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

  saveProject(name: string, amount: number, description: string, ownerUsername: string): Observable<Project> {
    const url = this.baseUrl + '/save';
    return this.http.put<Project>(url, { name, amount, description, ownerUsername }, this.httpOptions)
  }

  getProjects(): Observable<any> {
    const url = this.baseUrl + '/save';
    return this.http.put<any>(url, {}, this.httpOptions).pipe(catchError(this.handleError))
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.placeholder}/users`);
  }


  private handleError(error: Response) {
    console.error(error)
    if (error instanceof HttpErrorResponse) {
      let errorMsg = `error code ${error.status} on the ${error.url}`;
      return Observable.throw(errorMsg)
    }
    else {
      let errorMsg = 'Check your username and password'
      return Observable.throw(errorMsg)
    }
  }
}



