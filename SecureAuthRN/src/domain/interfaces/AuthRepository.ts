import { User } from '../entities/User';

export interface AuthRepository {
  login(email: string, password: string): Promise<{ token: string; user: User }>;
  register(email: string, password: string, name?: string): Promise<void>;
  me(token: string): Promise<User>;
}
