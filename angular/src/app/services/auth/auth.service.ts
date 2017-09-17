import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;
  current_user: any;

  constructor(private http:Http) { }

  /**
   * Register user (Service)
   * @param user 
   */
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .map(res => res.json());
  }

  /**
   * Authentice user (Service)
   * @param user 
   */
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  /*
   |--------------------------------------------------------------------------
   | Authenticated User Services
   |--------------------------------------------------------------------------
  */

  /**
   * Get User profile page (Service)
   */
  getUserProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());
  }

  /*
   |--------------------------------------------------------------------------
   | Store, Load Token, Logout
   |--------------------------------------------------------------------------
  */

  /**
   * Store data after Login (Service)
   * @param token 
   * @param user 
   */
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  loadUser(){
    var user = localStorage.getItem('user');
    return this.current_user= JSON.parse(user);
  }

  /**
   * Logout user with total wipe (Service)
   */
  logoutUser(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
