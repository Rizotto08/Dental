import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/authStore';
import { AuthNavigator } from './auth/AuthNavigator';
import { MainTabs } from './tabs/MainTabs';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const token = useAuthStore((s) => s.accessToken);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? <Stack.Screen name="Main" component={MainTabs} /> : <Stack.Screen name="Auth" component={AuthNavigator} />}
    </Stack.Navigator>
  );
};
