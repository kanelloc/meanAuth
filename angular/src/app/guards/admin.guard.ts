import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth/admin-auth.service'

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private adminAuthService: AdminAuthService, private router: Router){

    }

    canActivate(){
        if(this.adminAuthService.adminLoggedIn()){
            return true;
        } else {
            this.router.navigate(['/admin/login']);
            return false;
        }
    }
}