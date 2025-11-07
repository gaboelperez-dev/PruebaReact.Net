import { useMutation } from '@tanstack/react-query';
import { makeAuthRepository } from '@infra/factories/authFactory';
import { useAuthStore } from '@presentation/state/authStore';

const repo = makeAuthRepository();

export function useLogin(){
  const login = useAuthStore(s => s.login);
  return useMutation({
    mutationFn: ({email, password}: {email: string; password: string}) => repo.login(email, password),
    onSuccess: ({ token, user }) => login(token, user),
  });
}

export function useRegister(){
  return useMutation({
    mutationFn: ({email, password, name}: {email: string; password: string; name?: string}) => repo.register(email, password, name),
  });
}
