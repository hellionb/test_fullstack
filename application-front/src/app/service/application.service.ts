import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/application';
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const url = this.baseUrl + '/login';
    return this.http.post<User>(url, {username, password}, this.httpOptions);
  }

  register(username: string, password: string, email: string): Observable<any> {
    const url = this.baseUrl + '/register';
    return this.http.post<User>(url, {username, password, email}, this.httpOptions);
  }

  /**
   * save new project
   * @param name
   * @param amount
   * @param description
   * @param ownerUsername
   */
  saveProject(name: string, amount: string, description: string, ownerUsername: string): Observable<any> {
    return this.http.post<User>(this.baseUrl + '/saveProject', {
      name,
      amount,
      description,
      ownerUsername
    }, this.httpOptions);
  }

  /**
   * get all projects by username
   * @param username
   */
  getProjects(username: string): Observable<any> {
    return this.http.get<User>(this.baseUrl + '/getProjects?ownerUsername=' + username, this.httpOptions);
  }

}
