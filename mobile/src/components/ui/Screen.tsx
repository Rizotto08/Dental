import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export const Screen = ({ children }: PropsWithChildren) => <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>;

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 }
});
