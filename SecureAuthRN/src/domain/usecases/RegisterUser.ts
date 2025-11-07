import { AuthRepository } from '../interfaces/AuthRepository';

export class RegisterUser {
  constructor(private repo: AuthRepository) {}
  exec(email: string, password: string, name?: string){
    return this.repo.register(email, password, name);
  }
}
