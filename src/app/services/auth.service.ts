import {
  HttpClient,
  HttpErrorResponse,
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

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    console.log(user);

    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
      `${this.host}/user/login`,
      user,
      { observe: 'response' }
    );
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  public saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }
  // @ts-ignore
  public isLoggedIn(): boolean {
    this.loadToken();
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
}
