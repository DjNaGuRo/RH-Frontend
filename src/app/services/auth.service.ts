import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public host: string = environment.apiUrl;
  private token!: string | null;
  private loggedInUsername!: string | null;
  private jwtHelper = new JwtHelperService();
  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) {}
  /**
   *
   * @param user
   * @returns
   */
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/auth/login`, user, {
      observe: 'response',
    });
  }

  /**
   *
   *
   *
   *
   *
   * @param token
   *
   *
   *
   *
   */

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  /**
   *
   * @returns
   */
  // @ts-ignore
  public getUserFromLocalCache(): User {
    if (localStorage.getItem('user')) {
      // @ts-ignore
      return JSON.parse(localStorage.getItem('user'));
    }
  }
  /**
   *
   * @param token
   */
  public saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  /**
   *
   */
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }
  // @ts-ignore
  public isUserLoggedIn(): boolean {
    this.loadToken();
    console.log(this.token);
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}