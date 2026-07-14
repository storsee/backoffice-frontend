import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';
import { setStoredAuthToken } from '../../shared/utils/auth-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginModel = new LoginModel();
  loginToken: any = '';
  sidebarPages;
  passVisible: boolean = false;
  isSaving = false;

  constructor(
    private loginservice: LoginService,
    public sharedservice: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('admin_data')) {
      this.router.navigate(['dashboard']);
    }
  }

  getEnterEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    let errTxt = '';
    if (!this.loginModel.email) {
      errTxt += 'Enter Email <br/>'
    }else{
      if (String(this.loginModel.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) { } else {
        errTxt += 'Enter Valid Email<br/>'
      }
    }
    if (!this.loginModel.password) {
      errTxt += "Plese enter password <br/>";
    }    

    if (errTxt == '') {
      if (this.isSaving) return;
      this.isSaving = true;
      this.loginModel.ip = this.sharedservice.ip;
        this.loginservice.userLogin(this.loginModel).pipe(
          finalize(() => this.isSaving = false)
        ).subscribe((res: any) => {
          if (res) {
            localStorage.setItem('admin_data', btoa(JSON.stringify(res.user)));
            setStoredAuthToken('admin_token', res.token);
            this.sharedservice.userData = res.user;
            localStorage.setItem('admin_pages', btoa(JSON.stringify(res.pages)));
            this.sharedservice.sidebarPages = res.pages;
            this.router.navigate(['/']);
            this.sharedservice.showAlert(1, 'Login Successfully');
          } else {
            this.sharedservice.showAlert(2, 'Something Went Wrong');
          }
        }, err => {
          this.sharedservice.showAlert(2, err.error.error);          
        })
    } else {
      this.sharedservice.showAlert(2, errTxt);
    }
  }

  viewHidePass() {
    this.passVisible = !this.passVisible;
  }
}