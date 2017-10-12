import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminUserCrudService {
  authToken: any;

  constructor(private http:Http) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

  deleteUser(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete('http://localhost:3000/admin/delete-user/' +id, {headers: headers}).map(res => res.json());
  }

}
