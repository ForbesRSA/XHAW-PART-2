import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius } from './theme';

export const Title = ({ children }) => <Text style={s.title}>{children}</Text>;
export const Section = ({ children, color = colors.blue }) => <Text style={[s.section, { color }]}>{children}</Text>;
export const Card = ({ children, purple, style }) => (
  <View style={[s.card, purple && { borderColor: colors.borderPurple }, style]}>{children}</View>
);
export const Button = ({ title, onPress, variant = 'solid', small, style }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress} activeOpacity={0.8}
    style={[s.btn, variant === 'outline' && s.btnOutline, variant === 'purple' && s.btnPurple, small && s.btnSmall, style]}>
    <Text style={[s.btnText, variant === 'outline' && { color: colors.blue }, variant === 'purple' && { color: colors.white }, small && { fontSize: 12 }]}>{title}</Text>
  </TouchableOpacity>
);
export const IconBox = ({ icon }) => <View style={s.iconBox}><Text style={{ fontSize: 28 }}>{icon}</Text></View>;

const s = StyleSheet.create({
  title: { color: colors.white, fontSize: 28, fontWeight: '800', marginBottom: 14 },
  section: { fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 10 },
  card: { backgroundColor: colors.charcoal, borderColor: colors.border, borderWidth: 1, borderRadius: radius, padding: 14, marginBottom: 12 },
  btn: { backgroundColor: colors.blue, paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, alignItems: 'center' },
  btnOutline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.blue },
  btnPurple: { backgroundColor: colors.purple },
  btnSmall: { paddingVertical: 7, paddingHorizontal: 12, borderRadius: 8 },
  btnText: { color: '#000', fontWeight: '800', fontSize: 16 },
  iconBox: { width: 56, height: 56, borderRadius: 14, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1F4448' }
});
