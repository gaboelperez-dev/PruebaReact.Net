import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@presentation/screens/LoginScreen';
import RegisterScreen from '@presentation/screens/RegisterScreen';
import HomeScreen from '@presentation/screens/HomeScreen';
import { useAuthStore } from '@presentation/state/authStore';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  const isAuth = useAuthStore(s => s.isAuthenticated);
  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
