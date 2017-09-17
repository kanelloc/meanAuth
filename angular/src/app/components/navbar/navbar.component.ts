import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth/auth.service';
import { AdminAuthService} from '../../services/admin-auth/admin-auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  current_user: object;
  user_JSON: object;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
    private adminAuthService: AdminAuthService) {
     }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logoutUser();
    this.flashMessage.show('See you later.', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
