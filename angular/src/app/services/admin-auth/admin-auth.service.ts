import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthService {
  authToken: any;
  admin:any;
  current_admin: any;

  constructor(private http:Http) {
   }

   authenticateAdmin(admin){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/admins/authenticate', admin,{headers: headers})
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
  storeAdminData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('admin', "true");
    localStorage.setItem('user', JSON.stringify(user));
  }

    loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

    adminLoggedIn(){
      const admin = localStorage.getItem('admin');
      if (admin){
        return true;
      }
      return false;
    }
    /*
   |--------------------------------------------------------------------------
   | Authenticated Admin Services
   |--------------------------------------------------------------------------
  */

  /**
   * Get User profile page (Service)
   */
  getAdminProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/admins/dashboard',{headers: headers})
      .map(res => res.json());
  }


}
