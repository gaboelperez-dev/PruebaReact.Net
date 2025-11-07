import { http } from './httpClient';
import { User } from '@domain/entities/User';

export class AuthService {
  async register(email: string, password: string, name?: string){
    await http.post('/register', { email, password, name });
  }
  async login(email: string, password: string): Promise<{ token: string; user: User }>{
    const { data } = await http.post('/login', { email, password });
    return data;
  }
  async me(token: string): Promise<User>{
    const { data } = await http.get('/me', { headers: { Authorization: `Bearer ${token}` }});
    return data;
  }
}
