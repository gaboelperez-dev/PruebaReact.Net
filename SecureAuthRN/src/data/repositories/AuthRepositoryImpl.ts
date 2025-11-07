import { AuthRepository } from '@domain/interfaces/AuthRepository';
import { User } from '@domain/entities/User';
import { AuthService } from '@infra/services/AuthService';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private service: AuthService) {}
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    return this.service.login(email, password);
  }
  async register(email: string, password: string, name?: string){
    return this.service.register(email, password, name);
  }
  async me(token: string){
    return this.service.me(token);
  }
}
