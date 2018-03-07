import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm, EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html'
})
export class LoginContainerComponent implements  AfterViewInit {
  public isAuthorized = false;

  @ViewChild('registerForm')
  public registerForm: NgForm;

  public model = {
    email: null,
    password: null
  };




  constructor(private elementRef: ElementRef, private userService: UserService, private router: Router) {
    this.isAuthorized = this.userService.isAuthorized();
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/assets/eyes.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  logIn(p_login: string) {
    this.userService.authUser(p_login);
    this.router.navigate(['/list']);
  }
  logOut() {
    this.userService.logOut();
    this.isAuthorized = false;
  }

  onSubmitForm(e) {
    this.logIn(this.model.email);
  }



}
