import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Project } from '../model/project.model';





@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private baseUrl = 'http://localhost:8080/application';


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

  saveProject(ownerUsername: string, name: string, amount: number, description: string) {
    const url = `${this.baseUrl}/saveProject`;
    return this.http.post<Project>(url, { ownerUsername, name, amount, description }, this.httpOptions);
  }

  getProjects(ownerUsername:string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/getProjects?ownerUsername=${ownerUsername}`, this.httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getUsers`, this.httpOptions);
  }

  deleteProject(id:number){
    return this.http.delete<Project>(`${this.baseUrl}/deleteProject?id=${id}`, this.httpOptions);
    
  }

  // private handleError(error: Response) {
  //   console.error(error)
  //   if (error instanceof HttpErrorResponse) {
  //     let errorMsg = `error code ${error.status} on the ${error.statusText}`;
  //     return Observable.throw(errorMsg)
  //   }
  //   else {
  //     return error.statusText
  //   }
  // }

  
}





