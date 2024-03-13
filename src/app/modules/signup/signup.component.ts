import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isShowPassword = false;
  
  onShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
