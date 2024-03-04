import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RenewAccessTokenRequestDTO,
  RenewAccessTokenResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
  TokenType,
  User,
  VerifyRequestDTO,
} from 'app/model';
import { AuthClient } from 'app/client';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authClient: AuthClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  #currentUser$ = new BehaviorSubject<User | null>(null);

  getCurrentUser$(): Observable<User | null> {
    return this.#currentUser$.asObservable();
  }

  login$(requestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.authClient.login$(requestDTO);
  }

  signup$(requestDTO: SignupRequestDTO): Observable<SignupResponseDTO> {
    return this.authClient.signup$(requestDTO);
  }

  verify$(requestDTO: VerifyRequestDTO): Observable<any> {
    return this.authClient.verify$(requestDTO);
  }

  renew$(
    requestDTO: RenewAccessTokenRequestDTO
  ): Observable<RenewAccessTokenResponseDTO> {
    return this.authClient.renew$(requestDTO);
  }

  // non observable
  getCurrentUser(): User | null {
    return this.#currentUser$.value;
  }

  setCurrentUser(user: User | null) {
    this.#currentUser$.next(user);
  }

  autoLogin(): void {
    const token = this.tokenService.getToken(TokenType.ACCESS_TOKEN);

    if (token === null) {
      return;
    }

    const payload: any = JSON.parse(atob(token.split('.')[1] ?? '{}'));

    if (+payload.exp < Math.floor(Date.now() / 1000)) {
      this.logout();
      return;
    }

    const user: User = {
      displayName: payload.displayName,
      email: payload.email,
      role: payload.role,
    };

    this.setCurrentUser(user);
  }

  logout() {
    this.setCurrentUser(null);
    this.tokenService.removeToken(TokenType.ACCESS_TOKEN);
    this.tokenService.removeToken(TokenType.REFRESH_TOKEN);
    this.router.navigateByUrl('/');
  }
}
