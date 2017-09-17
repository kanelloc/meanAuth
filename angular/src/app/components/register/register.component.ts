import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  password_confirmation: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(user);

    /**
     * Validation Section
     */
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 1400});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Not a valid email address', {cssClass: 'alert-danger', timeout: 1400});
      return false;
    }

    if (!this.validateService.validatePassword(user.password, this.password_confirmation)) {
      this.flashMessage.show('Passwords dont match', {cssClass: 'alert-danger', timeout: 1400})
      return false;
    }

    /**
     * Register User
     */
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 2400})
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2400})
        this.router.navigate(['/register']);
      }
    });
  }

}
