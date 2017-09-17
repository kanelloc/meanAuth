import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
import { AdminAuthService } from '../../../services/admin-auth/admin-auth.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private adminAuthService: AdminAuthService,
    private router: Router,) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const admin = {
      email: this.email,
      password: this.password
    }

    /**
     * Validation Section
     */
    if(!this.validateService.validateLogin(admin)){
      this.flashMessage.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 1400});
      return false;
    }

    this.adminAuthService.authenticateAdmin(admin).subscribe(data => {
      if(data.success){
        console.log(data);
        this.adminAuthService.storeAdminData(data.token, data.admin);
        this.flashMessage.show(data.msg, 
          {cssClass: 'alert-success', 
          timeout: 5000});
        this.router.navigate(['/admin/panel']);

      } else {
        this.flashMessage.show(data.msg, 
          {cssClass: 'alert-danger', 
          timeout: 5000});
        this.router.navigate(['/admin/login']);
      }
    });
  }

}
