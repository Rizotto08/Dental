import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Title = ({ text }: { text: string }) => <Text style={styles.title}>{text}</Text>;

const styles = StyleSheet.create({ title: { fontSize: 24, fontWeight: '700' } });
