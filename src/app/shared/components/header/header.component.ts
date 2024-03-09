import { Component } from '@angular/core';
import { AuthService } from 'app/service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isToggle = false;

  isShowDropdown = false;

  currentUser$ = this.authService
    .getCurrentUser$()
    .pipe(map((user) => user));

  constructor(public authService: AuthService) {}

  onToggle(): void {
    this.isToggle = !this.isToggle;
  }

  onLogout(): void {
    this.authService.logout();
  }

  onShowDropDown() {
    this.isShowDropdown = !this.isShowDropdown;
  }
}
