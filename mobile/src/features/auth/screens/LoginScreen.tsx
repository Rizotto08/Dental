import React from 'react';
import { TextInput, Button } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Screen } from '@/components/ui/Screen';
import { Title } from '@/components/ui/Title';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const LoginScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  return (
    <Screen>
      <Title text={t('auth.login')} />
      <Controller control={control} name="email" render={({ field: { onChange, value } }) => <TextInput placeholder={t('auth.email')} value={value} onChangeText={onChange} />} />
      <Controller control={control} name="password" render={({ field: { onChange, value } }) => <TextInput secureTextEntry placeholder={t('auth.password')} value={value} onChangeText={onChange} />} />
      <Button title={t('auth.signIn')} onPress={handleSubmit(() => undefined)} />
    </Screen>
  );
};
