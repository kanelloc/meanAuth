import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  /**
   * Validation Register
   * @param user 
   */
  validateRegister(user){
    if (user.username == undefined || user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validation Email
   * @param user 
   */
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * Validate Password
   * @param password 
   * @param confirm_password 
   */
  validatePassword(password, confirm_password){
    if (password !== confirm_password) {
      return false;
    } else{
      return true;
    }
  }

  /**
   * Validation Register
   * @param user 
   */
  validateLogin(user){
    if (user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }



}
