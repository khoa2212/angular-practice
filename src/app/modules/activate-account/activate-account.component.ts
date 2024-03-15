import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenType, User, VerifyRequestDTO } from 'app/model';
import { AuthService, TokenService } from 'app/service';
@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export class ActivateAccountComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let token: string = '';

    this.route.queryParams.subscribe((params) => {
      token = params['token'];
    });

    const data: VerifyRequestDTO = {
      verifiedToken: token,
    };

    this.authService.verify$(data).subscribe({
      next: (res) => {
        this.tokenService.setToken(TokenType.ACCESS_TOKEN, res.accessToken);
        this.tokenService.setToken(TokenType.REFRESH_TOKEN, res.refreshToken);
        const user: User = { ...res };

        this.authService.setCurrentUser(user);
        this.router.navigateByUrl('/');
      },
    });
  }
}
