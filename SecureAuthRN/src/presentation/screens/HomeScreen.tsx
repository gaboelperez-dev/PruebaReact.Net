import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthStore } from '@presentation/state/authStore';

export default function HomeScreen(){
  const { user, logout } = useAuthStore();
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', gap:12}}>
      <Text style={{fontSize:18}}>¡Bienvenido, {user?.name ?? user?.email}!</Text>
      <Button title="Cerrar sesión" onPress={() => logout()} />
    </View>
  );
}
