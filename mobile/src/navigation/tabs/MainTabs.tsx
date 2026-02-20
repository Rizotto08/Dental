import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { PatientsScreen } from '@/features/patients/screens/PatientsScreen';
import { CalendarScreen } from '@/features/calendar/screens/CalendarScreen';
import { FinanceScreen } from '@/features/finance/screens/FinanceScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Patients" component={PatientsScreen} />
    <Tab.Screen name="Calendar" component={CalendarScreen} />
    <Tab.Screen name="Finance" component={FinanceScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
