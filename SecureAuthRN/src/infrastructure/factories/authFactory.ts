import { AuthService } from '@infra/services/AuthService';
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl';

export function makeAuthRepository(){
  const service = new AuthService();
  return new AuthRepositoryImpl(service);
}
