import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Card, Button, IconBox, Section } from '../components';
import { TOURNAMENTS } from '../data';

export default function HomeScreen({ navigation }) {
  const quick = [
    { label: 'Book Now', icon: 'game-controller-outline', color: colors.blue, go: 'Calculator' },
    { label: 'About Us', icon: 'newspaper-outline', color: colors.purple, go: 'About' },
    { label: 'Offers', icon: 'pricetag-outline', color: colors.green, go: 'Calculator' }
  ];
  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 18 }}>
      <Text style={s.eyebrow}>NEXT LEVEL GAMING</Text>
      <Text style={s.h1}>Welcome to Next Level Gaming</Text>
      <Image source={require('../../assets/logo.jpg')} style={s.hero} resizeMode="cover" accessibilityLabel="Next Level Gaming logo" />
      <View style={s.quickRow}>
        {quick.map(q => (
          <TouchableOpacity key={q.label} style={[s.quick, { borderColor: q.color }]} onPress={() => navigation.navigate(q.go)} accessibilityRole="button">
            <Ionicons name={q.icon} size={26} color={q.color} />
            <Text style={s.quickText}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Section color={colors.white}>Upcoming Tournaments</Section>
      {TOURNAMENTS.map((t, i) => (
        <Card key={t.name} purple={i === 0}>
          <View style={s.row}>
            <IconBox icon={t.icon} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.cardTitle}>{t.name}</Text>
              <Text style={s.muted}>Date: {t.date}</Text>
            </View>
            <Button small title="Register" variant={i === 0 ? 'purple' : 'solid'} onPress={() => navigation.navigate('Contact', { event: t.name })} />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  eyebrow: { color: colors.blue, fontWeight: '800', letterSpacing: 2, fontSize: 12 },
  h1: { color: colors.white, fontSize: 28, fontWeight: '900', marginVertical: 6 },
  hero: { width: '100%', height: 220, borderRadius: 16, marginVertical: 12 },
  quickRow: { flexDirection: 'row', gap: 10 },
  quick: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 14, backgroundColor: colors.charcoal, borderWidth: 1, borderRadius: 14 },
  quickText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: colors.white, fontWeight: '800', fontSize: 16 },
  muted: { color: colors.muted, marginTop: 2 }
});
