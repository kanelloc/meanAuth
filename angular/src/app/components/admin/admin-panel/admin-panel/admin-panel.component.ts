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

  constructor(
    private authService: AuthService,
    private adminAuthService: AdminAuthService,
    private router: Router) { }

  ngOnInit() {
    this.adminAuthService.getAdminProfile().subscribe(dataFromServer => {
      this.users = dataFromServer;
    },
    err =>{
      console.log(err);
      return false;
    });
  }
}
