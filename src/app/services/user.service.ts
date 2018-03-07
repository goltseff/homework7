import {Injectable} from '@angular/core';


  @Injectable()
  export class UserService {

    isAuthorized(): boolean {
        const token = localStorage.getItem('user_auth_token');
        return token ? true : false;
    }
    authUser(p_login: string) {
        localStorage.setItem('user_auth_token', p_login);
    }
    logOut() {
        localStorage.removeItem('user_auth_token');
    }
  }
