import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { useAuthStore } from '@presentation/state/authStore';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const hydrate = useAuthStore(s => s.hydrateFromStorage);
  const logout = useAuthStore(s => s.logout);

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background') {
        // Aquí podrías limpiar vistas sensibles o activar lock
      }
    });
    return () => sub.remove();
  }, []);

  return <>{children}</>;
};
