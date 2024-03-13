import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RenewAccessTokenRequestDTO,
  RenewAccessTokenResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
  VerifyRequestDTO,
} from 'app/model';
import { ENVIRONMENT } from 'environment/environment';
import { AUTH } from 'app/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private httpClient: HttpClient) {}

  login$(requestDTO: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.httpClient.post<LoginResponseDTO>(
      `${ENVIRONMENT.BASE_URL}/${AUTH.LOGIN}`,
      requestDTO
    );
  }

  signup$(requestDTO: SignupRequestDTO): Observable<SignupResponseDTO> {
    return this.httpClient.post<SignupResponseDTO>(
      `${ENVIRONMENT.BASE_URL}/${AUTH.SIGNUP}`,
      requestDTO
    );
  }

  verify$(requestDTO: VerifyRequestDTO): Observable<LoginResponseDTO> {
    return this.httpClient.post<LoginResponseDTO>(
      `${ENVIRONMENT.BASE_URL}/${AUTH.VERIFY}`,
      requestDTO
    );
  }

  renew$(
    requestDTO: RenewAccessTokenRequestDTO
  ): Observable<RenewAccessTokenResponseDTO> {
    return this.httpClient.post<RenewAccessTokenResponseDTO>(
      `${ENVIRONMENT.BASE_URL}/${AUTH.RENEW}`,
      requestDTO
    );
  }
}
