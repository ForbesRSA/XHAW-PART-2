import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Alert, Linking, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Card, Title, Section, Button } from '../components';

export default function ContactScreen({ route }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (route.params?.event) setF(x => ({ ...x, message: 'I would like to register for: ' + route.params.event }));
    if (route.params?.quote) setF(x => ({ ...x, message: 'Please send me a booking confirmation for my quotation.' }));
  }, [route.params]);

  const set = k => v => setF(x => ({ ...x, [k]: v }));
  const send = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
    if (!/^\+?[0-9 ]{9,15}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number, e.g. +27 82 123 4567.';
    if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    setErrors(e);
    if (Object.keys(e).length === 0) { Alert.alert('Message sent', 'Thank you! Our team will get back to you shortly.'); setF({ name: '', email: '', phone: '', message: '' }); }
  };
  const field = (key, label, placeholder, extra = {}) => (
    <View>
      <Text style={s.label}>{label}</Text>
      <TextInput style={[s.input, extra.multiline && { height: 120, textAlignVertical: 'top' }]} value={f[key]} onChangeText={set(key)}
        placeholder={placeholder} placeholderTextColor="#777" {...extra} />
      {!!errors[key] && <Text style={s.err}>{errors[key]}</Text>}
    </View>
  );
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={s.root} contentContainerStyle={{ padding: 18 }} keyboardShouldPersistTaps="handled">
        <Title>Contact Us</Title>
        {field('name', 'FULL NAME', 'e.g. John Doe')}
        {field('email', 'EMAIL ADDRESS', 'e.g. john@example.com', { keyboardType: 'email-address', autoCapitalize: 'none' })}
        {field('phone', 'PHONE NUMBER', 'e.g. +27 82 123 4567', { keyboardType: 'phone-pad' })}
        {field('message', 'YOUR MESSAGE', 'Type your message here...', { multiline: true })}
        <Button title="Send Message" onPress={send} style={{ marginTop: 16 }} />
        <Section color={colors.purple}>Visit Us</Section>
        <Card purple>
          <Row icon="location-outline" text="123 Esports Avenue, Sandton, Johannesburg" color={colors.blue} />
          <Row icon="call-outline" text="+27 11 555 9876" color={colors.purple} onPress={() => Linking.openURL('tel:+27115559876')} />
          <Row icon="mail-outline" text="arena@nextlevelgaming.co.za" color={colors.green} onPress={() => Linking.openURL('mailto:arena@nextlevelgaming.co.za')} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const Row = ({ icon, text, color, onPress }) => (
  <TouchableOpacity disabled={!onPress} onPress={onPress} style={s.row}><Ionicons name={icon} size={20} color={color} /><Text style={{ color: colors.white, marginLeft: 12, flex: 1 }}>{text}</Text></TouchableOpacity>
);
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.blue, fontWeight: '800', fontSize: 12, marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.charcoal, borderColor: colors.border, borderWidth: 1, borderRadius: 12, color: colors.white, padding: 12, fontSize: 15 },
  err: { color: '#FF6B81', fontSize: 12, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }
});
