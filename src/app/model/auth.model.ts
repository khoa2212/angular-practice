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

export interface SignupRequestDTO {}

export interface SignupResponseDTO {}

export interface VerifyRequestDTO {}

export interface RenewAccessTokenRequestDTO {}

export interface RenewAccessTokenResponseDTO {}
