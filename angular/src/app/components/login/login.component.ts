import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    /**
     * Validation Section
     */
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 1400});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, 
          {cssClass: 'alert-success', 
          timeout: 5000});
        this.router.navigate(['profile']);

      } else {
        this.flashMessage.show(data.msg, 
          {cssClass: 'alert-danger', 
          timeout: 5000});
        this.router.navigate(['login']);
      }
    });

  }

}
