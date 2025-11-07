import { AuthRepository } from '../interfaces/AuthRepository';

export class LoginUser {
  constructor(private repo: AuthRepository) {}
  exec(email: string, password: string){
    return this.repo.login(email, password);
  }
}
