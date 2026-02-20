import React from 'react';
import { Button } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const { i18n, t } = useTranslation();
  return (
    <Screen>
      <Button title={t('settings.languageRu')} onPress={() => i18n.changeLanguage('ru')} />
      <Button title={t('settings.languageEn')} onPress={() => i18n.changeLanguage('en')} />
      <Button title={t('settings.subscription')} onPress={() => undefined} />
      <Button title={t('settings.manageDoctors')} onPress={() => undefined} />
    </Screen>
  );
};
