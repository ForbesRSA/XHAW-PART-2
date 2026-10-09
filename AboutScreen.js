import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Card, Title, Section, IconBox } from '../components';

const who = [
  { icon: '🎮', t: 'Casual Gamers', d: 'Perfect hangout' },
  { icon: '🏆', t: 'Competitive Players', d: 'Esports ready' },
  { icon: '🎓', t: 'Schools', d: 'Youth STEM programmes' },
  { icon: '🏢', t: 'Corporate Clients', d: 'Unforgettable events' }
];
export default function AboutScreen() {
  return (
    <ScrollView style={s.root} contentContainerStyle={{ padding: 18 }}>
      <Title>About Us</Title>
      <Section>Our Story</Section>
      <Text style={s.body}>Founded in 2023 by Jason Naidoo, Next Level Gaming & Esports Arena was born from a passion for gaming and community. Based in Johannesburg, we bring everyone together under one high-tech roof.</Text>
      <Card purple style={{ marginTop: 14 }}>
        <Text style={s.tag}>VISION</Text>
        <Text style={s.body}>To be the premier destination for gamers of all levels.</Text>
        <View style={s.hr} />
        <Text style={s.tag}>MISSION</Text>
        <Text style={s.body}>Delivering world-class gaming experiences that unite casual gamers, competitive players, schools, and corporate clients.</Text>
      </Card>
      <Section>Who We Serve</Section>
      {who.map(w => (
        <Card key={w.t}><View style={s.row}><IconBox icon={w.icon} />
          <View style={{ marginLeft: 12 }}><Text style={s.name}>{w.t}</Text><Text style={{ color: colors.muted }}>{w.d}</Text></View></View></Card>
      ))}
    </ScrollView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { color: colors.muted, lineHeight: 22 },
  tag: { color: colors.purple, fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
  hr: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.white, fontWeight: '800', fontSize: 16 }
});
