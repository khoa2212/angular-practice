import { Role } from './role.enum';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  email: string;
  displayName: string;
  avatar: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequestDTO {
  displayName: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface SignupResponseDTO {
  verifiedToken: string;
}

export interface VerifyRequestDTO {
  verifiedToken: string;
}

export interface RenewAccessTokenRequestDTO {
  refreshToken: string;
}

export interface RenewAccessTokenResponseDTO {
  accessToken: string;
}
