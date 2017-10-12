import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { AdminAuthService } from '../../../../services/admin-auth/admin-auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  admin: object;
  users: Array<any>;

  totalUsers: number;

  constructor(
    private authService: AuthService,
    private adminAuthService: AdminAuthService,
    private router: Router) { }

  ngOnInit() {
    this.adminAuthService.getAdminProfile().subscribe(dataFromServer => {
      this.users = dataFromServer;
      this.totalUsers = this.users.length;
    },
    err =>{
      console.log(err);
      return false;
    });
  }

  onChangeTotalUsers(number: number){
    this.totalUsers = number;
    console.log("FATHER");
    console.log(number);
  }
}
